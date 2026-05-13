import assert from "node:assert/strict";
import test from "node:test";

import { resolveB2CGateSubmission } from "../components/b2c/b2c-gate-submission.ts";

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
