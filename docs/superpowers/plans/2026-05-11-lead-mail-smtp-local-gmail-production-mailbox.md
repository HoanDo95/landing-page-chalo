# Lead Mail SMTP Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Resend-only lead mail path with an SMTP-first mail layer that sends local test leads to `hoando015@gmail.com` and uses the `sale@chalotripvn.com` mailbox SMTP service only in production.

**Architecture:** Keep the existing `components/*/lead-capture-form.tsx -> /api/leads -> lib/server/email.ts` boundary intact and swap the transport layer underneath it. Normalize mail env names under a `LEAD_*` namespace, add Nodemailer-based SMTP delivery as the primary path, keep an optional Resend fallback during migration, and document separate local and production env setups without committing secrets.

**Tech Stack:** Next.js route handler, TypeScript, Nodemailer SMTP transport, optional Resend compatibility, `curl` smoke tests, `tsc`, `next build`.

---

## File Structure

```txt
package.json
README.md
lib/server/email.ts
docs/plan/b2c/phase-1/phase-4.md
```

- `package.json`
  - Add the `nodemailer` runtime dependency needed for SMTP sending.
- `lib/server/email.ts`
  - Normalize env reads.
  - Support `smtp` as the primary provider.
  - Preserve the existing formatted subject/body logic.
  - Optionally tolerate old `LEADS_*` env names during the migration window.
- `README.md`
  - Add the supported env contract and the local-vs-production mail setup notes.
- `docs/plan/b2c/phase-1/phase-4.md`
  - Update historical plan references so the old env names do not mislead later agents.

## Provider Contract

**Target env contract after migration**

```bash
# Common
LEAD_MAIL_PROVIDER=smtp
LEAD_MAIL_TO=hoando015@gmail.com
LEAD_MAIL_FROM=your-sender@example.com
LEAD_MAIL_REPLY_TO=optional-fallback@example.com

# SMTP transport
LEAD_SMTP_HOST=smtp.gmail.com
LEAD_SMTP_PORT=587
LEAD_SMTP_SECURE=false
LEAD_SMTP_USER=your-sender@gmail.com
LEAD_SMTP_PASS=your-app-password

# Optional legacy compatibility during rollout only
LEADS_MAIL_PROVIDER=
LEADS_MAIL_FROM=
LEADS_MAIL_REPLY_TO=
LEADS_MAIL_API_KEY=
```

**Local real-send test target**

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

**Production mailbox SMTP target**

```bash
LEAD_MAIL_PROVIDER=smtp
LEAD_MAIL_TO=sale@chalotripvn.com
LEAD_MAIL_FROM=sale@chalotripvn.com
LEAD_MAIL_REPLY_TO=sale@chalotripvn.com
```

Use these production rules for the SMTP-only values:
- `LEAD_SMTP_HOST`: the exact SMTP host shown in the `sale@chalotripvn.com` mailbox provider control panel
- `LEAD_SMTP_PORT`: `587` unless the provider explicitly requires `465`
- `LEAD_SMTP_SECURE`: `false` when the port is `587`, `true` when the port is `465`
- `LEAD_SMTP_USER`: the exact SMTP login the provider requires for the `sale@chalotripvn.com` mailbox
- `LEAD_SMTP_PASS`: the mailbox SMTP password or provider-issued app password

## Task 1: Install Nodemailer and Capture the New Env Contract

**Files:**
- Modify: `package.json`
- Modify: `README.md`

- [ ] **Step 1: Install the SMTP dependency**

Run:

```bash
npm install nodemailer
```

Expected:
- `package.json` gains a `nodemailer` dependency.
- `package-lock.json` updates if the repo tracks it.

- [ ] **Step 2: Add the mail setup section to `README.md`**

Add a new section after the build commands:

```md
## Lead Mail Setup

The lead form sends through `/api/leads`, and the mail transport is configured entirely by environment variables.

### Local real-send test

Use SMTP with a temporary Gmail sender and route all messages to `hoando015@gmail.com`.

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

Use the `sale@chalotripvn.com` mailbox provider SMTP service on the deployed server only.

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
```

- [ ] **Step 3: Verify the repo still type-checks before the transport refactor**

Run:

```bash
./node_modules/.bin/tsc --noEmit
```

Expected:
- Passes with exit code `0`.

## Task 2: Refactor `lib/server/email.ts` to Support SMTP as the Primary Provider

**Files:**
- Modify: `lib/server/email.ts`

- [ ] **Step 1: Replace the current Resend-only config types with a provider union**

Replace the top-level config section with:

