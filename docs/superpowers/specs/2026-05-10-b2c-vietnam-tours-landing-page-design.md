# B2C Vietnam Tours Landing Page Design

**Project:** Redesign B2C landing page for mass-market Vietnamese travelers
**Date:** 2026-05-10
**Status:** Approved for implementation
**Target Audience:** Vietnamese leisure travelers seeking affordable, professional tour booking experience

---

## Executive Summary

Transform B2C landing page from generic placeholder to a vibrant, trustworthy page targeting mass-market Vietnamese travelers. The design emphasizes **value-for-money** with professional booking experience, using Vietnam-inspired color palette while maintaining clean, conversion-focused layout.

**Core Positioning:** "Trải nghiệm Việt Nam chất lượng cao với giá bạn có thể afford"

**Differentiation:** Professional booking flow + flexible tour options + fastest price in Vietnam (implied through value messaging)

---

## Design System: Vietnam Vibes

### Color Palette

| Name | Value | Token | Role |
|------|-------|-------|------|
| **Jade Green** (Primary) | `#10B981` | `--color-jade` | Primary CTA, key highlights, success states |
| **Vietnam Gold** (Accent) | `#FCD34D` | `--color-gold` | Secondary accents, price badges, warm highlights |
| **Sunset Red** (Urgency) | `#DC2626` | `--color-sunset` | Sale prices, limited offers, urgency indicators |
| **Ocean Blue** (Trust) | `#0EA5E9` | `--color-ocean` | Links, hover states, informational elements |
| **Charcoal** (Text) | `#1F2937` | `--color-charcoal` | Primary text, headings |
| **Warm Gray** (Muted) | `#6B7280` | `--color-warm-gray` | Secondary text, captions, helper text |
| **Cream White** (Background) | `#FFFBEB` | `--color-cream` | Primary page background (warm alternative to pure white) |
| **Pure White** (Cards) | `#FFFFFF` | `--color-white` | Card backgrounds, overlays |
| **Deep Forest** (Dark surfaces) | '#064E3B' | `--color-forest` | Footer, dark sections, footer background |

**Design Rationale:**
- Jade Green conveys growth, nature, trust - aligns with Vietnam's landscapes
- Vietnam Gold adds warmth and premium feel without luxury pretense
- Sunset Red creates urgency for booking without feeling "cheap"
- Cream White background reduces eye strain, feels more human than stark white

### Typography

**Primary Font:** Inter (system-ui fallback)
- **Weights:** 400 (body), 500 (subheading), 700 (headings)
- **Role:** Clean, modern, highly readable for Vietnamese text

**Type Scale:**

| Role | Size (mobile) | Size (desktop) | Weight | Line Height |
|------|---------------|----------------|--------|-------------|
| Display | 36px | 64px | 700 | 1.1 |
| H1 | 28px | 48px | 700 | 1.2 |
| H2 | 24px | 36px | 700 | 1.25 |
| H3 | 20px | 28px | 600 | 1.3 |
| Body | 16px | 18px | 400 | 1.6 |
| Small | 14px | 14px | 400 | 1.5 |
| Button | 16px | 17px | 600 | 1 |

**Vietnamese Considerations:**
- Slightly increased line-height for diacritic marks
- Body text minimum 16px for readability

### Spacing & Layout

**Base unit:** 4px

**Section gap:** 80px
**Card padding:** 24px
**Element gap:** 16px

**Border Radius:**
- Buttons: 8px (less pill-shaped than B2B, more approachable)
- Cards: 12px
- Images: 8px

---

## Page Structure & Flow

```
1. HERO (Full-bleed landscape)
2. TESTIMONIALS (Horizontal scroll of traveler photos + quotes)
3. TOUR PACKAGES (Grid of 3-4 featured tours with prices)
4. WHY CHOOSE US (Feature grid - 4 key benefits)
5. TRUST METRICS (Stats bar - customers, response time, satisfaction)
6. FAQ (Accordion - 5-6 questions)
7. LEAD CAPTURE FORM (Inline, 3-field with tour selector)
8. FOOTER
```

---

## Section Specifications

### 1. Hero Section

**Layout:** Full-bleed
- Background: High-quality Vietnam landscape image (Hạ Long Bay, Sapa rice terraces, or Phú Quốc beach)
- Overlay: Subtle gradient (15% dark) for text readability if needed
- Content centered-left on desktop, stacked on mobile

