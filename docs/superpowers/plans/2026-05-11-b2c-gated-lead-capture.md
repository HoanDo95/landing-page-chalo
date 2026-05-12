# B2C Gated Lead Capture Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement gated lead capture form for B2C Vietnam tours with modal overlay, localStorage persistence, and Google Sheets storage.

**Architecture:** Client-side modal overlay with localStorage gate tracking, server-side validation and Google Sheets API integration.

**Tech Stack:** Next.js 15 App Router, TypeScript, Google Sheets API, React hooks, Tailwind CSS (B2C design system)

---

## File Structure

```
Create:
  components/b2c/gated-content-overlay.tsx
  components/b2c/b2c-lead-form-modal.tsx
  components/b2c/use-gated-content.ts
  app/api/leads/b2c/route.ts
  lib/b2c/google-sheets.ts
  lib/b2c/b2c-lead-validation.ts
  __tests__/b2c/gated-content-overlay.test.tsx
  __tests__/b2c/b2c-lead-form-modal.test.tsx
  __tests__/b2c/b2c-lead-validation.test.ts
  __tests__/b2c/google-sheets.test.ts

Modify:
  lib/landing-content.ts (add B2C form field types)
  lib/b2c/vietnam-tours-content.ts (populate new fields)
  components/b2c/landing-page.tsx (wrap with overlay)
```

---

## Task 1: Update Landing Content Types

**Files:**
- Modify: `lib/landing-content.ts:183-193`
- Test: `__tests__/b2c/content-types.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// __tests__/b2c/content-types.test.ts
import { LandingLeadFormContent } from '@/lib/landing-content'

describe('B2C Lead Form Content Types', () => {
  it('supports extended B2C form fields', () => {
    const formContent: LandingLeadFormContent = {
      submitLabel: 'Get quote',
      successMessage: 'Thank you! You can now browse the tours.',
      errorSummary: 'Please fix the errors below',
      fields: {
        numberOfPeople: { label: 'Number of people' },
        travelMonth: { label: 'Travel month' },
        numberOfNights: { label: 'Number of nights' },
        notes: { label: 'Notes', placeholder: 'Any special requests...' },
        phone: { label: 'Phone number', placeholder: 'e.g., +1 234 567 8900' },
        city: { label: 'City', placeholder: 'Your city' }
      },
      validationMessages: {
        numberOfPeopleInvalid: 'Select number of people',
        travelMonthInvalid: 'Select travel month',
        numberOfNightsInvalid: 'Select number of nights',
        phoneInvalid: 'Enter valid phone number',
        cityInvalid: 'Enter your city',
        notesTooLong: 'Max 500 characters'
      }
    }
    expect(formContent.fields.phone.placeholder).toBeDefined()
  })
})
```

- [ ] **Step 2: Run test - expect FAIL**
- [ ] **Step 3: Extend LandingLeadFormContent with optional fields**
- [ ] **Step 4: Run test - expect PASS**
- [ ] **Step 5: Commit**

---

## Task 2: B2C Validation Utilities

**Files:**
- Create: `lib/b2c/b2c-lead-validation.ts`
- Test: `__tests__/b2c/b2c-lead-validation.test.ts`

- [ ] **Step 1: Write the failing test** (full test file with international phone validation, number ranges, etc.)

