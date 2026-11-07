import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { ChatMessage } from '@/services/gemini';
import { sendMessage } from '@/services/gemini';
import { VoiceSession } from '@/services/geminiLive';
import type { VoiceState } from '@/services/geminiLive';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

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

// ─── Component ────────────────────────────────────────────────────────────────
const ChatWindow: React.FC<Props> = ({ onClose }) => {
  const [messages, setMessages]   = useState<ChatMessage[]>(() => loadHistory());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const voiceSessionRef = useRef<VoiceSession | null>(null);

  const quickActionsVisible = messages.length === 0;
  const isListening = voiceState === 'listening';
  const isSpeaking  = voiceState === 'speaking';

  // Persist history
  useEffect(() => { saveHistory(messages); }, [messages]);

  // Close an active Live API connection if the chat is dismissed.
  useEffect(() => () => { voiceSessionRef.current?.cleanup(); }, []);

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

  // ── Voice mode: bidirectional Gemini Live audio session ─────────────────────
  const handleVoiceStart = useCallback(() => {
    setVoiceError(null);
    if (voiceSessionRef.current) {
      voiceSessionRef.current.cleanup();
      voiceSessionRef.current = null;
      setVoiceState('idle');
      return;
    }

    const session = new VoiceSession({
      onStateChange: (state) => {
        setVoiceState(state);
        if (state === 'idle' || state === 'error') voiceSessionRef.current = null;
      },
      onTranscript: (role, text) => addMessage(role, text, 'voice'),
      onError: setVoiceError,
    });
    voiceSessionRef.current = session;
    const context = messages.slice(-MAX_HISTORY)
      .map(({ role, content }) => `${role === 'user' ? 'User' : 'VORTEX AI'}: ${content}`)
      .join('\n');
    void session.start(context);
  }, [messages, addMessage]);

  // ── Status label ────────────────────────────────────────────────────────────
  const statusLabel = () => {
    if (voiceState === 'connecting')  return 'Connecting…';
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

  const handleClose = () => {
    voiceSessionRef.current?.cleanup();
    voiceSessionRef.current = null;
    onClose();
  };

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div
      className="vx-chat-window"
      role="dialog"
      aria-modal="true"
      aria-label="VOXI Chat Assistant"
    >
      {/* Header */}
      <div className="vx-chat-header">
        <div className="vx-chat-header-identity">
          <div className="vx-chat-header-avatar" aria-hidden="true">
            <img src="/chatbot-icon.png" alt="" />
          </div>
          <div>
            <p className="vx-chat-header-name">VOXI CHAT</p>
            <p className="vx-chat-header-status">
              <span className="vx-chat-status-dot" aria-hidden="true" />
              {statusLabel()}
            </p>
          </div>
        </div>
        <div className="vx-chat-header-actions">
          <button
            className="vx-chat-header-btn vx-chat-clear-btn"
            onClick={handleClearHistory}
            aria-label="Clear all chat"
            title="Clear all chat"
            type="button"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
            <span>Clear all chat</span>
          </button>
          <button
            className="vx-chat-header-btn"
            onClick={handleClose}
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
          <div className="vx-chat-welcome-visual" aria-hidden="true">
            <span className="vx-chat-welcome-glow" />
            <img src="/chatbot-icon.png" alt="" />
          </div>
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
      {voiceState === 'connecting' && (
        <div className="vx-voice-processing-bar" aria-live="polite" aria-label="Connecting voice">
          <span className="vx-voice-processing-spinner" aria-hidden="true" />
          <span>Connecting to voice…</span>
        </div>
      )}

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
        <div className="vx-speaking-bar" aria-live="polite" aria-label="VOXI Chat is speaking">
          <div className="vx-speaking-wave" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="vx-wave-bar" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <span>VOXI Chat is speaking</span>
          <button
            className="vx-stop-speaking-btn"
            onClick={handleVoiceStart}
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
