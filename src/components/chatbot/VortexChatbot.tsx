import React, { useState } from 'react';
import './chatbot.css';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';

/**
 * VortexChatbot — root component.
 * Mount this once at the App level. It renders a floating button and a chat panel.
 */
const VortexChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  return (
    <div className={`vx-chatbot-root${isOpen ? ' vx-chatbot-root--open' : ''}`} id="vortex-chatbot">
      {isOpen && (
        <div className="vx-chat-panel-wrapper">
          <ChatWindow onClose={handleClose} />
        </div>
      )}

      {!isOpen && <ChatButton isOpen={false} onClick={handleToggle} />}
    </div>
  );
};

export default VortexChatbot;
