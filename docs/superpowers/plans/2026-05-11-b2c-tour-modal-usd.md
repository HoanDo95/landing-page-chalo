# B2C Tour Modal and USD Pricing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a B2C in-page tour detail modal and switch all B2C tour pricing from VND to curated USD values.

**Architecture:** Keep tour detail data owned by `lib/b2c/vietnam-tours-content.ts`, extend `TourPackage` with modal fields in `lib/landing-content.ts`, and keep all interaction state inside B2C-only client components under `components/b2c/`. Replace direct `#contact` tour-card navigation with a modal flow that can still hand off a selected tour back into the inline lead form.

**Tech Stack:** Next.js App Router, React 19, TypeScript, existing B2C CSS in `app/globals.css`

---

### Task 1: Extend B2C Tour Data for USD and Modal Content

**Files:**
- Modify: `lib/landing-content.ts`
- Modify: `lib/b2c/vietnam-tours-content.ts`
- Verify: `./node_modules/.bin/tsc --noEmit`

- [ ] **Step 1: Add B2C tour detail types**

```ts
export interface TourItineraryDay {
  dayLabel: string;
  title: string;
  description: string;
}

export interface TourPackage {
  // existing fields...
  overview: string;
  priceCurrency: "USD";
  itineraryDays: TourItineraryDay[];
}
```

- [ ] **Step 2: Update B2C tour content to curated USD values and modal detail content**

```ts
{
  id: "amazing-vietnam-5d4n",
  priceOriginal: 329,
  priceSale: 289,
  priceCurrency: "USD",
  overview: "A fast-moving North Vietnam route for travelers who want Hanoi, Halong Bay, and Ninh Binh in one clear package.",
  itineraryDays: [
    {
      dayLabel: "Day 1",
      title: "Arrive in Hanoi and settle in",
      description: "Airport pickup, Old Quarter orientation, and welcome dinner planning."
    }
  ]
}
```

- [ ] **Step 3: Update B2C copy that still mentions VND**

```ts
description:
  "Package tours from USD 289 with 5-minute consultation, clear itineraries, and flexible date support for families, couples, and friends."
```

- [ ] **Step 4: Run typecheck**

Run: `rtk ./node_modules/.bin/tsc --noEmit`
Expected: PASS

### Task 2: Add Shared B2C Pricing Formatter and Modal Components

**Files:**
- Create: `components/b2c/tour-pricing.ts`
- Create: `components/b2c/tour-detail-modal.tsx`
- Create: `components/b2c/tour-packages-section.tsx`
- Modify: `components/b2c/TourCard.tsx`
- Verify: `./node_modules/.bin/tsc --noEmit`

- [ ] **Step 1: Create a B2C USD formatter helper**

```ts
export function formatUsdPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(price);
}
```

- [ ] **Step 2: Create modal component**

```tsx
type TourDetailModalProps = {
  tour: TourPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onChooseTour: (tourId: string) => void;
};
```

- [ ] **Step 3: Create package-section client wrapper for modal state**

```tsx
const [activeTourId, setActiveTourId] = useState<string | null>(null);
const activeTour = tourPackages.find((tour) => tour.id === activeTourId) ?? null;
```

- [ ] **Step 4: Refactor `TourCard` to emit selection callbacks instead of direct `#contact` links**

```tsx
type TourCardProps = {
  tour: TourPackage;
  onOpenDetails: (tourId: string) => void;
};
```

- [ ] **Step 5: Run typecheck**

Run: `rtk ./node_modules/.bin/tsc --noEmit`
Expected: PASS

### Task 3: Wire Lead Form Handoff and Replace Remaining VND Formatting

**Files:**
- Modify: `components/b2c/lead-capture-form.tsx`
- Modify: `components/b2c/landing-page.tsx`
- Modify: `components/b2c/TourCard.tsx`
- Verify: `./node_modules/.bin/tsc --noEmit`

- [ ] **Step 1: Allow the lead form to accept a preselected tour id**

```tsx
interface LeadCaptureFormProps {
  content: LandingLeadFormContent;
  tourPackages: TourPackage[];
  preselectedTourId?: string | null;
}
```

- [ ] **Step 2: Sync selected tour state into the form without breaking manual selection**

```tsx
useEffect(() => {
  if (preselectedTourId) {
    setValues((current) => ({ ...current, tourPackageId: preselectedTourId }));
  }
}, [preselectedTourId]);
```

- [ ] **Step 3: Replace all B2C display formatting from VND to USD**

```tsx
<strong>{formatUsdPrice(selectedTour.priceSale)}</strong>
```

- [ ] **Step 4: Replace package-grid rendering in `landing-page.tsx` with the client wrapper**

```tsx
<TourPackagesSection
  leadFormId="contact"
  tourPackages={tourPackages}
/>
```

- [ ] **Step 5: Run typecheck**

Run: `rtk ./node_modules/.bin/tsc --noEmit`
Expected: PASS

### Task 4: Style the Modal and Verify Rendered Behavior

**Files:**
- Modify: `app/globals.css`
- Verify: `npm run build:b2c`
- Verify: `npm run build:b2b`
- Verify: browser check at `/b2c`

- [ ] **Step 1: Add modal/backdrop styles**

```css
.b2c-tour-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(6, 37, 45, 0.68);
}

.b2c-tour-modal {
  width: min(1080px, calc(100vw - 24px));
  max-height: min(88vh, 920px);
  overflow: auto;
}
```

- [ ] **Step 2: Add modal content and responsive layout styles**

```css
.b2c-tour-modal-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
}
```

- [ ] **Step 3: Run B2C build**

Run: `rtk npm run build:b2c`
Expected: PASS

- [ ] **Step 4: Run B2B build to catch shared regressions**

Run: `rtk npm run build:b2b`
Expected: PASS

- [ ] **Step 5: Run rendered verification**

Run:
- `rtk /usr/bin/bash -lc 'LANDING_VARIANT=b2c PORT=3015 npm run dev'`
- check `http://localhost:3015/b2c`

Expected:
- clicking a tour opens the modal
- modal close works from button, backdrop, and Escape
- `Choose this tour` lands the user at `#contact` with that tour selected
- no visible VND labels remain
