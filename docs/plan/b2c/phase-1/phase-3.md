# B2C Vietnam Tours - Phase 3: Integration & API

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Connect frontend to backend, update email notifications, and add analytics tracking

**Architecture:** Extend existing lead API to handle B2C tour selection, add B2C-specific email template, configure analytics

**Tech Stack:** Next.js API routes, Resend email, simple analytics integration

---

## Task 3.1: Update Leads API for B2C Tour Selection

**Files:**
- Modify: `app/api/leads/route.ts`
- Test: Manual API testing with curl/Postman

- [ ] **Step 1: Add tourPackageId to accepted payload**

In `app/api/leads/route.ts`, modify validation flow:

1. Import B2C validation helper:
```typescript
import { validateB2CTourPayload } from "@/lib/server/lead-validation";
```

2. After base validation, add B2C-specific validation:

```typescript
// After line 44: const validation = validateLeadPayload(payload);
let b2cFieldErrors: LeadFieldErrors = {};

if (payload.variant === "b2c") {
  const b2cValidation = validateB2CTourPayload(payload, validation);
  b2cFieldErrors = b2cValidation;
}

// Merge field errors
const allFieldErrors = { ...validation.fieldErrors, ...b2cFieldErrors };

if (Object.keys(allFieldErrors).length > 0) {
  return jsonResponse(
    {
      ok: false,
      code: validation.code,
      message: validation.message,
      fieldErrors: allFieldErrors
    },
    validation.code === "spam_rejected" ? 422 : 400
  );
}
```

- [ ] **Step 2: Include tourPackageId in lead data sent to email**

The `validation.value` already has base fields. B2C tour ID needs to be included:

```typescript
// After validation passes, enrich lead data:
const leadData = {
  ...validation.value,
  tourPackageId: (payload as Record<string, unknown>).tourPackageId as string | undefined,
  phoneNumber: (payload as Record<string, unknown>).phoneNumber as string | undefined
};
```

- [ ] **Step 3: Pass enriched data to email**

```typescript
const mailResult = await sendLeadNotification(leadData);
```

- [ ] **Step 4: Test API with B2C payload**

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "variant": "b2c",
    "name": "Nguyễn Văn Test",
    "workEmail": "test@example.com",
    "tourPackageId": "dalat-3n2d",
    "phoneNumber": "0909123456"
  }'
```

Expected: `{"ok":true}` and email sent to configured inbox.

- [ ] **Step 5: Test validation errors**

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "variant": "b2c",
    "workEmail": "invalid-email",
    "tourPackageId": "invalid-tour-id"
  }'
```

Expected: 400 with fieldErrors in response.

---

## Task 3.2: B2C Email Notification Template

**Files:**
- Modify: `lib/server/email.ts`
- Test: Check email formatting

- [ ] **Step 1: Add B2C-specific email format**

In `lib/server/email.ts`, modify `formatLeadEmailText`:

```typescript
function formatLeadEmailText(lead: LeadSubmission): string {
  const lines = [
    "New landing page lead",
    "",
    `Variant: ${lead.variant}`,
    `Name: ${lead.name || "Not provided"}`,
    `Work email: ${lead.workEmail}`,
    `Submitted at: ${lead.submittedAt}`
  ];

  // B2C specific fields
  if (lead.variant === "b2c") {
    const tourName = (lead as unknown as Record<string, unknown>).tourPackageId as string | undefined;
    const phone = (lead as unknown as Record<string, unknown>).phoneNumber as string | undefined;

    lines.push(`Tour Interest: ${tourName || "General consultation"}`);
    if (phone) lines.push(`Phone: ${phone}`);
  } else {
    // B2B fields
    lines.push(`Company: ${lead.company || "Not provided"}`);
    lines.push(`Source market: ${lead.sourceMarket || "Not provided"}`);
    lines.push(`Page path: ${lead.pagePath || "Not provided"}`);
    lines.push("");
    lines.push("Travel brief:");
    lines.push(lead.requestDetails || "Not provided");
  }

  return lines.join("\n");
}
```

- [ ] **Step 2: Add B2C subject line format**

In `formatLeadSubject`:

```typescript
function formatLeadSubject(lead: LeadSubmission): string {
  const leadLabel = lead.name || lead.workEmail;

  if (lead.variant === "b2c") {
    const tourId = (lead as unknown as Record<string, unknown>).tourPackageId as string | undefined;
    const tourPrefix = tourId ? `[${tourId}]` : "[General]";
    return `[Chalo B2C Lead] ${tourPrefix} ${leadLabel}`;
  }

  const company = lead.company ? ` - ${lead.company}` : "";
  return `[Chalo ${lead.variant.toUpperCase()} lead] ${leadLabel}${company}`;
}
```

