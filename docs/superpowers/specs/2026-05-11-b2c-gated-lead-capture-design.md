---
title: B2C Gated Lead Capture Form Design
date: 2026-05-11
status: approved
---

# B2C Gated Lead Capture Form - Design Specification

## Overview

Implement a gated content system for the B2C Vietnam tours landing page where users must submit a lead capture form before viewing tour packages and other detailed content. The form collects trip preference information and contact details, storing leads in Google Sheets for manual follow-up.

**Key Characteristics:**
- Hard gate UX: Modal overlay blocks content access until form submission
- Soft gate technically: Uses localStorage to remember submission (30-day expiry), but no server-side verification
- New dedicated API endpoint: `/api/leads/b2c`
- Storage: Google Sheets (no email notifications)
- Form fields: 6 fields capturing trip details + contact info

---

## UX Flow

### First Visit (No Submission Record)

1. User loads `/` or `/b2c` landing page
2. Full-screen modal overlay appears immediately
3. Page content behind modal is blurred/masked
4. User **cannot** close modal, scroll page, or interact with underlying content
5. User must fill form and submit
6. On successful submission:
   - Modal closes
   - `localStorage.setItem('b2c_lead_gate_unlocked', timestamp)` set with 30-day expiry
   - Page content becomes fully accessible
   - Brief success toast appears (2-3 seconds)

### Returning Visit (Within 30 Days)

1. User loads page
2. Script checks `localStorage.getItem('b2c_lead_gate_unlocked')`
3. If timestamp exists and < 30 days old: **no modal shown**
4. User can freely browse all content
5. Lead form still visible in contact section for additional inquiries

### After 30 Days

1. `localStorage` flag expires
2. Modal reappears on next visit
3. User must submit again (new lead recorded)

### Edge Cases

- **User clears localStorage**: Modal reappears (acceptable for soft gate)
- **User uses different browser/device**: Modal appears (acceptable)
- **Network failure during submit**: Form retains data, shows error, user can retry
- **API returns error**: Show error message, keep form data intact

---

## Form Fields & Controls

All fields use simple HTML inputs (no date pickers, no complex dropdowns).

| Field | Type | Attributes | Validation |
|-------|------|------------|------------|
| Number of people | `<select>` | Options: 1-20 | Required, integer ≥1 |
| Travel month | `<select>` | Options: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec | Required |
| Number of nights | `<select>` | Options: 1-30 | Required, integer ≥1 |
| Notes/details | `<textarea>` | rows=4, maxlength=500 | Optional, max 500 chars |
| Phone number | `<input type="tel">` | placeholder="e.g., 0901234567" | Required, Vietnamese format: `/^(0|\+84)[0-9]{9,10}$/` |
| City | `<input type="text">` | placeholder="Your city" | Required, min length 2 |

**Form Layout:**
- Vertical stack, full-width on mobile
- Labels above inputs
- Submit button: primary styled, "Get quote" text
- Required fields marked with `*`
- Character count for notes field (optional)

---

## Data Storage & API

### API Endpoint

```
POST /api/leads/b2c
Content-Type: application/json
```

**Request Body:**
```typescript
{
  "numberOfPeople": number,
  "travelMonth": string, // "Jan", "Feb", etc.
  "numberOfNights": number,
  "notes": string | null,
  "phone": string,
  "city": string,
  "pagePath": string, // window.location.pathname
  "submittedAt": string // ISO timestamp
}
```

**Response:**
```typescript
// Success (201)
{
  "ok": true,
  "message": "Lead recorded"
}

// Error (400/500)
{
  "ok": false,
  "code": "validation_error" | "storage_failed" | "unknown",
  "message": string,
  "fieldErrors"?: {
    "fieldName": "Error message"
  }
}
```

### Storage: Google Sheets

- Create Google Sheet with columns:
  - Timestamp (auto)
  - Number of people
  - Travel month
  - Number of nights
  - Notes
  - Phone
  - City
  - Page path
  - IP address (optional, from request)

- Use Google Sheets API with service account
- Backend appends new row per submission
- No email notifications (as requested)
- Manual export to CSV from Sheets for CRM import

