# B2C Vietnam Tours - Phase 1: Architecture & Content Infrastructure

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish design system foundation and content data structures for B2C Vietnam Tours landing page

**Architecture:** Extend existing variant-based architecture with Vietnam Vibes color palette, add tour package content type, extend lead validation for B2C fields

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, existing lead API, Vietnam Vibes color palette

---

## Task 1.1: Vietnam Vibes Color Palette CSS Variables

**Files:**
- Modify: `app/globals.css`
- Test: Manual browser verification

- [ ] **Step 1: Add Vietnam Vibes color variables to globals.css**

Open `app/globals.css` and add these CSS custom properties in the `:root` selector:

```css
:root {
  /* Existing variables remain... */

  /* Vietnam Vibes Palette - B2C */
  --color-jade: #10B981;
  --color-jade-light: #D1FAE5;
  --color-jade-dark: #065F46;

  --color-gold: #FCD34D;
  --color-gold-light: #FEF3C7;
  --color-gold-dark: #D97706;

  --color-sunset: #DC2626;
  --color-sunset-light: #FEE2E2;
  --color-sunset-dark: #B91C1C;

  --color-ocean: #0EA5E9;
  --color-ocean-light: #E0F2FE;
  --color-ocean-dark: #0369A1;

  --color-charcoal: #1F2937;
  --color-warm-gray: #6B7280;
  --color-cream: #FFFBEB;
  --color-forest: #064E3B;
}
```

- [ ] **Step 2: Add B2C-specific CSS classes**

Still in `app/globals.css`, add these utility classes:

```css
/* B2C Vietnam Tours - Color Utilities */
.bg-jade { background-color: var(--color-jade); }
.bg-jade-light { background-color: var(--color-jade-light); }
.bg-gold { background-color: var(--color-gold); }
.bg-sunset { background-color: var(--color-sunset); }
.bg-ocean { background-color: var(--color-ocean); }
.bg-charcoal { background-color: var(--color-charcoal); }
.bg-cream { background-color: var(--color-cream); }

.text-jade { color: var(--color-jade); }
.text-gold { color: var(--color-gold); }
.text-sunset { color: var(--color-sunset); }
.text-ocean { color: var(--color-ocean); }
.text-charcoal { color: var(--color-charcoal); }
.text-warm-gray { color: var(--color-warm-gray); }

.border-jade { border-color: var(--color-jade); }
.btn-jade {
  background-color: var(--color-jade);
  color: white;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
}
.btn-jade:hover {
  background-color: var(--color-jade-dark);
}
```

- [ ] **Step 3: Verify CSS compiles**

Run dev server and verify no CSS errors:

```bash
npm run dev
# Check terminal for any compilation errors
# Visit http://localhost:3000/b2c to see page loads without CSS issues
```

Expected: No errors, B2C page renders with existing styles intact.

---

## Task 1.2: Tour Package Content Type Definition

**Files:**
- Modify: `lib/landing-content.ts`
- Test: TypeScript compilation

- [ ] **Step 1: Review current LandingContent interface**

Read `lib/landing-content.ts` to understand existing structure:

```bash
cat lib/landing-content.ts
```

Note current fields: hero, stats, features, proof, faq, footer, seo, etc.

- [ ] **Step 2: Add TourPackage interface**

In `lib/landing-content.ts`, add these type definitions after existing interfaces:

```typescript
export interface TourPackage {
  id: string;
  destination: string;
  duration: string; // e.g., "3N2D", "2N1D"
  durationNights: number;
  durationDays: number;
  title: string; // e.g., "Tour Đà Lạt 3 ngày 2 đêm"
  description: string;
  heroImage: {
    src: string;
    alt: string;
  };
  priceOriginal: number; // in VND, e.g., 4500000
  priceSale: number;
  highlights: string[]; // icons as text: "⏱ 3 ngày", "🚌 Xe limousine"
  accommodation: string; // "Khách sạn 3*", "Resort 4*"
  inclusions: string[]; // what's included
  availability: number; // remaining spots, optional
  badge?: "best-seller" | "limited" | "sale" | undefined;
}

export interface TourPackagesContent {
  title: string;
  subtitle: string;
  packages: TourPackage[];
  showPriceRange: boolean;
  sortOptions: ("popular" | "price-asc" | "price-desc" | "destination")[];
}
```

