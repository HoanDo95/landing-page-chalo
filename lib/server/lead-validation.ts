import { B2C_TOUR_PACKAGE_IDS } from "@/lib/b2c/vietnam-tours-content";
import { isValidWorkEmail } from "@/lib/email-validation";

export type LeadVariant = "b2b" | "b2c";

export interface B2BLeadSubmission {
  variant: "b2b";
  workEmail: string;
  pagePath?: string;
  submittedAt: string;
}

export interface B2CTourLeadSubmission {
  variant: "b2c";
  name?: string;
  workEmail: string;
  sourceMarket?: string;
  pagePath?: string;
  submittedAt: string;
  tourPackageId?: string;
  phoneNumber?: string;
}

export type LeadFieldName =
  | "variant"
  | "name"
  | "workEmail"
  | "sourceMarket"
  | "pagePath"
  | "submittedAt"
  | "tourPackageId"
  | "phoneNumber"
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

type LeadValidationFailure = {
  ok: false;
  code: "validation_error" | "spam_rejected";
  message: string;
  fieldErrors: LeadFieldErrors;
};

type LeadValidationResult<TLead> = { ok: true; value: TLead } | LeadValidationFailure;

interface BaseLeadFields {
  name?: string;
  workEmail: string;
  sourceMarket?: string;
  pagePath?: string;
  submittedAt: string;
}

const STRING_LIMITS: Record<LeadFieldName, number> = {
  variant: 12,
  name: 120,
  workEmail: 180,
  sourceMarket: 180,
  pagePath: 300,
  submittedAt: 80,
  tourPackageId: 80,
  phoneNumber: 24,
  honeypot: 120
};

const INTERNATIONAL_PHONE_REGEX = /^\+?[0-9][0-9\s()-]{7,18}$/;
const TOUR_PACKAGE_IDS = new Set([...B2C_TOUR_PACKAGE_IDS, "consultation"]);

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

function validateBaseLeadPayload(
  payload: unknown,
  expectedVariant: LeadVariant
): LeadValidationResult<BaseLeadFields> {
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
  const workEmail = normalizeString(payload.workEmail, "workEmail").toLowerCase();
  const sourceMarket = normalizeString(payload.sourceMarket, "sourceMarket");
  const pagePath = normalizeString(payload.pagePath, "pagePath");
  const submittedAt = normalizeSubmittedAt(payload.submittedAt);

  const fieldErrors: LeadFieldErrors = {};

  if (variant !== expectedVariant) {
    fieldErrors.variant = "Please submit a supported landing page variant.";
  }

  if (!isValidWorkEmail(workEmail)) {
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
      name: name || undefined,
      workEmail,
      sourceMarket: sourceMarket || undefined,
      pagePath: pagePath || undefined,
      submittedAt
    }
  };
}

export function validateB2BLeadPayload(payload: unknown): LeadValidationResult<B2BLeadSubmission> {
  const validation = validateBaseLeadPayload(payload, "b2b");

  if (!validation.ok) {
    return validation;
  }

  return {
    ok: true,
    value: {
      variant: "b2b",
      workEmail: validation.value.workEmail,
      pagePath: validation.value.pagePath,
      submittedAt: validation.value.submittedAt
    }
  };
}

export function validateB2CTourLeadPayload(
  payload: unknown
): LeadValidationResult<B2CTourLeadSubmission> {
  const validation = validateBaseLeadPayload(payload, "b2c");

  if (!validation.ok) {
    return validation;
  }

  if (!isRecord(payload)) {
    return {
      ok: false,
      code: "validation_error",
      message: "Please check your tour request details.",
      fieldErrors: {
        tourPackageId: "Please choose a valid tour."
      }
    };
  }

  const tourPackageId = normalizeString(payload.tourPackageId, "tourPackageId");
  const phoneNumber = normalizeString(payload.phoneNumber, "phoneNumber");
  const fieldErrors: LeadFieldErrors = {};

  if (!tourPackageId || !TOUR_PACKAGE_IDS.has(tourPackageId)) {
    fieldErrors.tourPackageId = "Please choose a valid tour.";
  }

  if (phoneNumber && !INTERNATIONAL_PHONE_REGEX.test(phoneNumber)) {
    fieldErrors.phoneNumber = "Please enter a valid phone or WhatsApp number.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      code: "validation_error",
      message: "Please check your tour request details.",
      fieldErrors
    };
  }

  return {
    ok: true,
    value: {
      variant: "b2c",
      name: validation.value.name,
      workEmail: validation.value.workEmail,
      sourceMarket: validation.value.sourceMarket,
      pagePath: validation.value.pagePath,
      submittedAt: validation.value.submittedAt,
      tourPackageId: tourPackageId || undefined,
      phoneNumber: phoneNumber || undefined
    }
  };
}
