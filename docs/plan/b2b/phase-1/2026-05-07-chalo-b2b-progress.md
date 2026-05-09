# Chalo B2B Landing Page Execution Progress

> **For execution agents:** Update this file after each phase. Do not mark a phase complete until its verification commands and manual checks are recorded.

## Project Context

- Service name: Chalo.
- Target audience: international travel agents, travel partners, tour operators, DMC partners, and wholesalers sending travelers to Vietnam.
- Primary CTA goal: get partners to talk to a specialist.
- Brand tone: professional, friendly, clear, accessible, value-focused, not overly luxury or corporate.
- Current stack: Next.js 15, React 19, TypeScript, global CSS.
- Design source: `docs/design/b2b/DESIGN.md`.
- Product spec: `docs/superpowers/specs/2026-05-07-chalo-b2b-landing-page-design.md`.

## Phase Files

| Phase | File | Status | Owner | Verification |
|---|---|---|---|---|
| 1 Project Setup | `docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-phase-1-project-setup.md` | Done | Worker 1 | `npm run build:b2b` passed; `npm run build:b2c` passed; `npm run sync:governance` passed |
| 2 Core Sections | `docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-phase-2-core-sections.md` | Done | Worker 2 | `npm run build:b2b` passed; `npm run build:b2c` passed |
| 3 Performance Polish | `docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-phase-3-performance-polish.md` | Done | Controller | `./node_modules/.bin/tsc --noEmit` passed; `npm run build` passed; `npm run build:b2b` passed; `npm run build:b2c` passed |
| 4 Conversion Optimization | `docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-phase-4-conversion-optimization.md` | Implemented | Controller | `./node_modules/.bin/tsc --noEmit` passed; `npm run build` passed; `npm run build:b2b` passed; `npm run build:b2c` passed; `npm run sync:governance` passed; browser-interaction QA pending |

## Current Status

- Last controller verification: 2026-05-07
- Confirmed complete: Phase 1, Phase 2, Phase 3
- Phase 4: implementation complete; browser-interaction QA pending
- Verified in current session:
  - `./node_modules/.bin/tsc --noEmit` passed
  - `npm run build` passed
  - `npm run build:b2b` passed
  - `npm run build:b2c` passed
- `npm run sync:governance` passed
- Recommended next step: manual browser QA of the B2B lead form and mobile sticky CTA before deployment.
- Session handoff: `docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-next-session-report.md`

## Cross-Phase Rules

- Do not implement a phase before prior phases are complete unless the owner explicitly approves parallel execution.
- Keep B2B and B2C sources separate.
- Keep shared primitives neutral.
- Keep visible B2B copy in `lib/b2b/content.ts`.
- Do not add Tailwind, Framer Motion, analytics SDKs, or form backends without explicit approval.
- Run builds sequentially; concurrent Next builds can conflict on `.next`.
- If structure or governance changes, run `npm run sync:governance`.

## Completion Log

### Phase 1

- Owner: Worker 1
- Started: 2026-05-07
- Completed: 2026-05-07
- Commands run:
  - `sed -n '1,120p' package.json` - confirmed existing Next.js 15, React 19, TypeScript app and variant build scripts.
  - `sed -n '1,220p' docs/design/b2b/DESIGN.md` - confirmed active Hyer-inspired high-contrast B2B design source with white, obsidian, slate mist, and desert sienna tokens.
  - `git status --short` - failed with `fatal: not a git repository`; no commit operations available.
  - `npm run build:b2b` - passed; Next prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
  - `npm run sync:governance` - passed; regenerated `docs/architecture/current-structure.md`.
  - `npm run build:b2b` - passed after spec review fixes; Next prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
  - `npm run build:b2c` - passed after spec review fixes; Next prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
  - `npm run build:b2b` - passed after code quality review fixes; Next prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
  - `npm run build:b2c` - passed after code quality review fixes; Next prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
  - `npm run sync:governance` - passed after adding `lib/metadata.ts`; regenerated `docs/architecture/current-structure.md`.
  - `npm run build:b2b` - passed after intermediate Phase 1 quality fixes; later replaced by the final route-group language structure.
  - `npm run build:b2c` - passed after intermediate Phase 1 quality fixes; later replaced by the final route-group language structure.
  - `npm run build:b2b` - passed after route-group language fix; Next statically prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
  - `npm run build:b2c` - passed after route-group language fix; Next statically prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
  - `npm run sync:governance` - passed after route-group structure change; regenerated `docs/architecture/current-structure.md`.
