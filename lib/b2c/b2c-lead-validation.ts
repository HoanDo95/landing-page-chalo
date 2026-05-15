export interface B2CGatedLeadData {
  numberOfPeople: number;
  travelDate: string;
  numberOfNights: number;
  phone: string;
  destinations: string[];
  notes?: string | null;
  pagePath?: string;
  submittedAt?: string;
}

export interface B2CGatedLeadValidationResult {
  isValid: boolean;
  fieldErrors: Partial<Record<keyof B2CGatedLeadData, string>>;
}

export const VALID_DESTINATIONS = [
  "Hanoi city",
  "Halong Bay",
  "Ninh Binh",
  "Da Nang city",
  "Bana Hills",
  "Hoi An Town",
  "Ho Chi Minh city",
  "Cu Chi tunnel",
  "Mekong Delta",
  "Phu Quoc Island"
] as const;

const INTERNATIONAL_PHONE_REGEX = /^\+?[0-9]{8,15}$/;
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function normalizePhone(value: unknown) {
  return typeof value === "string" ? value.replace(/[\s()-]/g, "") : "";
}

function normalizeDestinations(value: unknown) {
  const rawDestinations = Array.isArray(value) ? value : typeof value === "string" ? [value] : [];

  return Array.from(
    new Set(
      rawDestinations
        .map((destination) => (typeof destination === "string" ? destination.trim() : ""))
        .filter(Boolean)
    )
  );
}

function isPositiveInteger(value: unknown, max?: number) {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && (typeof max !== "number" || value <= max);
}

function isValidTravelDate(value: unknown) {
  if (typeof value !== "string" || !ISO_DATE_REGEX.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map((part) => Number.parseInt(part, 10));
  const candidateDate = new Date(Date.UTC(year, month - 1, day));

  return (
    candidateDate.getUTCFullYear() === year &&
    candidateDate.getUTCMonth() === month - 1 &&
    candidateDate.getUTCDate() === day
  );
}

export function validateB2CGatedLead(
  data: Partial<B2CGatedLeadData>
): B2CGatedLeadValidationResult {
  const fieldErrors: B2CGatedLeadValidationResult["fieldErrors"] = {};
  const selectedDestinations = normalizeDestinations(data.destinations);

  if (!isPositiveInteger(data.numberOfPeople)) {
    fieldErrors.numberOfPeople = "Select number of people.";
  }

  if (!isValidTravelDate(data.travelDate)) {
    fieldErrors.travelDate = "Select your travel date.";
  }

  if (!isPositiveInteger(data.numberOfNights, 30)) {
    fieldErrors.numberOfNights = "Select number of nights.";
  }

  if (!INTERNATIONAL_PHONE_REGEX.test(normalizePhone(data.phone))) {
    fieldErrors.phone = "Enter a valid phone number.";
  }

  if (
    selectedDestinations.length === 0 ||
    selectedDestinations.some(
      (destination) => !VALID_DESTINATIONS.includes(destination as (typeof VALID_DESTINATIONS)[number])
    )
  ) {
    fieldErrors.destinations = "Select at least one destination.";
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
    travelDate: typeof data.travelDate === "string" ? data.travelDate.trim() : "",
    numberOfNights: Number(data.numberOfNights),
    phone: typeof data.phone === "string" ? data.phone.trim() : "",
    destinations: normalizeDestinations(data.destinations),
    notes: typeof data.notes === "string" ? data.notes.trim() : data.notes ?? null,
    pagePath: typeof data.pagePath === "string" ? data.pagePath.slice(0, 300) : "/",
    submittedAt: typeof data.submittedAt === "string" ? data.submittedAt : new Date().toISOString()
  };
}
