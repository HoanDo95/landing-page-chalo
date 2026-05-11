# Landing Page Variant Sources Architecture

## Goal

Split the landing page into two variant sources inside one repository:

- B2B has its own entry, component composition, and content source
- B2C has its own entry, component composition, and content source
- Shared code is limited to primitives and low-level helpers that do not encode variant-specific layout or copy
- The live tree snapshot lives in `docs/architecture/current-structure.md`
- Repository governance automation lives in `scripts/sync-governance.mjs`

## Principles

1. One repo, two variant sources.
2. Each variant owns its own page composition and content.
3. Visual and interaction decisions must follow the matching design file.
4. Shared code is allowed only when it does not make B2B and B2C converge into the same layout.
5. Root routing may select a variant for deployment, but variant routes must stay direct and explicit.

## Target Structure

```txt
app/
  apple-icon.png
  icon.png
  api/
    leads/
      route.ts
      b2b/route.ts
  (default)/
    layout.tsx
    page.tsx
  (b2b-preview)/
    layout.tsx
    b2b/page.tsx
  (b2c-preview)/
    layout.tsx
    b2c/page.tsx
  globals.css

components/
  shared/
    landing-primitives.tsx
    responsive-nav.tsx
    tracked-cta-link.tsx
  b2b/
    landing-page.tsx
    lead-capture-form.tsx
  b2c/
    landing-page.tsx
    lead-capture-form.tsx
    ChatWidget/
      ChatWidget.tsx
      ChatButton.tsx
      ChatPanel.tsx
      ChatPanelHeader.tsx
      WhatsAppButton.tsx
      index.ts
    MetricBar.tsx
    TestimonialCard.tsx
    TourCard.tsx

lib/
  analytics.ts
  variant.ts
  content.ts
  landing-content.ts
  metadata.ts
  b2b/
    content.ts
  b2c/
    content.ts
    vietnam-tours-content.ts
  server/
    b2b-lead-notifications.ts
    b2c-lead-notifications.ts
    email.ts
    lead-validation.ts

public/
  logo/
    chalo-favicon.png
    chalo-logo-transparent.png
  og-image-b2c-tours.svg
  tour/
    family-golden-bridge.jpg
    family-hoi-an.jpg
    group-vin.jpg
    halong-bay.jpg
    hoi-an.jpg
    mekong-detail.jpg
    mekong-river.jpg
    ninh-binh.jpg
    phu-quoc.jpg

docs/
  plan/
    b2b/
      phase-1/
      phase-2/
  design/
    b2b/DESIGN.md
    b2c/DESIGN.md
  superpowers/
    specs/
```

## File Responsibilities

- `app/(default)/page.tsx`
  - Resolves `LANDING_VARIANT`
  - Renders the matching variant source
- `app/(default)/layout.tsx`
  - Sets the root `/` document language from the deployment variant selected by `LANDING_VARIANT`
- `app/(b2b-preview)/layout.tsx`
  - Sets fixed `lang="en"` for the direct B2B preview tree
- `app/(b2b-preview)/b2b/page.tsx`
  - Direct B2B preview route
  - In production, permanently redirects to `/` for B2B deployments and returns 404 for B2C deployments
  - Imports only B2B page composition and B2B metadata
- `app/api/leads/b2b/route.ts`
  - Accepts the B2B email-only lead payload
  - Validates the B2B form contract and triggers the B2B lead notification flow
- `app/(b2c-preview)/layout.tsx`
  - Sets fixed `lang="en"` for the direct B2C preview tree
- `app/(b2c-preview)/b2c/page.tsx`
  - Direct B2C preview route
  - In production, permanently redirects to `/` for B2C deployments and returns 404 for B2B deployments
  - Imports only B2C page composition and B2C metadata
- `app/api/leads/route.ts`
  - Accepts the B2C tours lead payload
  - Validates the B2C form contract and triggers the B2C lead notification flow
- `app/globals.css`
  - Shared visual system imported by each route-group root layout
- `app/icon.png` and `app/apple-icon.png`
  - Provide shared browser tab and Apple touch icons for B2B and B2C routes
- `components/b2b/landing-page.tsx`
  - Owns B2B section order, hero treatment, proof blocks, FAQ shape, and CTA hierarchy
- `components/b2b/lead-capture-form.tsx`
  - Owns the B2B inline lead form, local-only validation, success state, and B2B submit-event calls
- `components/b2c/landing-page.tsx`
  - Owns B2C section order, hero treatment, proof blocks, FAQ shape, and CTA hierarchy
