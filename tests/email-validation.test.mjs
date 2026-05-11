import assert from "node:assert/strict";
import test from "node:test";

import { EMAIL_INPUT_PATTERN, isValidWorkEmail } from "../lib/email-validation.ts";

const SAMPLE_EMAIL = "jasonhd0905.work@gmail.com";

test("EMAIL_INPUT_PATTERN accepts a standard address that contains the letter s", () => {
  assert.equal(new RegExp(`^(?:${EMAIL_INPUT_PATTERN})$`, "u").test(SAMPLE_EMAIL), true);
});

test("isValidWorkEmail accepts the same address", () => {
  assert.equal(isValidWorkEmail(SAMPLE_EMAIL), true);
});
