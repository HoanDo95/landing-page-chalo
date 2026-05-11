# B2C Chat Widget Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a floating WhatsApp chat widget for B2C landing page with expandable panel

**Architecture:** Self-contained React component with local state, using CSS custom properties from existing design system. Component is B2C-specific and mounted within landing-page.tsx.

**Tech Stack:** React, Next.js 15, TypeScript, CSS custom properties (globals.css)

---

## File Structure

```
components/b2c/ChatWidget/
├── ChatWidget.tsx          (main container with state management)
├── ChatButton.tsx          (floating icon button)
├── ChatPanel.tsx           (expandable panel container)
├── ChatPanelHeader.tsx     (header with title + close button)
├── WhatsAppButton.tsx      (reusable WhatsApp link button)
└── index.ts               (barrel export)

components/b2c/landing-page.tsx  (MODIFIED - add ChatWidget import and render)
app/globals.css                  (MODIFIED - add chat widget specific styles)
```

---

## Task 1: Create ChatWidget Directory and Index Export

**Files:**
- Create: `components/b2c/ChatWidget/index.ts`
- Create: `components/b2c/ChatWidget/ChatWidget.tsx`

- [ ] **Step 1: Create the directory structure**

```bash
mkdir -p components/b2c/ChatWidget
```

- [ ] **Step 2: Create index.ts barrel export**

```typescript
// components/b2c/ChatWidget/index.ts
export { ChatWidget } from "./ChatWidget";
export { ChatButton } from "./ChatButton";
export { ChatPanel } from "./ChatPanel";
export { ChatPanelHeader } from "./ChatPanelHeader";
export { WhatsAppButton } from "./WhatsAppButton";
```

- [ ] **Step 3: Create ChatWidget.tsx with basic structure**

```typescript
// components/b2c/ChatWidget/ChatWidget.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { ChatButton } from "./ChatButton";
import { ChatPanel } from "./ChatPanel";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePanel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closePanel]);

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={toggleOpen} />
      {isOpen && <ChatPanel onClose={closePanel} />}
    </>
  );
}
```

- [ ] **Step 4: Run TypeScript check to verify no errors**

```bash
./node_modules/.bin/tsc --noEmit
```

Expected: No errors related to ChatWidget files

- [ ] **Step 5: Commit**

```bash
git add components/b2c/ChatWidget/
git commit -m "feat(b2c): add chat widget base structure"
```

---

## Task 2: Implement ChatButton Component

**Files:**
- Create: `components/b2c/ChatWidget/ChatButton.tsx`
- Modify: `app/globals.css` (optional icon styles)

- [ ] **Step 1: Create ChatButton.tsx**

```typescript
// components/b2c/ChatWidget/ChatButton.tsx
import { ReactNode } from "react";

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatButton({ isOpen, onClick }: ChatButtonProps) {
  return (
    <button
      className="chat-widget-button"
      onClick={onClick}
      aria-label={isOpen ? "Close chat" : "Open chat"}
      aria-expanded={isOpen}
    >
      <ChatIcon />
    </button>
  );
}

function ChatIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

- [ ] **Step 2: Add CSS styles for ChatButton in app/globals.css**

Add at end of globals.css (after existing styles):

```css
/* Chat Widget Styles */
.chat-widget-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 1000px;
  background-color: var(--color-desert-sienna);
  color: var(--color-canvas-white);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow);
  transition: transform 180ms ease;
  z-index: 9998;
}

.chat-widget-button:hover {
  transform: scale(1.05);
}

.chat-widget-button:active {
  transform: scale(1);
}

.chat-widget-button:focus-visible {
  outline: 2px solid var(--color-obsidian);
  outline-offset: 3px;
}
```

- [ ] **Step 3: Run TypeScript check**

```bash
./node_modules/.bin/tsc --noEmit
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add app/globals.css components/b2c/ChatWidget/ChatButton.tsx
git commit -m "feat(b2c): add chat button component with styles"
```

---

## Task 3: Implement WhatsAppButton Component

**Files:**
- Create: `components/b2c/ChatWidget/WhatsAppButton.tsx`

- [ ] **Step 1: Create WhatsAppButton.tsx**

```typescript
// components/b2c/ChatWidget/WhatsAppButton.tsx
interface WhatsAppButtonProps {
  className?: string;
}

const WHATSAPP_PHONE = "84363554555";
const WHATSAPP_MESSAGE = "Hi, I'm interested in tour information";

