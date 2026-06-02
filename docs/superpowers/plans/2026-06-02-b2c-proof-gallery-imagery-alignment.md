# B2C Proof Gallery Imagery Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the two B2C proof-gallery images and captions so they match the existing left-side copy without changing the layout or metrics.

**Architecture:** Keep the current proof block structure in `components/b2c/landing-page.tsx`, swap the two image sources to local assets in `public/tour/`, and update the captions/alt text only. No layout or text-left changes.

**Tech Stack:** Next.js 15, React 19, TypeScript, `next/image`, local static assets in `public/`.

---

### Task 1: Add approved proof-gallery assets

**Files:**
- Create: `public/tour/<new-large-image>.jpg`
- Create: `public/tour/<new-small-image>.jpg`

- [ ] Download two high-resolution web-sourced images that match the approved direction.
- [ ] Resize/compress them to web-safe dimensions and save with stable ASCII filenames under `public/tour/`.

### Task 2: Update proof-gallery imagery and captions

**Files:**
- Modify: `components/b2c/landing-page.tsx`

- [ ] Replace the large proof image source, alt text, and caption.
- [ ] Replace the small proof image source, alt text, and caption.
- [ ] Keep the left-side title, description, metrics, and block layout unchanged.

### Task 3: Verify the B2C proof block

**Files:**
- Verify: `components/b2c/landing-page.tsx`

- [ ] Run `./node_modules/.bin/tsc --noEmit`.
- [ ] Run `npm run build:b2c`.
- [ ] Start local preview only if needed for spot-checking, then stop it after verification to avoid extra RAM usage.
