/**
 * Gemini Live API service for VORTEX AI Chatbot voice interactions.
 *
 * Architecture:
 *   Microphone (PCM audio) → WebSocket → Gemini Live API
 *   Gemini Live API → PCM audio chunks → AudioContext → Speaker
 *
 * The Live API handles:
 *   - Real-time speech recognition (English, Malayalam, Manglish)
 *   - Natural voice response generation
 *   - Bidirectional streaming
 *
 * Security: API key from env var only — never hardcoded.
 */

import { retrieveRelevantKnowledge } from '@/data/vortexKnowledge';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

// Gemini Live model — supports Malayalam, English, voice output
const LIVE_MODEL = 'gemini-3.5-flash-live';

// Voice personality: Aoede is warm and conversational; Puck is energetic.
// Aoede works best for Malayalam/multilingual.
const VOICE_NAME = 'Aoede';

const LIVE_API_URL = (key: string) =>
  `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${key}`;

// ─── Types ───────────────────────────────────────────────────────────────────

export type VoiceState = 'idle' | 'connecting' | 'listening' | 'processing' | 'speaking' | 'error';

export interface VoiceSessionCallbacks {
  onStateChange: (state: VoiceState) => void;
  onTranscript: (role: 'user' | 'model', text: string) => void;
  onError: (message: string) => void;
}

// ─── Audio helpers ────────────────────────────────────────────────────────────

