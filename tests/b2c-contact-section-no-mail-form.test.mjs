import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("B2C contact section does not render the mail lead form", () => {
  const source = readFileSync(new URL("../components/b2c/landing-page.tsx", import.meta.url), "utf8");

  assert.equal(source.includes("LeadCaptureForm"), false);
  assert.equal(source.includes("b2c-final-card__form"), false);
});
