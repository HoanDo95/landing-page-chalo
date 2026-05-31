import { sendMail, type MailSendResult } from "@/lib/server/email";
import type { B2BLeadSubmission } from "@/lib/server/lead-validation";

const VIETNAM_TIME_ZONE = "Asia/Ho_Chi_Minh";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "\"":
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return character;
    }
  });
}

function formatDisplayDate(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  }).format(parsed);
}

function formatSubmittedAt(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    timeZone: VIETNAM_TIME_ZONE,
    timeZoneName: "short",
    year: "numeric"
  }).format(parsed);
}

function formatSource(lead: B2BLeadSubmission) {
  return lead.pagePath ? `B2B landing page (${lead.pagePath})` : "B2B landing page";
}

export function formatB2BLeadSubject(lead: B2BLeadSubmission) {
  return `[B2B Lead] ${lead.guestCount} guests | ${lead.numberOfDays} days | ${formatDisplayDate(lead.travelDates)}`;
}

export function formatB2BLeadText(lead: B2BLeadSubmission) {
  const source = formatSource(lead);
  const submittedAt = formatSubmittedAt(lead.submittedAt);

  return [
    "New ChaloTrip B2B lead",
    "",
    "Lead summary:",
    `Work email: ${lead.workEmail}`,
    `Number of guests: ${lead.guestCount}`,
    `Travel dates: ${lead.travelDates}`,
    `Number of days: ${lead.numberOfDays}`,
    "",
    "Source:",
    source,
    "",
    "Submitted at:",
    submittedAt,
    "",
    "Next step:",
    "Send net rates back to the partner so they can add their own markup or margin."
  ].join("\n");
}

export function formatB2BLeadHtml(lead: B2BLeadSubmission) {
  const subject = formatB2BLeadSubject(lead);
  const source = formatSource(lead);
  const submittedAt = formatSubmittedAt(lead.submittedAt);
  const escapedWorkEmail = escapeHtml(lead.workEmail);
  const replyHref = `mailto:${escapedWorkEmail}?subject=${encodeURIComponent(`Re: ${subject}`)}`;
  const rows = [
    ["Work email", `<a href="mailto:${escapedWorkEmail}" style="color:#005f86;text-decoration:underline;">${escapedWorkEmail}</a>`],
    ["Number of guests", escapeHtml(String(lead.guestCount))],
    ["Travel dates", escapeHtml(lead.travelDates)],
    ["Number of days", escapeHtml(String(lead.numberOfDays))],
    ["Source", escapeHtml(source)],
    ["Submitted at", escapeHtml(submittedAt)]
  ];

  const detailRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #e5edf1;color:#5d7380;font-size:13px;line-height:1.4;">${label}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #e5edf1;color:#001f2a;font-size:14px;font-weight:700;line-height:1.4;">${value}</td>
        </tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f4f9fb;color:#001f2a;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:680px;margin:0 auto;padding:28px 16px;">
      <div style="border:1px solid #d9e7ec;border-radius:18px;overflow:hidden;background:#ffffff;">
        <div style="padding:24px 26px;background:#001f2a;color:#ffffff;">
          <p style="margin:0 0 8px;color:#9fd8ef;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">ChaloTrip B2B</p>
          <h1 style="margin:0;font-size:24px;line-height:1.2;">New partner lead received</h1>
          <p style="margin:10px 0 0;color:#d6ecf5;font-size:14px;line-height:1.5;">Review the trip basics and reply with net rates so the partner can add their own margin.</p>
        </div>
        <div style="padding:24px 26px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #e5edf1;border-radius:14px;overflow:hidden;">
            ${detailRows}
          </table>
          <div style="margin-top:22px;padding:16px 18px;border-left:4px solid #bc7155;background:#fff6f1;border-radius:12px;">
            <p style="margin:0 0 6px;color:#8a4a32;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;">Next step</p>
            <p style="margin:0;color:#001f2a;font-size:14px;line-height:1.55;">Send net rates back to the partner so they can add their own markup or margin.</p>
          </div>
          <p style="margin:24px 0 0;">
            <a href="${replyHref}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:#bc7155;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;">Reply to lead</a>
          </p>
        </div>
      </div>
      <p style="margin:14px 4px 0;color:#6f838d;font-size:12px;line-height:1.5;">This message was generated from the ChaloTrip B2B landing page lead form. No attachments are required.</p>
    </div>
  </body>
</html>`;
}

export async function sendB2BLeadNotification(
  lead: B2BLeadSubmission
): Promise<MailSendResult> {
  return sendMail({
    html: formatB2BLeadHtml(lead),
    replyTo: lead.workEmail,
    subject: formatB2BLeadSubject(lead),
    text: formatB2BLeadText(lead)
  });
}
