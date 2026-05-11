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

## Lead Mail Setup

- The B2B email-only form submits through `/api/leads/b2b`.
- The B2C tours form submits through `/api/leads`.
- Both server routes use the same mail transport configuration from environment variables.

### Local real-send test

Use SMTP with a temporary Gmail sender and route all test leads to `hoando015@gmail.com`.

```bash
LEAD_MAIL_PROVIDER=smtp
LEAD_MAIL_TO=hoando015@gmail.com
LEAD_MAIL_FROM=your-sender@gmail.com
LEAD_SMTP_HOST=smtp.gmail.com
LEAD_SMTP_PORT=587
LEAD_SMTP_SECURE=false
LEAD_SMTP_USER=your-sender@gmail.com
LEAD_SMTP_PASS=your-app-password
```

### Production

Use the `sale@chalotripvn.com` mailbox provider SMTP service only on the deployed server.

```bash
LEAD_MAIL_PROVIDER=smtp
LEAD_MAIL_TO=sale@chalotripvn.com
LEAD_MAIL_FROM=sale@chalotripvn.com
LEAD_MAIL_REPLY_TO=sale@chalotripvn.com
```

Set the SMTP-only values from the mailbox provider panel:

- `LEAD_SMTP_HOST`: exact production SMTP host
- `LEAD_SMTP_PORT`: `587` unless the provider explicitly requires `465`
- `LEAD_SMTP_SECURE`: `false` for `587`, `true` for `465`
- `LEAD_SMTP_USER`: exact mailbox SMTP login
- `LEAD_SMTP_PASS`: exact mailbox SMTP password
- `LANDING_VARIANT`: set to `b2b` or `b2c` per deployment project
- `NEXT_PUBLIC_SITE_URL` and `SITE_URL`: set both to the exact production domain for that deployment

## Structure

- Shared UI and motion live in one codebase.
- Variant content lives in `lib/content.ts`.
- Variant architecture lives in `docs/architecture/landing-page-variant-sources.md`.
- B2B design source of truth lives in `docs/design/b2b/DESIGN.md`.
- B2C design source of truth lives in `docs/design/b2c/DESIGN.md`.
- Root page uses `LANDING_VARIANT` to select the build variant.
- `/b2b` and `/b2c` routes are available for local preview.
- In production, only the selected deployment variant is public at `/`; the same-variant preview route permanently redirects to `/`, and the other variant route returns 404.
