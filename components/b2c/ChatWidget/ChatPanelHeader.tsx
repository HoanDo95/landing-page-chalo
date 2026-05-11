type ChatPanelHeaderProps = {
  onClose: () => void;
};

export function ChatPanelHeader({ onClose }: ChatPanelHeaderProps) {
  return (
    <div className="b2c-chat-widget__header">
      <h2 className="b2c-chat-widget__title" id="b2c-chat-widget-title">
        Tour Advice
      </h2>
      <button
        aria-label="Close chat"
        className="b2c-chat-widget__close"
        onClick={onClose}
        type="button"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
