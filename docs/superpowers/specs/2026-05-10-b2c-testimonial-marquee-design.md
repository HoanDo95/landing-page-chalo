# B2C Testimonial Gallery Design

## Goal

Turn the B2C testimonial section into a tighter social-proof gallery with three featured traveler stories, hover-reveal review content, and click-through trip albums.

## Scope

- Applies only to the B2C Vietnam Tours landing page.
- Keep testimonial content in `lib/b2c/vietnam-tours-content.ts`.
- Keep rendering in `components/b2c/landing-page.tsx` and existing `components/b2c/TestimonialCard.tsx`.
- Keep animation and responsive behavior in `app/globals.css`.
- Do not move testimonial logic into shared primitives.

## Interaction

Desktop viewports show a framed testimonial surface inspired by editorial gallery layouts: a small label, divider rule, strong headline, and three tall cards. Each card keeps the traveler surface visible at rest, then reveals the quote and rating on hover or keyboard focus.

Clicking or tapping a card opens a modal dialog with that traveler's album. The modal uses one active image, left and right navigation controls, a visible image counter, and a thumbnail strip so larger albums remain fast to browse. The quote, location, trip label, and rating stay visible beside the active image instead of being pushed below a long gallery. Mobile keeps the same three stories in a single-column stack, with click/tap as the primary interaction because hover is not available.

## Content

The section should feature only three traveler stories. Each traveler entry needs:

- one quote
- rating
- traveler name
- traveler location
- trip label
- album images for the modal

Portrait images may be added later. Until then, the cards should still render intentionally with a monogram or other lightweight placeholder treatment.

## Verification

- `node --test --experimental-strip-types tests/b2c-testimonial-gallery.test.mjs`
- `./node_modules/.bin/tsc --noEmit`
- `npm run build:b2c`
- Browser check at `/b2c` to confirm the three-card gallery, hover reveal, and click-through album dialog.
