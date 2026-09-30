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
      aria-label={`${isUser ? 'You' : 'VOXI Chat'}: ${message.content}`}
    >
      {!isUser && (
        <div className="vx-chat-avatar" aria-hidden="true">
          <img src="/chatbot-icon.png" alt="" />
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
