# B2C Vietnam Tours - Phase 4: Polish, Testing & Deployment

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Final QA, SEO optimization, performance tuning, and production build verification

**Architecture:** Polish UI/UX, ensure mobile responsiveness, optimize images, update metadata, verify builds

**Tech Stack:** Next.js image optimization, Tailwind CSS, Lighthouse, manual QA

---

## Task 4.1: Responsive Design Testing

**Files:**
- Modify: CSS adjustments as needed
- Test: Browser DevTools device emulation, real device testing

- [ ] **Step 1: Test mobile (< 640px)**
  - Open DevTools → Device toolbar
  - Test on iPhone SE (375px), iPhone 12 Pro (390px), Galaxy S20 (360px)
  - Verify:
    - Hero text readable, not cutoff
    - Tour cards stack 1 column
    - Testimonials scroll horizontally
    - Form inputs full width, tap targets >= 44px
    - CTA buttons visible without scrolling

- [ ] **Step 2: Test tablet (640px - 1024px)**
  - Test on iPad (768px), iPad Pro (1024px)
  - Verify:
    - Tour cards: 2 columns
    - Testimonials: 2 columns
    - Nav remains accessible
    - Font sizes readable at 1.5x distance

- [ ] **Step 3: Test desktop (> 1024px)**
  - Test on 1366px, 1920px widths
  - Verify:
    - Tour cards: 3-4 columns
    - Testimonials: 3 columns centered
    - Max-width container centered (1200px typical)
    - Line lengths for body text <= 75 characters

- [ ] **Step 4: Fix any breakpoint issues**

Add/adjust CSS media queries in `app/globals.css`:

```css
/* Example fixes */
@media (max-width: 640px) {
  .tour-card__title {
    font-size: 16px;
  }
  .metric-bar__value {
    font-size: 20px;
  }
}
```

- [ ] **Step 5: Test landscape orientation on mobile**

Rotate phone in DevTools, verify:
- Hero still readable (not too tall)
- Tour cards still 2 columns if width permits
- No horizontal overflow

---

## Task 4.2: SEO Metadata Updates

**Files:**
- Modify: `lib/b2c/vietnam-tours-content.ts` (SEO object)
- Modify: `lib/metadata.ts` if needed for dynamic generation
- Test: Check rendered HTML meta tags

- [ ] **Step 1: Ensure SEO object in content is complete**

In `lib/b2c/vietnam-tours-content.ts`, verify:

```typescript
seo: {
  title: "Tour Việt Nam Giá Tốt Nhất | Chalo Travel 2026",
  description: "Tour Việt Nam giá từ 2.490.000đ. Cam kết giá tốt nhất, hỗ trợ 24/7, hoàn tiền linh hoạt. Hơn 15,000 khách hàng tin dùng mỗi năm.",
  ogImagePath: "/og-image-b2c-tours.svg",
  canonical: "https://chalotravel.com" // add when domain known
}
```

- [ ] **Step 2: Update Open Graph image**

Create `public/og-image-b2c-tours.svg` or use existing template:

```svg
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#FFFBEB"/>
  <text x="50%" y="50%" text-anchor="middle" font-size="60" fill="#10B981">
    Tour Việt Nam Giá Tốt Nhất
  </text>
  <text x="50%" y="60%" text-anchor="middle" font-size="30" fill="#1F2937">
    Chalo Travel - Đặt tour trọn gói từ 2.490.000đ
  </text>
</svg>
```

- [ ] **Step 3: Verify meta tags in rendered page**

```bash
npm run build && npm run start
```

Visit `/b2c`, view source, check:

```html
<title>Tour Việt Nam Giá Tốt Nhất | Chalo Travel 2026</title>
<meta name="description" content="Tour Việt Nam giá từ 2.490.000đ...">
<meta property="og:title" content="Tour Việt Nam Giá Tốt Nhất">
<meta property="og:description" content="...">
<link rel="canonical" href="https://...">
```

- [ ] **Step 4: Add structured data (FAQPage schema)**

In `components/b2c/landing-page.tsx`, wrap FAQ section:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    })
  }}
/>
```

---

## Task 4.3: Performance Optimization

**Files:**
- Image assets
- CSS (critical CSS if needed)
- Test: Lighthouse audit

- [ ] **Step 1: Optimize hero image**
  - Convert to WebP if not already
  - Target: < 150KB
  - Use `next/image` with proper `sizes` attribute

- [ ] **Step 2: Lazy load below-fold images**

In `components/b2c/landing-page.tsx`:
- Tour package images: already lazy via `next/image` (fill without priority)
- Testimonial avatars: add `loading="lazy"`
- Trust metrics icons: inline SVG or icon font

- [ ] **Step 3: Add resource hints**

In `app/(b2c-preview)/layout.tsx` or root layout:

```typescript
export default function B2CLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* Add other preconnects */}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Run Lighthouse audit**

```bash
npm run build
npm run start &
npx lighthouse http://localhost:3000/b2c --view
```

