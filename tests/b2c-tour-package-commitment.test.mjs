import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("B2C Amazing Vietnam section exposes Indian dietary commitment badge", () => {
  const contentSource = readFileSync(new URL("../lib/b2c/vietnam-tours-content.ts", import.meta.url), "utf8");
  const pageSource = readFileSync(new URL("../components/b2c/landing-page.tsx", import.meta.url), "utf8");

  assert.match(contentSource, /commitmentBadge: "Indian Food & Vegetarian\/Jain Options Available"/);
  assert.match(pageSource, /b2c-package-commitment/);
});
