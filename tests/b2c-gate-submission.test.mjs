import assert from "node:assert/strict";
import test from "node:test";

import {
  resolveB2CGateSubmission,
  submitB2CGateLeadRequest,
  submitValidatedB2CGateLead
} from "../components/b2c/b2c-gate-submission.ts";
import { validateB2CGatedLead } from "../lib/b2c/b2c-lead-validation.ts";

const validLead = {
  numberOfPeople: 2,
  travelDate: "2026-06-15",
  numberOfNights: 7,
  phone: "+84901234567",
  destinations: ["Hanoi city", "Halong Bay"],
  notes: "Looking for a family-friendly route",
  pagePath: "/b2c",
  submittedAt: "2026-05-20T10:30:00.000Z"
};

test("resolveB2CGateSubmission unlocks locally for valid B2C gate data", () => {
  const result = resolveB2CGateSubmission({
    isValid: true,
    fieldErrors: {}
  });

  assert.deepEqual(result, {
    action: "unlock",
    fieldErrors: {}
  });
});

test("resolveB2CGateSubmission keeps the modal locked for invalid data", () => {
  const result = resolveB2CGateSubmission({
    isValid: false,
    fieldErrors: {
      phone: "Enter a valid phone number."
    }
  });

  assert.equal(result.action, "show_errors");
  assert.equal(result.fieldErrors.phone, "Enter a valid phone number.");
});

test("submitValidatedB2CGateLead keeps the modal locked and skips the API call for invalid data", async () => {
  let submitCalls = 0;

  const result = await submitValidatedB2CGateLead(
    validateB2CGatedLead({
      ...validLead,
      phone: "abc",
      destinations: []
    }),
    {
      ...validLead,
      phone: "abc",
      destinations: []
    },
    async () => {
      submitCalls += 1;
      return { ok: true, message: "Lead recorded" };
    }
  );

  assert.equal(result.action, "show_errors");
  assert.equal(result.message, undefined);
  assert.equal(result.fieldErrors.phone, "Enter a valid phone number.");
  assert.equal(result.fieldErrors.destinations, "Select at least one destination.");
  assert.equal(submitCalls, 0);
});

test("submitValidatedB2CGateLead only unlocks after the Google Sheets request succeeds", async () => {
  let submitCalls = 0;

  const result = await submitValidatedB2CGateLead(validateB2CGatedLead(validLead), validLead, async (payload) => {
    submitCalls += 1;
    assert.deepEqual(payload, validLead);

    return { ok: true, message: "Lead recorded" };
  });

  assert.deepEqual(result, {
    action: "unlock",
    fieldErrors: {},
    message: "Lead recorded"
  });
  assert.equal(submitCalls, 1);
});

test("submitValidatedB2CGateLead surfaces storage errors without unlocking", async () => {
  const result = await submitValidatedB2CGateLead(validateB2CGatedLead(validLead), validLead, async () => ({
    ok: false,
    code: "storage_failed",
    message: "We could not record your request right now. Please try again."
  }));

  assert.deepEqual(result, {
    action: "show_errors",
    fieldErrors: {},
    message: "We could not record your request right now. Please try again."
  });
});

test("submitB2CGateLeadRequest converts thrown network errors into retryable failures", async () => {
  const result = await submitB2CGateLeadRequest(validLead, async () => {
    throw new Error("socket hang up");
  });

  assert.deepEqual(result, {
    ok: false,
    code: "unknown",
    message: "We could not record your request right now. Please try again."
  });
});
