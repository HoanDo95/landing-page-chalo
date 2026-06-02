# B2C Proof Gallery Imagery Alignment

## Goal

Keep the existing B2C proof block copy and metrics unchanged while replacing the two right-side images and captions so the visuals support the message instead of conflicting with it.

## Scope

- Keep the left-side section title, description, and stat cards exactly as they are.
- Replace the large proof image with a sharper image that communicates direct local execution and a premium on-trip experience.
- Replace the small proof image with a sharper image that communicates real traveler support or guided group handling.
- Update both captions so they match the new images and the fixed left-side message.
- Source the new imagery from the web, but store the approved assets locally in `public/tour/` so production does not depend on third-party hotlinks.

## Selected Direction

Use imagery that reinforces the current message:

- Large image: a polished Vietnam travel experience that still feels directly operated and high quality, not just a generic landmark shot.
- Small image: real guests being handled on tour by a local team, with an obvious human-support or group-guidance signal.

Recommended caption direction:

- Large image: `Directly operated signature experiences`
- Small image: `Real guests supported on tour`

Exact wording may be adjusted slightly after the final image pair is chosen, but both captions must stay tightly aligned with the left-side copy.

## Implementation Shape

- Update `components/b2c/landing-page.tsx` where the proof gallery currently renders:
  - the large image from `heroImage`
  - the small image from `secondaryImage`
  - the two hard-coded captions
- Replace the current image sources with two new local files under `public/tour/`.
- Update `alt` text so each image describes the actual scene and support promise clearly.
- Keep the current layout, card sizes, crop behavior, and section spacing unchanged unless the chosen images force a minimal `object-position` adjustment.

## Asset Rules

- Prefer high-resolution editorial/travel photos that remain clear after the current desktop crop.
- Keep filenames ASCII-only and stable.
- Resize/compress the downloaded files to a web-safe size before final verification.
- Do not introduce remote image hosts into runtime rendering.

## Verification

- Confirm both new images render in the existing proof block on `/b2c`.
- Confirm the captions no longer contradict the visual content.
- Run:
  - `./node_modules/.bin/tsc --noEmit`
  - `npm run build:b2c`

## Out of Scope

- Rewriting the left-side copy or stats
- Changing the proof block layout
- Reworking the surrounding B2C section order
