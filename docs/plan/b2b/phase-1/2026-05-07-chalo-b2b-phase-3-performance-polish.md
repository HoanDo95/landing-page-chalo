# Chalo B2B Landing Page Phase 3 Task File

> **For execution agents:** Implement only performance, accessibility, and visual polish from this file. Use `superpowers:subagent-driven-development` or `superpowers:executing-plans`. Keep this file under 200 lines and update `docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-progress.md` when complete.

**Goal:** Polish the Chalo B2B page so it is responsive, accessible, performant, and aligned with the approved visual system.

**Architecture:** Keep polish in CSS and small neutral primitives where possible. Do not change section strategy or rewrite approved copy in this phase.

**Tech Stack:** Next.js 15, React 19, TypeScript, `next/image`, CSS transitions/animations. Avoid Framer Motion unless the owner approves adding a dependency.

---

## Source Inputs

- Design source: `docs/design/b2b/DESIGN.md`
- Implemented sections from Phase 2.
- Existing global CSS: `app/globals.css`

## Files To Modify

- `app/globals.css` for responsive layout, motion, focus states, and design tokens.
- `components/b2b/landing-page.tsx` only if markup needs accessibility hooks.
- `components/shared/landing-primitives.tsx` only for neutral accessibility improvements.
- `public/` or `publics/` only for optimized image assets.

## Task Checklist

- [ ] Optimize images.
  - Use `next/image` for hero and section imagery when imported from public assets.
  - Provide `alt` text for meaningful images.
  - Use `aria-hidden="true"` for decorative images.
  - Set stable dimensions or `sizes` to prevent layout shift.

- [ ] Add responsive checks.
  - Test viewport widths: 375px, 768px, 1280px.
  - Above-the-fold CTA must be visible without scrolling at 375px.
  - Navbar must not overlap hero content.
  - Text must not overflow buttons, cards, or section containers.

- [ ] Add CSS motion.
  - Use small CSS transitions for buttons, cards, and nav states.
  - Respect `prefers-reduced-motion: reduce`.
  - Do not add scroll-heavy animation that delays content visibility.

- [ ] Add keyboard accessibility.
  - Mobile menu button has `aria-expanded`, `aria-controls`, and visible focus.
  - All links and buttons have focus-visible styles.
  - FAQ can be opened and closed with keyboard.

- [ ] Confirm contrast.
  - Obsidian text on white must be primary.
  - White text on obsidian sections must be readable.
  - Sienna CTA text must meet AA contrast; if white on sienna is weak, darken CTA background within design constraints.

- [ ] Add smooth scroll safely.
  - Use CSS `scroll-behavior: smooth`.
  - Add `scroll-margin-top` for anchored sections so sticky nav does not cover headings.

- [ ] Handle skeleton states only if needed.
  - If the page remains static, do not add fake skeletons.
  - If a lead form is lazy-loaded in Phase 4, add a small accessible loading state there.

- [ ] Run production build checks sequentially.
  - Run: `npm run build`
  - Run: `npm run build:b2b`
  - Run: `npm run build:b2c`
  - Expected: all builds succeed.

- [ ] Run visual smoke testing.
  - Start dev server: `npm run dev`
  - Inspect `/b2b` at 375px, 768px, 1280px.
  - Check for overlap, blank images, unreadable text, and broken anchors.

## Lighthouse Targets

- Performance: target above 90.
- Accessibility: target above 90.
- SEO: target above 90.
- Best Practices: target above 90.

If local Lighthouse is unavailable, record manual checks and build output in the progress tracker.

## Done Criteria

- No layout shift from media.
- Keyboard navigation works for nav, CTAs, mobile menu, and FAQ.
- Motion is restrained and respects reduced-motion.
- Page renders cleanly on mobile, tablet, and desktop.
