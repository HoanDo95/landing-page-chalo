# Repository Guidelines

## Project Structure & Module Organization

This repository is a single Next.js app with two deployable variants:

- `app/` contains route groups, routes, and shared global styles:
  - `app/(default)/page.tsx` selects the active root variant from `LANDING_VARIANT`
  - `app/(default)/layout.tsx` sets the root deployment document language from `LANDING_VARIANT`
  - `app/(b2b-preview)/b2b/page.tsx` and `app/(b2b-preview)/layout.tsx` serve `/b2b` with fixed `lang="en"`
  - `app/(b2c-preview)/b2c/page.tsx` and `app/(b2c-preview)/layout.tsx` serve `/b2c` with fixed `lang="en"`
  - `app/globals.css` holds the shared visual system and motion styles
- `components/` contains shared primitives plus variant-specific page composition:
  - `components/shared/landing-primitives.tsx` for neutral layout primitives and page landmarks
  - `components/shared/responsive-nav.tsx` for the shared interactive responsive navigation client boundary
  - `components/shared/tracked-cta-link.tsx` for the neutral tracked CTA wrapper; callers provide any variant-owned event name
  - `components/b2b/` for B2B composition
    - `components/b2b/lead-capture-form.tsx` owns the B2B inline lead form, local-only validation, and success state
  - `components/b2c/` for B2C composition
    - `components/b2c/TourCard.tsx`, `TestimonialCard.tsx`, `MetricBar.tsx`, and `lead-capture-form.tsx` own B2C Vietnam Tours conversion UI
- `lib/` contains variant selection, shared content types, and variant content data:
  - `lib/analytics.ts` is the neutral no-op analytics helper; keep variant-owned event names in variant callers
  - `lib/metadata.ts` builds Next.js metadata from variant-owned SEO content
  - `lib/variant.ts`
  - `lib/landing-content.ts`
  - `lib/b2b/content.ts` and `lib/b2c/content.ts` for variant-owned content
  - `lib/b2c/vietnam-tours-content.ts` owns B2C Vietnam Tours package, testimonial, metric, form, and SEO content
  - `lib/content.ts` as the barrel/export layer only
- `public/` contains static assets served by Next.js:
  - `public/logo/` holds served brand logo and favicon assets for landing variants
  - `public/tour/` holds local B2B destination gallery images with stable ASCII filenames
  - `public/og-image-b2c-tours.svg` is the B2C Vietnam Tours Open Graph image

Architecture source of truth:

- `docs/architecture/landing-page-variant-sources.md` defines the codebase structure for B2B and B2C separation
- `docs/architecture/current-structure.md` is the generated snapshot of the current repository structure
- `docs/superpowers/specs/` holds approved design specs
- `docs/plan/b2b/` holds B2B execution-agent task files and progress tracking for each planning cycle
- Before changing routes, shared primitives, or variant-specific components, read that architecture spec first
- `docs/design/b2b/DESIGN.md` and `docs/design/b2c/DESIGN.md` remain the visual source of truth for each variant
- Keep B2B and B2C in separate component and content sources inside the same repo; do not merge them back into one shared landing-page component
- Keep shared code limited to primitives and helpers that do not encode variant-specific layout, copy, or visual hierarchy

Design source of truth:

- `docs/design/b2b/DESIGN.md` is the canonical design spec for all B2B UI changes
- `docs/design/b2c/DESIGN.md` is the canonical design spec for all B2C UI changes
- Before editing `app/(b2b-preview)/b2b/page.tsx`, `lib/b2b/content.ts`, or any B2B-specific visual state, read `docs/design/b2b/DESIGN.md`
- Before editing `app/(b2c-preview)/b2c/page.tsx`, `lib/b2c/content.ts`, or any B2C-specific visual state, read `docs/design/b2c/DESIGN.md`
- Do not change a variant's UI, spacing, type scale, color, motion, or section order unless the change is aligned with that variant's design file
- If the design file and the current implementation conflict, treat the design file as the source of truth and update the implementation to match it
- If a prompt changes code structure or governance rules, update `docs/architecture/current-structure.md`, `docs/architecture/landing-page-variant-sources.md`, and this file before final response
- Treat `docs/architecture/current-structure.md` as the generated record of the live tree

Keep shared behavior in `components/shared/` and `lib/`; keep B2B/B2C differences in their own composition and content sources, not in shared primitives.

## Build, Test, and Development Commands

- `npm install` installs dependencies
- `npm run dev` starts the local Next.js dev server
- `npm run build` builds the default variant
- `npm run build:b2b` builds the B2B deployment variant
- `npm run build:b2c` builds the B2C deployment variant
- `npm run start` runs the production server after build

Use `LANDING_VARIANT=b2b` or `LANDING_VARIANT=b2c` for variant-specific builds.

## Coding Style & Naming Conventions

Use TypeScript, functional React components, and descriptive camelCase names for variables and functions. Keep route folders lowercase and file-based inside route groups, such as `app/(b2b-preview)/b2b/page.tsx`. Prefer small, reusable components and data-driven content. Use 2-space indentation and ASCII-only text unless a clear content requirement needs otherwise.

## Testing Guidelines

There is no test framework configured yet. Before merging changes, validate the app by running:

```bash
./node_modules/.bin/tsc --noEmit
npm run build
npm run build:b2b
npm run build:b2c
```

If you add tests later, keep the naming consistent with the feature area, for example `landing-page.test.tsx`.

## Commit & Pull Request Guidelines

No Git commit history is available in this workspace, so no project-specific commit convention is established yet. Use clear imperative commit messages such as `Add B2B hero section`.

Pull requests should include:

- a short summary of the change
- which variant(s) are affected
- screenshots for visual updates
- notes on SEO or performance impact if relevant

## Deployment Notes

This project is designed for two separate deployments from one codebase. Keep variant-specific copy, metadata, CTA text, tour packages, and form content in `lib/b2b/content.ts`, `lib/b2c/content.ts`, or B2C-owned content files such as `lib/b2c/vietnam-tours-content.ts`; keep `lib/content.ts` as the barrel/export layer only. Avoid hardcoding B2B/B2C differences inside shared components.

## Finalization

- If a prompt changed structure or governance, run `npm run sync:governance`
- Refresh architecture docs and this file before final response
- Never finish with a changed tree and stale `docs/architecture/current-structure.md`
