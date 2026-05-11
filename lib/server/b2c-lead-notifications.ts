import { sendMail, type MailSendResult } from "@/lib/server/email";
import type { B2CTourLeadSubmission } from "@/lib/server/lead-validation";

function formatB2CLeadSubject(lead: B2CTourLeadSubmission) {
  const leadLabel = lead.name || lead.workEmail;
  const tourPrefix = lead.tourPackageId ? `[${lead.tourPackageId}]` : "[General]";

  return `[Chalo B2C Lead] ${tourPrefix} ${leadLabel}`;
}

function formatB2CLeadText(lead: B2CTourLeadSubmission) {
  return [
    "New B2C landing page lead",
    "",
    `Variant: ${lead.variant}`,
    `Name: ${lead.name || "Not provided"}`,
    `Work email: ${lead.workEmail}`,
    `Tour interest: ${lead.tourPackageId || "General consultation"}`,
    `Phone: ${lead.phoneNumber || "Not provided"}`,
    `Source market: ${lead.sourceMarket || "Not provided"}`,
    `Page path: ${lead.pagePath || "Not provided"}`,
    `Submitted at: ${lead.submittedAt}`
  ].join("\n");
}

export async function sendB2CLeadNotification(
  lead: B2CTourLeadSubmission
): Promise<MailSendResult> {
  return sendMail({
    replyTo: lead.workEmail,
    subject: formatB2CLeadSubject(lead),
    text: formatB2CLeadText(lead)
  });
}
