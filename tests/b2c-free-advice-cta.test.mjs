import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("B2C page keeps Get free advice as a prominent optional modal trigger", () => {
  const pageSource = readFileSync(new URL("../components/b2c/landing-page.tsx", import.meta.url), "utf8");
  const overlaySource = readFileSync(new URL("../components/b2c/gated-content-overlay.tsx", import.meta.url), "utf8");
  const cssSource = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(pageSource, /href: "#free-advice"/);
  assert.match(pageSource, /b2c-free-advice-cta/);
  assert.match(pageSource, /b2c-final-advice-button/);
  assert.match(overlaySource, /a\[href="#free-advice"\]/);
  assert.match(overlaySource, /Continue without advice form/);
  assert.match(cssSource, /a\[href="#free-advice"\]\.button/);
});
