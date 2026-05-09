# Chalo B2B Landing Page Phase 1 Task File

> **For execution agents:** Do not implement other phases from this file. Use `superpowers:subagent-driven-development` or `superpowers:executing-plans`. Keep this file under 200 lines and update `docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-progress.md` when complete.

**Goal:** Prepare the existing Next.js app for a production-ready Chalo B2B landing page foundation.

**Architecture:** This repo already contains a Next.js app with separated B2B/B2C variants. Do not scaffold a second app. Harden the existing setup, metadata, assets, tokens, and governance while preserving variant ownership.

**Tech Stack:** Next.js 15, React 19, TypeScript, CSS modules/global CSS via `app/globals.css`, no new UI dependency unless explicitly approved.

---

## Source Inputs

- Read first: `docs/design/b2b/DESIGN.md`
- Read first: `docs/architecture/landing-page-variant-sources.md`
- Read first: `docs/superpowers/specs/2026-05-07-chalo-b2b-landing-page-design.md`
- Existing B2B entry: `app/(b2b-preview)/b2b/page.tsx`
- Existing B2B composition: `components/b2b/landing-page.tsx`
- Existing B2B content: `lib/b2b/content.ts`

## Files To Modify

- `app/(default)/layout.tsx`, `app/(b2b-preview)/layout.tsx`, and `app/(b2c-preview)/layout.tsx` for document language strategy.
- `app/(default)/page.tsx`, `app/(b2b-preview)/b2b/page.tsx`, and `app/(b2c-preview)/b2c/page.tsx` for route metadata.
- `app/globals.css` for tokens, base styles, and smooth scroll.
- `lib/b2b/content.ts` for service name, SEO title, SEO description, and CTA copy.
- `public/robots.txt` for crawl basics. Do not create or advertise `public/sitemap.xml` until a real absolute production host is known.
- `public/og-image.svg` or `public/og-image.png` for social preview.
- `docs/architecture/current-structure.md` via `npm run sync:governance` if structure changes.

## Task Checklist

- [ ] Confirm the repo is not a fresh scaffold target.
  - Run: `sed -n '1,120p' package.json`
  - Expected: Next, React, TypeScript dependencies already exist.

- [ ] Confirm the active B2B design source.
  - Run: `sed -n '1,220p' docs/design/b2b/DESIGN.md`
  - Expected: Hyer-inspired high contrast, white/obsidian/sienna token direction.

- [ ] Set page language strategy.
  - Route-group root layouts own document language.
  - `app/(default)/layout.tsx` derives `/` language from `LANDING_VARIANT`.
  - `app/(b2b-preview)/layout.tsx` uses `lang="en"`.
  - `app/(b2c-preview)/layout.tsx` uses `lang="vi"`.

- [ ] Define production metadata defaults.
  - Use service name: `Chalo`.
  - Use B2B title: `Chalo | Best-value Vietnam tours for global travel partners`.
  - Use description: `Plan flexible Vietnam itineraries with a local team offering fast consultation, clear booking support, and strong value for travel partners.`
  - Add Open Graph and Twitter metadata with `og-image`.

- [ ] Add crawl files.
  - `public/robots.txt` should allow indexing.
  - Do not add a `Sitemap:` directive or create `public/sitemap.xml` until a real absolute production host is known.

- [ ] Add analytics placeholder without loading third-party scripts.
  - Create a typed no-op helper in `lib/analytics.ts`.
  - Required API:
    - `trackEvent(name: string, properties?: Record<string, string | number | boolean>): void`
  - Implementation must be a no-op with a clear comment that GA4/Plausible can be wired later.

- [ ] Normalize content config.
  - All visible B2B copy belongs in `lib/b2b/content.ts`.
  - Do not hardcode new landing copy in `components/b2b/landing-page.tsx`.

- [ ] Confirm no Tailwind migration is introduced.
  - The prompt mentions Tailwind as an example, but this repo currently uses `app/globals.css`.
  - Do not add Tailwind unless the owner explicitly approves a styling stack migration.

- [ ] Run verification.
  - Run: `npm run build:b2b`
  - If structure changed, run: `npm run sync:governance`
  - Expected: successful B2B build and fresh generated structure snapshot.

## Done Criteria

- Existing Next app is preserved.
- SEO defaults and crawl basics exist or are explicitly blocked by missing production host.
- Analytics placeholder exists but sends no data.
- B2B visible copy remains content-driven.
- No unnecessary dependency is added.