- [ ] **Step 3: Add tourPackages to LandingContent**

Update the main `LandingContent` interface to include:

```typescript
export interface LandingContent {
  // ... existing fields ...
  tourPackages?: TourPackagesContent;
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
./node_modules/.bin/tsc --noEmit
```

Expected: No type errors.

---

## Task 1.3: Create B2C Vietnam Tours Content Data

**Files:**
- Create: `lib/b2c/vietnam-tours-content.ts`
- Modify: `lib/b2c/content.ts` (optional - may need to update exports)
- Test: TypeScript compilation

- [ ] **Step 1: Create vietnam-tours-content.ts with 6 tour packages**

Create file `lib/b2c/vietnam-tours-content.ts`:

```typescript
import type { LandingContent, TourPackage, TourPackagesContent } from "@/lib/landing-content";

const shared = {
  brand: "Chalo Travel",
  language: "vi" as const,
  variantLabel: "B2C Vietnam Tours"
};

const tourPackages: TourPackagesContent = {
  title: "Tour bán chạy nhất",
  subtitle: "Điểm đến phổ biến với giá tốt nhất",
  packages: [
    {
      id: "dalat-3n2d",
      destination: "Đà Lạt",
      duration: "3N2D",
      durationNights: 3,
      durationDays: 2,
      title: "Tour Đà Lạt 3 ngày 2 đêm",
      description: "Khám phá thành phố ngàn hoa, làng Cù Lần và đồi chè Cầu Đất",
      heroImage: {
        src: "/tour/dalat-valley.jpg",
        alt: "Làng Cù Lần ở Đà Lạt với những ngôi nhà gỗ truyền thống"
      },
      priceOriginal: 4500000,
      priceSale: 3990000,
      highlights: ["⏱ 3 ngày", "🚌 Xe limousine", "🏨 Khách sạn 3*", "🍽 5 bữa ăn"],
      accommodation: "Khách sạn 3 sao",
      inclusions: ["Vé tham quan", "Hướng dẫn viên", "Xe đưa đón", "Khách sạn", "Bữa ăn theo chương trình"],
      availability: 12,
      badge: "best-seller"
    },
    {
      id: "halong-2n1d",
      destination: "Vịnh Hạ Long",
      duration: "2N1D",
      durationNights: 2,
      durationDays: 1,
      title: "Tour Vịnh Hạ Long 2 ngày 1 đêm",
      description: "Thuyền kayak, hang động, đảo ăn tối trên thuyền",
      heroImage: {
        src: "/tour/halong-bay.jpg",
        alt: "Vịnh Hạ Long với các hòn đảo đá vôi nhấp nhô trên biển xanh"
      },
      priceOriginal: 3200000,
      priceSale: 2990000,
      highlights: ["⏱ 2 ngày", "🚢 Thuyền ngủ đêm", "🛶 Kayak", "🏨 Khách sạn 3*"],
      accommodation: "Thuyền/charter 4 sao",
      inclusions: ["Vé tàu", "Khách sạn/đêm thuyền", "Hướng dẫn viên", "Bữa ăn theo chương trình"],
      availability: 8,
      badge: "limited"
    },
    {
      id: "phuquoc-4n3d",
      destination: "Phú Quốc",
      duration: "4N3D",
      durationNights: 4,
      durationDays: 3,
      title: "Tour Phú Quốc 4 ngày 3 đêm",
      description: "Biển xanh cát trắng, VinWonders, đảo nam chèm",
      heroImage: {
        src: "/tour/phu-quoc-beach.jpg",
        alt: "Bãi biển cát trắng ở Phú Quốc với nước biển trong xanh"
      },
      priceOriginal: 7500000,
      priceSale: 5990000,
      highlights: ["⏱ 4 ngày", "🏖️ Bãi biển riêng", "🎢 VinWonders", "🚗 Xe riêng"],
      accommodation: "Resort 3-4 sao",
      inclusions: [" Vé công viên", "Tham quan đảo", "Xe đưa đón sân bay", "Khách sạn"],
      availability: 25,
      badge: undefined
    },
    {
      id: "sapa-3n2d",
      destination: "Sapa",
      duration: "3N2D",
      durationNights: 3,
      durationDays: 2,
      title: "Tour Sapa 3 ngày 2 đêm",
      description: "Fansipan, làng bản độc vị, thổ cẩm, homestay người dân tộc",
      heroImage: {
        src: "/tour/sapa-rice-terraces.jpg",
        alt: "Ruộng bậc thang Sapa với núi cao vờn quanh"
      },
      priceOriginal: 4800000,
      priceSale: 4290000,
      highlights: ["⏱ 3 ngày", "🏔️ Fansipan", "🏘️ Homestay", "👘 Trải nghiệm thổ cẩm"],
      accommodation: "Homestay + khách sạn",
      inclusions: ["Vé cáp treo Fansipan", "Homestay", "Hướng dẫn viên", "Bữa ăn địa phương"],
      availability: 15,
      badge: undefined
    },
    {
      id: "hue-2n1d",
      destination: "Huế",
      duration: "2N1D",
      durationNights: 2,
      durationDays: 1,
      title: "Tour Huế 2 ngày 1 đêm",
      description: "Đại Nội, lăng tẩm vua chúa, sông Hương thuyền rồng",
      heroImage: {
        src: "/tour/hue-citadel.jpg",
        alt: "Đại Nội Huế với kiến trúc xưa cũ"
      },
      priceOriginal: 2800000,
      priceSale: 2490000,
      highlights: ["⏱ 2 ngày", "🏯 Đại Nội", "🚣 Thuyền sông Hương", "🍜 Bún bò Huế"],
      accommodation: "Khách sạn 3 sao trung tâm",
      inclusions: ["Vé tham quan", "Hướng dẫn viên", "Xe đưa đón", "Bữa ăn đặc trưng"],
      availability: 30,
      badge: "sale"
    },
    {
      id: "nhatrang-3n2d",
      destination: "Nha Trang",
      duration: "3N2D",
      durationNights: 3,
      durationDays: 2,
      title: "Tour Nha Trang 3 ngày 2 đêm",
      description: "Biển, lễ hội, tháp bà Ponagar, vinpearl",
      heroImage: {
        src: "/tour/nha-trang-beach.jpg",
        alt: "Bãi biển Nha Trang với bãi cát dài và nước biển trong"
      },
      priceOriginal: 5200000,
      priceSale: 4590000,
      highlights: ["⏱ 3 ngày", "🏖️ Biển Nha Trang", "🏛️ Tháp Bà", "🎡 Vinpearl"],
      accommodation: "Khách sạn 3-4 sao gần biển",
      inclusions: ["Vé Vinpearl", "Tham quan đảo", "Nhà hàng hải sản", "Xe đưa đón"],
      availability: 20,
      badge: undefined
    }
  ],
  showPriceRange: true,
  sortOptions: ["popular", "price-asc", "destination"]
};

export const b2cVietnamToursContent: LandingContent = {
  ...shared,
  tourPackages,
  // Other sections will be populated in later phases
  // For now, placeholder values
  hero: {
    eyebrow: "Giá tốt nhất Việt Nam",
    title: "Khám phá Việt Nam với giá bạn không thể bỏ lỡ",
    titleAccent: "trải nghiệm đáng giá",
    description: "Tour trọn gói từ 2.490.000đ - Cam kết giá tốt nhất, hỗ trợ 24/7, hoàn tiền linh hoạt.",
    primaryCta: "Xem tour & giá",
    secondaryCta: "Tư vấn miễn phí",
    image: {
      src: "/b2b-hero-vietnam-tour.jpg",
      alt: "Khách du lịch thưởng thức cảnh quan Việt Nam",
      eyebrow: "Trải nghiệm đáng giá",
      contextLabel: "Vietnam Tours",
      title: "Giá tốt, chất lượng cao",
      description: "Hơn 15.000 khách mỗi năm tin dùng",
      highlights: ["Giá tốt nhất", "Hỗ trợ 24/7", "Hoàn tiền linh hoạt"]
    }
  },
  stats: [
    { value: "15,000+", label: "khách/năm" },
    { value: "< 5 phút", label: "phản hồi trung bình" },
    { value: "4.8/5", label: "đánh giá trung bình" },
    { value: "98%", label: "tỷ lệ hài lòng" }
  ],
  features: [
    {
      title: "Đặt tour nhanh trong 2 phút",
      description: "Form đơn giản, xác nhận ngay. Không cần gọi điện, không chờ đợi."
    },
    {
      title: "Hỗ trợ 24/7 - Phản hồi trong 5 phút",
      description: "Đội ngũ tư vấn luôn sẵn sàng qua chat, gọi điện, hoặc nhắn tin."
    },
    {
      title: "Linh hoạt - Đổi ngày hoàn tiền 100%",
      description: "Hủy trước 7 ngày, hoàn tiền toàn bộ không phát sinh. Thay đổi lịch trình dễ dàng."
    },
    {
      title: "Cam kết giá tốt nhất Việt Nam",
      description: "Nếu tìm được giá thấp hơn tại agency khác, hoàn tiền 200% chênh lệch."
    }
  ],
  proof: {
    title: "Tour giá tốt nhưng vẫn chất lượng cao",
    description: "Chúng tôi đàm phán trực tiếp với nhà cung cấp dịch vụ, bỏ qua trung gian để mang đến giá tốt nhất mà vẫn giữ chất lượng."
  },
  faq: [
    {
      question: "Tour giá rẻ nhất có chất lượng không?",
      answer: "Tuyệt đối. Chúng tôi cam kết chất lượng 3-4 sao với giá tốt nhất. Nếu bạn tìm thấy cùng tour đó giá thấp hơn ở agency khác, chúng tôi hoàn tiền 200% chênh lệch."
    },
    {
      question: "Làm sao để được giá tốt nhất?",
      answer: "Đặt tour trực tiếp qua website, thanh toán trước ít nhất 7 ngày để nhận mức giá tốt nhất. Nhóm từ 4 người còn được giảm thêm."
    },
    {
      question: "Hủy tour có mất tiền không?",
      answer: "Hủy trước 7 ngày: hoàn tiền 100%. Hủy 3-7 ngày: hoàn 50%. Sau 3 ngày: không hoàn tiền. Bạn có thể chuyển sang tour khác với cùng giá trị."
    },
    {
      question: "Có tour riêng cho nhóm gia đình không?",
      answer: "Có! Chúng tôi có các tour family package với phòng gia đình, lịch trình linh hoạt và trẻ em giảm 50%. Liên hệ để được tư vấn riêng."
    },
    {
      question: "Thanh toán như nào? Có an toàn không?",
      answer: "Chúng tôi chấp nhận chuyển khoản ngân hàng, MoMo, và thẻ Visa/Mastercard. Tất cả giao dịch đều được mã hóa SSL. Không lưu thông tin thẻ trên server."
    },
    {
      question: "Có guide nói tiếng Anh/Trung không?",
      answer: "Có. Các tour quốc tế đều có guide nói tiếng Anh. Một số tour phổ biến với khách Trung Quốc có guide song ngữ. Vui lòng ghi chú khi đặt tour."
    }
  ],
  footer: {
    description: "Tour Việt Nam giá tốt nhất, hỗ trợ 24/7, hoàn tiền linh hoạt.",
    nav: [
      { label: "Điểm đến", href: "#packages" },
      { label: "Về chúng tôi", href: "#about" },
      { label: "FAQ", href: "#faq" },
      { label: "Liên hệ", href: "#contact" }
    ],
    utilityLinks: [{ label: "Xem tour ngay", href: "#packages" }],
    copyright: "© 2026 Chalo Travel. All rights reserved."
  },
  finalCta: {
    eyebrow: "Bắt đầu ngay hôm nay",
    title: "Đặt tour - Nhận báo giá trong 15 phút",
    description: "Form đơn giản, không cần gọi điện. Tư vấn viên sẽ liên hệ ngay với bạn."
  },
  seo: {
    title: "Tour Việt Nam Giá Tốt Nhất | Chalo Travel 2026",
    description: "Tour Việt Nam giá từ 2.490.000đ. Cam kết giá tốt nhất, hỗ trợ 24/7, hoàn tiền linh hoạt. Hơn 15,000 khách hàng tin dùng mỗi năm.",
    ogImagePath: "/og-image-b2c-tours.svg"
  }
};

export function getB2CVietnamToursContent(): LandingContent {
  return b2cVietnamToursContent;
}
```