- Manual checks:
  - Final document language strategy uses stable route-group root layouts with no request-header heuristic. `app/(default)/layout.tsx` derives `/` language from `LANDING_VARIANT`, `app/(b2b-preview)/layout.tsx` sets `/b2b` to `lang="en"`, and `app/(b2c-preview)/layout.tsx` sets `/b2c` to `lang="vi"`.
  - Root layout no longer owns brand or variant metadata. `/`, `/b2b`, and `/b2c` now each return complete variant metadata.
  - OG/Twitter images are emitted only when `NEXT_PUBLIC_SITE_URL` or `SITE_URL` is a valid absolute HTTP(S) URL, avoiding localhost or relative social image URLs when no real host is configured.
  - OG/Twitter image paths are variant-specific: B2B uses `public/og-image.svg`; B2C uses `public/og-image-b2c.svg`.
  - Remaining hardcoded visible B2B composition copy was moved from `components/b2b/landing-page.tsx` into typed content fields in `lib/b2b/content.ts`.
  - Active global base theme now follows the B2B design token direction: canvas white page base, obsidian text and dark surfaces, slate mist support text, and desert sienna CTA accent.
  - `public/sitemap.xml` was not created because no real production host is known; `robots.txt` allows crawling but does not advertise a missing sitemap.
  - No Tailwind or new dependency introduced.
- Files changed:
  - `app/(default)/layout.tsx`
  - `app/(default)/page.tsx`
  - `app/(b2b-preview)/layout.tsx`
  - `app/(b2b-preview)/b2b/page.tsx`
  - `app/(b2c-preview)/layout.tsx`
  - `app/(b2c-preview)/b2c/page.tsx`
  - `app/globals.css`
  - `components/b2b/landing-page.tsx`
  - `lib/landing-content.ts`
  - `lib/b2b/content.ts`
  - `lib/b2c/content.ts`
  - `lib/analytics.ts`
  - `lib/metadata.ts`
  - `public/robots.txt`
  - `public/og-image.svg`
  - `public/og-image-b2c.svg`
  - `AGENTS.md`
  - `docs/architecture/landing-page-variant-sources.md`
  - `docs/architecture/current-structure.md`
  - `docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-phase-1-project-setup.md`
  - `docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-progress.md`
- Blockers:
  - None for Phase 1.

### Phase 2

- Owner: Worker 2
- Started: 2026-05-07
- Completed: 2026-05-07
- Commands run:
  - `sed -n '1,220p' docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-phase-2-core-sections.md` - confirmed required Phase 2 sections, owned files, and verification scope.
  - `sed -n '1,260p' docs/superpowers/specs/2026-05-07-chalo-b2b-landing-page-design.md` - confirmed approved B2B positioning, FAQ set, CTA copy, and section architecture.
  - `sed -n '1,260p' docs/design/b2b/DESIGN.md` - confirmed high-contrast visual system and restrained accent direction.
  - `sed -n '1,240p' docs/architecture/landing-page-variant-sources.md` - confirmed variant boundary rules and route-group expectations from Phase 1.
  - `sed -n '1,220p' docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-progress.md` - confirmed existing phase ownership and update format.
  - `sed -n '1,260p' components/b2b/landing-page.tsx` - reviewed current B2B composition before replacement.
  - `sed -n '1,260p' components/shared/landing-primitives.tsx` - reviewed shared primitives to keep additions variant-neutral.
  - `sed -n '1,320p' lib/landing-content.ts` - reviewed current shared content type before expansion.
  - `sed -n '1,360p' lib/b2b/content.ts` - reviewed current B2B content before moving all visible Phase 2 copy into content.
  - `sed -n '1,320p' lib/b2c/content.ts` - checked B2C compatibility before shared type changes.
  - `sed -n '1,320p' app/globals.css` - reviewed existing visual system before extending it for B2B Phase 2.
  - `npm run build:b2b` - passed after Phase 2 implementation; Next statically prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
  - `npm run build:b2c` - passed after Phase 2 implementation; Next statically prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
  - `npm run build:b2b` - passed again after final CTA anchor adjustment; Next statically prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
  - `npm run build:b2b` - passed after Phase 2 quality review fixes for contrast, anchor offsets, final CTA target, and stronger B2B typing; Next statically prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
  - `npm run build:b2c` - passed after Phase 2 quality review fixes for contrast, anchor offsets, final CTA target, and stronger B2B typing; Next statically prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
