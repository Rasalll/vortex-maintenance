import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { ChatMessage } from '@/services/gemini';
import { sendMessage } from '@/services/gemini';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

// ─── Web Speech API types (not in TS default lib) ─────────────────────────────
interface ISpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart:  ((this: ISpeechRecognition, ev: Event) => void) | null;
  onend:    ((this: ISpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: ISpeechRecognition, ev: ISpeechRecognitionEvent) => void) | null;
  onerror:  ((this: ISpeechRecognition, ev: ISpeechRecognitionErrorEvent) => void) | null;
}
interface ISpeechRecognitionEvent extends Event {
  results: { [index: number]: { [index: number]: { transcript: string } } };
}
interface ISpeechRecognitionErrorEvent extends Event { error: string; }
interface ISpeechRecognitionCtor { new(): ISpeechRecognition; }
type WindowWithSpeech = Window & {
  SpeechRecognition?: ISpeechRecognitionCtor;
  webkitSpeechRecognition?: ISpeechRecognitionCtor;
};

// ─── Voice state type ─────────────────────────────────────────────────────────
export type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

// ─── Constants ────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'vortex-ai-chat-history';
const MAX_HISTORY = 20;

const QUICK_ACTIONS = [
  { label: '🚀 Our Services',  query: 'What services does VORTEX offer?' },
  { label: '🎓 Institute',     query: 'Tell me about the VORTEX Institute and its courses.' },
  { label: '🏢 About VORTEX',  query: 'Tell me about VORTEX.' },
  { label: '📞 Contact',       query: 'How can I contact VORTEX?' },
];

interface Props { onClose: () => void; }

// ─── Helpers ──────────────────────────────────────────────────────────────────
function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
function loadHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ChatMessage[];
  } catch { return []; }
}
function saveHistory(msgs: ChatMessage[]): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs)); } catch { /**/ }
}

/** Detect dominant script to pick TTS locale */
function detectLang(text: string): string {
  const ml = (text.match(/[\u0D00-\u0D7F]/g) || []).length;
  return ml > 3 ? 'ml-IN' : 'en-IN';
}

/**
 * Speak text using the browser's built-in SpeechSynthesis.
 * Falls back gracefully if not supported.
 */
function speakText(text: string, lang: string): Promise<void> {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) { resolve(); return; }
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate  = 0.93;
    utter.pitch = 1.05;

    // Prefer a voice that matches the target language
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const match =
        voices.find((v) => v.lang === lang) ||
        voices.find((v) => v.lang.startsWith(lang.split('-')[0])) ||
        voices.find((v) => v.lang.startsWith('en'));
      if (match) utter.voice = match;
      utter.onend   = () => resolve();
      utter.onerror = () => resolve();
      window.speechSynthesis.speak(utter);
    };

    // Voices may not be loaded yet on first call
    if (window.speechSynthesis.getVoices().length > 0) {
      loadVoices();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        loadVoices();
      };
      // Safety timeout — just speak without a specific voice
      setTimeout(loadVoices, 300);
    }
  });
}

