"use client";

import { useEffect, useState } from "react";
import { ChatButton } from "./ChatButton";
import { ChatPanel } from "./ChatPanel";

const CHAT_PANEL_ID = "b2c-chat-widget-panel";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <ChatButton
        controlsId={CHAT_PANEL_ID}
        isOpen={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      />
      {isOpen ? <ChatPanel id={CHAT_PANEL_ID} onClose={() => setIsOpen(false)} /> : null}
    </>
  );
}