- Manual checks:
  - B2B composition now renders the approved section order: sticky navbar, hero, partner fit, traveler types, why Chalo, how it works, sample tour styles, service commitments, FAQ with final CTA, and footer.
  - Visible B2B copy now lives in `lib/b2b/content.ts`; shared primitives remain generic and do not contain Chalo-specific copy or section order.
  - Hero imagery uses a polished placeholder treatment instead of fake stock because no final Vietnam imagery asset was provided in the allowed scope.
  - Mobile navigation uses a keyboard-accessible `details` / `summary` pattern and all primary CTAs resolve to live section anchors.
  - B2C build remained valid after shared type and CSS changes; no B2B copy was introduced into B2C content.
  - Shared muted text and the primary CTA treatment were darkened within the same visual direction to improve contrast on light backgrounds.
  - The skip link now lands after the sticky navigation, and section or support anchors use offset-aware scroll positioning so headings are not hidden under the header.
  - B2B-only required sections are now enforced by TypeScript via `B2BLandingContent` instead of a runtime throw in the page component.
  - No structure change was made, so `npm run sync:governance` was not required.
- Files changed:
  - `components/b2b/landing-page.tsx`
  - `components/shared/landing-primitives.tsx`
  - `lib/landing-content.ts`
  - `lib/b2b/content.ts`
  - `app/globals.css`
  - `docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-progress.md`
- Blockers:
  - None for Phase 2.

### Phase 3

- Owner: Controller
- Started: 2026-05-07
- Completed: 2026-05-07
- Commands run:
  - `sed -n '1,220p' docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-phase-3-performance-polish.md` - confirmed required Phase 3 polish scope and verification checklist.
  - `sed -n '1,220p' docs/design/b2b/DESIGN.md` - confirmed contrast, motion restraint, spacing, and typography direction.
  - `sed -n '1,360p' components/shared/landing-primitives.tsx` - reviewed current shared primitives before tightening mobile nav behavior.
  - `sed -n '1,1080p' app/globals.css` - reviewed current anchor, nav, hero, and responsive rules before the polish pass.
  - `./node_modules/.bin/tsc --noEmit` - passed after Phase 3 edits.
  - `npm run build` - passed after Phase 3 edits; Next statically prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
  - `npm run build:b2b` - passed after Phase 3 edits; Next statically prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
  - `npm run build:b2c` - passed after Phase 3 edits; Next statically prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
  - `LANDING_VARIANT=b2b PORT=3010 npm run start` - served the built B2B variant locally for smoke verification.
  - `curl -I http://127.0.0.1:3010/b2b` - returned `HTTP/1.1 200 OK`.
  - `curl -s http://127.0.0.1:3010/b2b` - confirmed rendered markup includes skip link target, sticky nav CTA, and mobile nav button with `aria-controls` and `aria-expanded`.
