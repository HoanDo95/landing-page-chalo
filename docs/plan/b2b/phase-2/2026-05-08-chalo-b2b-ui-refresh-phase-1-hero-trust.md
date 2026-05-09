# Chalo B2B UI Refresh Phase 1 Task File

> **For execution agents:** Implement only the first-viewport refresh from this file. REQUIRED SUB-SKILL: `superpowers:subagent-driven-development` or `superpowers:executing-plans`. Keep this file under 200 lines and update `docs/plan/b2b/phase-2/2026-05-08-chalo-b2b-ui-refresh-progress.md` when complete.

**Goal:** Rebuild the B2B first screen so the page feels immediately stronger, more destination-led, and more credible.

**Architecture:** Keep hero and trust decisions in B2B-owned files. Extend shared content types only where the new hero overlay and trust band need typed fields. Do not move B2B-specific layout into shared primitives.

**Tech Stack:** Next.js 15, React 19, TypeScript, global CSS in `app/globals.css`, existing CTA tracking and lead-form stack only.

---

## Source Inputs

- `docs/design/b2b/DESIGN.md`
- `docs/superpowers/specs/2026-05-07-chalo-b2b-landing-page-design.md`
- `docs/superpowers/specs/2026-05-08-chalo-b2b-ui-ux-refresh-design.md`
- `docs/architecture/landing-page-variant-sources.md`
- `docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-progress.md`

## Ownership

- Primary files: `components/b2b/landing-page.tsx`, `lib/b2b/content.ts`, `lib/landing-content.ts`, `app/globals.css`
- You are not alone in the codebase. Do not revert unrelated edits. Work with current B2B/B2C boundaries.

## Files To Modify

- `components/b2b/landing-page.tsx`
- `lib/b2b/content.ts`
- `lib/landing-content.ts` only if the hero overlay or trust band needs new typed fields
- `app/globals.css`

## Task Checklist

- [ ] Confirm the active refresh spec and current B2B implementation before editing.
  - Read the two B2B specs and `components/b2b/landing-page.tsx`.
  - Record any mismatch between current hero and approved refresh direction in the progress file.

- [ ] Rebuild the hero around the approved direction.
  - Use a photo-led layout or the strongest existing local placeholder if no approved real asset exists.
  - Keep the hero text stack compact: eyebrow, strong `h1`, short supporting copy, primary CTA, secondary CTA.
  - Preserve source order so CTA copy appears before the visual on narrow screens.

- [ ] Add a compact booking or itinerary-planning overlay inside the hero.
  - Overlay content should come from `lib/b2b/content.ts`.
  - Keep the overlay visually lighter than the main headline.
  - Good fields: source market, traveler type, route direction, service highlights.

- [ ] Add the trust band directly below the hero.
  - Include partner-scope or served-market messaging plus three operational trust signals.
  - If real logos are unavailable, use text-based trust only.
  - Do not invent partner logos or unsupported metrics.

- [ ] Tighten B2B content for the first screen.
  - Move all new visible B2B hero and trust copy into `lib/b2b/content.ts`.
  - Extend `lib/landing-content.ts` only where TypeScript needs explicit fields.
  - Keep shared content typing variant-neutral.

- [ ] Refresh hero and trust styling in `app/globals.css`.
  - Create stronger first-viewport hierarchy with clearer spacing, stronger typography, and cleaner contrast.
  - Do not rely on heavy gradients, complex shadows, or decorative effects.
  - Keep CTA color within the approved warm accent direction.

- [ ] Record any asset blocker explicitly.
  - If a final approved hero image is not available, keep the improved placeholder structure and record the blocker in the progress file instead of sourcing unapproved imagery.

- [ ] Run verification.
  - Run: `./node_modules/.bin/tsc --noEmit`
  - Run: `npm run build:b2b`
  - Expected: TypeScript passes and B2B build succeeds without breaking `/b2c`.

## Done Criteria

- The first viewport feels materially stronger than the current implementation.
- The hero is destination-led and still clearly B2B.
- The trust layer appears immediately below the hero.
- New visible first-screen copy is content-driven and typed.
- Verification commands are recorded in the progress file.
