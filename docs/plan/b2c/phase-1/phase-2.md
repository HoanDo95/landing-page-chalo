# B2C Vietnam Tours - Phase 2: Core Component Development

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build reusable UI components for Tour Packages, Testimonials, Trust Metrics, and Lead Capture Form

**Architecture:** Create new B2C-specific components that integrate with existing landing-primitives, using Vietnam Vibes design system

**Tech Stack:** React, TypeScript, Tailwind CSS with Vietnam Vibes utilities

---

## Task 2.1: TourCard Component

**Files:**
- Create: `components/b2c/TourCard.tsx`
- Create: `components/b2c/TourCard.test.tsx`
- Modify: `components/b2c/landing-page.tsx` (import and use)
- Test: Unit tests + visual verification

- [ ] **Step 1: Create TourCard component with props interface**

Create `components/b2c/TourCard.tsx`:

```typescript
import Image from "next/image";
import type { TourPackage as TourPackageType } from "@/lib/landing-content";

interface TourCardProps {
  tour: TourPackageType;
  onSelect?: (tourId: string) => void;
}

export function TourCard({ tour, onSelect }: TourCardProps) {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const discountPercent = Math.round(
    ((tour.priceOriginal - tour.priceSale) / tour.priceOriginal) * 100
  );

  const handleClick = () => {
    onSelect?.(tour.id);
  };

  return (
    <article className="tour-card">
      <div className="tour-card__image-container">
        <Image
          src={tour.heroImage.src}
          alt={tour.heroImage.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="tour-card__image"
        />
        {tour.badge && (
          <span className={`tour-card__badge tour-card__badge--${tour.badge}`}>
            {tour.badge === "best-seller" && "Bán chạy"}
            {tour.badge === "limited" && "Còn ít chỗ"}
            {tour.badge === "sale" && `Giảm ${discountPercent}%`}
          </span>
        )}
      </div>

      <div className="tour-card__content">
        <div className="tour-card__header">
          <h3 className="tour-card__title">{tour.title}</h3>
          <p className="tour-card__description">{tour.description}</p>
        </div>

        <div className="tour-card__highlights">
          {tour.highlights.map((highlight, idx) => (
            <span key={idx} className="tour-card__highlight">
              {highlight}
            </span>
          ))}
        </div>

        <div className="tour-card__price-section">
          <div className="tour-card__price-original">
            {formatPrice(tour.priceOriginal).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </div>
          <div className="tour-card__price-sale">
            {formatPrice(tour.priceSale).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
            <span className="tour-card__savings">
              Tiết kiệm {formatPrice(tour.priceOriginal - tour.priceSale)}đ
            </span>
          </div>
        </div>

        <button
          className="tour-card__cta btn-jade"
          onClick={handleClick}
          aria-label={`Đặt tour ${tour.destination}`}
        >
          Đặt tour ngay
        </button>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Add TourCard styles**

Add to `app/globals.css`:

```css
/* TourCard Component */
.tour-card {
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.tour-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.tour-card__image-container {
  position: relative;
  aspect-ratio: 4 / 3;
}

.tour-card__image {
  object-fit: cover;
}

.tour-card__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  border-radius: 1000px;
  font-size: 12px;
  font-weight: 600;
  background: var(--color-sunset);
  color: white;
}

.tour-card__badge--best-seller {
  background: var(--color-gold-dark);
  color: var(--color-charcoal);
}

.tour-card__badge--sale {
  background: var(--color-sunset);
}

.tour-card__badge--limited {
  background: var(--color-ocean);
}

.tour-card__content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  flex: 1;
}

.tour-card__title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-charcoal);
  margin: 0;
  line-height: 1.3;
}

.tour-card__description {
  font-size: 14px;
  color: var(--color-warm-gray);
  margin: 0;
  line-height: 1.5;
}

