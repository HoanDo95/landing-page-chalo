# B2C Tour Modal and USD Pricing Design

## Goal

Add an in-page tour detail modal to the B2C Vietnam Tours landing page and switch all user-facing tour pricing from VND to USD.

## Scope

- Applies only to the B2C Vietnam Tours landing page.
- Keep tour content owned by `lib/b2c/vietnam-tours-content.ts`.
- Keep B2C-only rendering in `components/b2c/`.
- Do not introduce a new route for tour details.
- Do not move B2C tour detail logic into shared primitives.

## Approved Direction

- Clicking a B2C tour card, image, or primary tour CTA opens a modal instead of jumping directly to `#contact`.
- The modal shows a richer per-tour view: gallery, short overview, duration, availability, accommodation, inclusions, and day-by-day itinerary.
- All currently displayed VND pricing changes to USD across the B2C experience: tour cards, hero/package summaries, lead form selector, selected-tour confirmation text, hero copy, and SEO copy where price is mentioned.
- USD values are entered explicitly per tour in content data. They are not derived from a runtime VND conversion.

## Data Model

Extend `TourPackage` with B2C-owned detail fields needed by the modal:

- `itineraryDays`: ordered array of daily itinerary entries
- `overview`: short modal summary copy
- `priceCurrency`: fixed `"USD"` for B2C tours

Existing numeric fields `priceOriginal` and `priceSale` remain the pricing source, but their content values become curated USD values instead of VND-scale values.

## Interaction

- Desktop and mobile keep the current package grid.
- Tour-card click opens a centered modal with backdrop and close button.
- Escape key, close button, and backdrop click close the modal.
- The modal keeps one clear next step: `Choose this tour`, which closes the modal and preselects that tour in the lead form at `#contact`.
- Reduced-motion users keep the same modal flow without decorative motion dependency.

## Component Mapping

- `components/b2c/TourCard.tsx`
  - opens modal instead of linking directly to `#contact`
  - displays USD formatting
- `components/b2c/tour-detail-modal.tsx`
  - new B2C-only client component for detail rendering and close behavior
- `components/b2c/tour-packages-section.tsx`
  - new B2C-only client boundary that owns selected-tour state for cards and modal
- `components/b2c/lead-capture-form.tsx`
  - accepts a preselected tour id and displays USD formatting everywhere
- `components/b2c/landing-page.tsx`
  - renders the new packages section and uses USD summary formatting
- `app/globals.css`
  - styles the modal surface, backdrop, responsive layout, and USD price emphasis
- `lib/b2c/vietnam-tours-content.ts`
  - becomes the source of truth for USD prices and per-tour itinerary detail
- `lib/landing-content.ts`
  - gets the added B2C tour detail types

## Verification

- `./node_modules/.bin/tsc --noEmit`
- `npm run build:b2c`
- `npm run build:b2b`
- Browser check at `/b2c` to confirm:
  - clicking a tour opens the modal
  - modal close behaviors work
  - `Choose this tour` preselects the lead form
  - no visible VND labels remain on the B2C page

## Out of Scope

- Separate detail routes such as `/b2c/tours/[slug]`
- Runtime currency conversion
- Backend booking or checkout changes