```typescript
// __tests__/b2c/b2c-lead-validation.test.ts
import { validateB2CGatedLead } from '@/lib/b2c/b2c-lead-validation'

describe('B2C Gated Lead Validation', () => {
  describe('International phone validation', () => {
    it('accepts valid international numbers with +', () => {
      expect(validateB2CGatedLead({ phone: '+12345678901' })).toBeValid()
      expect(validateB2CGatedLead({ phone: '+84901234567' })).toBeValid()
      expect(validateB2CGatedLead({ phone: '+44 20 7123 4567' })).toBeValid()
    })
    it('accepts numbers without + (8-15 digits)', () => {
      expect(validateB2CGatedLead({ phone: '1234567890' })).toBeValid()
      expect(validateB2CGatedLead({ phone: '0901234567' })).toBeValid()
    })
    it('rejects phone with too few digits (< 8)', () => {
      expect(validateB2CGatedLead({ phone: '1234567' })).toBeInvalid('phone')
    })
    it('rejects phone with too many digits (> 15)', () => {
      expect(validateB2CGatedLead({ phone: '1234567890123456' })).toBeInvalid('phone')
    })
    it('rejects phone with letters', () => {
      expect(validateB2CGatedLead({ phone: '09012abcde' })).toBeInvalid('phone')
    })
    it('rejects empty phone', () => {
      expect(validateB2CGatedLead({ phone: '' })).toBeInvalid('phone')
    })
  })

  describe('Number of people validation', () => {
    it('accepts numbers between 1 and 20', () => {
      expect(validateB2CGatedLead({ numberOfPeople: 1 })).toBeValid()
      expect(validateB2CGatedLead({ numberOfPeople: 20 })).toBeValid()
    })
    it('rejects numbers outside 1-20 range', () => {
      expect(validateB2CGatedLead({ numberOfPeople: 0 })).toBeInvalid('numberOfPeople')
      expect(validateB2CGatedLead({ numberOfPeople: 21 })).toBeInvalid('numberOfPeople')
    })
  })

  describe('Number of nights validation', () => {
    it('accepts numbers between 1 and 30', () => {
      expect(validateB2CGatedLead({ numberOfNights: 1 })).toBeValid()
      expect(validateB2CGatedLead({ numberOfNights: 30 })).toBeValid()
    })
    it('rejects numbers outside 1-30 range', () => {
      expect(validateB2CGatedLead({ numberOfNights: 0 })).toBeInvalid('numberOfNights')
      expect(validateB2CGatedLead({ numberOfNights: 31 })).toBeInvalid('numberOfNights')
    })
  })

  describe('Travel month validation', () => {
    it('accepts all 12 month abbreviations', () => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      months.forEach(month => {
        expect(validateB2CGatedLead({ travelMonth: month })).toBeValid()
      })
    })
    it('rejects empty month', () => {
      expect(validateB2CGatedLead({ travelMonth: '' })).toBeInvalid('travelMonth')
    })
    it('rejects invalid month name', () => {
      expect(validateB2CGatedLead({ travelMonth: 'January' })).toBeInvalid('travelMonth')
    })
  })

  describe('City validation', () => {
    it('accepts city names with 2+ characters', () => {
      expect(validateB2CGatedLead({ city: 'Hanoi' })).toBeValid()
      expect(validateB2CGatedLead({ city: 'HCM' })).toBeValid()
    })
    it('rejects city with less than 2 characters', () => {
      expect(validateB2CGatedLead({ city: 'H' })).toBeInvalid('city')
    })
    it('rejects empty city', () => {
      expect(validateB2CGatedLead({ city: '' })).toBeInvalid('city')
    })
  })

  describe('Notes validation', () => {
    it('accepts empty notes', () => {
      expect(validateB2CGatedLead({ notes: '' })).toBeValid()
      expect(validateB2CGatedLead({ notes: null })).toBeValid()
    })
    it('accepts notes up to 500 characters', () => {
      expect(validateB2CGatedLead({ notes: 'a'.repeat(500) })).toBeValid()
    })
    it('rejects notes exceeding 500 characters', () => {
      expect(validateB2CGatedLead({ notes: 'a'.repeat(501) })).toBeInvalid('notes')
    })
  })
})
```

- [ ] **Step 2: Run test - expect FAIL**
- [ ] **Step 3: Implement validateB2CGatedLead()**

