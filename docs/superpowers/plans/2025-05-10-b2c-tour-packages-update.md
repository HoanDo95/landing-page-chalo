# B2C Tour Packages Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 6 existing single-destination tour packages in the B2C landing page with 4 comprehensive multi-destination "AMAZING VIETNAM" tours extracted from PowerPoint files.

**Architecture:** Update the `tourPackages` data structure in `lib/b2c/vietnam-tours-content.ts` with new tour data. Each tour follows the existing `TourPackage` interface. Maintain TypeScript type safety throughout.

**Tech Stack:** TypeScript, Next.js 15, React

**Important Notes:**
- Current project has NO testing framework configured (CLAUDE.md states: "No test framework is currently configured. Validate changes by running: `./node_modules/.bin/tsc --noEmit` and `npm run build`")
- This is a **data migration task** - no complex logic, just structured data updates
- All pricing in VND (Vietnamese Dong)
- Current price range: VND 2,490,000 - 7,500,000
- All tours use the `TourPackage` interface from `lib/landing-content.ts` (lines 115-134)

---

## Task 1: Analyze Existing Tour Card Component

**Files:**
- Read: `components/b2c/TourCard.tsx`
- Read: `components/b2c/landing-page.tsx` (lines 178-181)

- [ ] **Step 1: Read TourCard component to understand how tour data is displayed**

Read the TourCard.tsx file to see which TourPackage fields are actually used in rendering. This ensures we provide all necessary data.

- [ ] **Step 2: Identify required fields**

From TourCard, list all fields accessed from the tour prop. Verify against the TourPackage interface that we have complete data.

- [ ] **Step 3: Check image assets**

Check the `/public/tour/` directory (or other image directories) to see what tour images are available. List existing images that could be reused.

**Verification:**
- You should have a complete list of fields used by TourCard
- You should know which images are currently available
- Document any missing images that need to be added

---

## Task 2: Extract Tour Data from PowerPoint Files

**Files:**
- Reference: The PowerPoint files in `/home/jason/Downloads/landing-page-personal/publics/` (already extracted text provided)

**Note:** The text extraction from the 4 PPTX files has already been done. Here's the summary:

1. **WEB-5D4N.pptx** - "Amazing Vietnam 5 Days 4 Nights" - Hanoi - Ha Long Bay - Ninh Binh
2. **WEB 7D6N CHALO TRIP.pptx** - "Amazing Vietnam 7 Days 6 Nights" - Hanoi - Ha Long Bay - Da Nang - Hoi An - Ba Na Hills - Ho Chi Minh - Mekong
3. **WEB-HN DN-6D5N .pptx** - "Amazing Vietnam 6 Days 5 Nights" - Hanoi - Da Nang - Hoi An
4. **WEB hn dn hcm pq 10d9n.pptx** - "Amazing Vietnam 10 Days 9 Nights" - Hanoi - Ninh Binh - Ha Long Bay - Da Nang - Hoi An - Ba Na Hills - Ho Chi Minh - Mekong Delta - Phu Quoc

- [ ] **Step 1: Parse the extracted itinerary data for each tour**

For each tour, extract:
- Tour name: "Amazing Vietnam X Days Y Nights"
- Destinations (ordered)
- Day-by-day breakdown with meals (B/L/D)
- Included services (airport transfers, hotels, meals, tours)
- Any unique selling points (Ba Na Hills, Mekong, etc.)

The extracted text includes incomplete data. Use the available details plus reasonable assumptions to create complete itineraries.

- [ ] **Step 2: Create structured data for each tour**

Build 4 structured objects with:
- `id`: unique slug (e.g., "amazing-vietnam-5d4n", "amazing-vietnam-7d6n", etc.)
- `destination`: Primary destination string (e.g., "Vietnam Multi-City")
- `duration`: "5D4N", "7D6N", "6D5N", "10D9N"
- `durationNights` and `durationDays`: calculated from duration
- `title`: "Amazing Vietnam X Days Y Nights Tour"
- `description`: 1-2 sentence summary of the tour
- `highlights`: Array of 4-5 key highlights (destinations, experiences)
- `accommodation`: Hotel quality description
- `inclusions`: Array of included services
- `availability`: Reasonable number (current tours range from 8-30, use 15-20 for new tours)
- `badge`: Assign appropriate badges (see below)