### Implementation Options

**Option A: Direct Google Sheets API from Next.js Route**
- Pros: Simple, no extra backend
- Cons: Service account credentials in Vercel env vars

**Option B: Third-party form service (Formspree, Basin, etc.)**
- Pros: No code for storage
- Cons: Less control, may have costs

**Recommendation: Option A** - Use Next.js API route with Google Sheets API directly.

---

## Component Architecture

### New Components

```
components/b2c/
├── gated-content-overlay.tsx   ← Main overlay with modal logic
├── b2c-lead-form-modal.tsx     ← Form inside modal
└── lead-form-fields.tsx        ← Reusable field set (optional)
```

### Modified Components

- `components/b2c/landing-page.tsx`:
  - Wrap entire page content with `<GatedContentOverlay>` at root level
  - Pass `children` through normally when unlocked
  - Keep existing `LeadCaptureForm` in contact section unchanged (or rename to avoid confusion)

### GatedContentOverlay Component

**Props:**
```typescript
interface GatedContentOverlayProps {
  children: React.ReactNode
  storageKey?: string
  expiryDays?: number
}
```

**Logic:**
1. On mount (client-side only), check `localStorage.getItem(storageKey)`
2. If valid (exists and not expired): render children only, no overlay
3. If invalid: render overlay covering entire viewport
4. On successful form submit:
   - Set localStorage with current timestamp
   - Hide overlay (state change)
   - Show success toast

**Overlay Styling:**
- `position: fixed; inset: 0; z-index: 9999`
- Background: semi-transparent black (rgba(0,0,0,0.7))
- Content: centered modal box with form
- Backdrop blur on underlying page (optional)

---

## State Management

### Client-Side Gate State

```typescript
// Hook: useGatedContent
function useGatedContent(options) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check localStorage (only client)
    const stored = localStorage.getItem(options.storageKey)
    if (stored && !isExpired(stored, options.expiryDays)) {
      setIsUnlocked(true)
    }
    setIsChecking(false)
  }, [])

  const unlock = () => {
    localStorage.setItem(options.storageKey, Date.now().toString())
    setIsUnlocked(true)
  }

  return { isUnlocked, isChecking, unlock }
}
```

### Form State

- Use existing B2B form as reference pattern
- Local state for form values
- Validation on submit + inline validation
- Disable submit while submitting
- Show loading state on button

---

## Validation Rules

### Client-Side Validation

```typescript
const schema = {
  numberOfPeople: (v) => v >= 1 && v <= 20 ? null : "Select number of people",
  travelMonth: (v) => v ? null : "Select travel month",
  numberOfNights: (v) => v >= 1 && v <= 30 ? null : "Select number of nights",
  phone: (v) => /^(0|\+84)[0-9]{9,10}$/.test(v) ? null : "Enter valid Vietnamese phone",
  city: (v) => v.trim().length >= 2 ? null : "Enter your city",
  notes: (v) => !v || v.length <= 500 ? null : "Max 500 characters"
}
```

### Server-Side Validation

- API route validates same rules
- Returns `fieldErrors` object for specific field errors
- Returns generic error message for unexpected failures

---

## Error Handling

### Validation Errors
- Show inline error message below each field
- Focus first error field after submit
- Keep form data intact (do not clear)

### Network/API Errors
- Show banner/alert at top of form
- Keep form data intact
- "Retry" button re-submits with same data

### Success State
- Show success message in modal: "Thank you! You can now browse the tours."
- Auto-close modal after 2 seconds (or immediate with animation)
- Show brief toast notification on page

---

## Success Flow

1. User submits form
2. Button shows loading state ("Sending...")
3. API call completes
4. On success:
   - Button returns to normal state
   - Modal shows success message (2-3 seconds)
   - Modal fades out and unmounts
   - `localStorage` timestamp set
   - Toast appears: "You can now view all tour packages"
5. Underlying page content is now interactive

---

## Security Considerations

### Input Sanitization
- All form values are strings → sanitize before storing/displaying
- Escape when rendering (though not displayed back, just stored)
- Use parameterized queries if using database (Google Sheets API is safe)