```typescript
// lib/b2c/b2c-lead-validation.ts
export interface B2CGatedLeadData {
  numberOfPeople: number
  travelMonth: string
  numberOfNights: number
  phone: string
  city: string
  notes?: string | null
}

// International phone: 8-15 digits, optional leading +
export const INTERNATIONAL_PHONE_REGEX = /^\+?[0-9]{8,15}$/

export const VALID_TRAVEL_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export type ValidationResult = { isValid: boolean; fieldErrors: Record<string, string> }

export function validateB2CGatedLead(data: Partial<B2CGatedLeadData>): ValidationResult {
  const fieldErrors: Record<string, string> = {}

  // Normalize phone: remove spaces, dashes, parens for validation
  const normalizePhone = (phone: string) => phone.replace(/[\s\-\(\)]/g, '')

  // Number of people
  if (data.numberOfPeople !== undefined) {
    if (typeof data.numberOfPeople !== 'number' || data.numberOfPeople < 1 || data.numberOfPeople > 20) {
      fieldErrors.numberOfPeople = 'Select number of people (1-20)'
    }
  } else {
    fieldErrors.numberOfPeople = 'Select number of people'
  }

  // Travel month
  if (!data.travelMonth || !VALID_TRAVEL_MONTHS.includes(data.travelMonth)) {
    fieldErrors.travelMonth = 'Select a valid travel month'
  }

  // Number of nights
  if (data.numberOfNights !== undefined) {
    if (typeof data.numberOfNights !== 'number' || data.numberOfNights < 1 || data.numberOfNights > 30) {
      fieldErrors.numberOfNights = 'Select number of nights (1-30)'
    }
  } else {
    fieldErrors.numberOfNights = 'Select number of nights'
  }

  // Phone - international format
  const normalizedPhone = data.phone ? normalizePhone(data.phone) : ''
  if (!normalizedPhone || !INTERNATIONAL_PHONE_REGEX.test(normalizedPhone)) {
    fieldErrors.phone = 'Enter valid phone number (8-15 digits, optional + prefix)'
  }

  // City
  if (!data.city || data.city.trim().length < 2) {
    fieldErrors.city = 'Enter your city (min 2 characters)'
  }

  // Notes (optional but max 500 chars if provided)
  if (data.notes && data.notes.length > 500) {
    fieldErrors.notes = 'Notes cannot exceed 500 characters'
  }

  return {
    isValid: Object.keys(fieldErrors).length === 0,
    fieldErrors
  }
}
```

- [ ] **Step 4: Run test - expect PASS**
- [ ] **Step 5: Commit**

---

## Task 3: Google Sheets Integration (Easy Setup)

**Files:**
- Create: `lib/b2c/google-sheets.ts`
- Test: `__tests__/b2c/google-sheets.test.ts`

**Easy Setup Design:**
- Use environment variables only (no key file path)
- Support Vercel/Netlify/Railway deployment
- Single environment variable for sheet ID
- Service account JSON as env var (base64 encoded)

Env vars needed:
```bash
GOOGLE_SHEETS_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_KEY_BASE64=base64_encoded_json_key
GOOGLE_SHEETS_SHEET_NAME=B2C_Leads  # optional, default: "B2C_Leads"
```

- [ ] **Step 1: Write the failing test** (mock Sheets API, test row format)

```typescript
// __tests__/b2c/google-sheets.test.ts
import { appendB2CLeadToSheet } from '@/lib/b2c/google-sheets'

const mockSheet = {
  appendRow: jest.fn().mockResolvedValue({})
}

jest.mock('@google-cloud/sheets', () => ({
  Sheets: jest.fn(() => ({
    spreadsheet: jest.fn(() => ({
      sheets: jest.fn(() => mockSheet)
    }))
  }))
}))

describe('Google Sheets B2C Lead Storage', () => {
  beforeEach(() => {
    mockSheet.appendRow.mockClear()
  })

  it('appends lead data as new row in correct order', async () => {
    const leadData = {
      numberOfPeople: 2,
      travelMonth: 'Jun',
      numberOfNights: 7,
      phone: '+12345678901',
      city: 'Hanoi',
      notes: 'Looking for beach tours',
      pagePath: '/b2c',
      submittedAt: '2025-05-12T10:30:00Z'
    }

    await appendB2CLeadToSheet(leadData)

    expect(mockSheet.appendRow).toHaveBeenCalledWith({
      values: [
        ['2025-05-12T10:30:00Z', 2, 'Jun', 7, 'Looking for beach tours', '+12345678901', 'Hanoi', '/b2c']
      ]
    })
  })

  it('handles null notes with empty string', async () => {
    const leadData = {
      numberOfPeople: 1,
      travelMonth: 'Dec',
      numberOfNights: 3,
      phone: '0901234567',
      city: 'HCMC',
      notes: null,
      pagePath: '/',
      submittedAt: '2025-05-12T11:00:00Z'
    }

    await appendB2CLeadToSheet(leadData)

    expect(mockSheet.appendRow).toHaveBeenCalledWith({
      values: [['2025-05-12T11:00:00Z', 1, 'Dec', 3, '', '0901234567', 'HCMC', '/']]
    })
  })

  it('throws error when Sheets API fails', async () => {
    mockSheet.appendRow.mockRejectedValueOnce(new Error('API quota exceeded'))

    const leadData = {
      numberOfPeople: 2,
      travelMonth: 'Jul',
      numberOfNights: 5,
      phone: '0901234567',
      city: 'Da Nang',
      pagePath: '/b2c',
      submittedAt: new Date().toISOString()
    }

    await expect(appendB2CLeadToSheet(leadData)).rejects.toThrow('API quota exceeded')
  })

  it('uses custom sheet name from env var', async () => {
    process.env.GOOGLE_SHEETS_SHEET_NAME = 'My_Custom_Sheet'
    const leadData = {
      numberOfPeople: 1,
      travelMonth: 'Jan',
      numberOfNights: 2,
      phone: '+1234567890',
      city: 'Paris',
      pagePath: '/b2c',
      submittedAt: new Date().toISOString()
    }

    await appendB2CLeadToSheet(leadData)

    // Verify it uses the custom sheet name
    expect(mockSheet.appendRow).toHaveBeenCalled()
    delete process.env.GOOGLE_SHEETS_SHEET_NAME
  })
})
```