// ─── Component ────────────────────────────────────────────────────────────────
const ChatWindow: React.FC<Props> = ({ onClose }) => {
  const [messages, setMessages]   = useState<ChatMessage[]>(() => loadHistory());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  const quickActionsVisible = messages.length === 0;
  const isListening = voiceState === 'listening';
  const isSpeaking  = voiceState === 'speaking';

  // Persist history
  useEffect(() => { saveHistory(messages); }, [messages]);

  // Cancel TTS on unmount
  useEffect(() => () => { window.speechSynthesis?.cancel(); }, []);

  // ── addMessage ──────────────────────────────────────────────────────────────
  const addMessage = useCallback((
    role: 'user' | 'model',
    content: string,
    type: 'text' | 'voice' = 'text',
  ) => {
    const msg: ChatMessage = {
      id: generateId(), role, content,
      timestamp: Date.now(), type,
    };
    setMessages((prev) => [...prev, msg]);
    return msg;
  }, []);

  // ── Mode A: Text input → text reply (no TTS) ───────────────────────────────
  const handleSend = useCallback(async (text: string) => {
    setError(null);
    setVoiceError(null);
    addMessage('user', text, 'text');
    setIsLoading(true);
    try {
      const history = messages.slice(-MAX_HISTORY);
      const reply = await sendMessage(text, history);
      addMessage('model', reply, 'text');
    } catch (err) {
      const e = err as Error;
      if (e.message.includes('not configured')) {
        setError('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
      } else if (e.message.includes('Failed to fetch') || e.message.includes('NetworkError')) {
        setError('Connection lost. Please check your internet connection and try again.');
      } else {
        setError(e.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [messages, addMessage]);

  // ── Mode B: Voice input → text reply → TTS ─────────────────────────────────
  const handleVoiceReply = useCallback(async (transcript: string) => {
    addMessage('user', transcript, 'voice');
    setVoiceState('processing');
    try {
      const history = messages.slice(-MAX_HISTORY);
      const reply = await sendMessage(transcript, history);
      addMessage('model', reply, 'voice');

      const lang = detectLang(reply);
      setVoiceState('speaking');
      await speakText(reply, lang);
      setVoiceState('idle');
    } catch (err) {
      const e = err as Error;
      if (e.message.includes('not configured')) {
        setVoiceError('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
      } else if (e.message.includes('Failed to fetch') || e.message.includes('NetworkError')) {
        setVoiceError('Connection lost. Please check your internet connection and try again.');
      } else {
        setVoiceError(e.message || 'Something went wrong. Please try again.');
      }
      setVoiceState('idle');
    }
  }, [messages, addMessage]);

  // ── Mic button handler ──────────────────────────────────────────────────────
  const handleVoiceStart = useCallback(() => {
    setVoiceError(null);

    // If speaking → stop TTS
    if (voiceState === 'speaking') {
      window.speechSynthesis?.cancel();
      setVoiceState('idle');
      return;
    }

    // If listening → stop recognition
    if (voiceState === 'listening') {
      recognitionRef.current?.abort();
      setVoiceState('idle');
      return;
    }

    // Check browser support
    const win = window as WindowWithSpeech;
    const SpeechRecognitionAPI = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setVoiceError('Voice input is not supported in this browser. Please type your message.');
      return;
    }

    // Start recognition
    const rec = new SpeechRecognitionAPI();
    // 'ml-IN' enables Malayalam recognition on Chrome; falls back to English elsewhere
    rec.lang = 'ml-IN';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    recognitionRef.current = rec;

    rec.onstart = () => setVoiceState('listening');

    rec.onresult = (e: ISpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      setVoiceState('idle');
      handleVoiceReply(transcript);
    };

    rec.onerror = (e: ISpeechRecognitionErrorEvent) => {
      setVoiceState('idle');
      if (e.error === 'not-allowed') {
        setVoiceError('Microphone access denied. Please allow microphone in your browser settings.');
      } else if (e.error === 'no-speech') {
        setVoiceError('No speech detected. Please try again.');
      } else if (e.error === 'network') {
        setVoiceError('Network error during voice recognition. Please try again.');
      } else {
        setVoiceError('Voice input failed. Please try again or type your message.');
      }
    };

    rec.onend = () => {
      // Only reset if we didn't already move to processing/speaking
      setVoiceState((prev) => (prev === 'listening' ? 'idle' : prev));
    };

    rec.start();
  }, [voiceState, handleVoiceReply]);

  // ── Status label ────────────────────────────────────────────────────────────
  const statusLabel = () => {
    if (voiceState === 'listening')   return 'Listening…';
    if (voiceState === 'processing')  return 'Processing…';
    if (voiceState === 'speaking')    return 'Speaking…';
    if (isLoading)                    return 'Thinking…';
    return 'Online';
  };

  const handleClearHistory = () => {
    setMessages([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /**/ }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div
      className="vx-chat-window"
      role="dialog"
      aria-modal="true"
      aria-label="VORTEX AI Chat Assistant"
    >
      {/* Header */}
      <div className="vx-chat-header">
        <div className="vx-chat-header-identity">
          <div className="vx-chat-header-avatar" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="url(#hgrad)" />
              <path d="M8 12l2.5 2.5L16 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="hgrad" x1="0" y1="0" x2="24" y2="24">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#4F46E5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <p className="vx-chat-header-name">VORTEX AI</p>
            <p className="vx-chat-header-status">
              <span className="vx-chat-status-dot" aria-hidden="true" />
              {statusLabel()}
            </p>
          </div>
        </div>
        <div className="vx-chat-header-actions">
          <button
            className="vx-chat-header-btn"
            onClick={handleClearHistory}
            aria-label="Clear chat history"
            title="Clear chat"
            type="button"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </button>
          <button
            className="vx-chat-header-btn"
            onClick={onClose}
            aria-label="Close chat"
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages or Welcome */}
      {messages.length === 0 ? (
        <div className="vx-chat-welcome">
          <div className="vx-chat-welcome-emoji" aria-hidden="true">👋</div>
          <h2 className="vx-chat-welcome-title">Hey there!</h2>
          <p className="vx-chat-welcome-sub">How can I help you today? Ask me anything about VORTEX.</p>
          {quickActionsVisible && (
            <div className="vx-quick-actions" role="group" aria-label="Quick questions">
              {QUICK_ACTIONS.map((a) => (
                <button
                  key={a.label}
                  className="vx-quick-action-btn"
                  onClick={() => handleSend(a.query)}
                  type="button"
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <ChatMessages messages={messages} isLoading={isLoading} />
      )}

      {/* Error banners */}
      {(error || voiceError) && (
        <div className="vx-chat-error" role="alert" aria-live="assertive">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error || voiceError}
          <button
            className="vx-chat-error-dismiss"
            onClick={() => { setError(null); setVoiceError(null); }}
            aria-label="Dismiss"
            type="button"
          >×</button>
        </div>
      )}

      {/* Listening indicator */}
      {voiceState === 'listening' && (
        <div className="vx-listening-bar" aria-live="polite" aria-label="Listening">
          <span className="vx-listening-dot" aria-hidden="true" />
          <span className="vx-listening-dot" aria-hidden="true" />
          <span className="vx-listening-dot" aria-hidden="true" />
          <span className="vx-listening-text">Listening… speak now</span>
        </div>
      )}

      {/* Processing indicator */}
      {voiceState === 'processing' && (
        <div className="vx-voice-processing-bar" aria-live="polite" aria-label="Processing voice">
          <span className="vx-voice-processing-spinner" aria-hidden="true" />
          <span>Processing your voice…</span>
        </div>
      )}

      {/* Speaking indicator */}
      {voiceState === 'speaking' && (
        <div className="vx-speaking-bar" aria-live="polite" aria-label="VORTEX AI is speaking">
          <div className="vx-speaking-wave" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="vx-wave-bar" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <span>VORTEX AI is speaking</span>
          <button
            className="vx-stop-speaking-btn"
            onClick={() => { window.speechSynthesis?.cancel(); setVoiceState('idle'); }}
            aria-label="Stop speaking"
            type="button"
          >Stop</button>
        </div>
      )}

      {/* Input bar */}
      <ChatInput
        onSend={handleSend}
        onVoiceStart={handleVoiceStart}
        isLoading={isLoading}
        isListening={isListening}
        isSpeaking={isSpeaking}
        voiceState={voiceState}
        disabled={false}
      />
    </div>
  );
};

export default ChatWindow;