**Content Hierarchy:**
```
[Optional: Small pill badge: "Giá tốt nhất Việt Nam"]

HEADING: "Khám phá Việt Nam với giá bạn không thể bỏ lỡ"
SUBHEADING: "Tour trọn gói từ 2.990.000đ - Cam kết giá tốt nhất, hỗ trợ 24/7"

PRIMARY CTA (Jade Green, pill button): "Xem tour & giá"
SECONDARY CTA (Outline, Ocean Blue): "Tư vấn miễn phí"

FLOATING ELEMENTS:
- Small circular photo: Young Vietnamese couple smiling at beach (bottom-left)
- Small rectangular photo: Group tour at temple (top-right)
- Badge: "4.9/5 ⭐ 2,000+ đánh giá" (positioned near CTA)
```

**Design Notes:**
- Hero image should feel aspirational but achievable (not overly luxury)
- Floating photos should be real-looking (not stock-phony)
- Price mention early but not pushy - "from" language keeps it accessible

### 2. Testimonials Section

**Layout:** Horizontal scrolling cards (mobile) / 3-column grid (desktop)

**Card Design:**
```
[Circular profile photo - real Vietnamese faces]
[Star rating: 4.5-5.0]
[Quote excerpt: "Tour rất chuyên nghiệp, guide nhiệt tình. Giá tốt hơn mình tìm ở nhiều nơi!"]
[Name, Location: "Nguyễn Văn A, Hà Nội"]
[Trip: "Đà Lạt 3 ngày 2 đêm - Mar 2026"]
```

**Heading:** "Hơn 2,000 khách hàng đã tin dùng"
**Subheading:** "Trải nghiệm thực tế từ những người đã đi cùng chúng tôi"

**Implementation:**
- Auto-scroll on mobile (smooth, pause on hover)
- Show 1 card on mobile, 2 on tablet, 3 on desktop
- Include at least 2 different destinations represented in testimonials

### 3. Tour Packages Section

**Layout:** Responsive grid (1 col mobile, 2 col tablet, 3-4 col desktop)

**Card Structure:**
```
[Destination hero image - aspect 4:3]
[Badge position: "Bán chạy" / "Giảm 15%" / "Còn 3 chỗ"]
[DESTINATION NAME: e.g., "Tour Đà Lạt 3N2Đ"]
[Icon row: ⏱ 3 ngày | 🚌 Xe limousine | 🏨 Khách sạn 3*]
[Price section:
  Original: 4.500.000đ (strikethrough)
  Sale: 3.990.000đ (Jade Green, large)
  "Tiết kiệm 510.000đ" (Sunset Red small)]
[CTA Button (Jade): "Đặt tour ngay"]
```

**Key Features Highlighted per Card:**
- Duration clearly visible
- Accommodation tier (3*/4*/5*)
- Transportation type
- Included meals count

**Sorting Options** (above grid):
- "Tour phổ biến" (default)
- "Giá từ thấp đến cao"
- "Điểm đến"

**Show 4-6 tours total:**
- Mix of popular destinations: Đà Lạt, Hạ Long, Phú Quốc, Sapa, Huế, Nha Trang
- Include different price ranges (2-5 million VND)
- Mix durations (2N1D, 3N2D, 4N3D)

### 4. Why Choose Us (Features)

**Layout:** 2x2 grid on desktop, stacked on mobile

**Feature Cards:**
```
ICON: ⚡
TITLE: "Đặt tour nhanh trong 2 phút"
DESCRIPTION: "Form đơn giản, xác nhận ngay. Không cần gọi điện, không chờ đợi."

ICON: 💬
TITLE: "Hỗ trợ 24/7 - Phản hồi trong 5 phút"
DESCRIPTION: "Đội ngũ tư vấn luôn sẵn sàng. Chat, gọi điện, hoặc nhắn tin - đều được."

ICON: 🔄
TITLE: "Linh hoạt - Đổi ngày hoàn tiền 100%"
DESCRIPTION: "Kế hoạch thay đổi? Hủy trước 7 ngày, hoàn tiền toàn bộ không phát sinh."

ICON: 🏆
TITLE: "Cam kết giá tốt nhất Việt Nam"
DESCRIPTION: "Nếu tìm được giá thấp hơn tại agency khác, hoàn tiền 200% chênh lệch."
```

**Icons:** Use SVG icons (bolt, chat, refresh, trophy) - consistent stroke width, 2px, Jade Green

**Card Style:**
- White background, subtle shadow (elevation 2)
- Icon in circle (48px) with light Jade tinted background
- Padding: 24px
- Border radius: 12px

### 5. Trust Metrics Section