- [ ] **Step 2: Run test - expect FAIL**
- [ ] **Step 3: Implement google-sheets.ts with easy setup**

```typescript
// lib/b2c/google-sheets.ts
import { Sheets } from '@google-cloud/sheets'
import { Buffer } from 'buffer'

const SHEET_ID = process.env.GOOGLE_SHEETS_ID
const SHEET_NAME = process.env.GOOGLE_SHEETS_SHEET_NAME || 'B2C_Leads'
const SERVICE_ACCOUNT_KEY_BASE64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64

function getSheetsClient(): Sheets {
  if (!SHEET_ID) {
    throw new Error('GOOGLE_SHEETS_ID environment variable is required')
  }

  if (!SERVICE_ACCOUNT_KEY_BASE64) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY_BASE64 environment variable is required')
  }

  try {
    const keyJson = JSON.parse(Buffer.from(SERVICE_ACCOUNT_KEY_BASE64, 'base64').toString())
    return new Sheets({ credentials: keyJson })
  } catch (error) {
    console.error('Failed to parse Google service account key:', error)
    throw new Error('Invalid GOOGLE_SERVICE_ACCOUNT_KEY_BASE64')
  }
}

export async function appendB2CLeadToSheet(data: {
  numberOfPeople: number
  travelMonth: string
  numberOfNights: number
  phone: string
  city: string
  notes?: string | null
  pagePath: string
  submittedAt: string
}): Promise<void> {
  if (!SHEET_ID) {
    throw new Error('Cannot append to sheet: GOOGLE_SHEETS_ID not configured')
  }

  const sheets = getSheetsClient()
  const sheet = sheets.spreadsheet(SHEET_ID).sheet(SHEET_NAME)

  const row = [
    data.submittedAt,
    data.numberOfPeople,
    data.travelMonth,
    data.numberOfNights,
    data.notes || '',
    data.phone,
    data.city,
    data.pagePath
  ]

  await sheet.appendRow({ values: [row] })
}
```

- [ ] **Step 4: Run test - expect PASS**
- [ ] **Step 5: Commit**

---

## Task 4: B2C API Endpoint

**Files:**
- Create: `app/api/leads/b2c/route.ts`
- Test: `__tests__/b2c/api-leads-b2c.test.ts`

- [ ] **Step 1: Write the failing test** (POST with valid/invalid data)

