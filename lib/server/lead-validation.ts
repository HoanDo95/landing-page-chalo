export type LeadVariant = "b2b" | "b2c";

export interface LeadSubmission {
  variant: LeadVariant;
  name?: string;
  company?: string;
  workEmail: string;
  sourceMarket?: string;
  requestDetails?: string;
  pagePath?: string;
  submittedAt: string;
}

export type LeadFieldName =
  | "variant"
  | "name"
  | "company"
  | "workEmail"
  | "sourceMarket"
  | "requestDetails"
  | "pagePath"
  | "submittedAt"
  | "honeypot";

export type LeadFieldErrors = Partial<Record<LeadFieldName, string>>;

export type LeadSubmissionResponse =
  | { ok: true }
  | {
      ok: false;
      code: "validation_error" | "spam_rejected" | "mail_unavailable" | "mail_failed";
      message: string;
      fieldErrors?: LeadFieldErrors;
    };

export type LeadValidationResult =
  | { ok: true; value: LeadSubmission }
  | {
      ok: false;
      code: "validation_error" | "spam_rejected";
      message: string;
      fieldErrors: LeadFieldErrors;
    };

const WORK_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STRING_LIMITS: Record<LeadFieldName, number> = {
  variant: 12,
  name: 120,
  company: 160,
  workEmail: 180,
  sourceMarket: 180,
  requestDetails: 2000,
  pagePath: 300,
  submittedAt: 80,
  honeypot: 120
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeString(value: unknown, field: LeadFieldName) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, STRING_LIMITS[field]);
}

function normalizeSubmittedAt(value: unknown) {
  const submittedAt = normalizeString(value, "submittedAt");

  if (!submittedAt) {
    return new Date().toISOString();
  }

  const parsed = new Date(submittedAt);

  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
}

export function validateLeadPayload(payload: unknown): LeadValidationResult {
  if (!isRecord(payload)) {
    return {
      ok: false,
      code: "validation_error",
      message: "Please check the form and try again.",
      fieldErrors: {
        workEmail: "Please enter a valid work email."
      }
    };
  }

  const honeypot = normalizeString(payload.honeypot, "honeypot");

  if (honeypot) {
    return {
      ok: false,
      code: "spam_rejected",
      message: "We could not accept this request. Please try again.",
      fieldErrors: {
        honeypot: "This field must be empty."
      }
    };
  }

  const variant = normalizeString(payload.variant, "variant");
  const name = normalizeString(payload.name, "name");
  const company = normalizeString(payload.company, "company");
  const workEmail = normalizeString(payload.workEmail, "workEmail").toLowerCase();
  const sourceMarket = normalizeString(payload.sourceMarket, "sourceMarket");
  const requestDetails = normalizeString(payload.requestDetails, "requestDetails");
  const pagePath = normalizeString(payload.pagePath, "pagePath");
  const submittedAt = normalizeSubmittedAt(payload.submittedAt);

  const fieldErrors: LeadFieldErrors = {};

  if (variant !== "b2b" && variant !== "b2c") {
    fieldErrors.variant = "Please submit a supported landing page variant.";
  }

  if (!WORK_EMAIL_REGEX.test(workEmail)) {
    fieldErrors.workEmail = "Please enter a valid work email.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      code: "validation_error",
      message: "Please check the form and try again.",
      fieldErrors
    };
  }

  return {
    ok: true,
    value: {
      variant: variant as LeadVariant,
      name: name || undefined,
      company: company || undefined,
      workEmail,
      sourceMarket: sourceMarket || undefined,
      requestDetails: requestDetails || undefined,
      pagePath: pagePath || undefined,
      submittedAt
    }
  };
}
