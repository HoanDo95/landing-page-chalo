import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const emailSource = readFileSync(new URL("../lib/server/email.ts", import.meta.url), "utf8");
const b2bNotificationSource = readFileSync(
  new URL("../lib/server/b2b-lead-notifications.ts", import.meta.url),
  "utf8"
);

test("B2B lead subject is scan-friendly and does not include the sender email", () => {
  const subjectFunction =
    b2bNotificationSource.match(/export function formatB2BLeadSubject[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(subjectFunction, /export function formatB2BLeadSubject/);
  assert.match(
    subjectFunction,
    /return `\[B2B Lead\] \$\{lead\.guestCount\} guests \| \$\{lead\.numberOfDays\} days \| \$\{formatDisplayDate\(lead\.travelDates\)\}`;/
  );
  assert.doesNotMatch(subjectFunction, /lead\.workEmail/);
});

test("B2B lead notification includes a production HTML email with source, next step, and reply CTA", () => {
  assert.match(b2bNotificationSource, /export function formatB2BLeadHtml/);
  assert.match(b2bNotificationSource, /New partner lead received/);
  assert.match(b2bNotificationSource, /B2B landing page/);
  assert.match(b2bNotificationSource, /Next step/);
  assert.match(b2bNotificationSource, /Reply to lead/);
  assert.match(b2bNotificationSource, /No attachments are required/);
});

test("B2B reply links keep the email address readable for mail clients", () => {
  assert.match(b2bNotificationSource, /const escapedWorkEmail = escapeHtml\(lead\.workEmail\);/);
  assert.match(b2bNotificationSource, /const replyHref = `mailto:\$\{escapedWorkEmail\}\?subject=/);
  assert.doesNotMatch(b2bNotificationSource, /mailto:\$\{encodeURIComponent\(lead\.workEmail\)\}/);
});

test("shared mail transport sends HTML for both SMTP and Resend providers", () => {
  assert.match(emailSource, /html\?: string;/);
  assert.match(emailSource, /mailOptions\.html = mailMessage\.html;/);
  assert.match(emailSource, /html: message\.html,/);
});