```ts
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { LeadSubmission } from "@/lib/server/lead-validation";

export type MailSendResult =
  | { ok: true }
  | { ok: false; reason: "mail_unavailable" | "mail_failed"; message: string };

interface BaseMailConfig {
  to: string;
  from: string;
  defaultReplyTo?: string;
}

interface SmtpMailConfig extends BaseMailConfig {
  provider: "smtp";
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
}

interface ResendMailConfig extends BaseMailConfig {
  provider: "resend";
  apiKey: string;
}

type MailConfig = SmtpMailConfig | ResendMailConfig;
```

- [ ] **Step 2: Add env helper functions and normalize the new `LEAD_*` namespace**

Add helper functions above `readMailConfig()`:

```ts
function readEnv(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key];
    if (value && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

function readBooleanEnv(value: string | undefined, fallback: boolean) {
  if (!value) {
    return fallback;
  }

  return value.toLowerCase() === "true";
}

function readPortEnv(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
```

- [ ] **Step 3: Rewrite `readMailConfig()` to prefer SMTP and support legacy fallback names**

Replace `readMailConfig()` with:

```ts
function readMailConfig(): MailConfig | undefined {
  const provider = readEnv("LEAD_MAIL_PROVIDER", "LEADS_MAIL_PROVIDER");
  const to = readEnv("LEAD_MAIL_TO");
  const from = readEnv("LEAD_MAIL_FROM", "LEADS_MAIL_FROM");
  const defaultReplyTo = readEnv("LEAD_MAIL_REPLY_TO", "LEADS_MAIL_REPLY_TO");

  if (!provider || !to || !from) {
    return undefined;
  }

  if (provider === "smtp") {
    const host = readEnv("LEAD_SMTP_HOST");
    const port = readPortEnv(readEnv("LEAD_SMTP_PORT"), 587);
    const secure = readBooleanEnv(readEnv("LEAD_SMTP_SECURE"), port === 465);
    const user = readEnv("LEAD_SMTP_USER");
    const pass = readEnv("LEAD_SMTP_PASS");

    if (!host) {
      return undefined;
    }

    return {
      provider,
      to,
      from,
      defaultReplyTo,
      host,
      port,
      secure,
      user,
      pass
    };
  }

  if (provider === "resend") {
    const apiKey = readEnv("LEAD_RESEND_API_KEY", "LEADS_MAIL_API_KEY");

    if (!apiKey) {
      return undefined;
    }

    return {
      provider,
      to,
      from,
      defaultReplyTo,
      apiKey
    };
  }

  return undefined;
}
```

- [ ] **Step 4: Add the SMTP sender next to the existing Resend sender**

Add this function above `sendWithResend()`:

```ts
async function sendWithSmtp(config: SmtpMailConfig, lead: LeadSubmission): Promise<MailSendResult> {
  const transportConfig: SMTPTransport.Options = {
    host: config.host,
    port: config.port,
    secure: config.secure
  };

  if (config.user) {
    transportConfig.auth = {
      user: config.user,
      pass: config.pass
    };
  }

  const transporter = nodemailer.createTransport(transportConfig);

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: lead.workEmail || config.defaultReplyTo,
    subject: formatLeadSubject(lead),
    text: formatLeadEmailText(lead)
  });

  return { ok: true };
}
```

- [ ] **Step 5: Route `sendLeadNotification()` by provider**

Replace the `try` block at the bottom with:

```ts
  try {
    if (config.provider === "smtp") {
      return await sendWithSmtp(config, lead);
    }

    return await sendWithResend(config, lead);
  } catch (error) {
    console.error("Lead mail provider failed", error);
    return {
      ok: false,
      reason: "mail_failed",
      message: "Lead email could not be sent."
    };
  }
```

- [ ] **Step 6: Verify the transport refactor**

Run:

```bash
./node_modules/.bin/tsc --noEmit
npm run build:b2c
```

Expected:
- TypeScript passes.
- B2C build succeeds.

## Task 3: Update Historical Notes So Future Setup Uses the New Env Names

**Files:**
- Modify: `docs/plan/b2c/phase-1/phase-4.md`

- [ ] **Step 1: Replace the old env block with the new SMTP-first contract**

Replace the old block:

```md
- `LEADS_MAIL_PROVIDER=resend`
- `LEADS_MAIL_API_KEY=re_xxx`
- `LEAD_MAIL_TO=team@chalotravel.com`
- `LEADS_MAIL_FROM=leads@chalotravel.com`
```

With:

