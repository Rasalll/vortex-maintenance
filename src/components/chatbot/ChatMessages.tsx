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
        <div className="vx-chat-message vx-chat-message--ai" aria-label="VOXI Chat is typing">
          <div className="vx-chat-avatar" aria-hidden="true">
            <img src="/chatbot-icon.png" alt="" />
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
