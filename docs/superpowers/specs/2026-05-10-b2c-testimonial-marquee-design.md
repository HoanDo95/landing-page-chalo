# B2C Testimonial Marquee Design

## Goal

Turn the B2C testimonial section into a richer social-proof band with more traveler comments, smaller review cards, and a continuous two-row marquee that pauses on hover.

## Scope

- Applies only to the B2C Vietnam Tours landing page.
- Keep testimonial content in `lib/b2c/vietnam-tours-content.ts`.
- Keep rendering in `components/b2c/landing-page.tsx` and existing `components/b2c/TestimonialCard.tsx`.
- Keep animation and responsive behavior in `app/globals.css`.
- Do not move testimonial logic into shared primitives.

## Interaction

Desktop and tablet viewports show two horizontal rows of compact testimonial cards. Each row loops continuously, with the second row offset and moving in the opposite direction so the section feels populated without requiring manual interaction. Hovering or focusing within the testimonial marquee pauses both rows so users can read a card.

Small screens keep the compact cards and the same loop, with narrower card widths. Users who prefer reduced motion get a static horizontally scrollable list instead of automatic animation.

## Content

The section should include enough reviews to make the loop feel continuous. Review copy remains concise, specific, and consumer-facing: pricing clarity, tour pacing, family comfort, hotel/transfer reliability, and fast consultation.

## Verification

- `./node_modules/.bin/tsc --noEmit`
- `npm run build:b2c`
- Browser check at `/b2c` to confirm the marquee loops, cards are smaller, and hover pauses animation.
