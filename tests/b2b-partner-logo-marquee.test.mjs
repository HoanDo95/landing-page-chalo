import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const contentSource = readFileSync(new URL("../lib/b2b/content.ts", import.meta.url), "utf8");
const pageSource = readFileSync(new URL("../components/b2b/landing-page.tsx", import.meta.url), "utf8");
const cssSource = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

const logoPaths = [
  "/logo-branch/Booking-com_Logo_1.png",
  "/logo-branch/Agoda_Logo_1.png",
  "/logo-branch/Trip-com_idzG1j8E6i_1.png",
  "/logo-branch/Klook_Logo_1.png",
  "/logo-branch/Traveloka_idgaNgeFw0_1.png",
  "/logo-branch/Viator_idWQLDyxzT_0.png",
  "/logo-branch/GetYourGuide_idEZk98gxp_1.png",
  "/logo-branch/Expedia_Taap_idZUEpq8vY_0.png",
  "/logo-branch/TBO_Holidays.png",
  "/logo-branch/MakeMyTrip_idyZR4lEOi_1.png"
];

test("B2B partner marquee content points to real logo image files", () => {
  for (const logoPath of logoPaths) {
    assert.match(contentSource, new RegExp(`src: "${logoPath}"`));
    assert.equal(existsSync(new URL(`../public${logoPath}`, import.meta.url)), true);
  }
});

test("B2B partner marquee renders logo images instead of text-only wordmarks", () => {
  assert.match(pageSource, /className="b2b-partner-marquee-logo"/);
  assert.match(pageSource, /src=\{item\.src\}/);
  assert.match(pageSource, /alt=\{item\.alt\}/);
  assert.doesNotMatch(pageSource, />\s*\{item\}\s*<\/span>/);
});

test("B2B partner logo tiles use image-friendly sizing", () => {
  assert.match(cssSource, /\.b2b-partner-marquee-wordmark \{[\s\S]*?height: 72px;/);
  assert.match(cssSource, /\.b2b-partner-marquee-logo \{[\s\S]*?object-fit: contain;/);
});