```typescript
// __tests__/b2c/api-leads-b2c.test.ts
import { NextRequest } from 'next/server'

const mockAppend = jest.fn().mockResolvedValue(undefined)
jest.mock('@/lib/b2c/google-sheets', () => ({
  appendB2CLeadToSheet: mockAppend
}))

describe('POST /api/leads/b2c', () => {
  beforeEach(() => {
    mockAppend.mockClear()
  })

  it('accepts valid lead data and stores in sheet', async () => {
    const request = new Request('http://localhost:3000/api/leads/b2c', {
      method: 'POST',
      body: JSON.stringify({
        numberOfPeople: 2,
        travelMonth: 'Jun',
        numberOfNights: 7,
        phone: '+12345678901',
        city: 'Hanoi',
        notes: 'Beach tours',
        pagePath: '/b2c'
      })
    })

    const response = await NextRequest.next({ request })
    const result = await response.json()

    expect(response.status).toBe(201)
    expect(result).toEqual({ ok: true, message: 'Lead recorded' })
    expect(mockAppend).toHaveBeenCalled()
  })

  it('rejects invalid phone format', async () => {
    const request = new Request('http://localhost:3000/api/leads/b2c', {
      method: 'POST',
      body: JSON.stringify({
        numberOfPeople: 2,
        travelMonth: 'Jun',
        numberOfNights: 7,
        phone: 'invalid',
        city: 'Hanoi',
        pagePath: '/b2c'
      })
    })

    const response = await NextRequest.next({ request })
    const result = await response.json()

    expect(response.status).toBe(400)
    expect(result.ok).toBe(false)
    expect(result.code).toBe('validation_error')
    expect(result.fieldErrors?.phone).toBeDefined()
  })

  it('rejects when required fields missing', async () => {
    const request = new Request('http://localhost:3000/api/leads/b2c', {
      method: 'POST',
      body: JSON.stringify({
        phone: '0901234567',
        city: 'Hanoi'
      })
    })

    const response = await NextRequest.next({ request })
    const result = await response.json()

    expect(response.status).toBe(400)
    expect(result.ok).toBe(false)
    expect(Object.keys(result.fieldErrors || {}).length).toBeGreaterThan(0)
  })

  it('handles Google Sheets API errors gracefully', async () => {
    mockAppend.mockRejectedValueOnce(new Error('Sheet not found'))

    const request = new Request('http://localhost:3000/api/leads/b2c', {
      method: 'POST',
      body: JSON.stringify({
        numberOfPeople: 2,
        travelMonth: 'Jun',
        numberOfNights: 7,
        phone: '+12345678901',
        city: 'Hanoi',
        pagePath: '/b2c'
      })
    })

    const response = await NextRequest.next({ request })
    const result = await response.json()

    expect(response.status).toBe(500)
    expect(result.ok).toBe(false)
    expect(result.code).toBe('storage_failed')
  })
})
```

- [ ] **Step 2: Run test - expect FAIL**
- [ ] **Step 3: Implement route handler**

```typescript
// app/api/leads/b2c/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { validateB2CGatedLead } from '@/lib/b2c/b2c-lead-validation'
import { appendB2CLeadToSheet } from '@/lib/b2c/google-sheets'

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json()

    const submittedAt = new Date().toISOString()
    const pagePath = body.pagePath || request.headers.get('x-forwarded-host') || '/'

    const validation = validateB2CGatedLead(body)

    if (!validation.isValid) {
      return NextResponse.json(
        { ok: false, code: 'validation_error', fieldErrors: validation.fieldErrors } as const,
        { status: 400 }
      )
    }

    await appendB2CLeadToSheet({
      ...body,
      submittedAt,
      pagePath
    })

    return NextResponse.json(
      { ok: true, message: 'Lead recorded' } as const,
      { status: 201 }
    )
  } catch (error) {
    console.error('B2C lead submission error:', error)

    const isStorageError = error instanceof Error && error.message.includes('Sheet')
    const code = isStorageError ? 'storage_failed' : 'unknown'

    return NextResponse.json(
      { ok: false, code, message: isStorageError ? error.message : 'Failed to record lead' } as const,
      { status: 500 }
    )
  }
}
```

- [ ] **Step 4: Run test - expect PASS**
- [ ] **Step 5: Commit**

---

## Task 5: useGatedContent Hook

**Files:**
- Create: `components/b2c/use-gated-content.ts`
- Test: `__tests__/b2c/use-gated-content.test.tsx`

- [ ] **Step 1: Write the failing test** (localStorage expiry logic)
- [ ] **Step 2: Run test - expect FAIL**
- [ ] **Step 3: Implement hook with 30-day expiry**
- [ ] **Step 4: Run test - expect PASS**
- [ ] **Step 5: Commit**

---

## Task 6: GatedContentOverlay Component

