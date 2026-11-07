import React from 'react';

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

const ChatButton: React.FC<Props> = ({ isOpen, onClick }) => {
  return (
    <button
      id="vortex-chat-button"
      className={`vx-chat-fab ${isOpen ? 'vx-chat-fab--open' : ''}`}
      onClick={onClick}
      aria-label={isOpen ? 'Close VOXI Chat' : 'Open VOXI Chat'}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      type="button"
    >
      {isOpen ? (
        /* Close state — minimal X on a small dark pill */
        <span className="vx-fab-close-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
      ) : (
        /* Open state — just the image, slowly popping */
        <>
          <img
            src="/chatbot-icon.png"
            alt="VOXI Chat"
            className="vx-fab-img"
            draggable={false}
          />
        </>
      )}
    </button>
  );
};

export default ChatButton;
