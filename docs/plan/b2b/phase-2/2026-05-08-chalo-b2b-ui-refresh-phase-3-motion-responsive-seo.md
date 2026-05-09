# Chalo B2B UI Refresh Phase 3 Task File

> **For execution agents:** Implement only responsive, motion, accessibility, and SEO-safe polish from this file. REQUIRED SUB-SKILL: `superpowers:subagent-driven-development` or `superpowers:executing-plans`. Keep this file under 200 lines and update `docs/plan/b2b/phase-2/2026-05-08-chalo-b2b-ui-refresh-progress.md` when complete.

**Goal:** Add polish that makes the refresh feel premium without hurting responsiveness, accessibility, or search-friendly rendering.

**Architecture:** Keep most work in CSS and small neutral primitives. Do not change approved messaging or add dependency-heavy animation tooling. Use progressive enhancement only.

**Tech Stack:** Next.js 15, React 19, TypeScript, global CSS transitions and transforms, existing route structure.

---

## Source Inputs

- `docs/design/b2b/DESIGN.md`
- `docs/superpowers/specs/2026-05-08-chalo-b2b-ui-ux-refresh-design.md`
- `app/globals.css`
- current B2B implementation after Phase 1 and Phase 2

## Ownership

- Primary files: `app/globals.css`, `components/shared/landing-primitives.tsx`, `components/b2b/landing-page.tsx`
- You are not alone in the codebase. Do not revert unrelated edits. Keep changes scoped to polish and access.

## Files To Modify

- `app/globals.css`
- `components/shared/landing-primitives.tsx` only for neutral accessibility or nav behavior improvements
- `components/b2b/landing-page.tsx` only if markup hooks are required for responsive polish
- `public/` only for approved local image assets if they already exist in the workspace

## Task Checklist

- [ ] Make motion adaptive.
  - Desktop may use subtle reveal, depth, and hover polish.
  - Mobile should keep only lighter fades and state transitions.
  - Respect `prefers-reduced-motion` and avoid layout-shifting animation.

- [ ] Validate hero and nav behavior across target widths.
  - Test 375px, 768px, and 1280px.
  - The primary CTA must stay visible above the fold at 375px.
  - The sticky nav must not cover headings or first-screen actions.

- [ ] Tighten responsive text and surface behavior.
  - Prevent overflow in buttons, headings, cards, and the trust band.
  - Keep hero art direction intact across breakpoints.
  - Ensure FAQ, final CTA, and sticky mobile CTA do not collide with each other.

- [ ] Keep SEO-safe rendering intact.
  - Important headline, trust, FAQ, and CTA content must stay directly readable in the DOM.
  - Do not move core meaning into decorative images or script-only motion states.
  - Keep semantic landmarks and focus order clean.

- [ ] Improve accessibility details.
  - Focus-visible states must remain strong on all interactive elements.
  - Mobile nav button behavior and FAQ keyboard behavior must still work after styling changes.
  - Decorative media must be `aria-hidden` where appropriate and meaningful media must have `alt` text.

- [ ] Handle hero imagery pragmatically.
  - If an approved local hero asset exists, integrate it with stable dimensions and no layout shift.
  - If not, keep the improved placeholder visual and record the missing-asset blocker in the progress file.

- [ ] Run verification.
  - Run: `./node_modules/.bin/tsc --noEmit`
  - Run: `npm run build`
  - Run: `npm run build:b2b`
  - Run: `npm run build:b2c`
  - Expected: all builds succeed.

- [ ] Run manual browser QA.
  - Start local server for `/b2b`.
  - Check 375px, 768px, and 1280px.
  - Record visual issues, anchor behavior, and console status in the progress file.

## Done Criteria

- Motion adds polish without harming performance or readability.
- Mobile, tablet, and desktop all preserve hero impact and CTA access.
- No new overlap, overflow, or anchor-offset regressions are introduced.
- SEO-safe semantic rendering remains intact.
- Manual QA notes are recorded in the progress file.
