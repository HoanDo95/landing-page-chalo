# Chalo B2B Landing Page Phase 2 Task File

> **For execution agents:** Implement only core landing sections from this file. Use `superpowers:subagent-driven-development` or `superpowers:executing-plans`. Keep this file under 200 lines and update `docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-progress.md` when complete.

**Goal:** Build the approved B2B landing page sections as isolated, content-driven components.

**Architecture:** B2B section order and copy belong to `components/b2b/landing-page.tsx` and `lib/b2b/content.ts`. Shared primitives may be expanded only when they stay variant-neutral and do not encode Chalo-specific layout or copy.

**Tech Stack:** Next.js 15, React 19, TypeScript, semantic HTML, `next/image` for real assets when available.

---

## Source Inputs

- Design spec: `docs/superpowers/specs/2026-05-07-chalo-b2b-landing-page-design.md`
- Visual source: `docs/design/b2b/DESIGN.md`
- Architecture source: `docs/architecture/landing-page-variant-sources.md`

## Files To Modify

- `lib/landing-content.ts` for expanded typed content shape.
- `lib/b2b/content.ts` for all English B2B copy.
- `components/b2b/landing-page.tsx` for section composition.
- `components/shared/landing-primitives.tsx` for neutral primitives only.
- `app/globals.css` for section classes, responsive layout, and component styling.
- `publics/logo/Logo Chalo nền trong.png` or a normalized copied asset if logo path needs browser-safe naming.

## Required Sections

1. Navbar
   - Logo/brand: `Chalo`.
   - Links: `Partners`, `Traveler types`, `How it works`, `FAQ`.
   - CTA: `Talk to a specialist`.
   - Sticky behavior on scroll.
   - Mobile hamburger with keyboard-accessible button.

2. Hero
   - Headline: `Best-value Vietnam tours for global travel partners`.
   - Subcopy from approved spec.
   - Primary CTA: `Talk to a specialist`.
   - Secondary CTA: `Explore tour styles`.
   - Trust signals: `Flexible itineraries`, `Fast quotation support`, `Local Vietnam team`.
   - Use real Vietnam travel imagery or a polished image placeholder if final assets are unavailable.

3. Partner Fit
   - Target agents, tour operators, DMC partners, and wholesalers.
   - Keep copy direct and B2B-specific.

4. Traveler Types
   - FIT travelers.
   - Families.
   - Group tours.
   - Honeymoon travelers.
   - Leisure travelers.

5. Why Chalo
   - Best-value planning.
   - Fast, clear consultation.
   - On-ground Vietnam support.

6. How It Works
   - Share your request.
   - Get consultation and rates.
   - Confirm the itinerary.
   - Guests travel with local support.

7. Sample Tour Styles
   - Vietnam highlights.
   - Northern culture.
   - Central heritage.
   - Southern escape.
   - Beach extension.
   - Honeymoon or family private trips.
   - No prices in this section.

8. Service Commitments
   - Clear inclusions and exclusions.
   - Practical local recommendations.
   - Flexible itinerary adjustments.
   - Support while guests are in Vietnam.

9. FAQ + Final CTA
   - Use the five FAQ questions from the design spec.
   - Final CTA headline: `Need a reliable Vietnam partner for your next request?`
   - Final CTA button: `Talk to a specialist`.

10. Footer
   - Brand, basic navigation, copyright.
   - Keep legal/social links inert only if no real URLs exist; use accessible labels.

## Component Rules

- Every exported component must have a JSDoc comment.
- Component props must be typed with interfaces.
- No visible B2B copy inside shared primitives.
- Use semantic landmarks: `header`, `nav`, `main`, `section`, `footer`.
- FAQ must use accessible `details/summary` or a keyboard-safe accordion.
- All CTA anchors should resolve to real section IDs or a lead/contact area.

## Verification

- Run: `npm run build:b2b`
- Run: `npm run build:b2c`
- Expected: both variants still build; B2C must not inherit B2B section copy or layout.

## Done Criteria

- The B2B page has 8-10 production sections from approved spec.
- Copy is fully English and content-driven.
- Layout is responsive at 375px, 768px, and 1280px.
- Shared code remains variant-neutral.
