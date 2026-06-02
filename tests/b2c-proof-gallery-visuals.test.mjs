import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const pageSource = readFileSync(new URL("../components/b2c/landing-page.tsx", import.meta.url), "utf8");

test("B2C proof gallery keeps fixed local assets and aligned captions", () => {
  const proofGalleryBlock = pageSource.match(/const proofGallery = \{[\s\S]*?\} as const;/)?.[0] ?? "";

  assert.match(proofGalleryBlock, /src: "\/tour\/luxury-halong-cruise\.jpg"/);
  assert.match(proofGalleryBlock, /src: "\/tour\/b2c-proof-guests-supported\.jpg"/);
  assert.match(proofGalleryBlock, /caption: "Premium routes, sourced direct"/);
  assert.match(proofGalleryBlock, /caption: "Guests briefed and supported locally"/);
  assert.doesNotMatch(proofGalleryBlock, /Golden Bridge experience/);
  assert.doesNotMatch(proofGalleryBlock, /Group tour moments/);
});