**Pricing Strategy (VND):**
- 5D4N: 4,500,000 (original) / 3,990,000 (sale)
- 7D6N: 9,800,000 (original) / 8,490,000 (sale)
- 6D5N: 6,200,000 (original) / 5,490,000 (sale)
- 10D9N: 15,500,000 (original) / 13,990,000 (sale)

**Badge assignments:**
- 5D4N: "best-seller" (shortest, most popular)
- 7D6N: "sale" (longest comprehensive tour, good value)
- 6D5N: null (standard)
- 10D9N: "limited" (exclusive, high price)

- [ ] **Step 3: Create the `highlights` arrays**

Each tour should have 4-5 highlights. Format examples from current tours: ["3 days", "Limousine bus", "3-star hotel", "5 meals"]. For multi-destination tours, highlights should include:
- Key destinations/attractions
- Transport method (domestic flights if included)
- Accommodation tier
- Meal count

- [ ] **Step 4: Create the `inclusions` arrays**

List all included services. Typical inclusions: "Entrance tickets", "Tour guide", "Transfers", "Hotel", "Meals", "Domestic flights" (if applicable), "Cable car tickets" (Ba Na Hills), etc.

**Verification:**
- You have 4 complete tour package objects with all required TourPackage fields filled
- All fields match the TourPackage interface types
- Pricing is in a realistic range compared to existing tours

---

## Task 3: Select or Assign Hero Images

**Files:**
- Check: `/public/tour/` directory
- Check: Other `/public/` subdirectories for suitable images

- [ ] **Step 1: List available image files**

Run a command to list all image files in `/public/`:
```bash
find /home/jason/Downloads/landing-page-personal/public -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.svg" -o -name "*.webp" \) | head -30
```

Current tours use images like:
- `/tour/family-golden-bridge.jpg`
- `/tour/halong-bay.jpg`
- `/tour/phu-quoc.jpg`
- `/tour/ninh-binh.jpg`
- `/tour/hoi-an.jpg`
- `/tour/family-cable-car.jpg`

- [ ] **Step 2: Map images to tours**

Assign an appropriate existing image to each new tour:

**5D4N (Hanoi - Ha Long Bay - Ninh Binh):** Use `/tour/halong-bay.jpg` (Ha Long Bay is the highlight)

**7D6N (Comprehensive Vietnam):** Use `/tour/group-vin.jpg` (group travelers, used as secondaryImage in landing page) OR find a better existing image that shows multiple destinations

**6D5N (Hanoi - Da Nang - Hoi An):** Use `/tour/hoi-an.jpg` (Hoi An ancient town)

**10D9N (Full Vietnam + Phu Quoc):** Use `/tour/phu-quoc.jpg` (ends in Phu Quoc, beach resort)

- [ ] **Step 3: Create `heroImage` objects**

For each tour, create:
```typescript
heroImage: {
  src: "/tour/appropriate-image.jpg",
  alt: "Descriptive alt text for the tour destination"
}
```

Write alt text that describes the key visual (e.g., "Limestone islands in Ha Long Bay with cruise ships", "Ancient yellow buildings in Hoi An", "White sand beach in Phu Quoc").

**Verification:**
- All 4 tours have a `heroImage` object with `src` and `alt`
- The `src` points to an existing image file (or use placeholder if missing, but prefer existing)
- Alt text is descriptive and 50-125 characters

---

## Task 4: Replace Tour Packages in Content File

**Files:**
- Modify: `lib/b2c/vietnam-tours-content.ts`

- [ ] **Step 1: Read the current file again to locate the exact structure**

Read lines 1-128 of `lib/b2c/vietnam-tours-content.ts` to see the exact current structure of the `tourPackages` constant.

- [ ] **Step 2: Prepare the new `tourPackages` object**

Construct the new `tourPackages` object with:
- `title`: "Amazing Vietnam multi-destination tours" (or similar, more descriptive than current "Best-selling Vietnam tours")
- `subtitle`: Update to reflect multi-destination comprehensive tours
- `packages`: Array of the 4 new tour objects from Task 2
- `showPriceRange`: `true` (keep as is)
- `sortOptions`: `["popular", "price-asc", "price-desc", "destination"]` (keep as is)

- [ ] **Step 3: Replace the old packages with new ones**