- `components/b2c/TourCard.tsx`
  - Owns B2C Vietnam Tours package cards, local price display, badge rendering, and tour-select analytics event names
- `components/b2c/TestimonialCard.tsx`
  - Owns B2C testimonial proof cards and rating presentation
- `components/b2c/MetricBar.tsx`
  - Owns B2C trust metric layout and icon treatment
- `components/b2c/lead-capture-form.tsx`
  - Owns the B2C tour lead form, tour selection, local validation, success state, and B2C submit-event calls
- `components/b2c/ChatWidget/`
  - Owns the B2C floating WhatsApp widget, panel copy, close behavior, and external chat CTA surface
- `components/shared/landing-primitives.tsx`
  - Provides only neutral layout primitives and page landmarks
- `components/shared/responsive-nav.tsx`
  - Owns the shared interactive responsive navigation behavior without pulling presentational primitives into a client boundary
- `components/shared/tracked-cta-link.tsx`
  - Provides a neutral CTA link wrapper that emits caller-supplied tracking events with shared placement context
- `lib/analytics.ts`
  - Provides the neutral no-op analytics helper used by shared and variant-owned callers until a real provider is approved
- `lib/landing-content.ts`
  - Defines the shared landing page content type
- `lib/metadata.ts`
  - Builds Next.js metadata from variant-owned SEO content and optional site URL configuration
- `lib/b2b/content.ts`
  - Owns B2B copy, stats, metadata, and CTA text
- `lib/b2c/content.ts`
  - Owns B2C copy, stats, metadata, and CTA text
- `lib/b2c/vietnam-tours-content.ts`
  - Owns B2C Vietnam Tours packages, testimonials, trust metrics, lead form content, SEO, and route content export
- `lib/content.ts`
  - Barrel export for convenience only
- `lib/server/email.ts`
  - Owns shared mail transport configuration and provider-specific delivery only
- `lib/server/lead-validation.ts`
  - Owns variant-specific lead validation for B2B and B2C routes
- `lib/server/b2b-lead-notifications.ts`
  - Builds the B2B email-only lead message and calls the shared mail transport
- `lib/server/b2c-lead-notifications.ts`
  - Builds the B2C tours lead message and calls the shared mail transport
- `lib/variant.ts`
  - Keeps variant resolution logic for deployment routing only
- `public/tour`
  - Stores local destination imagery used by variant-owned gallery and tour-card sections
  - Use stable ASCII filenames so `next/image` can serve assets through public URLs
- `public/logo/chalo-logo-transparent.png`
  - Served brand logo asset used by B2B and B2C header and footer chrome
- `public/logo/chalo-favicon.png`
  - Served metadata icon asset referenced by shared landing metadata
- `public/og-image-b2c-tours.svg`
  - Stores the B2C Vietnam Tours Open Graph image referenced by variant-owned SEO content
- `docs/architecture/current-structure.md`
  - Generated tree snapshot used to catch drift after structural changes
- `docs/superpowers/specs`
  - Stores approved design specs before implementation planning
- `docs/plan/b2b`
  - Stores B2B execution-agent task files and progress tracking for each implementation cycle
- `scripts/sync-governance.mjs`
  - Regenerates the live tree snapshot in `docs/architecture/current-structure.md`

## Migration Rules

- Move any B2B-specific layout or copy out of shared components and into `components/b2b/landing-page.tsx` and `lib/b2b/content.ts`.
- Move any B2C-specific layout or copy out of shared components and into `components/b2c/landing-page.tsx` and `lib/b2c/content.ts`.
- If a helper starts encoding a variant decision, move that decision back into the variant source.
- Do not add new cross-variant abstractions unless both variants already share the same semantics and markup shape.

## Change Policy

- When editing B2B, compare against `docs/design/b2b/DESIGN.md` before writing code.
- When editing B2C, compare against `docs/design/b2c/DESIGN.md` before writing code.
- If a change requires a cross-variant UI compromise, split it into variant-specific implementations rather than weakening the design.

## Acceptance Criteria

- B2B and B2C can evolve independently without touching each other’s component source.
- The root build can still select a variant from `LANDING_VARIANT`.
- `/b2b` and `/b2c` remain direct preview routes in local development.
- Production deployments expose the selected variant at `/`; same-variant preview routes permanently redirect to `/`, and opposite-variant preview routes return 404.
- Document language is set by stable route-group root layouts, not request-path header heuristics.
- Shared code does not contain variant-specific layout, copy, or CTA logic.
- The architecture snapshot can be regenerated at any time with `npm run sync:governance`.