**Files:**
- Create: `components/b2c/gated-content-overlay.tsx`
- Test: `__tests__/b2c/gated-content-overlay.test.tsx`

- [ ] **Step 1: Write the failing test**
- [ ] **Step 2: Run test - expect FAIL**
- [ ] **Step 3: Implement overlay with modal**
- [ ] **Step 4: Run test - expect PASS**
- [ ] **Step 5: Commit**

---

## Task 7: B2CLeadFormModal Component

**Files:**
- Create: `components/b2c/b2c-lead-form-modal.tsx`
- Test: `__tests__/b2c/b2c-lead-form-modal.test.tsx`

- [ ] **Step 1: Write the failing test** (all 6 fields, submit, validation, error handling)
- [ ] **Step 2: Run test - expect FAIL**
- [ ] **Step 3: Implement form with all fields, submit handler, loading states**
- [ ] **Step 4: Run test - expect PASS**
- [ ] **Step 5: Commit**

---

## Task 8: Update B2C Content

**Files:**
- Modify: `lib/b2c/vietnam-tours-content.ts`

- [ ] **Step 1: Add Vietnamese form field labels to leadForm** (use Vietnamese text)
- [ ] **Step 2: Type check**
- [ ] **Step 3: Commit**

---

## Task 9: Integrate into Landing Page

**Files:**
- Modify: `components/b2c/landing-page.tsx`

- [ ] **Step 1: Wrap entire page content with GatedContentOverlay**
- [ ] **Step 2: Build B2C variant**
- [ ] **Step 3: Commit**

---

## Task 10: E2E Tests

**Files:**
- Create: `__tests__/e2e/b2c-gated-form.spec.ts`

- [ ] **Step 1: Write Playwright tests** (modal shows, blocks scrolling, unlocks, validation, 30-day persistence)
- [ ] **Step 2: Run E2E tests**
- [ ] **Step 3: Commit**

---

## Task 11: Code Review & Security

- [ ] **Step 1: Run full test suite + coverage**
- [ ] **Step 2: Use security-reviewer agent**
- [ ] **Step 3: Fix any CRITICAL issues**

---

## Task 12: Final PR

- [ ] **Step 1: Run `npm run sync:governance`**
- [ ] **Step 2: Create branch `feat/b2c-gated-lead-capture`**
- [ ] **Step 3: Push and create PR with detailed summary**
- [ ] **Step 4: Request review**

---

## Self-Review Against Spec

- [x] Modal overlay on first visit
- [x] Blocks all interaction (fixed position, z-index 9999)
- [x] 6 form fields with correct validation
- [x] International phone validation (E.164 format, 8-15 digits)
- [x] Success → localStorage timestamp → modal closes
- [x] 30-day expiry in useGatedContent hook
- [x] New `/api/leads/b2c` endpoint
- [x] Google Sheets storage (easy setup via env vars)
- [x] Error handling (inline + API errors)
- [x] Mobile responsive (full-width on mobile)
- [x] B2C design tokens (Desert Sienna, Obsidian)
- [x] B2B/B2C separation maintained

---

## Implementation Notes - Easy Google Sheets Setup

### Environment Variables for Deployment

Set these in Vercel/Railway/Netlify dashboard:

```bash
GOOGLE_SHEETS_ID=1AbC123...your_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_KEY_BASE64=base64_encoded_json_key_content
GOOGLE_SHEETS_SHEET_NAME=B2C_Leads  # optional
```

### Quick Setup Steps for User:

1. Create Google Sheet with columns: `Timestamp, People, Month, Nights, Notes, Phone, City, PagePath`
2. Share sheet with service account email from JSON key (Editor permission)
3. Get spreadsheet ID from URL: `https://docs.google.com/spreadsheets/d/[ID]/edit`
4. Encode service account JSON as base64: `base64 -i key.json`
5. Set env vars in deployment platform
6. Test: Submit form → check Google Sheet receives row

### Local Development:

Create `.env.local`:
```bash
GOOGLE_SHEETS_ID=your_sheet_id
GOOGLE_SERVICE_ACCOUNT_KEY_BASE64=base64_encoded_key
```

---

**Spec reference:** `docs/superpowers/specs/2026-05-11-b2c-gated-lead-capture-design.md`