- [ ] **Step 2: Update lib/b2c/content.ts to use new content**

Open `lib/b2c/content.ts` and update it:

```typescript
import type { LandingContent } from "@/lib/landing-content";
// Remove old content imports if any
import { getB2CVietnamToursContent } from "./vietnam-tours-content";

export { getB2CVietnamToursContent };
export type { LandingContent };

// If there was an existing b2cContent export, you can either:
// 1. Replace it entirely with the new content
// 2. Or keep old content for backward compatibility (not recommended)

// For clean break, do NOT export b2cContent - only getB2CVietnamToursContent
// The landing page component should call getB2CVietnamToursContent()
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
./node_modules/.bin/tsc --noEmit
```

Expected: No type errors.

---

## Task 1.4: Extend Lead Validation for B2C Tour Selection

**Files:**
- Modify: `lib/server/lead-validation.ts`
- Test: Create tests or manual validation check

**Context:** Current lead validation is designed for B2B (name, company, workEmail). B2C needs tour selection and Vietnamese phone number.

- [ ] **Step 1: Review current LeadSubmission interface**

Current fields: variant, name, company, workEmail, sourceMarket, requestDetails, pagePath, submittedAt, honeypot

B2C needs: tourPackageId, phoneNumber (optional - for SMS follow-up)

