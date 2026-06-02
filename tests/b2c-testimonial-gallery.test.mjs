import assert from "node:assert/strict";
import test from "node:test";

import { getAdjacentAlbumImageSources } from "../lib/b2c/testimonial-carousel.ts";

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
