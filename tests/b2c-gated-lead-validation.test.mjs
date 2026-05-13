import assert from "node:assert/strict";
import test from "node:test";

import { validateB2CGatedLead } from "../lib/b2c/b2c-lead-validation.ts";

const validLead = {
  numberOfPeople: 2,
  travelMonth: "Jun",
  numberOfNights: 7,
  phone: "+84 901 234 567",
  city: "Hanoi",
  notes: "Beach tour preferred"
};

test("validateB2CGatedLead accepts a complete B2C gated lead", () => {
  assert.deepEqual(validateB2CGatedLead(validLead), {
    isValid: true,
    fieldErrors: {}
  });
});

test("validateB2CGatedLead rejects invalid required fields", () => {
  const result = validateB2CGatedLead({
    numberOfPeople: 0,
    travelMonth: "January",
    numberOfNights: 31,
    phone: "abc",
    city: "H",
    notes: "a".repeat(501)
  });

  assert.equal(result.isValid, false);
  assert.deepEqual(Object.keys(result.fieldErrors).sort(), [
    "city",
    "notes",
    "numberOfNights",
    "numberOfPeople",
    "phone",
    "travelMonth"
  ]);
});

test("validateB2CGatedLead accepts optional empty notes and international phones", () => {
  assert.equal(validateB2CGatedLead({ ...validLead, notes: "" }).isValid, true);
  assert.equal(validateB2CGatedLead({ ...validLead, notes: null, phone: "+44 20 7123 4567" }).isValid, true);
  assert.equal(validateB2CGatedLead({ ...validLead, phone: "1234567" }).fieldErrors.phone, "Enter a valid phone number.");
});