- [ ] **Step 2: Add B2C-specific fields to validation**

In `lib/server/lead-validation.ts`, after existing code, add:

```typescript
// B2C Tour Lead fields
export type B2CTourFieldName = "tourPackageId" | "phoneNumber";

export type ExtendedLeadFieldErrors = LeadFieldErrors & Partial<Record<B2CTourFieldName, string>>;

const VIETNAM_PHONE_REGEX = /^(0[3-9][0-9]{8})$/; // 10 digits, starts with 03-09

const TOUR_PACKAGE_IDS = [
  "dalat-3n2d",
  "halong-2n1d",
  "phuquoc-4n3d",
  "sapa-3n2d",
  "hue-2n1d",
  "nhatrang-3n2d"
];

export function validateB2CTourPayload(payload: unknown, baseValidation: LeadValidationResult): ExtendedLeadFieldErrors {
  if (!baseValidation.ok) {
    return baseValidation.fieldErrors as ExtendedLeadFieldErrors;
  }

  const fieldErrors: ExtendedLeadFieldErrors = {};

  // Validate tourPackageId if present (required for B2C tour form)
  if ("tourPackageId" in payload) {
    const tourPackageId = normalizeString(payload.tourPackageId as unknown as string, "sourceMarket"); // reuse limits
    if (!tourPackageId || !TOUR_PACKAGE_IDS.includes(tourPackageId)) {
      fieldErrors.tourPackageId = "Vui lòng chọn một tour hợp lệ.";
    }
  }

  // Validate phoneNumber if present (optional but if provided must be valid VN phone)
  if ("phoneNumber" in payload && payload.phoneNumber) {
    const phoneNumber = normalizeString(payload.phoneNumber as unknown as string, "sourceMarket");
    if (phoneNumber && !VIETNAM_PHONE_REGEX.test(phoneNumber)) {
      fieldErrors.phoneNumber = "Số điện thoại không hợp lệ. Vui lòng nhập 10 số, bắt đầu bằng 03-09.";
    }
  }

  return fieldErrors;
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
./node_modules/.bin/tsc --noEmit
```

