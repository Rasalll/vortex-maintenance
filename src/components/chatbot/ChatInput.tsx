import React, { useState, useRef, useEffect } from 'react';
import type { VoiceState } from '@/services/geminiLive';

interface Props {
  onSend: (message: string) => void;
  onVoiceStart: () => void;
  isLoading: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  voiceState: VoiceState;
  disabled: boolean;
}

const ChatInput: React.FC<Props> = ({
  onSend,
  onVoiceStart,
  isLoading,
  isListening,
  isSpeaking,
  voiceState,
  disabled,
}) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading || disabled) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Mic button label / state
  const micBusy = voiceState === 'processing';
  const micLabel = isListening
    ? 'Stop listening'
    : isSpeaking
    ? 'Stop speaking'
    : voiceState === 'connecting'
    ? 'Cancel voice connection'
    : micBusy
    ? 'Please wait…'
    : 'Start voice input';

  // Mic icon
  const MicIcon = () => {
    if (isSpeaking) {
      // Waveform / stop icon when speaking
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <rect x="4" y="4" width="4" height="16" rx="1" />
          <rect x="10" y="4" width="4" height="16" rx="1" />
          <rect x="16" y="4" width="4" height="16" rx="1" />
        </svg>
      );
    }
    if (isListening) {
      // Stop square when listening
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="6" width="12" height="12" rx="2" />
        </svg>
      );
    }
    // Default mic icon
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    );
  };

  return (
    <div className="vx-chat-input-bar">
      <button
        className={[
          'vx-mic-btn',
          isListening ? 'vx-mic-btn--listening' : '',
          isSpeaking ? 'vx-mic-btn--speaking' : '',
        ].join(' ')}
        onClick={onVoiceStart}
        aria-label={micLabel}
        aria-pressed={voiceState === 'connecting' || isListening || isSpeaking}
        type="button"
        disabled={disabled || micBusy}
        title={micLabel}
      >
        <MicIcon />
      </button>

      <textarea
        ref={textareaRef}
        className="vx-chat-textarea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isListening ? 'Listening…' : isSpeaking ? 'VOXI Chat is speaking…' : 'Type your message…'}
        rows={1}
        disabled={isLoading || disabled || voiceState === 'connecting' || isListening || isSpeaking || voiceState === 'processing'}
        aria-label="Type your message"
        aria-multiline="true"
      />

      <button
        className={`vx-send-btn ${value.trim() && !isLoading ? 'vx-send-btn--active' : ''}`}
        onClick={handleSend}
        disabled={!value.trim() || isLoading || disabled || voiceState === 'connecting' || isListening || isSpeaking || voiceState === 'processing'}
        aria-label="Send message"
        type="button"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  );
};

export default ChatInput;
