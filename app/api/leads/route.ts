import { NextResponse } from "next/server";

import { sendLeadNotification } from "@/lib/server/email";
import {
  type LeadSubmissionResponse,
  extractB2CTourLeadFields,
  validateB2CTourPayload,
  validateLeadPayload
} from "@/lib/server/lead-validation";

const MAX_BODY_BYTES = 16_384;

function jsonResponse(body: LeadSubmissionResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  const contentLength = request.headers.get("content-length");

  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return jsonResponse(
      {
        ok: false,
        code: "validation_error",
        message: "Please shorten the request and try again."
      },
      400
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse(
      {
        ok: false,
        code: "validation_error",
        message: "Please submit a valid request."
      },
      400
    );
  }

  const validation = validateLeadPayload(payload);
  const requestedVariant =
    typeof payload === "object" &&
    payload !== null &&
    !Array.isArray(payload) &&
    "variant" in payload &&
    payload.variant === "b2c"
      ? "b2c"
      : undefined;

  if (!validation.ok) {
    const b2cFieldErrors =
      requestedVariant === "b2c" ? validateB2CTourPayload(payload) : {};
    const fieldErrors = {
      ...validation.fieldErrors,
      ...b2cFieldErrors
    };

    return jsonResponse(
      {
        ok: false,
        code: validation.code,
        message: validation.message,
        fieldErrors
      },
      validation.code === "spam_rejected" ? 422 : 400
    );
  }

  const b2cFieldErrors =
    validation.value.variant === "b2c" ? validateB2CTourPayload(payload) : {};

  if (Object.keys(b2cFieldErrors).length > 0) {
    return jsonResponse(
      {
        ok: false,
        code: "validation_error",
        message: "Please check your tour request details.",
        fieldErrors: b2cFieldErrors
      },
      400
    );
  }

  const leadData =
    validation.value.variant === "b2c"
      ? {
          ...validation.value,
          ...extractB2CTourLeadFields(payload)
        }
      : validation.value;

  const mailResult = await sendLeadNotification(leadData);

  if (!mailResult.ok) {
    return jsonResponse(
      {
        ok: false,
        code: mailResult.reason,
        message: "We could not send your email right now. Please try again in a moment."
      },
      mailResult.reason === "mail_unavailable" ? 503 : 502
    );
  }

  return jsonResponse({ ok: true }, 200);
}
