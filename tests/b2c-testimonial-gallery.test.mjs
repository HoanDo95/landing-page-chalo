import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  TESTIMONIAL_AUTOPLAY_MS,
  TESTIMONIAL_TRANSITION_MS,
  getAdjacentAlbumImageSources,
  getTestimonialSlideKey
} from "../lib/b2c/testimonial-carousel.ts";

const testimonialCardSource = readFileSync(new URL("../components/b2c/TestimonialCard.tsx", import.meta.url), "utf8");

test("getAdjacentAlbumImageSources returns the next and previous album images around the active one", () => {
  assert.deepEqual(
    getAdjacentAlbumImageSources(["cover.jpg", "beach.jpg", "city.jpg", "food.jpg"], 0),
    ["beach.jpg", "food.jpg"]
  );
});

test("getAdjacentAlbumImageSources deduplicates wrapped neighbors in two-image albums", () => {
  assert.deepEqual(getAdjacentAlbumImageSources(["cover.jpg", "beach.jpg"], 1), ["cover.jpg"]);
});

test("getAdjacentAlbumImageSources returns no preload targets for single-image albums", () => {
  assert.deepEqual(getAdjacentAlbumImageSources(["cover.jpg"], 0), []);
});

test("testimonial carousel motion settings leave more idle time than transition time", () => {
  assert.equal(TESTIMONIAL_AUTOPLAY_MS, 3200);
  assert.equal(TESTIMONIAL_TRANSITION_MS, 520);
  assert.equal(TESTIMONIAL_AUTOPLAY_MS > TESTIMONIAL_TRANSITION_MS * 4, true);
});

test("getTestimonialSlideKey stays stable for the same testimonial and absolute index", () => {
  assert.equal(
    getTestimonialSlideKey({ authorName: "Ms. Myat and Family", tripInfo: "Da Nang, Ba Na Hills & Hoi An" }, 2),
    "Ms. Myat and Family-Da Nang, Ba Na Hills & Hoi An-2"
  );
});

test("testimonial album hero image bypasses next/image optimization so raw preloading matches next/prev navigation", () => {
  assert.match(
    testimonialCardSource,
    /className="b2c-testimonial-album__image"[\s\S]*?unoptimized/
  );
});
