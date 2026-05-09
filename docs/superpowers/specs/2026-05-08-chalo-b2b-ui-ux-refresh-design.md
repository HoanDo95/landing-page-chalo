# Chalo B2B UI/UX Refresh Design

## Context

This document defines the approved UI/UX refresh for the existing Chalo B2B landing page. It does not replace the existing B2B positioning spec in `docs/superpowers/specs/2026-05-07-chalo-b2b-landing-page-design.md`. Instead, it adds the visual, interaction, and section-rhythm decisions needed to make the page feel more polished, more memorable, and more conversion-ready while staying SEO-first.

The current page structure is broadly correct, but the presentation is still too flat and too card-heavy. The hero is not yet strong enough, the section rhythm is too even, and the visual hierarchy does not create enough contrast between the most important moments of the page.

## Goals

- Make the first viewport feel immediately impressive.
- Keep the B2B page professional and accessible for international travel partners.
- Preserve semantic structure and search-friendly content.
- Increase visual trust without inventing proof or relying on luxury branding.
- Improve perceived quality through imagery, typography, spacing, contrast, and motion.

## Non-Goals

- Do not redesign the page into a luxury travel brand.
- Do not turn the page into a B2C package catalog.
- Do not introduce JS-heavy effects that compete with performance or content clarity.
- Do not collapse the B2B variant back into shared variant-specific layout code.

## Approved Direction

The approved direction is:

- photo-led hero
- destination imagery as the main emotional hook
- a compact booking or itinerary-planning overlay inside the hero
- a trust band directly below the hero
- adaptive motion: richer on desktop, reduced on mobile
- mostly light page surfaces with a few strategic dark sections

This direction should feel polished, cinematic, credible, and conversion-ready rather than luxurious or corporate.

## Design Principles

### 1. Wow comes from art direction, not visual noise

The page should feel elevated because the hero image is strong, the typography is deliberate, and each section has clear visual weight. Avoid decorative gradients, excessive shadows, crowded overlays, or novelty motion.

### 2. B2B credibility must appear within the first screen and a half

The page cannot rely on aesthetics alone. After the hero impression, the user should very quickly understand:

- this is for international travel partners
- Chalo supports multiple traveler types
- Chalo is operationally clear and locally grounded

### 3. Mass-market value, not luxury exclusivity

The visual tone should suggest quality and professionalism, but the language and layout should still feel practical and approachable. Premium cues should be subtle and come from restraint, not from exclusivity signals.

### 4. Section rhythm should vary on purpose

The current page reads too evenly. The refresh should create a stronger rhythm:

- strong hero
- compressed trust band
- standard content sections
- one darker commitment section
- compact conversion close

This prevents the page from feeling like a continuous set of similar cards.

## Page Architecture

The approved page structure is eight main sections plus footer.

### 1. Hero

Purpose:

- create immediate destination-led impact
- establish the partner-facing value proposition
- give one obvious primary CTA

Layout:

- large destination image window or full-width image treatment
- short eyebrow
- strong H1 with tight line breaks
- concise supporting paragraph
- one primary CTA and one secondary CTA
- compact planning overlay card inside the hero

Hero overlay content should feel like operational context, not like a second content block. Good overlay content includes:

- source market
- traveler type
- route direction
- service highlights

The overlay must stay visually lighter than the main hero headline.

### 2. Trust Band

Purpose:

- convert initial attention into credibility
- show travel-partner relevance quickly

Content:

- served markets or partner scope
- three operational promises such as fast quotation support, flexible itineraries, and local Vietnam support

If real partner logos are not available, do not invent them. Use text-based trust signals instead.

### 3. Built for Global Travel Partners

Purpose:

- clearly identify the page audience
- confirm the page is for agents, operators, wholesalers, and DMC-style partners

This section should stay concise and should not compete visually with the hero.

### 4. Flexible Tour Design

Purpose:

- show itinerary flexibility across traveler types

Content:

- FIT
- family
- group
- honeymoon
- leisure

This section should feel cleaner and more refined than the current generic card grid. Cards may still be used, but they should not all carry the same heavy border-shadow treatment.

### 5. Fast, Clear Booking Operations

Purpose:

- make the B2B workflow feel efficient and predictable

This section should use short, easy-to-scan steps. The emphasis is clarity and professionalism, not storytelling copy.

