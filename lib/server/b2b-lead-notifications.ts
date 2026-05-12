import { sendMail, type MailSendResult } from "@/lib/server/email";
import type { B2BLeadSubmission } from "@/lib/server/lead-validation";

function formatB2BLeadSubject(lead: B2BLeadSubmission) {
  return `[Chalo B2B Lead] ${lead.guestCount} guests | ${lead.numberOfDays} days | ${lead.workEmail}`;
}

function formatB2BLeadText(lead: B2BLeadSubmission) {
  return [
    "New B2B landing page lead",
    "",
    `Variant: ${lead.variant}`,
    `Work email: ${lead.workEmail}`,
    `Number of guests: ${lead.guestCount}`,
    `Travel dates: ${lead.travelDates}`,
    `Number of days: ${lead.numberOfDays}`,
    `Page path: ${lead.pagePath || "Not provided"}`,
    `Submitted at: ${lead.submittedAt}`,
    "",
    "Next step:",
    "Send net rates back to the partner so they can add their own markup or margin."
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