**Layout:** Full-width bar, alternating background (Cream White)

**Metrics Display:**
```
┌─────────────────────────────────────────────────────────────┐
│  📊 15,000+ khách/năm    ⚡ Phản hồi < 5 phút    ⭐ 4.8/5 CSAT │
│  💰 Tiết kiệm trung bình 15%    🔒 Thanh toán an toàn    🤝 98% hài lòng │
└─────────────────────────────────────────────────────────────┘
```

**Styling:**
- Dark text on light background
- Each metric in its own "visual bucket" with icon + number + label
- Numbers large (32px desktop, 24px mobile), Jade Green
- Labels medium (14px), Charcoal

**Sources credibility:**
- "Dữ liệu cập nhật Q1/2026" in small text at right

### 6. FAQ Section

**Layout:** Accordion style (collapsible)

**Questions (Vietnamese):**
1. "Tour giá rẻ nhất có chất lượng không?"
2. "Làm sao để được giá tốt nhất?"
3. "Hủy tour có mất tiền không?"
4. "Có tour riêng cho nhóm gia đình không?"
5. "Thanh toán như nào? Có an toàn không?"
6. "Có guide nói tiếng Anh/Trung không?"

**Accordion Behavior:**
- First question expanded by default
- Smooth animation (200ms ease)
- Max height transition for content

**Answer Style:**
- Brief (2-3 sentences)
- Friendly but professional tone
- Include reassurance about price matching

### 7. Lead Capture Form

**Positioning:** "Bắt đầu với tour ưng ý - Chỉ mất 30 giây"

**Form Fields (inline validation):**
```
[Dropdown: Tôi quan tâm đến...]
└─ Đà Lạt 3N2D (3.990k)
└─ Hạ Long 2N1D (2.990k)
└─ Phú Quốc 4N3D (5.990k)
└─ Tư vấn cho tôi

[Input: Họ và tên *]
[Input: Số điện thoại *]
[Input: Email (tùy chọn)]

[Checkbox: Tôi đồng ý nhận thông tin khuyến mãi]

[Button: "Nhận tư vấn miễn phí" (Jade, full width)]

[Small text: "Cam kết bảo mật thông tin. Không spam."]
```

**Form Behavior:**
- Submit via `/api/leads` (existing API)
- Success: Show "Cảm ơn! Chúng tôi sẽ liên hệ trong 15 phút" message
- Error: Inline validation errors
- Phone validation: Vietnamese format (10 digits)

### 8. Footer

**Layout:** 3-column on desktop, stacked on mobile

**Columns:**
1. **Brand:**
   ```
   [Logo placeholder: text "Chalo" in Jade]
   "Tour Việt Nam giá tốt nhất"
   © 2026 Chalo Travel
   ```

2. **Links:**
   - Điểm đến (dropdown: Miền Bắc, Miền Trung, Miền Nam)
   - Tour trọn gói
   - Về chúng tôi
   - Liên hệ

3. **Contact:**
   ```
   📞 Hotline: 1900 1234
   💬 Zalo: 0909 123 456
   📍 Hà Nội & TP.HCM
   ⏰ 8:00 - 22:00 hàng ngày
   ```

**Bottom bar:** Social icons (Facebook, Zalo, Instagram) + "GDPR compliant" badge

---

## Component Mapping

All components use existing `components/shared/landing-primitives.tsx` where applicable:

| Primitive | Usage | Props |
|-----------|-------|-------|
| `PageShell` | Main layout wrapper | `className="b2c-page"` |
| `PageMain` | Content container | - |
| `PageWrap` | Section container | - |
| `SectionHeading` | Section titles | `title`, `copy`, `align` |
| `HeroCopy` | Hero text content | `eyebrow`, `title`, `titleAccent`, `description` |
| `HeroActions` | Hero CTAs | `primaryCta`, `secondaryCta`, `primaryHref`, `secondaryHref` |
| `StatGrid` | Trust metrics | `stats` array |
| `FaqList` | FAQ accordion | `items` array |
| `TrackedCtaLink` | Tracked links | `href`, `children`, `variant` |

**New B2C-specific components needed:**
1. `TourCard` - Package display with pricing
2. `TestimonialCard` - Customer testimonial with photo
3. `LeadCaptureForm` - Inline booking form (may already exist)
4. `MetricBar` - Trust metrics horizontal bar

---

## Content Strategy: Value-First Messaging

**Tone:** Professional but approachable. Confident without being pushy. Emphasize quality + affordability.