.tour-card__highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tour-card__highlight {
  font-size: 12px;
  padding: 4px 8px;
  background: var(--color-cream);
  border-radius: 4px;
  color: var(--color-charcoal);
}

.tour-card__price-section {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-top: auto;
}

.tour-card__price-original {
  font-size: 14px;
  color: var(--color-warm-gray);
  text-decoration: line-through;
}

.tour-card__price-sale {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-jade);
}

.tour-card__savings {
  font-size: 12px;
  color: var(--color-sunset);
  font-weight: 500;
  margin-left: 4px;
}

.tour-card__cta {
  width: 100%;
  text-align: center;
  margin-top: 8px;
}
```

- [ ] **Step 3: Write TourCard unit test**

Create `components/b2c/TourCard.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { TourCard } from "./TourCard";
import type { TourPackage } from "@/lib/landing-content";

const mockTour: TourPackage = {
  id: "test-tour",
  destination: "Test City",
  duration: "2N1D",
  durationNights: 2,
  durationDays: 1,
  title: "Test Tour Title",
  description: "Test tour description",
  heroImage: {
    src: "/test.jpg",
    alt: "Test image"
  },
  priceOriginal: 5000000,
  priceSale: 3990000,
  highlights: ["⏱ 2 ngày", "🚌 Xe limousine"],
  accommodation: "Khách sạn 3*",
  inclusions: ["Vé tham quan"],
  availability: 10,
  badge: "best-seller"
};