- [ ] **Step 3: Verify email format with test submission**

Send test lead and check received email contains:
- Tour package ID or "General consultation"
- Name and email
- Timestamp

---

## Task 3.3: Form Validation Integration

**Files:**
- Modify: `components/b2c/lead-capture-form.tsx` (or create new)
- Test: Form error states

- [ ] **Step 1: Add client-side validation for Vietnamese phone**

In form component:

```typescript
const VIETNAM_PHONE_REGEX = /^(0[3-9][0-9]{8})$/;

const [errors, setErrors] = useState<Record<string, string>>({});

const validateForm = () => {
  const newErrors: Record<string, string> = {};

  if (!selectedTour && !formData.get("consultation")) {
    newErrors.tourPackageId = "Vui lòng chọn một tour";
  }

  const phone = formData.get("phoneNumber") as string;
  if (phone && !VIETNAM_PHONE_REGEX.test(phone)) {
    newErrors.phoneNumber = "Số điện thoại không hợp lệ";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

- [ ] **Step 2: Display validation errors in UI**

```typescript
{errors.tourPackageId && (
  <span className="form-error">{errors.tourPackageId}</span>
)}
```

- [ ] **Step 3: Handle API error responses**

Update submit handler:

```typescript
if (!response.ok) {
  const errorData = await response.json();
  if (errorData.fieldErrors) {
    setErrors(errorData.fieldErrors);
  }
  setSubmitError(errorData.message);
  return;
}
```

- [ ] **Step 4: Test error states**

1. Submit empty tour selection → Should show error
2. Submit invalid phone → Should show error
3. Submit valid → Should succeed

---

## Task 3.4: Analytics Tracking Setup

**Files:**
- Modify: `lib/analytics.ts`
- Create: Analytics event tracking for B2C
- Test: Check network requests

- [ ] **Step 1: Review current analytics helper**

Read `lib/analytics.ts` - likely a no-op stub.

- [ ] **Step 2: Create simple analytics interface**

In `lib/analytics.ts`:

```typescript
export type AnalyticsEvent =
  | { type: "page_view"; path: string }
  | { type: "cta_click"; cta: string; location: string }
  | { type: "tour_select"; tourId: string; tourName: string }
  | { type: "form_submit"; form: string; success: boolean }
  | { type: "form_error"; field: string; error: string };

let analyticsEnabled = process.env.NODE_ENV === "production";

export function track(event: AnalyticsEvent) {
  if (!analyticsEnabled) {
    console.log("[Analytics]", event);
    return;
  }

  // Send to analytics provider (Google Analytics, Plausible, etc.)
  // For now, stub - configure based on actual provider
  if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
    (window as unknown as Record<string, unknown>).gtag("event", event.type, {
      event_category: "b2c_vietnam_tours",
      event_label: JSON.stringify(event)
    });
  }
}
```

- [ ] **Step 3: Add tracking to TourCard**

In `components/b2c/TourCard.tsx`:

```typescript
import { track } from "@/lib/analytics";

// Inside handleClick:
const handleClick = () => {
  track({
    type: "tour_select",
    tourId: tour.id,
    tourName: tour.title
  });
  onSelect?.(tour.id);
};
```

- [ ] **Step 4: Add tracking to form**

In `components/b2c/lead-capture-form.tsx`:

```typescript
// On successful submit:
track({
  type: "form_submit",
  form: "b2c_lead_capture",
  success: true
});

// On field error:
track({
  type: "form_error",
  field: fieldName,
  error: errorMessage
});
```

- [ ] **Step 5: Test analytics events**

Open browser console, submit form, check for `[Analytics]` logs.

---

## Phase 3 Review Checklist

- [ ] Leads API accepts B2C payload with tourPackageId
- [ ] Email notifications include tour selection
- [ ] Form validation shows errors correctly
- [ ] Successful form submission redirects/shows success message
- [ ] Analytics events fire for tour selection and form submit
- [ ] All TypeScript compiles without errors
- [ ] PROGRESS.md updated with Phase 3 completion

---

## Next Steps After Phase 3

Proceed to **Phase 4: Polish, Testing & Deployment** for responsive QA, SEO updates, performance optimization, and final build verification.
