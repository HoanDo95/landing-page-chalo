# Landing Page Personal

SEO-first landing page codebase with two independent deployment variants:

- `b2b`
- `b2c`

## Run locally

```bash
npm install
npm run dev
```

## Build separate deployments

```bash
npm run build:b2b
npm run build:b2c
```

## Structure

- Shared UI and motion live in one codebase.
- Variant content lives in `lib/content.ts`.
- Variant architecture lives in `docs/architecture/landing-page-variant-sources.md`.
- B2B design source of truth lives in `docs/design/b2b/DESIGN.md`.
- B2C design source of truth lives in `docs/design/b2c/DESIGN.md`.
- Root page uses `LANDING_VARIANT` to select the build variant.
- `/b2b` and `/b2c` routes are available for local preview.
- In production, only the selected deployment variant is public at `/`; the same-variant preview route permanently redirects to `/`, and the other variant route returns 404.