export function WhatsAppButton({ className = "" }: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-button ${className}`.trim()}
    >
      Start
    </a>
  );
}
```

- [ ] **Step 2: Add WhatsApp button CSS to globals.css**

Add after ChatWidget button styles:

```css
/* WhatsApp Button (used inside chat panel) */
.whatsapp-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  width: 100%;
  padding: 15px 22px;
  border-radius: 1000px;
  background-color: var(--color-desert-sienna);
  color: var(--color-canvas-white);
  font-family: var(--font-helveticanowdisplay), ui-sans-serif, system-ui;
  font-size: 17px;
  font-weight: 700;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background-color 180ms ease;
}

.whatsapp-button:hover {
  background-color: #a85a42; /* slightly darker desert sienna */
}

.whatsapp-button:focus-visible {
  outline: 2px solid var(--color-obsidian);
  outline-offset: 3px;
}
```

- [ ] **Step 3: Run TypeScript check**

```bash
./node_modules/bin/tsc --noEmit
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add app/globals.css components/b2c/ChatWidget/WhatsAppButton.tsx
git commit -m "feat(b2c): add WhatsApp button component"
```

---

## Task 4: Implement ChatPanelHeader Component

**Files:**
- Create: `components/b2c/ChatWidget/ChatPanelHeader.tsx`

- [ ] **Step 1: Create ChatPanelHeader.tsx**

```typescript
// components/b2c/ChatWidget/ChatPanelHeader.tsx
interface ChatPanelHeaderProps {
  onClose: () => void;
}

export function ChatPanelHeader({ onClose }: ChatPanelHeaderProps) {
  return (
    <div className="chat-panel-header">
      <h3 className="chat-panel-title">Tour Advice</h3>
      <button
        className="chat-panel-close"
        onClick={onClose}
        aria-label="Close chat"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

- [ ] **Step 2: Add ChatPanel header styles to globals.css**

Add after WhatsApp button styles:

```css
/* Chat Panel Header */
.chat-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.chat-panel-title {
  font-family: var(--font-helveticanowdisplay), ui-sans-serif, system-ui;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.3px;
  color: var(--color-obsidian);
  margin: 0;
}

.chat-panel-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-slate-mist);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 180ms ease;
}

.chat-panel-close:hover {
  color: var(--color-obsidian);
}

.chat-panel-close:focus-visible {
  outline: 2px solid var(--color-obsidian);
  outline-offset: 2px;
  border-radius: 4px;
}
```

- [ ] **Step 3: Run TypeScript check**

```bash
./node_modules/.bin/tsc --noEmit
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add app/globals.css components/b2c/ChatWidget/ChatPanelHeader.tsx
git commit -m "feat(b2c): add chat panel header component"
```

---

## Task 5: Implement ChatPanel Component

**Files:**
- Create: `components/b2c/ChatWidget/ChatPanel.tsx`

- [ ] **Step 1: Create ChatPanel.tsx**

```typescript
// components/b2c/ChatWidget/ChatPanel.tsx
import { useEffect, useCallback } from "react";
import { ChatPanelHeader } from "./ChatPanelHeader";
import { WhatsAppButton } from "./WhatsAppButton";

interface ChatPanelProps {
  onClose: () => void;
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("chat-panel-overlay")) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="chat-panel-overlay">
      <div className="chat-panel" role="dialog" aria-modal="true" aria-label="Chat widget">
        <ChatPanelHeader onClose={onClose} />
        <div className="chat-panel-body">
          <p className="chat-panel-description">
            Chat with us for tour advice
          </p>
        </div>
        <div className="chat-panel-footer">
          <WhatsAppButton />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add ChatPanel CSS styles to globals.css**

Add after ChatPanel header styles:

```css
/* Chat Panel Overlay (backdrop) */
.chat-panel-overlay {
  position: fixed;
  inset: 0;
  z-index: 9997;
}

/* Chat Panel Container */
.chat-panel {
  position: fixed;
  bottom: 100px;
  right: 24px;
  width: 360px;
  max-width: calc(100vw - 32px);
  background-color: var(--color-canvas-white);
  border: 1px solid var(--panel-border);
  border-radius: var(--radius-3xl);
  padding: 24px;
  box-shadow: var(--shadow);
  z-index: 9998;
  animation: chat-panel-slide-up 300ms ease;
}

@keyframes chat-panel-slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chat-panel-body {
  margin-bottom: 24px;
}

.chat-panel-description {
  font-family: var(--font-helveticanowdisplay), ui-sans-serif, system-ui;
  font-size: 17px;
  line-height: 1.61;
  color: var(--color-obsidian);
  margin: 0;
}

.chat-panel-footer {
  display: flex;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .chat-panel {
    bottom: 88px;
    left: 16px;
    right: 16px;
    width: auto;
    max-width: none;
  }

  .chat-panel-title {
    font-size: 24px;
  }
}
```