```md
- `LEAD_MAIL_PROVIDER=smtp`
- `LEAD_MAIL_TO=team@chalotravel.com`
- `LEAD_MAIL_FROM=leads@chalotravel.com`
- `LEAD_SMTP_HOST=use the mailbox provider SMTP host`
- `LEAD_SMTP_PORT=587`
- `LEAD_SMTP_SECURE=false`
- `LEAD_SMTP_USER=use the mailbox provider SMTP login`
- `LEAD_SMTP_PASS=use the mailbox provider SMTP password`
```

- [ ] **Step 2: Verify old `LEADS_MAIL_TO` references are gone**

Run:

```bash
rg -n "LEADS_MAIL_TO" .
```

Expected:
- No matches in tracked project files.

## Task 4: Local Real-Send Validation to `hoando015@gmail.com`

**Files:**
- No code changes

- [ ] **Step 1: Start the dev server with local Gmail SMTP env**

Run:

```bash
LEAD_MAIL_PROVIDER=smtp \
LEAD_MAIL_TO=hoando015@gmail.com \
LEAD_MAIL_FROM=your-sender@gmail.com \
LEAD_SMTP_HOST=smtp.gmail.com \
LEAD_SMTP_PORT=587 \
LEAD_SMTP_SECURE=false \
LEAD_SMTP_USER=your-sender@gmail.com \
LEAD_SMTP_PASS=your-app-password \
npm run dev
```

Expected:
- Dev server starts without mail config errors.

- [ ] **Step 2: Send a lead request directly to the API**

Run:

```bash
curl -i -s -X POST http://127.0.0.1:3000/api/leads \
  -H 'Content-Type: application/json' \
  --data '{
    "variant":"b2c",
    "name":"Local SMTP Test",
    "workEmail":"lead-test@example.com",
    "phoneNumber":"+84901234567",
    "tourPackageId":"consultation",
    "sourceMarket":"b2c-vietnam-tours",
    "pagePath":"/b2c",
    "submittedAt":"2026-05-11T12:00:00.000Z",
    "honeypot":""
  }'
```

Expected:
- HTTP `200`
- Response body `{"ok":true}`
- A real email arrives at `hoando015@gmail.com`

- [ ] **Step 3: Submit from the browser form**

Manual check:
- Open `http://127.0.0.1:3000/b2c`
- Fill the lead form
- Submit

Expected:
- UI success state appears.
- Another email reaches `hoando015@gmail.com`.

## Task 5: Production Rollout with the `sale@chalotripvn.com` Mailbox SMTP Service

**Files:**
- No repo file changes after deployment env setup

- [ ] **Step 1: Set production env on the server only**

Use values from the mailbox provider:

```bash
LEAD_MAIL_PROVIDER=smtp
LEAD_MAIL_TO=sale@chalotripvn.com
LEAD_MAIL_FROM=sale@chalotripvn.com
LEAD_MAIL_REPLY_TO=sale@chalotripvn.com
```

Use the same production rules from the provider contract section:
- exact SMTP host from the mailbox provider panel
- port `587` unless the provider explicitly requires `465`
- `LEAD_SMTP_SECURE=false` for `587`, `true` for `465`
- exact mailbox SMTP login
- exact mailbox SMTP password

- [ ] **Step 2: Deploy and run a live smoke test**

Manual check:
- Submit one B2C lead on the production deployment.

Expected:
- UI returns success.
- Mail reaches `sale@chalotripvn.com`.
- The message `From` is the business mailbox.
- The lead's entered email appears as `Reply-To`.

- [ ] **Step 3: Check the spam folder and mailbox provider logs once**

Manual check:
- Confirm whether the first production message lands in Inbox or Spam.
- If spam occurs, keep the code unchanged and correct the mailbox provider DNS/auth setup first.

Expected:
- Delivery behavior is understood before broad launch.

## Non-Goals

- Do not change `components/b2c/lead-capture-form.tsx` or `app/api/leads/route.ts` behavior for this migration.
- Do not add a database or queue for lead storage in this task.
- Do not expand this plan to rate limiting or variant-gating hardening; that should be a separate follow-up.

## Acceptance Checklist

- [ ] `lib/server/email.ts` supports `smtp` through Nodemailer.
- [ ] `LEAD_MAIL_TO` remains the recipient source of truth.
- [ ] Local development can send real test mail to `hoando015@gmail.com`.
- [ ] Production can use the `sale@chalotripvn.com` mailbox SMTP service without storing those SMTP secrets in the repo.
- [ ] TypeScript and B2C build pass after the refactor.
- [ ] Repo docs no longer instruct agents to use the old `LEADS_MAIL_TO` name.
