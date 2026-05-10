import type { LeadSubmission } from "@/lib/server/lead-validation";

export type MailSendResult =
  | { ok: true }
  | { ok: false; reason: "mail_unavailable" | "mail_failed"; message: string };

interface MailConfig {
  provider: "resend";
  apiKey: string;
  to: string;
  from: string;
  defaultReplyTo?: string;
}

function readMailConfig(): MailConfig | undefined {
  const provider = process.env.LEADS_MAIL_PROVIDER;
  const apiKey = process.env.LEADS_MAIL_API_KEY;
  const to = process.env.LEADS_MAIL_TO;
  const from = process.env.LEADS_MAIL_FROM;
  const defaultReplyTo = process.env.LEADS_MAIL_REPLY_TO;

  if (provider !== "resend" || !apiKey || !to || !from) {
    return undefined;
  }

  return {
    provider,
    apiKey,
    to,
    from,
    defaultReplyTo
  };
}

function formatLeadEmailText(lead: LeadSubmission) {
  const lines = [
    "New landing page lead",
    "",
    `Variant: ${lead.variant}`,
    `Name: ${lead.name || "Not provided"}`,
    `Company: ${lead.company || "Not provided"}`,
    `Work email: ${lead.workEmail}`,
    `Source market: ${lead.sourceMarket || "Not provided"}`,
    `Page path: ${lead.pagePath || "Not provided"}`,
    `Submitted at: ${lead.submittedAt}`,
    "",
    "Travel brief:",
    lead.requestDetails || "Not provided"
  ];

  return lines.join("\n");
}

function formatLeadSubject(lead: LeadSubmission) {
  const company = lead.company ? ` - ${lead.company}` : "";
  const leadLabel = lead.name || lead.workEmail;
  return `[Chalo ${lead.variant.toUpperCase()} lead] ${leadLabel}${company}`;
}

async function sendWithResend(config: MailConfig, lead: LeadSubmission): Promise<MailSendResult> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: lead.workEmail || config.defaultReplyTo,
      subject: formatLeadSubject(lead),
      text: formatLeadEmailText(lead)
    })
  });

  if (!response.ok) {
    const providerBody = await response.text().catch(() => "");
    console.error("Lead mail provider rejected request", {
      status: response.status,
      providerBody
    });

    return {
      ok: false,
      reason: "mail_failed",
      message: "Lead email could not be sent."
    };
  }

  return { ok: true };
}

export async function sendLeadNotification(lead: LeadSubmission): Promise<MailSendResult> {
  const config = readMailConfig();

  if (!config) {
    console.error("Lead mail configuration is missing or unsupported");
    return {
      ok: false,
      reason: "mail_unavailable",
      message: "Lead email is not configured."
    };
  }

  try {
    return await sendWithResend(config, lead);
  } catch (error) {
    console.error("Lead mail provider failed", error);
    return {
      ok: false,
      reason: "mail_failed",
      message: "Lead email could not be sent."
    };
  }
}
