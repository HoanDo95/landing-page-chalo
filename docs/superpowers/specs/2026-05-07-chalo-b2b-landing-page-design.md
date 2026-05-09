# Chalo B2B Landing Page Design

## Context

Chalo needs an English-first B2B landing page for international travel agents and travel partners who send travelers to Vietnam. The page should not be limited to India as a source market. It should speak to global partners serving FIT, family, group tour, honeymoon, and leisure travelers.

The B2B visual direction follows `docs/design/b2b/DESIGN.md`: clean high contrast, generous spacing, strong typography, real travel imagery, restrained color, and a single warm CTA accent. The page should feel professional and accessible, not overly luxury and not overly corporate. Premium quality should come through in imagery, spacing, clarity, and wording rather than exclusive luxury positioning.

## Positioning

Primary positioning:

> Best-value Vietnam tours for global travel partners.

Supporting message:

Chalo is a local Vietnam partner that helps international travel agents plan flexible itineraries and manage booking requests with fast, clear consultation and on-ground support.

What to emphasize:

- Flexible tour planning for different traveler profiles.
- Fast and clear booking consultation.
- Strong value for money for mass-market travel partners.
- Reliable local Vietnam support.

What to avoid:

- Do not frame Chalo as India-only.
- Do not lead with "cheapest in Vietnam" as a raw claim.
- Do not make the page feel like a luxury concierge brand.
- Do not turn the page into a dense B2C tour catalog.

## Audience

Primary audience:

- International travel agents.
- Travel partners and tour operators.
- DMC partners and wholesalers who need Vietnam ground support.

Common traveler profiles these partners send:

- FIT travelers.
- Families.
- Group tours.
- Honeymoon travelers.
- Leisure travelers.

## Hero

Headline:

> Best-value Vietnam tours for global travel partners

Subcopy:

> Work with a local Vietnam team that helps you plan flexible FIT, family, group, honeymoon, and leisure itineraries with fast consultation and clear booking support.

Primary CTA:

> Talk to a specialist

Secondary CTA:

> Explore tour styles

Trust signals:

- Flexible itineraries.
- Fast quotation support.
- Local Vietnam team.

Visual direction:

Use bright, real Vietnam travel imagery with people, places, or grounded travel moments. The image should feel polished and trustworthy but not exclusive or private-luxury. The hero can use a full-bleed or large image-led layout, with typography carrying the first viewport and the CTA using the design accent color.

## Section Architecture

The page should use a Trust + Operations structure with one strong value-oriented section. Target around 8 sections.

1. Hero
   - Establish best-value Vietnam tours for global partners.
   - Lead with CTA to talk to a specialist.

2. Partner Fit
   - Confirm the page is for agents, tour operators, DMC partners, and wholesalers.
   - Keep this short and direct.

3. Traveler Types
   - Show that Chalo can support FIT, family trips, group tours, honeymoon, and leisure travelers.
   - Use compact cards or a clean grid, one short line per traveler type.

4. Why Chalo
   - Present three core advantages:
     - Best-value planning.
     - Fast, clear consultation.
     - On-ground Vietnam support.

5. How It Works
   - Explain the process in four steps:
     - Share your request.
     - Get consultation and rates.
     - Confirm the itinerary.
     - Guests travel with local support.

6. Sample Tour Styles
   - Show range without becoming a catalog.
   - Include styles such as Vietnam highlights, Northern culture, Central heritage, Southern escape, beach extension, and honeymoon or family private trips.
   - Do not show pricing in this section.

7. Service Commitments
   - Use this as a contrast section, likely dark background.
   - Commitments:
     - Clear inclusions and exclusions.
     - Practical local recommendations.
     - Flexible itinerary adjustments.
     - Support while guests are in Vietnam.

8. FAQ + Final CTA
   - Answer practical travel partner objections.
   - End with a direct CTA to talk to a specialist.

## Partner Proof

The first version should avoid invented metrics or unsupported claims. Use operational credibility instead:

- Built for agent requests across multiple traveler types.
- Local team handling Vietnam routes and supplier coordination.
- Clear communication from inquiry to arrival.

If real proof becomes available later, this section can be upgraded with market coverage, monthly group volume, partner testimonials, review snippets, or average response time.

## FAQ

Use about five FAQ items:

1. Can you support travelers from different source markets?
2. Can you customize tours for FIT, family, honeymoon, leisure, and groups?
3. Do you provide partner-friendly rates for travel agents?
4. How fast can your team respond to new requests?
5. Do you support guests while they are traveling in Vietnam?

The answers should be clear and operational. They should avoid India-only language and avoid overpromising exact response times unless Chalo can commit to a real number.

## Final CTA

Headline:

> Need a reliable Vietnam partner for your next request?

CTA:

> Talk to a specialist

Microcopy:

> Share your market, group size, travel dates, and preferred route. Chalo will help shape the next step.

## Implementation Notes

- Keep B2B page composition in `components/b2b/landing-page.tsx`.
- Keep B2B copy/content in `lib/b2b/content.ts`.
- Keep shared primitives neutral; do not encode B2B-specific section order or copy in `components/shared/`.
- Follow `docs/design/b2b/DESIGN.md` for typography, color, spacing, contrast, CTA styling, and imagery rhythm.
- Use English page copy for the B2B variant.
- If implementation changes structure or governance files, run `npm run sync:governance` before final response.