/** Convert a Float32Array PCM buffer to 16-bit PCM Int16Array */
function float32ToInt16(buffer: Float32Array): Int16Array {
  const out = new Int16Array(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    const s = Math.max(-1, Math.min(1, buffer[i]));
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return out;
}

/** Convert Int16 PCM bytes to a base64 string for the API */
function pcmToBase64(int16: Int16Array): string {
  const bytes = new Uint8Array(int16.buffer);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

/** Decode base64 PCM data into a Float32Array for AudioContext playback */
function base64ToFloat32(b64: string, sampleRate: number): AudioBuffer | null {
  try {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const int16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 32768;
    const ctx = new AudioContext({ sampleRate });
    const buf = ctx.createBuffer(1, float32.length, sampleRate);
    buf.copyToChannel(float32, 0);
    return buf;
  } catch {
    return null;
  }
}

// ─── VORTEX Voice System Prompt ───────────────────────────────────────────────

function buildVoiceSystemPrompt(userQuery: string): string {
  const knowledge = retrieveRelevantKnowledge(userQuery);

  return `You are VORTEX AI, the intelligent voice assistant for VORTEX Global Technologies.

IDENTITY:
- You are the official VORTEX AI assistant, not a generic chatbot.
- Introduce yourself as "VORTEX AI" when asked.

VOICE PERSONALITY:
- Warm, natural, conversational, confident, slightly energetic.
- Sound like a knowledgeable VORTEX team member, NOT a robotic TTS system.
- Keep spoken responses concise — 2 to 4 short sentences max.
- Avoid bullet points or numbered lists in voice responses — speak naturally.
- Do NOT start with "According to the available information..."
- Prefer: "Yes! VORTEX has..." or "Sure! At VORTEX..."

LANGUAGE BEHAVIOR:
- Detect the user's language automatically (English, Malayalam, Manglish).
- English input → English spoken response.
- Malayalam input → Malayalam spoken response.
- Manglish input → natural Manglish or Malayalam spoken response.
- Never ask the user to switch language manually.

KNOWLEDGE RULES:
- Answer ONLY from the VORTEX knowledge provided below.
- If information is not available, say so clearly and suggest calling +91 8606 101 333.
- NEVER invent company facts.

HALLUCINATION PREVENTION:
- Do not make up staff names, pricing, dates, or project names.

CONTACT REDIRECT:
- For pricing, admissions, or detailed enquiries: +91 8606 101 333 or @vortex_t_hub on Instagram.

---
VORTEX KNOWLEDGE:

${knowledge}`;
}

// ─── VoiceSession class ───────────────────────────────────────────────────────

export class VoiceSession {
  private ws: WebSocket | null = null;
  private audioCtx: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private audioWorklet: AudioWorkletNode | null = null;
  private scriptProcessor: ScriptProcessorNode | null = null;
  private outputSampleRate = 24000; // Gemini Live outputs 24kHz
  private callbacks: VoiceSessionCallbacks;
  private pendingAudioQueue: AudioBuffer[] = [];
  private isSpeaking = false;
  private setupComplete = false;
  private userTranscriptBuffer = '';
  private modelTranscriptBuffer = '';
  private currentQuery = '';

  constructor(callbacks: VoiceSessionCallbacks) {
    this.callbacks = callbacks;
  }

  /** Start a new voice session */
  async start(conversationContext: string, currentQuery = ''): Promise<void> {
    if (!GEMINI_API_KEY) {
      this.callbacks.onError('Gemini API key is not configured. Add VITE_GEMINI_API_KEY to your .env file.');
      return;
    }

    this.currentQuery = currentQuery;
    this.callbacks.onStateChange('connecting');

    try {
      // Request microphone
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
    } catch {
      this.callbacks.onError('Microphone access is required for voice conversations. You can continue using text chat.');
      this.callbacks.onStateChange('error');
      return;
    }

    // Open WebSocket
    this.ws = new WebSocket(LIVE_API_URL(GEMINI_API_KEY));
    this.ws.binaryType = 'arraybuffer';

    this.ws.onopen = () => {
      this._sendSetup(conversationContext);
    };

    this.ws.onmessage = (event) => {
      this._handleMessage(event);
    };

    this.ws.onerror = () => {
      this.callbacks.onError('Voice connection failed. Please try again.');
      this.callbacks.onStateChange('error');
      this.cleanup();
    };

    this.ws.onclose = () => {
      if (this.isSpeaking) return; // normal end after audio finishes
      this.callbacks.onStateChange('idle');
    };
  }

  /** Send setup message with system prompt + config */
  private _sendSetup(conversationContext: string): void {
    const systemPrompt = buildVoiceSystemPrompt(this.currentQuery) +
      (conversationContext ? `\n\nPREVIOUS CONVERSATION CONTEXT:\n${conversationContext}` : '');

    const setup = {
      setup: {
        model: `models/${LIVE_MODEL}`,
        generation_config: {
          response_modalities: ['AUDIO'],
          speech_config: {
            voice_config: {
              prebuilt_voice_config: { voice_name: VOICE_NAME },
            },
          },
        },
        system_instruction: {
          parts: [{ text: systemPrompt }],
        },
      },
    };

    this.ws?.send(JSON.stringify(setup));
  }

  /** Called after setup ACK — start streaming microphone audio */
  private async _startMicStreaming(): Promise<void> {
    if (!this.mediaStream) return;

    this.audioCtx = new AudioContext({ sampleRate: 16000 });
    const source = this.audioCtx.createMediaStreamSource(this.mediaStream);

    // ScriptProcessor for compatibility (AudioWorklet requires HTTPS in prod)
    const bufferSize = 4096;
    this.scriptProcessor = this.audioCtx.createScriptProcessor(bufferSize, 1, 1);

    this.scriptProcessor.onaudioprocess = (e) => {
      if (!this.setupComplete || this.ws?.readyState !== WebSocket.OPEN) return;
      const input = e.inputBuffer.getChannelData(0);
      const int16 = float32ToInt16(input);
      const b64 = pcmToBase64(int16);
      this.ws?.send(JSON.stringify({
        realtime_input: {
          media_chunks: [{
            mime_type: 'audio/pcm;rate=16000',
            data: b64,
          }],
        },
      }));
    };

    source.connect(this.scriptProcessor);
    this.scriptProcessor.connect(this.audioCtx.destination);
    this.callbacks.onStateChange('listening');
  }

  /** Handle incoming WebSocket messages from Gemini Live */
  private _handleMessage(event: MessageEvent): void {
    try {
      const data = typeof event.data === 'string'
        ? JSON.parse(event.data)
        : JSON.parse(new TextDecoder().decode(event.data as ArrayBuffer));

      // Setup complete ACK
      if (data.setupComplete) {
        this.setupComplete = true;
        this._startMicStreaming();
        return;
      }

      // Server content (audio + transcript)
      if (data.serverContent) {
        const sc = data.serverContent;

        // Turn completion
        if (sc.turnComplete) {
          // Flush model transcript
          if (this.modelTranscriptBuffer) {
            this.callbacks.onTranscript('model', this.modelTranscriptBuffer.trim());
            this.modelTranscriptBuffer = '';
          }
          if (this.userTranscriptBuffer) {
            this.callbacks.onTranscript('user', this.userTranscriptBuffer.trim());
            this.userTranscriptBuffer = '';
          }
          return;
        }

        const parts = sc.modelTurn?.parts ?? [];
        for (const part of parts) {
          // Audio chunk
          if (part.inlineData?.mimeType?.startsWith('audio/pcm')) {
            this._queueAudio(part.inlineData.data);
          }
          // Text transcript from model
          if (part.text) {
            this.modelTranscriptBuffer += part.text;
          }
        }

        // Input transcription (user's spoken words recognized)
        if (sc.inputTranscription?.text) {
          this.userTranscriptBuffer += sc.inputTranscription.text;
        }
      }
    } catch {
      // Ignore malformed messages
    }
  }

  /** Queue an audio chunk for sequential playback */
  private _queueAudio(b64: string): void {
    const buf = base64ToFloat32(b64, this.outputSampleRate);
    if (!buf) return;
    this.pendingAudioQueue.push(buf);
    if (!this.isSpeaking) {
      this._playNextChunk();
    }
  }

  private _playNextChunk(): void {
    if (this.pendingAudioQueue.length === 0) {
      this.isSpeaking = false;
      this.callbacks.onStateChange('listening');
      return;
    }

    this.isSpeaking = true;
    this.callbacks.onStateChange('speaking');

    // Create a fresh AudioContext for playback at 24kHz output
    const playCtx = new AudioContext({ sampleRate: this.outputSampleRate });
    const buf = this.pendingAudioQueue.shift()!;
    const source = playCtx.createBufferSource();
    source.buffer = buf;
    source.connect(playCtx.destination);
    source.onended = () => {
      playCtx.close();
      this._playNextChunk();
    };
    source.start();
  }

  /** Stop mic streaming and send end-of-turn signal */
  stopListening(): void {
    if (this.scriptProcessor) {
      this.scriptProcessor.disconnect();
      this.scriptProcessor = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    // Signal end of turn to Gemini
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.callbacks.onStateChange('processing');
    }
  }

  /** Fully clean up session */
  cleanup(): void {
    this.stopListening();
    this.mediaStream?.getTracks().forEach((t) => t.stop());
    this.mediaStream = null;
    this.ws?.close();
    this.ws = null;
    this.pendingAudioQueue = [];
    this.isSpeaking = false;
    this.setupComplete = false;
  }
}
