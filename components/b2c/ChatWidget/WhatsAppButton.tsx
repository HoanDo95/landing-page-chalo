const WHATSAPP_PHONE = "84363554555";
const WHATSAPP_MESSAGE = "Hi, I'm interested in tour information";

type WhatsAppButtonProps = {
  className?: string;
};

export function WhatsAppButton({ className = "" }: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <a
      className={`b2c-chat-widget__whatsapp ${className}`.trim()}
      href={whatsappUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      Start
    </a>
  );
}