### Rate Limiting
- Add rate limiting on `/api/leads/b2c` to prevent spam
- Vercel rate limits or custom implementation
- Recommendation: 5 submissions per IP per hour

### Spam Protection
- Existing honeypot field pattern from B2B (hidden input)
- Consider adding simple CAPTCHA if spam becomes issue
- Current: rely on rate limiting + honeypot

### Privacy
- No tracking beyond localStorage
- No cookies set
- No third-party tracking
- IP optional, if stored should be disclosed in privacy policy

---

## Implementation Notes

### Reuse from B2B

- `LeadCaptureForm` pattern (state management, submit handling)
- Validation error display pattern
- Loading states
- API response handling

### Differences from B2B

- More fields (6 vs 1)
- Gate overlay logic (new)
- Different API endpoint
- Different storage destination (Sheets vs whatever B2B uses)

### Files to Create

1. `components/b2c/gated-content-overlay.tsx`
2. `components/b2c/b2c-lead-form-modal.tsx`
3. `app/api/leads/b2c/route.ts`
4. `lib/b2c/google-sheets.ts` (helper for Sheets API)
5. `docs/superpowers/specs/2026-05-11-b2c-gated-lead-capture-design.md` (this file)

### Files to Modify

1. `components/b2c/landing-page.tsx` - wrap with `<GatedContentOverlay>`
2. `lib/b2c/vietnam-tours-content.ts` - extend `leadForm` field definitions

### Content Schema Update

```typescript
// In landing-content.ts or b2c content file
interface LandingLeadFormContent {
  submitLabel: string
  successMessage: string
  errorSummary: string
  fields: {
    numberOfPeople: { label: string }
    travelMonth: { label: string }
    numberOfNights: { label: string }
    notes: { label: string; placeholder?: string }
    phone: { label: string; placeholder: string }
    city: { label: string; placeholder: string }
  }
  validationMessages: {
    numberOfPeopleInvalid?: string
    travelMonthInvalid?: string
    numberOfNightsInvalid?: string
    phoneInvalid: string
    cityInvalid?: string
    notesTooLong?: string
  }
}
```

---

## Testing Plan

### Unit Tests
- `useGatedContent` hook: localStorage read/write, expiry logic
- Form validation: each field validation rule
- API route: mock Google Sheets API, test success/error paths

### Integration Tests (Manual)
- First visit → modal shows
- Submit form → success → modal closes, content visible
- Refresh → no modal (within 30 days)
- Clear localStorage → modal shows again
- Invalid input → errors show inline
- Network error → form retains data, retry works

### E2E Tests
- Complete user flow: visit → submit → browse
- Edge cases: back button after submit, multiple tabs

---

## Open Questions / Assumptions

1. **Google Sheets setup**: Assumes service account with Sheets API enabled. Need to create sheet and share with service account email.
2. **Rate limiting**: Implementation left to backend choice (Vercel limits may suffice for low traffic).
3. **IP address**: Optional field in sheet, not used for gating. Can be added via request headers if needed.
4. **Form layout specifics**: Will follow B2C design system (from DESIGN.md) - colors, spacing, typography.
5. **Existing B2C LeadCaptureForm**: Will create new dedicated modal form; existing form in contact section can stay as-is or be replaced with same component later.

---

## Acceptance Criteria

- [ ] Modal overlay appears on first visit (no localStorage flag)
- [ ] Modal blocks all interaction with underlying page
- [ ] Form has all 6 fields with correct validation
- [ ] Vietnamese phone validation works
- [ ] Submit sends data to `/api/leads/b2c`
- [ ] On success: modal closes, localStorage set, toast shown
- [ ] With valid localStorage (<30 days), no modal shown
- [ ] localStorage expires after 30 days (new modal)
- [ ] Google Sheet receives new row per submission
- [ ] Error states handled gracefully
- [ ] Mobile responsive form
- [ ] Follows B2C design tokens (colors, typography, spacing)

---

**Design Status:** Ready for implementation planning
