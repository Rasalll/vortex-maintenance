import React, { useEffect, useRef } from 'react';
import type { ChatMessage as ChatMessageType } from '@/services/gemini';
import ChatMessage from './ChatMessage';

interface Props {
  messages: ChatMessageType[];
  isLoading: boolean;
}

const ChatMessages: React.FC<Props> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="vx-chat-messages" role="log" aria-live="polite" aria-label="Conversation">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}

      {isLoading && (
        <div className="vx-chat-message vx-chat-message--ai" aria-label="VORTEX AI is typing">
          <div className="vx-chat-avatar" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="url(#vx-grad2)" />
              <path d="M8 12l2.5 2.5L16 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="vx-grad2" x1="0" y1="0" x2="24" y2="24">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#5B21B6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="vx-chat-bubble-wrap">
            <div className="vx-chat-bubble vx-chat-bubble--typing" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