Expected: No type errors.

---

## Task 1.5: Progress Tracking File

**Files:**
- Create: `docs/plan/b2c/PROGRESS.md`

- [ ] **Step 1: Create PROGRESS.md**

Create file with template:

```markdown
# B2C Vietnam Tours - Implementation Progress

## Overall Status

**Start Date:** 2026-05-10
**Target Completion:** TBD
**Current Phase:** 1/4 (Architecture & Content Infrastructure)

## Phase Completion

### Phase 1: Architecture & Content Infrastructure
- [ ] Task 1.1: Vietnam Vibes color palette CSS variables
- [ ] Task 1.2: Tour Package content type definition
- [ ] Task 1.3: Create B2C Vietnam Tours content data
- [ ] Task 1.4: Extend lead validation for B2C
- [ ] Phase 1 Review & Verification

**Phase 1 Status:** Not started

### Phase 2: Core Component Development
- [ ] Task 2.1: TourCard component
- [ ] Task 2.2: TestimonialCard component
- [ ] Task 2.3: MetricBar component
- [ ] Task 2.4: Update LeadCaptureForm for B2C
- [ ] Phase 2 Review & Verification

**Phase 2 Status:** Blocked on Phase 1

### Phase 3: Integration & API
- [ ] Task 3.1: Update leads API for tour selection
- [ ] Task 3.2: B2C email notification template
- [ ] Task 3.3: Form validation integration
- [ ] Task 3.4: Analytics tracking setup
- [ ] Phase 3 Review & Verification

**Phase 3 Status:** Blocked on Phase 2

### Phase 4: Polish, Testing & Deployment
- [ ] Task 4.1: Responsive design testing
- [ ] Task 4.2: SEO metadata updates
- [ ] Task 4.3: Performance optimization
- [ ] Task 4.4: Build verification
- [ ] Task 4.5: QA checklist completion
- [ ] Final commit and documentation

**Phase 4 Status:** Blocked on Phase 3

---

## Blockers & Notes

- [List any blockers here as they arise]

## Completed Milestones

- [List milestones as they complete]
```

- [ ] **Step 2: Save and track**

The file is saved. Update progress after each task completion.

---

## Phase 1 Review Checklist

After completing all Phase 1 tasks:

- [ ] TypeScript compiles without errors (`./node_modules/.bin/tsc --noEmit`)
- [ ] CSS variables are defined and accessible in browser DevTools
- [ ] Tour package data structure is complete with 6 packages
- [ ] Lead validation extension compiles and handles B2C fields
- [ ] No console errors in dev server
- [ ] PROGRESS.md updated with Phase 1 completion

---

## Next Steps After Phase 1

Once Phase 1 is complete and verified, proceed to **Phase 2: Core Component Development** which will build:
- `TourCard` component (displays tour packages)
- `TestimonialCard` component (customer testimonials)
- `MetricBar` component (trust metrics horizontal bar)
- Updates to `LeadCaptureForm` for B2C tour selection

---
