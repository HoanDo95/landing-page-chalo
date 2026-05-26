import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const contentSource = readFileSync(new URL("../lib/b2b/content.ts", import.meta.url), "utf8");
const pageSource = readFileSync(new URL("../components/b2b/landing-page.tsx", import.meta.url), "utf8");

test("B2B guest types include MICE, luxury, leisure, and cultural tour segments", () => {
  for (const segment of ["MICE tour", "Luxury tour", "Leisure Tour", "Cultural Tour"]) {
    assert.match(contentSource, new RegExp(`title: "${segment}"`));
  }
});

test("B2B guest type section renders image-led cards with overlay copy", () => {
  assert.match(pageSource, /const travelerTypeVisuals = \[/);
  assert.match(pageSource, /className="b2b-traveler-type-card"/);
  assert.match(pageSource, /className="b2b-traveler-type-card__overlay"/);
  assert.doesNotMatch(pageSource, /<FeatureCards features=\{content\.travelerTypes\.items\}/);
});

test("B2B guest type visuals avoid label-heavy destination collage images", () => {
  const travelerVisualBlock = pageSource.match(/const travelerTypeVisuals = \[[\s\S]*?\] as const;/)?.[0] ?? "";

  for (const labelHeavyImage of [
    "/tour/sapa.jpg",
    "/tour/phu-quoc.jpg",
    "/tour/hoi-an.jpg",
    "/customer/customer-1/z6907822796021_3185e6541e0604c9e71829763fb06911.jpg"
  ]) {
    assert.doesNotMatch(travelerVisualBlock, new RegExp(`src: "${labelHeavyImage}"`));
  }
});

test("B2B cultural tour card is not stretched into a full-width banner", () => {
  const travelerVisualBlock = pageSource.match(/const travelerTypeVisuals = \[[\s\S]*?\] as const;/)?.[0] ?? "";
  assert.doesNotMatch(travelerVisualBlock, /src: "\/tour\/hue-imperial-citadel\.jpg"/);

  const cssSource = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(cssSource, /\.b2b-traveler-type-card:nth-child\(7\) \{\n  grid-column: 2 \/ span 2;/);
  assert.doesNotMatch(cssSource, /\.b2b-traveler-type-card:nth-child\(7\) \{\n  grid-column: span 4;/);
});

test("B2B first route visual avoids the cropped guest-face image", () => {
  assert.doesNotMatch(pageSource, /src: "\/tour\/family-golden-bridge\.jpg",\n      alt: "Family travelers hosted at Golden Bridge in Da Nang\."/);
  assert.match(pageSource, /src: "\/tour\/halong-bay\.jpg"/);
});
