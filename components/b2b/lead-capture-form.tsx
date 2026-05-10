"use client";

import { useRef, useState, type FormEvent, type InvalidEvent } from "react";

import { trackEvent } from "@/lib/analytics";
import type { LandingLeadFormContent } from "@/lib/landing-content";

interface LeadCaptureFormProps {
  content: LandingLeadFormContent;
}

interface LeadFormValues {
  workEmail: string;
}

type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

type LeadSubmissionResponse =
  | { ok: true }
  | {
      ok: false;
      code: "validation_error" | "spam_rejected" | "mail_unavailable" | "mail_failed";
      message: string;
      fieldErrors?: Partial<Record<keyof LeadFormValues, string>>;
    };

const WORK_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_VALUES: LeadFormValues = {
  workEmail: ""
};

/** Renders the B2B email-only lead form with local validation and analytics hooks. */
export function LeadCaptureForm({ content }: LeadCaptureFormProps) {
  const [values, setValues] = useState<LeadFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState<"idle" | "error" | "success">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const workEmailRef = useRef<HTMLInputElement | null>(null);
  const honeypotRef = useRef<HTMLInputElement | null>(null);

  function handleEmailChange(value: string) {
    setValues({ workEmail: value });
    setErrors({});

    if (statusTone !== "idle") {
      setStatusTone("idle");
      setStatusMessage("");
    }
  }

  function focusWorkEmail() {
    if (!workEmailRef.current) {
      return;
    }

    workEmailRef.current.focus();
    workEmailRef.current.scrollIntoView({ block: "center" });
  }

  function getEmailError(value: string) {
    if (!WORK_EMAIL_REGEX.test(value.trim())) {
      return content.validationMessages.workEmailInvalid;
    }

    return undefined;
  }

  function validateForm() {
    const emailError = getEmailError(values.workEmail);

    if (!emailError) {
      return {};
    }

    return {
      workEmail: emailError
    };
  }

  function buildSubmissionPayload() {
    return {
      variant: "b2b",
      workEmail: values.workEmail,
      pagePath: window.location.pathname,
      submittedAt: new Date().toISOString(),
      honeypot: honeypotRef.current?.value ?? ""
    };
  }

  async function submitLeadRequest() {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(buildSubmissionPayload())
    });

    const body = (await response.json().catch(() => ({
      ok: false,
      code: "mail_failed",
      message: "We could not send your email right now. Please try again in a moment."
    }))) as LeadSubmissionResponse;

    return body;
  }

  function handleInvalid(event: InvalidEvent<HTMLFormElement>) {
    const field = event.target;

    if (!(field instanceof HTMLInputElement) || field.name !== "workEmail") {
      return;
    }

    const fieldError = getEmailError(field.value);

    if (!fieldError) {
      return;
    }

    setErrors({ workEmail: fieldError });
    setStatusTone("error");
    setStatusMessage(content.errorSummary);
    trackEvent("b2b_lead_validation_error", {
      fieldCount: 1,
      nativeValidation: true
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    trackEvent("b2b_lead_submit_attempt", { fieldCount: 1 });

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatusTone("error");
      setStatusMessage(content.errorSummary);
      trackEvent("b2b_lead_validation_error", {
        fieldCount: Object.keys(nextErrors).length
      });
      focusWorkEmail();
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setStatusTone("idle");
    setStatusMessage("");

    const result = await submitLeadRequest();

    setIsSubmitting(false);

    if (!result.ok) {
      const serverFieldErrors = result.fieldErrors ?? {};
      setErrors(serverFieldErrors);
      setStatusTone("error");
      setStatusMessage(result.message || content.errorSummary);
      trackEvent("b2b_lead_submit_failure", {
        code: result.code,
        fieldCount: Object.keys(serverFieldErrors).length
      });

      if (serverFieldErrors.workEmail) {
        focusWorkEmail();
      }

      return;
    }

    setValues(INITIAL_VALUES);
    setStatusTone("success");
    setStatusMessage(content.successMessage);
    trackEvent("b2b_lead_submit_success", { fieldCount: 1 });
  }

  const emailErrorId = "lead-work-email-error";

  return (
    <form className="b2b-lead-form" onInvalidCapture={handleInvalid} onSubmit={handleSubmit}>
      <div aria-live={statusTone === "error" ? "assertive" : "polite"} className="b2b-form-feedback">
        {statusMessage ? (
          <p className={`b2b-form-feedback-message b2b-form-feedback-message--${statusTone}`}>
            {statusMessage}
          </p>
        ) : null}
      </div>

      <div className="b2b-form-inline">
        <label className="b2b-form-field b2b-form-field--email" htmlFor="lead-work-email">
          <span>{content.fields.workEmail.label}</span>
          <input
            aria-describedby={errors.workEmail ? emailErrorId : undefined}
            aria-invalid={Boolean(errors.workEmail)}
            autoComplete="email"
            className={`b2b-form-input${errors.workEmail ? " b2b-form-input--error" : ""}`}
            disabled={isSubmitting}
            id="lead-work-email"
            name="workEmail"
            pattern="[^\\s@]+@[^\\s@]+\\.[^\\s@]+"
            placeholder={content.fields.workEmail.placeholder}
            ref={workEmailRef}
            required
            type="email"
            value={values.workEmail}
            onChange={(event) => handleEmailChange(event.target.value)}
          />
          {errors.workEmail ? (
            <span className="b2b-form-field-error" id={emailErrorId}>
              {errors.workEmail}
            </span>
          ) : null}
        </label>

        <button
          className="button primary b2b-lead-form-submit"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Sending..." : content.submitLabel}
        </button>
      </div>

      <label className="b2b-form-honeypot" htmlFor="lead-website">
        <span>Website</span>
        <input
          autoComplete="off"
          id="lead-website"
          name="website"
          ref={honeypotRef}
          tabIndex={-1}
          type="text"
        />
      </label>
    </form>
  );
}
