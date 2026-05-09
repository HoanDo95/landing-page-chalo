# Chalo B2B Landing Page Phase 4 Task File

> **For execution agents:** Implement only conversion optimization from this file. Use `superpowers:subagent-driven-development` or `superpowers:executing-plans`. Keep this file under 200 lines and update `docs/plan/b2b/phase-1/2026-05-07-chalo-b2b-progress.md` when complete.

**Goal:** Improve lead conversion for travel agents and partners without changing the approved B2B positioning.

**Architecture:** CTA behavior should be content-driven and analytics-ready. Use small typed helpers and local component state; do not introduce a backend unless explicitly approved.

**Tech Stack:** Next.js 15, React 19, TypeScript, native form validation plus lightweight custom validation, no unused dependencies.

---

## Source Inputs

- Approved CTA: `Talk to a specialist`.
- Approved final CTA microcopy from design spec.
- Analytics placeholder from Phase 1 if available.

## Files To Modify

- `lib/b2b/content.ts` for CTA variants, form labels, and validation messages.
- `lib/landing-content.ts` for typed CTA/form content if needed.
- `lib/analytics.ts` for no-op event calls if created in Phase 1.
- `components/b2b/landing-page.tsx` for sticky CTA and lead capture area.
- `components/shared/landing-primitives.tsx` only for neutral form/button primitives.
- `app/globals.css` for sticky CTA, form states, and micro-interactions.

## Task Checklist

- [ ] Keep above-the-fold CTA visible.
  - On desktop, hero CTA must appear in first viewport.
  - On mobile, primary CTA must appear before or immediately after hero image.

- [ ] Add mobile sticky CTA bar.
  - Label: `Talk to a specialist`.
  - Link target: final contact or lead section.
  - Show after initial scroll only if this can be done without hydration complexity; otherwise keep it visible at bottom on mobile.
  - Include accessible label: `Contact a Chalo travel specialist`.

- [ ] Structure headline for copy testing.
  - Store headline variants in `lib/b2b/content.ts`.
  - Default variant must remain: `Best-value Vietnam tours for global travel partners`.
  - Do not add runtime A/B infrastructure unless approved.

- [ ] Add inline lead capture if approved by the owner.
  - Fields:
    - Name.
    - Company.
    - Work email.
    - Source market.
    - Request details.
  - If owner does not approve form collection yet, implement CTA anchor only and record blocker in progress tracker.

- [ ] Validate form fields if form is implemented.
  - Name and company: non-empty after trim.
  - Work email: must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
  - Request details: minimum 20 characters.
  - Error messages must be visible, text-based, and announced via `aria-live`.

- [ ] Add analytics events as no-ops.
  - CTA click: `b2b_cta_click`.
  - Form submit attempt: `b2b_lead_submit_attempt`.
  - Form validation error: `b2b_lead_validation_error`.
  - Successful local submit state: `b2b_lead_submit_success`.

- [ ] Add micro-interactions.
  - Button hover/focus transition.
  - Card hover lift no more than 4px.
  - FAQ summary hover/focus state.
  - Disable hover-only affordances on touch when they harm readability.

- [ ] Avoid exit-intent popup by default.
  - The prompt marks it optional.
  - Do not add a popup unless the owner explicitly asks for it.

- [ ] Run verification.
  - Run: `npm run build:b2b`
  - Manually test form validation at `/b2b` if form exists.
  - Confirm no console errors in browser.

## Done Criteria

- Primary CTA remains visible and easy to reach.
- Mobile users have a clear path to specialist contact.
- Copy variants are structured but not randomly served.
- Form, if implemented, is accessible and validated.
- Analytics calls are typed no-ops until a real provider is approved.