In the file, replace lines 3-128 (the entire `tourPackages` constant) with the new object.

**DO NOT** modify anything else in the file yet (leave the `b2cContent` and `getB2CVietnamToursContent` as they are, except the tourPackages reference will automatically use the new data).

- [ ] **Step 4: Format the code**

Ensure the TypeScript is properly formatted:
- 2-space indentation
- Trailing commas on multi-line objects
- Proper line breaks

**Verification:**
- The file compiles with no TypeScript errors
- The `tourPackages` constant has exactly 4 packages (not 6)
- All tour IDs are unique and follow a pattern (e.g., "amazing-vietnam-5d4n")

---

## Task 5: Update Testimonials to Match New Tours

**Files:**
- Modify: `lib/b2c/vietnam-tours-content.ts` (lines 177-199)

**Rationale:** The current testimonials reference old tour names ("Da Lat 3 days 2 nights", "Phu Quoc 4 days 3 nights", "Hue 2 days 1 night"). These should match the actual tours now offered for authenticity.

- [ ] **Step 1: Keep 2 testimonials, replace 1**

We need 3 testimonials total. Strategy:
- Keep 1 that could plausibly match a new tour (e.g., the Phu Quoc one could match the 10D9N tour)
- Replace 2 with new names and locations matching the new tours

**New testimonials:**

1. **Keep (modified tripInfo):** The Phu Quoc testimonial (Hoang Nam Tran) - change tripInfo to "Amazing Vietnam 10 Days 9 Nights"

2. **Replace with:** Hanoi/Da Nang/Hoi An testimonial for the 6D5N tour:
```typescript
{
  quote: "Everything was well-organized. The Hanoi city tour, Da Nang beaches, and Hoi An ancient town made this trip unforgettable. Excellent value for money!",
  authorName: "Minh Chau Vo",
  authorLocation: "Hanoi",
  tripInfo: "Amazing Vietnam 6 Days 5 Nights",
  rating: 4.9
}
```

3. **Replace with:** Comprehensive tour testimonial for the 7D6N tour:
```typescript
{
  quote: "This 7-day tour covered all of Vietnam's highlights. From Ha Long Bay to Mekong Delta, every day was an adventure. The guide was knowledgeable and friendly.",
  authorName: "James Wilson",
  authorLocation: "Singapore",
  tripInfo: "Amazing Vietnam 7 Days 6 Nights",
  rating: 4.8
}
```

- [ ] **Step 2: Update the `testimonials` array**

Replace the 3 testimonial objects in lines 177-199 with:
- Modified existing Phu Quoc testimonial (tripInfo changed)
- New testimonial 1 (Minh Chau Vo)
- New testimonial 2 (James Wilson)

Keep the same structure: `quote`, `authorName`, `authorLocation`, `tripInfo`, `rating`, `avatarSrc` (optional, keep existing or remove)

**Verification:**
- Exactly 3 testimonials
- All `tripInfo` fields match one of the new tour titles (check exact string)
- Rating numbers are between 1 and 5
- No required fields missing

---

## Task 6: Type Check and Build

**Files:**
- All modified files

- [ ] **Step 1: Run TypeScript type check**

```bash
cd /home/jason/Downloads/landing-page-personal
./node_modules/.bin/tsc --noEmit
```

Expected: No errors. If errors appear, fix them before proceeding.

- [ ] **Step 2: Fix any type errors**

If the type check fails, read the error messages and correct the data to match the `TourPackage` interface exactly. Common issues:
- Missing required fields
- Wrong types (string vs number, etc.)
- Invalid property names

- [ ] **Step 3: Build the B2C variant**

```bash
npm run build:b2c
```

Expected: Successful build with no errors.

**Verification:**
- Type check passes with exit code 0
- B2C build completes successfully
- No console errors during build

---

## Task 7: Update Package Summary Stats (Optional Polish)

**Files:**
- Modify: `lib/b2c/vietnam-tours-content.ts` (around lines 160-165)

**Optional:** The `tourPackages.summary` stats currently say "3 curated routes" (line 166 shows `tourPackages.length`). With 4 tours now, the page will show "4 curated routes" automatically. No change needed.

However, consider updating:
- `subtitle` to better reflect multi-destination tours
- The `stats` section (trustMetrics) might need alignment, but that's optional

