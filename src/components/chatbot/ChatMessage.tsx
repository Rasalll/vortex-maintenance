import React from 'react';
import type { ChatMessage as ChatMessageType } from '@/services/gemini';

interface Props {
  message: ChatMessageType;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const ChatMessage: React.FC<Props> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={`vx-chat-message ${isUser ? 'vx-chat-message--user' : 'vx-chat-message--ai'}`}
      aria-label={`${isUser ? 'You' : 'VORTEX AI'}: ${message.content}`}
    >
      {!isUser && (
        <div className="vx-chat-avatar" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="url(#vx-grad)" />
            <path d="M8 12l2.5 2.5L16 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="vx-grad" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#5B21B6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
      <div className="vx-chat-bubble-wrap">
        <div className="vx-chat-bubble">
          {message.content}
        </div>
        <span className="vx-chat-time">{formatTime(message.timestamp)}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
