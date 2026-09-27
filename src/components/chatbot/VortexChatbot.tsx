import React, { useState, useEffect } from 'react';
import './chatbot.css';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';

/**
 * VortexChatbot — root component.
 * Mount this once at the App level. It renders a floating button and a chat panel.
 */
const VortexChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  // Show a small pulse after 8 seconds to attract attention if not opened
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setHasUnread(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setHasUnread(false);
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
    <div className="vx-chatbot-root" id="vortex-chatbot">
      {/* Chat panel — rendered in DOM but hidden when closed for accessible focus management */}
      {isOpen && (
        <div className="vx-chat-panel-wrapper">
          <ChatWindow onClose={handleClose} />
        </div>
      )}

      <ChatButton isOpen={isOpen} hasUnread={hasUnread} onClick={handleToggle} />
    </div>
  );
};

export default VortexChatbot;
