import type { B2CGatedLeadData } from "@/lib/b2c/b2c-lead-validation";

type FetchLike = (
  input: string,
  init?: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
  }
) => Promise<{
  ok: boolean;
  json: () => Promise<unknown>;
}>;

type B2CGateSubmissionSuccess = {
  ok: true;
  message: string;
};

type B2CGateSubmissionFailure = {
  ok: false;
  code: "validation_error" | "storage_failed" | "unknown";
  message: string;
  fieldErrors?: Partial<Record<keyof B2CGatedLeadData, string>>;
};

export type B2CGateSubmissionResponse = B2CGateSubmissionSuccess | B2CGateSubmissionFailure;

type SubmitB2CGateLeadRequest = (
  payload: B2CGatedLeadData
) => Promise<B2CGateSubmissionResponse>;

type B2CGateSubmissionResult =
  | {
      action: "unlock";
      fieldErrors: {};
    }
  | {
      action: "show_errors";
      fieldErrors: Record<string, string | undefined>;
    };

export function resolveB2CGateSubmission(validation: {
  isValid: boolean;
  fieldErrors: Record<string, string | undefined>;
}): B2CGateSubmissionResult {
  if (!validation.isValid) {
    return {
      action: "show_errors",
      fieldErrors: validation.fieldErrors
    };
  }

  return {
    action: "unlock",
    fieldErrors: {}
  };
}

export async function submitValidatedB2CGateLead(
  validation: {
    isValid: boolean;
    fieldErrors: Record<string, string | undefined>;
  },
  payload: B2CGatedLeadData,
  submitLeadRequest: SubmitB2CGateLeadRequest = submitB2CGateLeadRequest
): Promise<B2CGateSubmissionResult & { message?: string }> {
  const validationResult = resolveB2CGateSubmission(validation);

  if (validationResult.action === "show_errors") {
    return validationResult;
  }

  const submissionResult = await submitLeadRequest(payload);

  if (!submissionResult.ok) {
    return {
      action: "show_errors",
      fieldErrors: submissionResult.fieldErrors ?? {},
      message: submissionResult.message
    };
  }

  return {
    action: "unlock",
    fieldErrors: {},
    message: submissionResult.message
  };
}

export async function submitB2CGateLeadRequest(
  payload: B2CGatedLeadData,
  fetchImpl: FetchLike = fetch
): Promise<B2CGateSubmissionResponse> {
  try {
    const response = await fetchImpl("/api/leads/b2c", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = (await response.json().catch(() => null)) as Partial<B2CGateSubmissionResponse> | null;

    if (!response.ok || !result?.ok) {
      return {
        ok: false,
        code: result?.ok === false ? result.code ?? "unknown" : "unknown",
        message: result?.message || "We could not record your request right now. Please try again.",
        fieldErrors: result?.ok === false ? result.fieldErrors : undefined
      };
    }

    return {
      ok: true,
      message: result.message || "Lead recorded"
    };
  } catch {
    return {
      ok: false,
      code: "unknown",
      message: "We could not record your request right now. Please try again."
    };
  }
}