Check:
- **Performance:** > 85
- **Accessibility:** > 90
- **Best Practices:** > 90
- **SEO:** > 90

- [ ] **Step 5: Fix any Lighthouse issues**

Common fixes:
- Reduce unused CSS (purge unused Tailwind classes)
- Defer non-critical JS
- Optimize images (next/image handles most)
- Add proper alt text (verify)
- Ensure tap targets >= 44px

---

## Task 4.4: Build Verification

**Files:**
- Test: All build commands

- [ ] **Step 1: Type check**

```bash
./node_modules/.bin/tsc --noEmit
```

Expected: No errors

- [ ] **Step 2: Build B2C variant**

```bash
npm run build:b2c
```

Expected: Build succeeds, no errors

- [ ] **Step 3: Preview B2C build**

```bash
npm run start
```

Visit `/b2c`, verify:
- All sections render
- Images load
- Form submits
- No console errors

- [ ] **Step 4: Build B2B (regression check)**

```bash
npm run build:b2b
```

Expected: B2B still builds without errors (verify we didn't break shared code)

---

## Task 4.5: QA Checklist Completion

- [ ] **Visual QA:**
  - [ ] Hero image displays correctly on all sizes
  - [ ] Tour cards: images, prices, badges render
  - [ ] Testimonials: avatars, quotes, ratings visible
  - [ ] MetricBar: icons and numbers aligned
  - [ ] Form: all inputs styled, error states work
  - [ ] Footer: links and contact info

- [ ] **Functional QA:**
  - [ ] TourCard CTA click triggers event/scroll-to-form
  - [ ] Testimonials scroll smooth on mobile
  - [ ] Form validation: empty fields, invalid email, invalid phone
  - [ ] Form submission: success message, API logs
  - [ ] Navigation links scroll to sections
  - [ ] Responsive breakpoints: 320px → 1920px

- [ ] **Content QA:**
  - [ ] All Vietnamese copy is natural, no placeholder text
  - [ ] Prices formatted correctly (2.490.000đ)
  - [ ] No hardcoded secrets in source
  - [ ] Images have descriptive alt text
  - [ ] SEO meta tags populated

- [ ] **Accessibility QA:**
  - [ ] All interactive elements have `:focus` styles
  - [ ] Form inputs have associated `<label>` elements
  - [ ] Images have meaningful `alt` attributes
  - [ ] Color contrast meets WCAG AA
  - [ ] Skip links if needed (for long pages)

- [ ] **Performance QA:**
  - [ ] Page load < 3s on 3G simulation
  - [ ] No layout shift (CLS < 0.1)
  - [ ] Images lazy loaded below fold
  - [ ] Font loading doesn't cause FOIT

---

## Task 4.6: Final Commit & Documentation

**Files:**
- Update: `docs/architecture/current-structure.md` (run governance sync)
- Update: `PROGRESS.md`
- Commit: All changes

- [ ] **Step 1: Update governance docs**

```bash
npm run sync:governance
```

- [ ] **Step 2: Final PROGRESS.md update**

Mark all phases as complete.

- [ ] **Step 3: Create final commit**

```bash
git add .
git commit -m "feat(b2c): launch Vietnam Tours landing page with Vietnam Vibes design

- Add Vietnam Vibes color palette (jade, gold, sunset, ocean)
- Create TourCard component with pricing display
- Add TestimonialCard with ratings
- Implement MetricBar for trust metrics
- Extend lead validation for B2C tour selection
- Update B2C content with 6 tour packages
- Add responsive testing and SEO metadata
- Performance optimization and Lighthouse fixes

Target: mass-market Vietnamese travelers with value-first messaging
Conversion: Lead capture with tour-specific interests

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

- [ ] **Step 4: Push to remote**

```bash
git push origin main
```

---

## Deployment Notes

**Environment Variables Required:**
- `LEADS_MAIL_PROVIDER=resend`
- `LEADS_MAIL_API_KEY=re_xxx`
- `LEADS_MAIL_TO=team@chalotravel.com`
- `LEADS_MAIL_FROM=leads@chalotravel.com`

**Preview Deployment:**
- Deploy to staging/Vercel preview
- Test `/b2c` route with real content
- Verify lead form submits and emails received

**Production Deployment:**
- Set `LANDING_VARIANT=b2c` for B2C deployment
- Set custom domain if applicable
- Monitor lead volume for first 24 hours

---

## Post-Launch Checklist

- [ ] Analytics tracking confirmed (events firing)
- [ ] Email notifications received by sales team
- [ ] No console errors in production build
- [ ] 404s on missing images (upload tour photos)
- [ ] Monitor conversion rate, optimize if needed
- [ ] Set up alerts for lead volume spikes or drops

---

## Phase Completion

Once all tasks above are complete, the B2C Vietnam Tours landing page is production-ready.

**Estimated timeline:** 2-3 days for single developer
**Dependencies:** Phase 1 → Phase 2 → Phase 3 → Phase 4

Record actual completion in `PROGRESS.md`.
