# B2C Chat Widget - Design Specification

**Date:** 2026-05-11  
**Status:** Approved  
**Variant:** B2C  
**Component:** Chat Widget (floating button + expandable panel)

## Overview

Add a WhatsApp chat widget to the B2C landing page that allows users to quickly initiate a conversation. The widget consists of a floating icon button fixed in the bottom-right corner that expands into a small chat panel with a "Start" button linking to WhatsApp number +84363554555.

## Requirements

### Functional
- [x] Floating icon button visible in bottom-right corner
- [x] Click button toggles chat panel open/closed
- [x] Chat panel displays heading, description text, and WhatsApp "Start" button
- [x] "Start" button links to `https://wa.me/84363554555`
- [x] Close button (X) in panel header
- [x] Click outside panel or press Escape closes panel
- [x] Responsive: adapts to mobile viewports

### Visual Design

**Design System:** Hyer Aviation monochromatic luxury style  
**Colors:**
- Obsidian: `#000d10`
- Canvas White: `#ffffff`
- Desert Sienna: `#bc7155` (accent)
- Slate Mist: `#8e8e95`

**Chat Button (Closed State):**
- Position: fixed, bottom 24px, right 24px
- Size: 60x60px circular
- Background: Desert Sienna (`#bc7155`)
- Icon: White chat bubble SVG outline
- Box shadow: `0 20px 48px rgba(0, 13, 16, 0.08)`
- Border radius: 1000px (pill)
- Hover: scale 1.05 → 1.0 transition
- Cursor: pointer

**Chat Panel (Open State):**
- Position: fixed, bottom 100px, right 24px
- Width: 360px (desktop), 90vw (mobile)
- Background: Canvas White (`#ffffff`)
- Border: 1px solid `rgba(0, 13, 16, 0.12)`
- Border radius: 45px
- Padding: 24px
- Box shadow: `0 20px 48px rgba(0, 13, 16, 0.08)`
- Animation: slide up + fade in, 300ms ease

**Panel Content:**
1. **Header:** "Tour Advice" (Obsidian, 30px, weight 700) + Close X button
2. **Body:** "Chat with us for tour advice" (Obsidian, 17px, weight 400, line-height 1.61)
3. **Footer:** WhatsApp "Start" button (Desert Sienna filled, white text, pill shape, 1000px radius)

**Mobile (< 768px):**
- Button: bottom 16px, right 16px
- Panel: bottom 88px, left 16px, right 16px

## Component Structure

```
components/b2c/ChatWidget/
├── ChatWidget.tsx          (main container component)
├── ChatButton.tsx          (floating button)
├── ChatPanel.tsx           (expandable panel with content)
├── ChatPanelHeader.tsx     (header with title + close)
├── WhatsAppButton.tsx      (reusable WhatsApp link button)
└── index.ts               (exports)
```

**ChatWidget.tsx** - Main component that:
- Manages `isOpen` state
- Renders `<ChatButton />` and `<ChatPanel />`
- Handles click outside, Escape key
- Uses `useEffect` for keyboard listener
- Passes `isOpen` and `onToggle` as props

**Integration Point:**
- Import and render `<ChatWidget />` in `components/b2c/landing-page.tsx`
- Position: as last child inside `<B2CTourSelectionProvider>` but before footer
- Alternative: could be in `PageShell` for global presence

## Technical Decisions

### State Management
- Local React `useState` for `isOpen`
- No context needed (widget is self-contained)
- No external API calls

### WhatsApp URL
```typescript
const whatsappUrl = `https://wa.me/84363554555?text=${encodeURIComponent(
  "Hi, I'm interested in tour information"
)}`;
```
Pre-filled message: "Hi, I'm interested in tour information"

### Accessibility
- `aria-label` on button: "Open chat" / "Close chat"
- `role="dialog"` on panel
- `aria-modal="true"` on panel
- Focus management: optional for MVP (can be enhanced later)
- Escape key closes panel

### Animations
- CSS transitions for slide/fade effects
- Panel: `transform: translateY(20px)` → `translateY(0)`
- Opacity: `0` → `1`
- Duration: 300ms, ease timing

### Styling Approach
- Use existing CSS custom properties from `app/globals.css`
- Tailwind-style utility classes OR plain CSS modules
- Decision: Plain CSS with BEM-like naming in `ChatWidget.module.css` OR inline styles with CSS variables
- Recommended: CSS module for isolation

## Dependencies

None. Pure React component with Next.js.

## Testing Strategy

Since no test framework is configured:
- Manual validation via `npm run build:b2c`
- Visual inspection in browser
- Check responsive breakpoints
- Verify WhatsApp link opens correctly

**Future:** Add unit tests with React Testing Library when test framework is set up.

## Implementation Phases

1. **Phase 1:** Create component files and basic structure
2. **Phase 2:** Implement ChatButton with styling
3. **Phase 3:** Implement ChatPanel with content
4. **Phase 4:** Add animations and interactions
5. **Phase 5:** Integrate into landing page
6. **Phase 6:** Test across viewports and final polish

## Acceptance Criteria

- [ ] Chat button appears in bottom-right corner with correct styling
- [ ] Clicking button opens panel with smooth animation
- [ ] Panel displays heading, description, and WhatsApp button
- [ ] WhatsApp button navigates to correct URL
- [ ] Close button (X) closes panel
- [ ] Clicking outside panel closes it
- [ ] Escape key closes panel
- [ ] Mobile responsive (button/panel positioned correctly)
- [ ] No console errors or warnings
- [ ] B2C build passes (`npm run build:b2c`)

## Notes

- Component is B2C-specific only (do not share with B2B)
- No analytics tracking required (analytics helper is no-op by default)
- Future enhancements: message history, typing indicator, business hours indicator
