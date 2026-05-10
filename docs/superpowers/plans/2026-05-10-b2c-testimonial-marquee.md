# B2C Testimonial Marquee Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a compact two-row testimonial marquee for the B2C Vietnam Tours landing page.

**Architecture:** Keep B2C review data variant-owned, render the repeated marquee groups in the B2C page composition, and implement the loop/pause behavior with CSS only. No client component or runtime state is needed.

**Tech Stack:** Next.js App Router, React server components, TypeScript, CSS animations.

---

### Task 1: Expand B2C Testimonial Content

**Files:**
- Modify: `lib/b2c/vietnam-tours-content.ts`

- [ ] Add 7 additional concise testimonials to the existing `testimonials` array.
- [ ] Keep each testimonial object compatible with `LandingTestimonial`: `quote`, `authorName`, `authorLocation`, `tripInfo`, `rating`, and optional `avatarSrc`.
- [ ] Use local public assets only when setting `avatarSrc`.

### Task 2: Render Two Marquee Rows

**Files:**
- Modify: `components/b2c/landing-page.tsx`

- [ ] Split testimonials into two rows with alternating indexes.
- [ ] Render each row as a marquee track with one visible group and one `aria-hidden` duplicate group for seamless looping.
- [ ] Keep `TestimonialCard` unchanged and keyed with stable testimonial fields.

### Task 3: Style Compact Cards And Motion

**Files:**
- Modify: `app/globals.css`

- [ ] Replace the static `.testimonials-scroll` layout with `.testimonials-marquee`, row, track, and group styles.
- [ ] Reduce testimonial card width, avatar size, padding, gap, and type scale.
- [ ] Add CSS keyframes for left/right marquee motion.
- [ ] Pause tracks on hover and focus-within.
- [ ] Add a `prefers-reduced-motion: reduce` fallback that disables animation and allows horizontal scrolling.

### Task 4: Verify

**Commands:**
- `./node_modules/.bin/tsc --noEmit`
- `npm run build:b2c`
- `npm run sync:governance`

- [ ] Confirm TypeScript passes.
- [ ] Confirm the B2C build passes.
- [ ] Confirm governance snapshot is refreshed after adding docs.