describe("TourCard", () => {
  it("renders tour title and description", () => {
    render(<TourCard tour={mockTour} />);

    expect(screen.getByText("Test Tour Title")).toBeInTheDocument();
    expect(screen.getByText("Test tour description")).toBeInTheDocument();
  });

  it("displays formatted prices with VND currency", () => {
    render(<TourCard tour={mockTour} />);

    expect(screen.getByText(/5\.000\.000đ/)).toBeInTheDocument();
    expect(screen.getByText(/3\.990\.000đ/)).toBeInTheDocument();
  });

  it("shows badge when present", () => {
    render(<TourCard tour={mockTour} />);

    expect(screen.getByText("Bán chạy")).toBeInTheDocument();
  });

  it("calls onSelect when CTA clicked", () => {
    const handleSelect = jest.fn();
    render(<TourCard tour={mockTour} onSelect={handleSelect} />);

    screen.getByRole("button", { name: /Đặt tour/i }).click();

    expect(handleSelect).toHaveBeenCalledWith("test-tour");
  });

  it("displays highlights", () => {
    render(<TourCard tour={mockTour} />);

    expect(screen.getByText("⏱ 2 ngày")).toBeInTheDocument();
    expect(screen.getByText("🚌 Xe limousine")).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run tests**

```bash
npm test -- components/b2c/TourCard.test.tsx
```

Expected: All tests pass.

- [ ] **Step 5: Update B2C landing page to use TourCard**

Open `components/b2c/landing-page.tsx` and modify:

1. Import TourCard:
```typescript
import { TourCard } from "./TourCard";
```

2. Add tour packages section after hero (before features):

```typescript
{content.tourPackages && (
  <section className="section b2c-section b2c-section--packages" id="packages">
    <PageWrap>
      <SectionHeading
        title={content.tourPackages.title}
        copy={content.tourPackages.subtitle}
        align="start"
      />
      <div className="tour-packages-grid">
        {content.tourPackages.packages.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </PageWrap>
  </section>
)}
```

- [ ] **Step 6: Add tour-packages-grid styles**

In `app/globals.css`:

```css
.tour-packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

@media (max-width: 640px) {
  .tour-packages-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 7: Verify TypeScript compiles**

```bash
./node_modules/.bin/tsc --noEmit
```

- [ ] **Step 8: Visual verification**

```bash
npm run dev
```

Visit `/b2c` and verify:
- Tour cards render with images, prices, badges
- Layout is responsive (1 col mobile, multi col desktop)
- Hover effects work

---

## Task 2.2: TestimonialCard Component

**Files:**
- Create: `components/b2c/TestimonialCard.tsx`
- Test: Unit tests + visual verification

- [ ] **Step 1: Create TestimonialCard interface**

Create `components/b2c/TestimonialCard.tsx`:

```typescript
import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorLocation: string;
  tripInfo: string;
  rating: number; // 1-5, can be decimal like 4.5
  avatarSrc?: string;
}

export function TestimonialCard({
  quote,
  authorName,
  authorLocation,
  tripInfo,
  rating,
  avatarSrc
}: TestimonialCardProps) {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`}>⭐</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half">⭐</span>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`}>☆</span>);
    }

    return stars;
  };

  return (
    <article className="testimonial-card">
      {avatarSrc && (
        <div className="testimonial-card__avatar">
          <Image
            src={avatarSrc}
            alt={`${authorName} avatar`}
            fill
            sizes="80px"
            className="testimonial-card__avatar-image"
          />
        </div>
      )}

      <blockquote className="testimonial-card__quote">
        "{quote}"
      </blockquote>

      <div className="testimonial-card__rating">
        {renderStars()}
        <span className="testimonial-card__rating-value">{rating.toFixed(1)}</span>
      </div>

      <div className="testimonial-card__author">
        <div className="testimonial-card__author-name">{authorName}</div>
        <div className="testimonial-card__author-location">{authorLocation}</div>
        <div className="testimonial-card__trip">{tripInfo}</div>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Add TestimonialCard styles**

In `app/globals.css`:

```css
/* TestimonialCard Component */
.testimonial-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 24px;
  background: var(--color-white);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
  min-width: 280px;
  max-width: 400px;
}

.testimonial-card__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 16px;
  border: 3px solid var(--color-jade-light);
}

.testimonial-card__avatar-image {
  object-fit: cover;
}

.testimonial-card__quote {
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-charcoal);
  font-style: italic;
  margin: 0 0 16px 0;
}

.testimonial-card__rating {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
}

.testimonial-card__rating-value {
  margin-left: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-charcoal);
}

.testimonial-card__author-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-charcoal);
}

.testimonial-card__author-location {
  font-size: 13px;
  color: var(--color-warm-gray);
  margin-bottom: 4px;
}

.testimonial-card__trip {
  font-size: 12px;
  color: var(--color-ocean);
  font-weight: 500;
}
```

- [ ] **Step 3: Write TestimonialCard unit test**

Create `components/b2c/TestimonialCard.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { TestimonialCard } from "./TestimonialCard";

describe("TestimonialCard", () => {
  const mockProps = {
    quote: "Tour rất tuyệt vời!",
    authorName: "Nguyễn Văn A",
    authorLocation: "Hà Nội",
    tripInfo: "Đà Lạt 3 ngày - Mar 2026",
    rating: 4.5
  };

  it("renders quote and author info", () => {
    render(<TestimonialCard {...mockProps} />);

    expect(screen.getByText(/"Tour rất tuyệt vời!"/)).toBeInTheDocument();
    expect(screen.getByText("Nguyễn Văn A")).toBeInTheDocument();
    expect(screen.getByText("Hà Nội")).toBeInTheDocument();
    expect(screen.getByText("Đà Lạt 3 ngày - Mar 2026")).toBeInTheDocument();
  });

  it("displays rating with decimal", () => {
    render(<TestimonialCard {...mockProps} />);

    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("renders 5 star icons for rating 5", () => {
    render(<TestimonialCard {...mockProps} rating={5} />);

    const ratingContainer = screen.getByText("5.0").parentElement;
    const stars = ratingContainer?.querySelectorAll("span");
    expect(stars?.length).toBeGreaterThanOrEqual(5);
  });
});
```

- [ ] **Step 4: Run tests**

```bash
npm test -- components/b2c/TestimonialCard.test.tsx
```

- [ ] **Step 5: Add testimonials section to B2C landing page**

In `components/b2c/landing-page.tsx`, after hero section:

```typescript
{content.testimonials && (
  <section className="section b2c-section b2c-section--testimonials" id="testimonials">
    <PageWrap>
      <SectionHeading
        title="Hơn 2,000 khách hàng đã tin dùng"
        copy="Trải nghiệm thực tế từ những người đã đi cùng chúng tôi"
        align="center"
      />
      <div className="testimonials-scroll">
        {content.testimonials.map((testimonial, idx) => (
          <TestimonialCard key={idx} {...testimonial} />
        ))}
      </div>
    </PageWrap>
  </section>
)}
```

- [ ] **Step 6: Add testimonials-scroll styles**

```css
.testimonials-scroll {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 16px 0;
  -webkit-overflow-scrolling: touch;
}

.testimonials-scroll::-webkit-scrollbar {
  display: none;
}

@media (min-width: 1024px) {
  .testimonials-scroll {
    justify-content: center;
    flex-wrap: wrap;
    overflow-x: visible;
  }
}
```

- [ ] **Step 7: Add testimonials data to content**

In `lib/b2c/vietnam-tours-content.ts`, add to `b2cVietnamToursContent`:

```typescript
testimonials: [
  {
    quote: "Tour rất chuyên nghiệp, guide nhiệt tình. Giá tốt hơn mình tìm ở nhiều nơi!",
    authorName: "Nguyễn Văn A",
    authorLocation: "Hà Nội",
    tripInfo: "Đà Lạt 3 ngày 2 đêm - Mar 2026",
    rating: 5,
    avatarSrc: "/b2b-operations-partners.jpg" // placeholder, replace with real
  },
  {
    quote: "Khách sạn sạch sẽ, xe đưa đón đúng giờ. Sẽ quay lại vào năm sau.",
    authorLocation: "TP. Hồ Chí Minh",
    tripInfo: "Phú Quốc 4 ngày 3 đêm - Feb 2026",
    rating: 4.8
  },
  {
    quote: "Lịch trình hợp lý, không bị rush. Guide nói rõ ràng, vui vẻ. Giá thì quá tốt!",
    authorLocation: "Đà Nẵng",
    tripInfo: "Huế 2 ngày 1 đêm - Jan 2026",
    rating: 4.9
  }
],
```

- [ ] **Step 8: Update LandingContent interface**

In `lib/landing-content.ts`, add to `LandingContent`:

```typescript
export interface LandingContent {
  // ... existing fields ...
  testimonials?: Array<{
    quote: string;
    authorName: string;
    authorLocation: string;
    tripInfo: string;
    rating: number;
    avatarSrc?: string;
  }>;
}
```

---

## Task 2.3: MetricBar Component

**Files:**
- Create: `components/b2c/MetricBar.tsx`
- Test: Visual verification only

- [ ] **Step 1: Create MetricBar component**

Create `components/b2c/MetricBar.tsx`:

```typescript
interface Metric {
  icon: string;
  value: string;
  label: string;
}

interface MetricBarProps {
  metrics: Metric[];
}

export function MetricBar({ metrics }: MetricBarProps) {
  return (
    <section className="metric-bar">
      <div className="metric-bar__container">
        {metrics.map((metric, idx) => (
          <div key={idx} className="metric-bar__item">
            <span className="metric-bar__icon">{metric.icon}</span>
            <div className="metric-bar__value">{metric.value}</div>
            <div className="metric-bar__label">{metric.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add MetricBar styles**

```css
.metric-bar {
  background: var(--color-cream);
  padding: 32px 0;
}

.metric-bar__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
}