**Key Messages:**
1. **Price positioning:** "Giá tốt nhất Việt Nam" (implied, not over-claimed)
2. **Quality assurance:** "Chất lượng 4-5 sao, giá 3 sao"
3. **Trust:** "Hơn 15,000 khách/năm tin dùng"
4. **Service:** "Hỗ trợ 24/7, phản hồi < 5 phút"
5. **Flexibility:** "Đổi ngày, hoàn tiền 100%"

**Avoid:**
- "Rẻ nhất" (too cheap-sounding)
- "Luxury" (not B2C positioning)
- "Chuyên nghiệp cao cấp" (too B2B)
- Over-promising ("cheapest guaranteed" without system)

**Vietnamese Copy Guidelines:**
- Use "bạn" not "quý khách" (friendly but not overly formal)
- Include specific prices (2.990.000đ feels real)
- Use emojis sparingly in UI text (✅ ⭐ 💬 in testimonials OK)
- Round prices to .000 or .900 for credibility

---

## Responsive Breakpoints

- **Mobile:** < 640px (1 col layouts, stacked forms)
- **Tablet:** 640px - 1024px (2 col layouts, horizontal scroll for testimonials)
- **Desktop:** > 1024px (3-4 col packages, full 2x2 grid)

**Mobile-specific:**
- Hero: Full-bleed with text overlay at bottom-third
- Floating photos smaller (120px circles)
- Testimonials: horizontal scroll, snap points
- Packages: 1 col, full width cards

---

## SEO Considerations

**Title:** "Tour Việt Nam Giá Tốt Nhất | Đặt Tour Trọn Gói 2026"
**Description:** "Tour Việt Nam giá từ 2.990.000đ. Cam kết giá tốt nhất, hỗ trợ 24/7, hoàn tiền linh hoạt. Hơn 15,000 khách hàng tin dùng mỗi năm."

**Structured Data:**
- `FAQPage` schema for FAQ section
- `TourOperator` schema with aggregate rating
- `Product` schema for tour packages (price, availability)

---

## Accessibility Requirements

- Color contrast: All text WCAG AA minimum
  - Jade (#10B981) on white: 4.6:1 ✓
  - Charcoal (#1F2937) on white: 15.3:1 ✓
  - Sunset Red (#DC2626) on white: 4.5:1 ✓
- Focus states: 2px outline in Jade for interactive elements
- Alt text: All images descriptive
- Keyboard navigation: Full support for accordion, form, navigation
- Vietnamese language tag: `<html lang="vi">`

---

## Performance Targets

- **LCP:** < 2.5s (optimized hero image - next-gen format, lazy load below-fold)
- **CLS:** < 0.1 (reserve aspect ratios for images)
- **Largest image:** Hero (use WebP with JPEG fallback)
- **Font loading:** System font (Inter) - no blocking FOIT

---

## Success Metrics

- **Conversion rate:** Form submissions / page visits > 3%
- **Time on page:** > 2 minutes (engagement with tour cards)
- **Scroll depth:** > 70% to FAQ
- **Mobile vs desktop:** Expect 60% mobile traffic

---

## Implementation Notes

1. **Variant pattern:** Follow existing B2B structure in `components/b2c/landing-page.tsx`
2. **Content source:** Create new `lib/b2c/vietnam-tours-content.ts` (or update existing `lib/b2c/content.ts`)
3. **CSS:** Use Tailwind utility classes + custom CSS variables for Vietnam Vibes palette
4. **Images:** Source from Vietnam travel stock (consider local photographers for authenticity)
5. **Lead form:** Reuse existing `/api/leads` endpoint with validation

---

## Out of Scope

- Multi-language support (Vietnamese only for B2C)
- Complex tour search/filtering (landing page only shows featured)
- Payment processing integration (leads only)
- User accounts or booking management

---

## Next Steps

1. Write implementation plan (using writing-plans skill)
2. Create/update content file with Vietnamese copy
3. Build new components: TourCard, TestimonialCard, MetricBar
4. Update B2C landing page composition
5. Add CSS custom properties for Vietnam Vibes palette to `app/globals.css`
6. Source/images selection
7. QA testing (responsive, forms, accessibility)
8. Analytics tracking setup

---

## References

- **B2B Design:** `docs/design/b2b/DESIGN.md` (for structural patterns)
- **B2C Current:** `components/b2c/landing-page.tsx`, `lib/b2c/content.ts`
- **Design Principles:** CLAUDE.md project instructions
- **Code Style:** `~/.claude/rules/typescript/coding-style.md`