- [ ] **Step 3: Run TypeScript check**

```bash
./node_modules/.bin/tsc --noEmit
```

Expected: No errors

- [ ] **Step 4: Build B2C to verify no build errors**

```bash
npm run build:b2c
```

Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add app/globals.css components/b2c/ChatWidget/ChatPanel.tsx
git commit -m "feat(b2c): add chat panel component with animation"
```

---

## Task 6: Integrate ChatWidget into Landing Page

**Files:**
- Modify: `components/b2c/landing-page.tsx`

- [ ] **Step 1: Import ChatWidget in landing-page.tsx**

Add after existing imports (around line 16):

```typescript
import { ChatWidget } from "@/components/b2c/ChatWidget";
```

- [ ] **Step 2: Render ChatWidget in landing page**

Add as the last child inside `<PageShell>` but before closing tag, after the footer:

```typescript
// Add before the closing </PageShell> tag (currently line 400)
// Place after </footer> but before closing PageShell
<ChatWidget />
```

Full placement:

```typescript
      </footer>

      <ChatWidget />
    </PageShell>
  );
```

- [ ] **Step 3: Run TypeScript check**

```bash
./node_modules/.bin/tsc --noEmit
```

Expected: No errors

- [ ] **Step 4: Build B2C variant**

```bash
npm run build:b2c
```

Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add components/b2c/landing-page.tsx
git commit -m "feat(b2c): integrate chat widget into landing page"
```

---

## Task 7: Final Verification and Testing

- [ ] **Step 1: Run full TypeScript check**

```bash
./node_modules/.bin/tsc --noEmit
```

Expected: No errors

- [ ] **Step 2: Build both B2B and B2C variants**

```bash
npm run build
```

Expected: Both builds succeed

- [ ] **Step 3: Build B2C specifically**

```bash
npm run build:b2c
```

Expected: Build succeeds

- [ ] **Step 4: Start dev server and manually test**

```bash
npm run dev
```

Visit `http://localhost:3000/b2c` and verify:
- [ ] Chat button appears in bottom-right corner
- [ ] Button has Desert Sienna background with white chat icon
- [ ] Button has subtle shadow
- [ ] Click button → panel opens with slide-up animation
- [ ] Panel shows heading "Tour Advice"
- [ ] Panel shows description "Chat with us for tour advice"
- [ ] Panel shows "Start" WhatsApp button
- [ ] Click "Start" → opens WhatsApp with pre-filled message
- [ ] Click X button → panel closes
- [ ] Click outside panel → panel closes
- [ ] Press Escape → panel closes
- [ ] Button aria-label toggles correctly
- [ ] Panel has role="dialog" and aria-modal="true"
- [ ] On mobile (< 768px): button and panel position correctly
- [ ] No console errors or warnings

- [ ] **Step 5: Test WhatsApp link**

On desktop: Should open WhatsApp Web or prompt to open WhatsApp app. On mobile: Should open WhatsApp app directly.

- [ ] **Step 6: Run lint if configured**

```bash
npm run lint 2>/dev/null || echo "No lint script configured"
```

- [ ] **Step 7: Update governance docs**

```bash
npm run sync:governance
```

- [ ] **Step 8: Final commit (if any governance changes)**

```bash
git add docs/architecture/current-structure.md 2>/dev/null || true
git commit -m "chore: update governance docs after chat widget" 2>/dev/null || true
```

---

## Acceptance Criteria Checklist

- [ ] Chat button fixed at bottom-right (24px from edges)
- [ ] Button: 60x60px, Desert Sienna, pill shape, chat icon
- [ ] Panel opens on button click with smooth slide-up animation
- [ ] Panel heading: "Tour Advice" (Obsidian, 30px bold)
- [ ] Panel description: "Chat with us for tour advice"
- [ ] WhatsApp button: "Start", full-width, Desert Sienna filled
- [ ] WhatsApp link: `https://wa.me/84363554555?text=Hi...`
- [ ] Close via X button, overlay click, Escape key
- [ ] Mobile responsive (button 16px from edges, panel full-width)
- [ ] Accessible: aria-labels, role="dialog", aria-modal
- [ ] B2C build passes
- [ ] No TypeScript errors
- [ ] No console errors in browser

---

## Rollback Plan

If issues arise during integration:
1. Remove `<ChatWidget />` from `landing-page.tsx`
2. Revert ChatWidget directory changes
3. B2C landing page will function without chat widget

---

## Notes

- Component is purely B2C; B2B variant unaffected
- No analytics tracking required (analytics helper is no-op)
- No test framework configured; manual testing is sufficient
- Future enhancements: typing indicator, online status, business hours, message history