.metric-bar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.metric-bar__icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.metric-bar__value {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-jade);
  line-height: 1.2;
}

.metric-bar__label {
  font-size: 14px;
  color: var(--color-warm-gray);
  margin-top: 4px;
}

@media (max-width: 640px) {
  .metric-bar__container {
    gap: 32px;
  }

  .metric-bar__value {
    font-size: 22px;
  }
}
```

- [ ] **Step 3: Add metrics data to content**

In `lib/b2c/vietnam-tours-content.ts`, add to `b2cVietnamToursContent`:

```typescript
trustMetrics: [
  { icon: "📊", value: "15,000+", label: "khách/năm" },
  { icon: "⚡", value: "< 5 phút", label: "phản hồi trung bình" },
  { icon: "⭐", value: "4.8/5", label: "đánh giá CSAT" },
  { icon: "💰", value: "15%", label: "tiết kiệm trung bình" },
  { icon: "🔒", value: "100%", label: "thanh toán an toàn" },
  { icon: "🤝", value: "98%", label: "tỷ lệ hài lòng" }
]
```

Add to LandingContent interface:

```typescript
trustMetrics?: Metric[];
```

- [ ] **Step 4: Use MetricBar in landing page**

In `components/b2c/landing-page.tsx`, after packages section:

```typescript
{content.trustMetrics && (
  <MetricBar metrics={content.trustMetrics} />
)}
```

---

## Task 2.4: Update LeadCaptureForm for B2C

**Files:**
- Modify: `components/b2c/lead-capture-form.tsx`
- Test: Existing tests should cover

- [ ] **Step 1: Review current LeadCaptureForm**

Check current form fields - likely has: name, email, company (B2B). Need to adapt for B2C.

- [ ] **Step 2: Add B2C-specific form fields**

Modify `components/b2c/lead-capture-form.tsx`:

1. Add tour selector dropdown:
```typescript
interface B2CLeadFormProps {
  variant: "b2c";
  tourPackages?: TourPackage[];
  // ... other props
}