### 6. Sample Vietnam Tour Styles

Purpose:

- show breadth without becoming a catalog

This section should show range and destination relevance, but should still feel lightweight. It should be curated rather than exhaustive.

### 7. Service Commitments

Purpose:

- create a contrast moment
- reinforce operational trust before conversion

This is the best candidate for a dark section. It should feel sharp and confident, with tighter copy and stronger contrast than the surrounding light sections.

### 8. FAQ and Lead Capture

Purpose:

- answer practical objections
- keep the closing conversion area compact and direct

The form and FAQ should feel intentionally grouped. The form treatment should look more polished than a plain sidebar card.

## Visual System

### Typography

- Use a clean, modern sans serif.
- Keep headings strong but not theatrical.
- Hero type should feel powerful through scale and line breaks, not through decorative styling.
- Body copy should remain comfortably readable for an international B2B audience.
- Keep letter spacing neutral. Do not push into luxury-style tracking.

### Color

- Light backgrounds should dominate the page.
- Use one warm accent for primary CTA emphasis.
- Use one or two dark sections strategically for rhythm and contrast.
- Avoid introducing multiple saturated accent colors.

### Imagery

- Use real Vietnam travel imagery.
- Prefer daylight, spacious, believable destination scenes.
- Avoid imagery that feels too resort-luxury or too generic-stock.
- Avoid hero photography that depends on close-up posed smiles alone.
- The image should suggest real trip value and real place, not abstract aspiration.

### Surfaces

- Reduce the feeling that every content block is the same card.
- Use full-width section bands and layout changes to create hierarchy.
- Reserve stronger card treatment for places where framing is useful: trust items, traveler types, FAQ, form, and selected callouts.

### Spacing

- Increase perceived breathing room in hero and transition sections.
- Keep trust and conversion bands slightly tighter than the main content sections.
- Use spacing to show hierarchy before adding more borders or decoration.

## Motion and Interaction

Motion should be adaptive.

Desktop:

- subtle hero reveal
- light depth or parallax feeling in the hero image area
- restrained card hover lift
- staggered entrance for trust or proof items where helpful

Mobile:

- reduce motion significantly
- keep only simple fades and state transitions
- avoid motion that delays access to CTA or content

Implementation rules:

- animate with opacity and transform
- respect `prefers-reduced-motion`
- never create layout shift to achieve motion

## SEO and Performance Guardrails

- Keep all important copy in semantic HTML.
- Keep H1, section headings, trust content, FAQ, and CTA text directly readable in the DOM.
- Do not hide core meaning in images alone.
- Optimize hero imagery carefully and keep above-the-fold content fast to paint.
- Avoid heavy sliders, autoplay media, or script-dependent hero effects.
- Preserve strong contrast and keyboard focus visibility.

## Component-Level Change Map

### `components/b2b/landing-page.tsx`

Main redesign surface.

Expected changes:

- rebuild hero composition
- add trust band below hero
- rebalance section order and section transitions
- improve the closing FAQ plus form composition

### `app/globals.css`

Primary styling surface.

Expected changes:

- typography hierarchy
- spacing rhythm
- hero and section art direction
- light and dark surface contrast
- motion behavior
- refined card and form styling

### `lib/b2b/content.ts`

Content source of truth.

Expected changes:

- add hero overlay content
- add trust band content
- tighten copy where the new layout needs shorter lines

### `components/shared/landing-primitives.tsx`

Shared primitives only.

Expected changes:

- improve shared heading, card, FAQ, or nav primitives where needed
- do not embed B2B-specific section layout logic into shared components beyond neutral reusable primitives

## Acceptance Criteria

The refresh is successful when:

- the first screen feels noticeably stronger and more premium than the current version
- the page still reads clearly as B2B, not B2C and not luxury concierge
- the page remains easy to scan section by section
- the trust layer appears much earlier and more clearly
- motion improves polish without hurting performance
- the page remains semantic, readable, and SEO-safe

## Implementation Boundaries

- Keep the current one-repo, variant-separated structure.
- Keep B2B-specific decisions in B2B-owned files.
- Follow `docs/design/b2b/DESIGN.md` as the baseline visual source, but apply the approved refresh choices in this spec where the current implementation is still too flat.
- Treat this document as the refresh source of truth for the next implementation plan.
