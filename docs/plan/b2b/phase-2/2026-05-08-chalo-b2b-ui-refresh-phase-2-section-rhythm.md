# Chalo B2B UI Refresh Phase 2 Task File

> **For execution agents:** Implement only section-rhythm and body-surface refresh from this file. REQUIRED SUB-SKILL: `superpowers:subagent-driven-development` or `superpowers:executing-plans`. Keep this file under 200 lines and update `docs/plan/b2b/phase-2/2026-05-08-chalo-b2b-ui-refresh-progress.md` when complete.

**Goal:** Make the rest of the page feel less flat and less card-heavy while keeping the approved content structure intact.

**Architecture:** Keep B2B section order in `components/b2b/landing-page.tsx`. Shared primitives may be refined only when they stay reusable for both variants. Most of the visual hierarchy work should live in `app/globals.css`.

**Tech Stack:** Next.js 15, React 19, TypeScript, semantic HTML, global CSS only.

---

## Source Inputs

- `docs/design/b2b/DESIGN.md`
- `docs/superpowers/specs/2026-05-08-chalo-b2b-ui-ux-refresh-design.md`
- `components/b2b/landing-page.tsx`
- `components/shared/landing-primitives.tsx`
- `lib/b2b/content.ts`

## Ownership

- Primary files: `components/b2b/landing-page.tsx`, `components/shared/landing-primitives.tsx`, `app/globals.css`, `lib/b2b/content.ts`
- You are not alone in the codebase. Do not revert unrelated edits. Keep B2B-specific layout in B2B files.

## Files To Modify

- `components/b2b/landing-page.tsx`
- `components/shared/landing-primitives.tsx` only for neutral heading, card, FAQ, or layout primitives
- `lib/b2b/content.ts`
- `app/globals.css`

## Task Checklist

- [ ] Preserve the approved section architecture.
  - Keep the core B2B story: partner fit, traveler flexibility, booking operations, sample tour styles, service commitments, FAQ plus lead capture.
  - Do not add net-new marketing sections unless required to support the approved trust and rhythm plan.

- [ ] Rework body-section rhythm.
  - Make section transitions feel intentionally different instead of repeating similar blocks.
  - Use full-width bands, spacing changes, and selective contrast to separate section roles.
  - Keep one strong dark section centered on service commitments or the clearest operational trust moment.

- [ ] Reduce the generic-card feel.
  - Refine traveler-type, tour-style, and support-card treatments so they do not all share the same visual weight.
  - Use card framing only where it helps scanning.
  - Avoid nested-card compositions and avoid turning every section into a panel.

- [ ] Tighten copy where layout now needs shorter lines.
  - Adjust only B2B-owned copy in `lib/b2b/content.ts`.
  - Keep wording clear, professional, and mass-market friendly.
  - Do not drift into luxury-language or consumer-tour wording.

- [ ] Improve the final content close without changing Phase 4 behavior.
  - The FAQ and lead-capture area should feel intentionally grouped.
  - Leave functional form behavior and sticky CTA logic for Phase 4 unless a markup hook is required for layout only.

- [ ] Refine neutral shared primitives only if they benefit both variants.
  - Acceptable examples: section-heading spacing, card shell defaults, FAQ disclosure spacing.
  - Do not encode Chalo-specific copy, section order, or B2B-only layout assumptions in shared primitives.

- [ ] Refresh CSS hierarchy for the middle of the page.
  - Increase spacing where sections need breathing room.
  - Keep trust and conversion areas tighter than feature sections.
  - Use contrast and alignment changes before adding more borders or decoration.

- [ ] Run verification.
  - Run: `./node_modules/.bin/tsc --noEmit`
  - Run: `npm run build:b2b`
  - Run: `npm run build:b2c`
  - Expected: both variants build; B2C does not inherit B2B-specific body layout or copy.

## Done Criteria

- The page no longer feels like a long sequence of equal-weight cards.
- Section rhythm clearly changes between information, trust, and conversion moments.
- Shared primitives remain variant-neutral.
- B2B body-copy edits stay in `lib/b2b/content.ts`.
- Verification commands are recorded in the progress file.