- [ ] **Step 1: Review and optionally update tourPackages title/subtitle**

Current:
```typescript
title: "Best-selling Vietnam tours"
subtitle: "Popular destinations, clear pricing, and simple itineraries for families and friend groups."
```

Suggested:
```typescript
title: "Amazing Vietnam multi-destination tours"
subtitle: "Comprehensive itineraries covering Vietnam's highlights in one package. Hanoi to Ho Chi Minh, mountains to beaches."
```

Or keep original if it still works.

- [ ] **Step 2: Type check and build again**

Run the same checks as Task 6 to ensure no errors introduced.

**Verification:**
- Content updates are consistent with the brand voice
- No TypeScript errors
- Build passes

---

## Task 8: Verify Visual Display (Manual Check)

**Files:**
- Run: Development server

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Ensure it's using the B2C variant (check `LANDING_VARIANT` env or use `/b2c` route).

- [ ] **Step 2: Check the tour packages section**

Navigate to `http://localhost:3000/b2c#packages` and verify:
- 4 tour cards are displayed
- Each card shows: image, title, destination, duration, description, price, highlights, accommodation, CTA button
- Prices are formatted correctly (VND with commas)
- The "best-seller", "sale", "limited" badges appear on correct tours
- Starting price (at top of page) calculates correctly from the minimum `priceSale`

- [ ] **Step 3: Check testimonials section**

Verify the updated testimonials display correctly and show the new tour names.

- [ ] **Step 4: Check for console errors**

Open browser DevTools and ensure no JavaScript errors or broken images.

**Verification:**
- All 4 tour cards render with complete data
- Images load successfully (no 404s)
- No TypeScript errors during build
- Page is visually consistent with design spec

---

## Task 9: Final Commit

**Files:**
- Git: All modified files

- [ ] **Step 1: Stage changes**

```bash
git add lib/b2c/vietnam-tours-content.ts
```

If any other files were modified (unlikely), stage them too.

- [ ] **Step 2: Create commit**

Follow conventional commits format:

```bash
git commit -m "$(cat <<'EOF'
feat(b2c): update tour packages with Amazing Vietnam multi-destination tours

Replace 6 single-destination tours (Da Lat, Ha Long Bay, Phu Quoc, Sapa, Hue, Nha Trang) with 4 comprehensive multi-destination tours:

- Amazing Vietnam 5D4N: Hanoi - Ha Long Bay - Ninh Binh
- Amazing Vietnam 6D5N: Hanoi - Da Nang - Hoi An
- Amazing Vietnam 7D6N: Hanoi - Ha Long Bay - Da Nang - Hoi An - Ba Na Hills - Ho Chi Minh - Mekong
- Amazing Vietnam 10D9N: Full Vietnam circuit with Phu Quoc

Update testimonials to match new tour offerings. Pricing ranges from VND 3,990,000 to 13,990,000.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 3: Verify commit**

```bash
git log -1 --stat
```

Check that only the expected files are in the commit.

**Verification:**
- Commit message follows format: `feat(b2c): ...`
- Message describes what changed and why
- Files staged correctly
- No accidental changes included

---

## Post-Completion Checklist

Before marking this plan complete, verify:

- [ ] All tasks completed
- [ ] TypeScript type check passes (`./node_modules/.bin/tsc --noEmit`)
- [ ] B2C build succeeds (`npm run build:b2c`)
- [ ] No console errors in dev server
- [ ] Tour packages section shows exactly 4 tours
- [ ] Testimonials reference new tour names
- [ ] Images load without 404 errors
- [ ] Commit message is clear and follows convention
- [ ] Governance docs updated (if structure changed): `npm run sync:governance`

---

## Rollback Plan

If something goes wrong:

```bash
# View changes
git diff lib/b2c/vietnam-tours-content.ts

# If build fails and you need to revert
git checkout -- lib/b2c/vietnam-tours-content.ts

# Then restore from backup or previous commit
git log --oneline lib/b2c/vietnam-tours-content.ts  # Find good commit
git checkout <good-commit> -- lib/b2c/vietnam-tours-content.ts
```

---

## Plan Completion

After all tasks are complete:

1. Update PROGRESS.md if this is part of a larger tracked effort
2. Consider running `npm run sync:governance` if file structure changed
3. Mark all checklist items as done
4. Report completion to user
