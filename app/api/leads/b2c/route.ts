import { NextResponse } from "next/server";

import { normalizeB2CGatedLead, validateB2CGatedLead } from "@/lib/b2c/b2c-lead-validation";
import { appendB2CLeadToSheet } from "@/lib/b2c/google-sheets";

const MAX_BODY_BYTES = 16_384;

function jsonResponse(body: unknown, status: number) {
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

  const leadData = normalizeB2CGatedLead(payload as Parameters<typeof normalizeB2CGatedLead>[0]);
  const validation = validateB2CGatedLead(leadData);

  if (!validation.isValid) {
    return jsonResponse(
      {
        ok: false,
        code: "validation_error",
        message: "Please check your trip details.",
        fieldErrors: validation.fieldErrors
      },
      400
    );
  }

  try {
    await appendB2CLeadToSheet({
      numberOfPeople: leadData.numberOfPeople,
      travelDate: leadData.travelDate,
      numberOfNights: leadData.numberOfNights,
      phone: leadData.phone,
      destinations: leadData.destinations,
      notes: leadData.notes,
      pagePath: leadData.pagePath ?? "/",
      submittedAt: leadData.submittedAt ?? new Date().toISOString()
    });
  } catch (error) {
    console.error("B2C gated lead storage failed:", error);

    return jsonResponse(
      {
        ok: false,
        code: "storage_failed",
        message: "We could not record your request right now. Please try again."
      },
      500
    );
  }

  return jsonResponse({ ok: true, message: "Lead recorded" }, 201);
}
