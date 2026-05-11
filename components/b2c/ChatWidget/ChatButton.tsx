type ChatButtonProps = {
  controlsId: string;
  isOpen: boolean;
  onClick: () => void;
};

export function ChatButton({ controlsId, isOpen, onClick }: ChatButtonProps) {
  return (
    <button
      aria-controls={controlsId}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      aria-label={isOpen ? "Close chat" : "Open chat"}
      className="b2c-chat-widget__button"
      onClick={onClick}
      type="button"
    >
      <ChatIcon />
    </button>
  );
}

function ChatIcon() {
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
        d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
