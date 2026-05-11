import { sendMail, type MailSendResult } from "@/lib/server/email";
import type { B2BLeadSubmission } from "@/lib/server/lead-validation";

function formatB2BLeadSubject(lead: B2BLeadSubmission) {
  return `[Chalo B2B Lead] ${lead.workEmail}`;
}

function formatB2BLeadText(lead: B2BLeadSubmission) {
  return [
    "New B2B landing page lead",
    "",
    `Variant: ${lead.variant}`,
    `Work email: ${lead.workEmail}`,
    `Page path: ${lead.pagePath || "Not provided"}`,
    `Submitted at: ${lead.submittedAt}`
  ].join("\n");
}

export async function sendB2BLeadNotification(
  lead: B2BLeadSubmission
): Promise<MailSendResult> {
  return sendMail({
    replyTo: lead.workEmail,
    subject: formatB2BLeadSubject(lead),
    text: formatB2BLeadText(lead)
  });
}
