export interface B2CGatedLeadData {
  numberOfPeople: number;
  travelMonth: string;
  numberOfNights: number;
  phone: string;
  city: string;
  notes?: string | null;
  pagePath?: string;
  submittedAt?: string;
}

export interface B2CGatedLeadValidationResult {
  isValid: boolean;
  fieldErrors: Partial<Record<keyof B2CGatedLeadData, string>>;
}

export const VALID_TRAVEL_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
] as const;

const INTERNATIONAL_PHONE_REGEX = /^\+?[0-9]{8,15}$/;

function normalizePhone(value: unknown) {
  return typeof value === "string" ? value.replace(/[\s()-]/g, "") : "";
}

function isPositiveInteger(value: unknown) {
  return typeof value === "number" && Number.isInteger(value) && value >= 1;
}

export function validateB2CGatedLead(
  data: Partial<B2CGatedLeadData>
): B2CGatedLeadValidationResult {
  const fieldErrors: B2CGatedLeadValidationResult["fieldErrors"] = {};

  if (!isPositiveInteger(data.numberOfPeople)) {
    fieldErrors.numberOfPeople = "Select number of people.";
  }

  if (!data.travelMonth || !VALID_TRAVEL_MONTHS.includes(data.travelMonth as (typeof VALID_TRAVEL_MONTHS)[number])) {
    fieldErrors.travelMonth = "Select travel month.";
  }

  if (!isPositiveInteger(data.numberOfNights)) {
    fieldErrors.numberOfNights = "Select number of nights.";
  }

  if (!INTERNATIONAL_PHONE_REGEX.test(normalizePhone(data.phone))) {
    fieldErrors.phone = "Enter a valid phone number.";
  }

  if (!data.city || data.city.trim().length < 2) {
    fieldErrors.city = "Enter your city.";
  }

  if (data.notes && data.notes.length > 500) {
    fieldErrors.notes = "Max 500 characters.";
  }

  return {
    isValid: Object.keys(fieldErrors).length === 0,
    fieldErrors
  };
}

export function normalizeB2CGatedLead(data: Partial<B2CGatedLeadData>): B2CGatedLeadData {
  return {
    numberOfPeople: Number(data.numberOfPeople),
    travelMonth: typeof data.travelMonth === "string" ? data.travelMonth.trim() : "",
    numberOfNights: Number(data.numberOfNights),
    phone: typeof data.phone === "string" ? data.phone.trim() : "",
    city: typeof data.city === "string" ? data.city.trim() : "",
    notes: typeof data.notes === "string" ? data.notes.trim() : data.notes ?? null,
    pagePath: typeof data.pagePath === "string" ? data.pagePath.slice(0, 300) : "/",
    submittedAt: typeof data.submittedAt === "string" ? data.submittedAt : new Date().toISOString()
  };
}
