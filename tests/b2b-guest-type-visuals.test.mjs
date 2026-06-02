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

test("B2B guest type visuals use semantically matched destination and group images", () => {
  const travelerVisualBlock = pageSource.match(/const travelerTypeVisuals = \[[\s\S]*?\] as const;/)?.[0] ?? "";

  for (const expectedImage of [
    "/tour/private-fit-jeep.jpg",
    "/tour/family-tour-group.jpg",
    "/tour/group-vin.jpg",
    "/tour/mice-conference-hall.jpg",
    "/tour/luxury-halong-cruise.jpg",
    "/tour/phu-quoc.jpg",
    "/tour/hue-imperial-citadel.jpg"
  ]) {
    assert.match(travelerVisualBlock, new RegExp(`src: "${expectedImage}"`));
  }

  assert.doesNotMatch(travelerVisualBlock, /src: "\/customer\//);
});

test("B2B traveler type cards stay square and avoid masonry spans", () => {
  const cssSource = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(cssSource, /\.b2b-traveler-type-card \{[\s\S]*?aspect-ratio: 1 \/ 1;/);
  assert.doesNotMatch(cssSource, /\.b2b-traveler-type-card:first-child,\n\.b2b-traveler-type-card:nth-child\(5\)/);
  assert.doesNotMatch(cssSource, /\.b2b-traveler-type-card:nth-child\(7\) \{\n  grid-column:/);
});

test("B2B first route visual avoids the cropped guest-face image", () => {
  assert.doesNotMatch(pageSource, /src: "\/tour\/family-golden-bridge\.jpg",\n      alt: "Family travelers hosted at Golden Bridge in Da Nang\."/);
  assert.match(pageSource, /src: "\/tour\/halong-bay\.jpg"/);
});
