import { ChatPanelHeader } from "./ChatPanelHeader";
import { WhatsAppButton } from "./WhatsAppButton";

type ChatPanelProps = {
  id: string;
  onClose: () => void;
};

export function ChatPanel({ id, onClose }: ChatPanelProps) {
  return (
    <div className="b2c-chat-widget__overlay" onClick={onClose}>
      <div
        aria-labelledby="b2c-chat-widget-title"
        aria-modal="true"
        className="b2c-chat-widget__panel"
        id={id}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <ChatPanelHeader onClose={onClose} />
        <div className="b2c-chat-widget__body">
          <p className="b2c-chat-widget__description">Chat with us for tour advice</p>
        </div>
        <div className="b2c-chat-widget__footer">
          <WhatsAppButton />
        </div>
      </div>
    </div>
  );
}