- Manual checks:
  - Mobile navigation now uses a real button state instead of a bare disclosure summary, with `aria-controls`, dynamic `aria-expanded`, Escape close support, outside-click close support, and strong focus-visible treatment.
  - Sticky-header anchor handling is reinforced by `scroll-padding-top` plus existing `scroll-margin-top`, so skip link and section anchors land below the nav.
  - The hero CTA remains before the hero visual in source order, preserving above-the-fold access on narrow screens.
  - Responsive rules were tightened at the existing `1080px`, `860px`, and `640px` breakpoints to reduce overflow risk for large headings, cards, CTA rows, and the mobile nav panel.
  - Reduced-motion handling now disables smooth scroll and transition-heavy hover behavior when users prefer less motion.
  - No real hero image asset was introduced; the polished placeholder visual remains, and image optimization in this phase was limited to stable layout and decorative treatment.
  - Browser viewport automation was not available in this workspace, so visual smoke coverage relied on responsive CSS audit plus local rendered markup checks.
- Files changed:
  - `components/shared/landing-primitives.tsx`
  - `app/globals.css`
  - `docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-progress.md`
- Blockers:
  - None for Phase 3.

### Phase 4

- Owner: Controller
- Started: 2026-05-07
- Completed: 2026-05-07
- Commands run:
  - `sed -n '1,220p' docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-phase-4-conversion-optimization.md` - confirmed CTA, form, analytics, and validation scope.
  - `sed -n '1,260p' lib/landing-content.ts` - reviewed current shared content typing before extending B2B CTA and form data.
  - `sed -n '1,320p' components/b2b/landing-page.tsx` - reviewed current final CTA composition before adding lead capture and sticky CTA.
  - `sed -n '1,120p' lib/analytics.ts` - confirmed no-op analytics placeholder before typing Phase 4 events.
  - `./node_modules/.bin/tsc --noEmit` - initially failed on `/` route B2B typing, then passed after wiring `app/(default)/page.tsx` to `b2bContent`.
  - `npm run build` - passed after Phase 4 edits; Next statically prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
  - `npm run build:b2b` - passed after Phase 4 edits; Next statically prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
  - `npm run build:b2c` - passed after Phase 4 edits; Next statically prerendered `/`, `/_not-found`, `/b2b`, and `/b2c`.
  - `LANDING_VARIANT=b2b PORT=3010 npm run start` - served the built B2B variant locally for smoke verification.
  - `curl -s http://127.0.0.1:3010/b2b` - confirmed rendered markup includes the lead form schema, sticky mobile CTA container, and contact anchor path.
  - `npm run sync:governance` - passed after adding Phase 4 component files; regenerated `docs/architecture/current-structure.md`.
- Manual checks:
  - The hero, nav, and mobile sticky specialist CTAs now point to the final contact area and are structured for typed `b2b_cta_click` tracking.
  - Headline variants are stored in `lib/b2b/content.ts`, with the approved default variant rendered first and no runtime randomization added.
  - The final CTA now contains an inline lead form with fields for name, company, work email, source market, and request details.
  - Validation now combines native constraints and local custom checks: required fields use browser constraints, work email adds the requested regex pattern, request details add `minLength`, and custom feedback is surfaced in a live region plus inline field errors.
  - The success path is local-state only; no backend submission or popup flow was introduced.
  - Mobile sticky CTA stays fixed to the bottom at small widths, while the page shell adds bottom padding to prevent overlap with the final contact area.
  - Browser-side interaction testing and console inspection were not available in this workspace, so submit-state behavior was verified by code path plus build and markup smoke checks rather than live browser automation. Manual browser QA is still required before deployment.
- Files changed:
  - `app/(default)/page.tsx`
  - `app/globals.css`
  - `components/b2b/landing-page.tsx`
  - `components/b2b/lead-capture-form.tsx`
  - `components/shared/landing-primitives.tsx`
  - `components/shared/tracked-cta-link.tsx`
  - `docs/architecture/current-structure.md`
  - `docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-progress.md`
  - `lib/analytics.ts`
  - `lib/b2b/content.ts`
  - `lib/landing-content.ts`
- Blockers:
  - Manual browser QA is still required for native-validation interaction and console inspection.
