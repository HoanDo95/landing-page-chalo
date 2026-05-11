import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export type MailSendResult =
  | { ok: true }
  | { ok: false; reason: "mail_unavailable" | "mail_failed"; message: string };

export interface MailMessage {
  replyTo?: string;
  subject: string;
  text: string;
}

interface BaseMailConfig {
  to: string;
  from: string;
  defaultReplyTo?: string;
}

interface ResendMailConfig extends BaseMailConfig {
  provider: "resend";
  apiKey: string;
}

interface SmtpMailConfig extends BaseMailConfig {
  provider: "smtp";
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
}

type MailConfig = ResendMailConfig | SmtpMailConfig;

function readEnv(...names: string[]) {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) {
      return value;
    }
  }

  return undefined;
}

function readBooleanEnv(value: string | undefined, fallback: boolean) {
  if (!value) {
    return fallback;
  }

  if (["1", "true", "yes", "on"].includes(value.toLowerCase())) {
    return true;
  }

  if (["0", "false", "no", "off"].includes(value.toLowerCase())) {
    return false;
  }

  return fallback;
}

function readPortEnv(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback;
  }

  const port = Number.parseInt(value, 10);
  if (!Number.isInteger(port) || port <= 0 || port > 65_535) {
    return fallback;
  }

  return port;
}

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

    if (!host || Boolean(user) !== Boolean(pass)) {
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
      apiKey,
      to,
      from,
      defaultReplyTo
    };
  }

  return undefined;
}

function getMessageContent(config: MailConfig, mailMessage: MailMessage) {
  const mailOptions: SMTPTransport.MailOptions = {
    from: config.from,
    to: config.to,
    subject: mailMessage.subject,
    text: mailMessage.text
  };

  const replyTo = mailMessage.replyTo || config.defaultReplyTo;
  if (replyTo) {
    mailOptions.replyTo = replyTo;
  }

  return mailOptions;
}

async function sendWithResend(
  config: ResendMailConfig,
  mailMessage: MailMessage
): Promise<MailSendResult> {
  const message = getMessageContent(config, mailMessage);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: message.from,
      to: [message.to],
      reply_to: message.replyTo,
      subject: message.subject,
      text: message.text
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

async function sendWithSmtp(config: SmtpMailConfig, mailMessage: MailMessage): Promise<MailSendResult> {
  const transportOptions: SMTPTransport.Options = {
    host: config.host,
    port: config.port,
    secure: config.secure
  };

  if (config.user) {
    transportOptions.auth = {
      user: config.user,
      pass: config.pass
    };
  }

  const transport = nodemailer.createTransport(transportOptions);

  await transport.sendMail(getMessageContent(config, mailMessage));

  return { ok: true };
}

export async function sendMail(message: MailMessage): Promise<MailSendResult> {
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
    if (config.provider === "smtp") {
      return await sendWithSmtp(config, message);
    }

    return await sendWithResend(config, message);
  } catch (error) {
    console.error("Lead mail provider failed", error);
    return {
      ok: false,
      reason: "mail_failed",
      message: "Lead email could not be sent."
    };
  }
}
