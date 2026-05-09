# Chalo B2B UI Refresh Phase 4 Task File

> **For execution agents:** Implement only conversion-close polish, QA closeout, and plan bookkeeping from this file. REQUIRED SUB-SKILL: `superpowers:subagent-driven-development` or `superpowers:executing-plans`. Keep this file under 200 lines and update `docs/plan/b2b/phase-2/2026-05-08-chalo-b2b-ui-refresh-progress.md` when complete.

**Goal:** Finish the refresh with a more integrated conversion area, complete browser QA, and a clean repo record of what passed.

**Architecture:** Do not replace existing conversion behavior unless required by the approved refresh. Polish the existing sticky CTA, tracked CTA links, inline lead form, and final close so they visually belong to the new page.

**Tech Stack:** Next.js 15, React 19, TypeScript, native form validation plus existing local client-side validation, no new analytics provider.

---

## Source Inputs

- `docs/superpowers/specs/2026-05-08-chalo-b2b-ui-ux-refresh-design.md`
- `docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-phase-4-conversion-optimization.md`
- existing B2B lead-form and CTA implementation

## Ownership

- Primary files: `components/b2b/landing-page.tsx`, `components/b2b/lead-capture-form.tsx`, `lib/b2b/content.ts`, `app/globals.css`, progress docs
- You are not alone in the codebase. Do not revert unrelated edits. Keep behavioral scope narrow.

## Files To Modify

- `components/b2b/landing-page.tsx`
- `components/b2b/lead-capture-form.tsx`
- `lib/b2b/content.ts`
- `lib/landing-content.ts` only if content typing needs refinement
- `app/globals.css`
- `docs/plan/b2b/phase-2/2026-05-08-chalo-b2b-ui-refresh-progress.md`
- `docs/architecture/current-structure.md` via `npm run sync:governance` only if structure changes

## Task Checklist

- [ ] Visually integrate the closing conversion area.
  - The FAQ plus lead-capture block should feel like part of the refresh, not a leftover panel.
  - Improve spacing, hierarchy, and CTA emphasis without changing approved fields or B2B messaging.

- [ ] Recheck sticky CTA and CTA tracking surfaces.
  - Keep the mobile sticky CTA easy to reach and visually aligned with the new hero and trust direction.
  - Preserve tracked CTA behavior already present in the repo.
  - Do not introduce runtime A/B logic.

- [ ] Keep form behavior stable while polishing the UI.
  - Retain current fields and validation rules unless the owner explicitly changes them.
  - Preserve visible error messages, live-region announcements, and local-only success state.
  - Do not add backend submission or third-party analytics.

- [ ] Run browser interaction QA for the conversion path.
  - Empty submit.
  - Invalid email.
  - Too-short request details.
  - Valid submit path.
  - CTA clicks, mobile nav, and form submit with console inspection.

- [ ] Run final verification.
  - Run: `./node_modules/.bin/tsc --noEmit`
  - Run: `npm run build`
  - Run: `npm run build:b2b`
  - Run: `npm run build:b2c`
  - If structure changed, run: `npm run sync:governance`
  - Expected: builds pass and governance snapshot is current.

- [ ] Update the phase-2 progress tracker before marking completion.
  - Record commands run.
  - Record browser QA status.
  - Record any blockers such as missing approved imagery or manual QA gaps.
  - Do not mark this phase done if browser QA is incomplete.

## Done Criteria

- The closing conversion area feels visually integrated with the refresh.
- Sticky CTA and form behavior remain accessible and stable.
- Browser interaction QA is explicitly recorded.
- Final verification status is captured in the progress file.
