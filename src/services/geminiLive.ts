/** Gemini Live audio-to-audio voice sessions for the VORTEX chatbot. */

import { retrieveRelevantKnowledge } from '@/data/markdownKnowledge';

const GEMINI_API_KEY = (
  import.meta.env.GEMINI_API_KEY ||
  import.meta.env.VITE_GEMINI_API_KEY ||
  (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY)
) as string | undefined;

const LIVE_MODEL = 'gemini-3.8-live';
const VOICE_NAME = 'Achird';
const INPUT_SAMPLE_RATE = 16000;
const OUTPUT_SAMPLE_RATE = 24000;

const LIVE_API_URL = (key: string) =>
  `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${key}`;

export type VoiceState = 'idle' | 'connecting' | 'listening' | 'processing' | 'speaking' | 'error';

export interface VoiceSessionCallbacks {
  onStateChange: (state: VoiceState) => void;
  onTranscript: (role: 'user' | 'model', text: string) => void;
  onError: (message: string) => void;
}

function float32ToInt16(buffer: Float32Array): Int16Array {
  const out = new Int16Array(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    const sample = Math.max(-1, Math.min(1, buffer[i]));
    out[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }
  return out;
}

function downsample(buffer: Float32Array, inputRate: number, outputRate: number): Float32Array {
  if (inputRate === outputRate) return buffer;
  const ratio = inputRate / outputRate;
  const output = new Float32Array(Math.floor(buffer.length / ratio));
  for (let i = 0; i < output.length; i++) {
    const start = Math.floor(i * ratio);
    const end = Math.min(Math.floor((i + 1) * ratio), buffer.length);
    let sum = 0;
    for (let j = start; j < end; j++) sum += buffer[j];
    output[i] = sum / Math.max(1, end - start);
  }
  return output;
}

function pcmToBase64(int16: Int16Array): string {
  const bytes = new Uint8Array(int16.buffer, int16.byteOffset, int16.byteLength);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function base64ToFloat32(b64: string): Float32Array | null {
  try {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const samples = new Int16Array(bytes.buffer, 0, Math.floor(bytes.byteLength / 2));
    const floats = new Float32Array(samples.length);
    for (let i = 0; i < samples.length; i++) floats[i] = samples[i] / 32768;
    return floats;
  } catch {
    return null;
  }
}

function buildVoiceSystemPrompt(conversationContext: string): string {
  return `You are VORTEX AI, the official voice assistant for VORTEX Global Technologies.

Speak naturally and conversationally. Keep normal replies concise (usually one or two sentences); give detail when asked. Do not read lists unless the user asks for a list. Detect the language of the user's speech: reply in English to English, Malayalam script to Malayalam or Manglish, and mostly Malayalam with relevant technical terms in English for mixed language. Never reply in Manglish.

Use only the VORTEX facts in the context below. If the answer is not in the context, say you do not have that information. Do not invent prices, people, or company facts. Only provide contact details when relevant.

VORTEX FACTS:
${conversationContext}`;
}

function buildKnowledgeContext(): string {
  const topics = [
    'What does VORTEX do?',
    'What services does VORTEX offer?',
    'What products can VORTEX build?',
    'Tell me about the VORTEX Institute and its courses.',
    'Why choose VORTEX?',
    'Where are VORTEX offices and how can I contact them?',
  ];
  const sections = topics.map((topic) => retrieveRelevantKnowledge(topic)).filter(Boolean);
  return [...new Set(sections)].join('\n\n---\n\n').slice(0, 18000);
}

export class VoiceSession {
  private ws: WebSocket | null = null;
  private inputContext: AudioContext | null = null;
  private playbackContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private micSource: MediaStreamAudioSourceNode | null = null;
  private scriptProcessor: ScriptProcessorNode | null = null;
  private silentGain: GainNode | null = null;
  private currentSource: AudioBufferSourceNode | null = null;
  private callbacks: VoiceSessionCallbacks;
  private pendingAudioQueue: Float32Array[] = [];
  private isSpeaking = false;
  private setupComplete = false;
  private closedByUser = false;
  private userTranscriptBuffer = '';
  private modelTranscriptBuffer = '';
  private transcriptTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(callbacks: VoiceSessionCallbacks) {
    this.callbacks = callbacks;
  }

  async start(conversationContext: string): Promise<void> {
    if (!GEMINI_API_KEY) {
      this.callbacks.onError('Gemini API key is not configured. Add VITE_GEMINI_API_KEY to your .env file.');
      this.callbacks.onStateChange('error');
      return;
    }

    this.closedByUser = false;
    this.callbacks.onStateChange('connecting');

    // Resume playback while the mic button's user gesture is still active so
    // browser autoplay policies do not block the model's first audio response.
    try {
      this.inputContext = new AudioContext();
      this.playbackContext = new AudioContext();
      await Promise.all([this.inputContext.resume(), this.playbackContext.resume()]);
    } catch {
      this.fail('Audio could not be initialized in this browser. Please try again in a supported browser.');
      return;
    }

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
    } catch {
      this.callbacks.onError('Microphone access is required for voice conversations. You can continue using text chat.');
      this.callbacks.onStateChange('error');
      this.cleanup();
      return;
    }

    try {
      this.ws = new WebSocket(LIVE_API_URL(GEMINI_API_KEY));
      this.ws.binaryType = 'arraybuffer';
      this.ws.onopen = () => this.sendSetup(conversationContext);
      this.ws.onmessage = (event) => { void this.handleMessage(event); };
      this.ws.onerror = () => this.fail('Voice connection failed. Check your connection and Gemini API key, then try again.');
      this.ws.onclose = (event) => {
        if (this.closedByUser) return;
        if (event.code !== 1000) {
          this.fail(event.reason || 'Gemini voice session ended unexpectedly. Please try again.');
        } else {
          this.cleanup();
          this.callbacks.onStateChange('idle');
        }
      };
    } catch {
      this.fail('Could not start the voice connection. Please try again.');
    }
  }

  private sendSetup(conversationContext: string): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    this.ws.send(JSON.stringify({
      setup: {
        model: `models/${LIVE_MODEL}`,
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE_NAME } } },
        },
        inputAudioTranscription: {},
        outputAudioTranscription: {},
        systemInstruction: { parts: [{ text: buildVoiceSystemPrompt([
          buildKnowledgeContext(),
          conversationContext ? `RECENT CHAT HISTORY (context only):\n${conversationContext}` : '',
        ].filter(Boolean).join('\n\n---\n\n')) }] },
      },
    }));
  }

  private async startMicStreaming(): Promise<void> {
    if (!this.mediaStream || !this.inputContext || this.closedByUser) return;
    try {
      this.micSource = this.inputContext.createMediaStreamSource(this.mediaStream);
      this.scriptProcessor = this.inputContext.createScriptProcessor(4096, 1, 1);
      this.silentGain = this.inputContext.createGain();
      this.silentGain.gain.value = 0;
      this.scriptProcessor.onaudioprocess = (event) => {
        if (!this.setupComplete || this.ws?.readyState !== WebSocket.OPEN) return;
        const input = event.inputBuffer.getChannelData(0);
        const pcm = float32ToInt16(downsample(input, this.inputContext?.sampleRate ?? INPUT_SAMPLE_RATE, INPUT_SAMPLE_RATE));
        this.ws.send(JSON.stringify({
          realtimeInput: { audio: { mimeType: `audio/pcm;rate=${INPUT_SAMPLE_RATE}`, data: pcmToBase64(pcm) } },
        }));
      };

      this.micSource.connect(this.scriptProcessor);
      this.scriptProcessor.connect(this.silentGain);
      this.silentGain.connect(this.inputContext.destination);
      this.callbacks.onStateChange('listening');
    } catch {
      this.fail('Audio could not be initialized in this browser. Please allow microphone access and try again.');
    }
  }

  private async handleMessage(event: MessageEvent): Promise<void> {
    try {
      let messageText: string;
      if (typeof event.data === 'string') {
        messageText = event.data;
      } else if (event.data instanceof Blob) {
        messageText = await event.data.text();
      } else if (event.data instanceof ArrayBuffer) {
        messageText = new TextDecoder().decode(event.data);
      } else {
        throw new Error(`Unsupported WebSocket frame: ${Object.prototype.toString.call(event.data)}`);
      }
      const data = JSON.parse(messageText);

      if (data.error) {
        const detail = data.error.message || data.error.status || 'Gemini rejected the voice session.';
        this.fail(detail);
        return;
      }

      if (data.setupComplete) {
        this.setupComplete = true;
        void this.startMicStreaming();
        return;
      }

      const serverContent = data.serverContent;
      if (!serverContent) return;

      if (serverContent.inputTranscription?.text) {
        this.userTranscriptBuffer += serverContent.inputTranscription.text;
      }
      if (serverContent.outputTranscription?.text) {
        this.modelTranscriptBuffer += serverContent.outputTranscription.text;
      }

      if (serverContent.interrupted) {
        this.pendingAudioQueue = [];
        this.currentSource?.stop();
        this.currentSource = null;
        this.isSpeaking = false;
        this.callbacks.onStateChange('listening');
      }

      for (const part of serverContent.modelTurn?.parts ?? []) {
        if (part.inlineData?.mimeType?.startsWith('audio/pcm')) this.queueAudio(part.inlineData.data);
        if (part.text) this.modelTranscriptBuffer += part.text;
      }

      if (serverContent.turnComplete) {
        this.callbacks.onStateChange(this.isSpeaking || this.pendingAudioQueue.length ? 'speaking' : 'listening');
        this.scheduleTranscriptFlush();
      }
    } catch (error) {
      console.error('Failed to decode Gemini Live response:', error);
      this.fail('Received an unreadable response from the voice service. Please try again.');
    }
  }

  private scheduleTranscriptFlush(): void {
    if (this.transcriptTimer) clearTimeout(this.transcriptTimer);
    this.transcriptTimer = setTimeout(() => {
      this.flushTranscript('user');
      this.flushTranscript('model');
      this.transcriptTimer = null;
    }, 250);
  }

  private flushTranscript(role: 'user' | 'model'): void {
    const text = (role === 'user' ? this.userTranscriptBuffer : this.modelTranscriptBuffer).trim();
    if (!text) return;
    if (role === 'user') this.userTranscriptBuffer = '';
    else this.modelTranscriptBuffer = '';
    this.callbacks.onTranscript(role, text);
  }

  private queueAudio(b64: string): void {
    const audio = base64ToFloat32(b64);
    if (!audio) return;
    this.pendingAudioQueue.push(audio);
    if (!this.isSpeaking) this.playNextChunk();
  }

  private playNextChunk(): void {
    const context = this.playbackContext;
    const samples = this.pendingAudioQueue.shift();
    if (!context || !samples) {
      this.isSpeaking = false;
      if (this.setupComplete && !this.closedByUser) this.callbacks.onStateChange('listening');
      return;
    }

    this.isSpeaking = true;
    this.callbacks.onStateChange('speaking');
    const buffer = context.createBuffer(1, samples.length, OUTPUT_SAMPLE_RATE);
    buffer.copyToChannel(samples, 0);
    const source = context.createBufferSource();
    this.currentSource = source;
    source.buffer = buffer;
    source.connect(context.destination);
    source.onended = () => {
      if (this.currentSource !== source) return;
      this.currentSource = null;
      this.playNextChunk();
    };
    source.start();
  }

  private fail(message: string): void {
    if (this.closedByUser) return;
    this.callbacks.onError(message);
    this.callbacks.onStateChange('error');
    this.cleanup();
  }

  cleanup(): void {
    this.closedByUser = true;
    this.setupComplete = false;
    if (this.transcriptTimer) clearTimeout(this.transcriptTimer);
    this.transcriptTimer = null;
    this.scriptProcessor && (this.scriptProcessor.onaudioprocess = null);
    this.scriptProcessor?.disconnect();
    this.micSource?.disconnect();
    this.silentGain?.disconnect();
    this.currentSource?.stop();
    this.currentSource?.disconnect();
    this.currentSource = null;
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.mediaStream = null;
    if (this.inputContext && this.inputContext.state !== 'closed') void this.inputContext.close();
    if (this.playbackContext && this.playbackContext.state !== 'closed') void this.playbackContext.close();
    this.inputContext = null;
    this.playbackContext = null;
    this.scriptProcessor = null;
    this.micSource = null;
    this.silentGain = null;
    this.ws?.close();
    this.ws = null;
    this.pendingAudioQueue = [];
    this.isSpeaking = false;
  }
}
