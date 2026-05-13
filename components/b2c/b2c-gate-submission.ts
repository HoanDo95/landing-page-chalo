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