// Inside component:
const [selectedTour, setSelectedTour] = useState("");

// Form fields JSX:
<select
  value={selectedTour}
  onChange={(e) => setSelectedTour(e.target.value)}
  aria-label="Chọn tour"
>
  <option value="">Chọn tour quan tâm...</option>
  {tourPackages?.map((tour) => (
    <option key={tour.id} value={tour.id}>
      {tour.title} - {formatPrice(tour.priceSale)}đ
    </option>
  ))}
  <option value="consultation">Tư vấn cho tôi</option>
</select>
```

2. Update form submission to include `tourPackageId`:

```typescript
const formData = new FormData(formRef.current);
const payload = {
  variant: "b2c",
  name: formData.get("name"),
  workEmail: formData.get("email"),
  tourPackageId: selectedTour || undefined,
  sourceMarket: "b2c-vietnam-tours",
  pagePath: window.location.pathname,
  submittedAt: new Date().toISOString()
};
```

- [ ] **Step 3: Pass tourPackages from content to form**

In `components/b2c/landing-page.tsx`:

```typescript
<LeadCaptureForm
  variant="b2c"
  tourPackages={content.tourPackages?.packages}
/>
```

- [ ] **Step 4: Update lead-capture-form styles**

Add CSS for form elements using Vietnam Vibes palette.

- [ ] **Step 5: Verify form submission**

Test with dev server:
- Select tour, fill form, submit
- Check Network tab for `/api/leads` call
- Verify 200 response
- Check server logs for email notification

---

## Phase 2 Review Checklist

- [ ] TourCard component renders correctly with all badge types
- [ ] TourCard tests pass
- [ ] TestimonialCard renders with avatars, ratings
- [ ] MetricBar displays all metrics in responsive layout
- [ ] LeadCaptureForm accepts tour selection
- [ ] Form submits successfully to `/api/leads`
- [ ] All TypeScript compiles without errors
- [ ] No console errors in dev mode
- [ ] Components are responsive on mobile/tablet/desktop
- [ ] PROGRESS.md updated with Phase 2 completion

---

## Next Steps After Phase 2

Proceed to **Phase 3: Integration & API** for backend updates and email templates.
