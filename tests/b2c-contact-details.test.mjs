import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("B2C final CTA exposes WhatsApp and office address details", () => {
  const source = readFileSync(new URL("../lib/b2c/vietnam-tours-content.ts", import.meta.url), "utf8");

  assert.match(source, /contactDetails:/);
  assert.match(source, /\+84363554573/);
  assert.match(source, /https:\/\/wa\.me\/84363554573/);
  assert.match(source, /M8\/219 Nguyen Ngoc Nai street, Hanoi city, Vietnam/);
});
