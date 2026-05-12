"use client";

import { useRef, useState, type FormEvent, type InvalidEvent } from "react";

import { trackEvent } from "@/lib/analytics";
import { EMAIL_INPUT_PATTERN, isValidWorkEmail } from "@/lib/email-validation";
import type { LandingLeadFormContent } from "@/lib/landing-content";

interface LeadCaptureFormProps {
  content: LandingLeadFormContent;
}

interface LeadFormValues {
  workEmail: string;
  guestCount: string;
  travelDates: string;
  numberOfDays: string;
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

const INITIAL_VALUES: LeadFormValues = {
  workEmail: "",
  guestCount: "",
  travelDates: "",
  numberOfDays: ""
};

/** Renders the B2B lead form with trip-detail collection and analytics hooks. */
export function LeadCaptureForm({ content }: LeadCaptureFormProps) {
  const [values, setValues] = useState<LeadFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState<"idle" | "error" | "success">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const workEmailRef = useRef<HTMLInputElement | null>(null);
  const guestCountRef = useRef<HTMLInputElement | null>(null);
  const travelDatesRef = useRef<HTMLInputElement | null>(null);
  const numberOfDaysRef = useRef<HTMLInputElement | null>(null);
  const honeypotRef = useRef<HTMLInputElement | null>(null);

  function handleFieldChange<K extends keyof LeadFormValues>(field: K, value: LeadFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[field];
      return nextErrors;
    });

    if (statusTone !== "idle") {
      setStatusTone("idle");
      setStatusMessage("");
    }
  }

  function focusField(field: keyof LeadFormValues) {
    const fieldRefMap = {
      workEmail: workEmailRef,
      guestCount: guestCountRef,
      travelDates: travelDatesRef,
      numberOfDays: numberOfDaysRef
    } as const;
    const fieldRef = fieldRefMap[field].current;

    if (!fieldRef) {
      return;
    }

    fieldRef.focus();
    fieldRef.scrollIntoView({ block: "center" });
  }

  function getEmailError(value: string) {
    if (!isValidWorkEmail(value)) {
      return content.validationMessages.workEmailInvalid;
    }

    return undefined;
  }

  function getGuestCountError(value: string) {
    const guestCount = Number.parseInt(value.trim(), 10);

    if (!Number.isInteger(guestCount) || guestCount <= 0) {
      return content.validationMessages.guestCountInvalid ?? "Please enter a valid number of guests.";
    }

    return undefined;
  }

  function getTravelDatesError(value: string) {
    if (!value.trim()) {
      return content.validationMessages.travelDatesInvalid ?? "Please enter the travel dates.";
    }

    return undefined;
  }

  function getNumberOfDaysError(value: string) {
    const numberOfDays = Number.parseInt(value.trim(), 10);

    if (!Number.isInteger(numberOfDays) || numberOfDays <= 0) {
      return content.validationMessages.numberOfDaysInvalid ?? "Please enter a valid number of days.";
    }

    return undefined;
  }

  function validateForm() {
    const nextErrors: LeadFormErrors = {};
    const emailError = getEmailError(values.workEmail);
    const guestCountError = getGuestCountError(values.guestCount);
    const travelDatesError = getTravelDatesError(values.travelDates);
    const numberOfDaysError = getNumberOfDaysError(values.numberOfDays);

    if (emailError) {
      nextErrors.workEmail = emailError;
    }

    if (guestCountError) {
      nextErrors.guestCount = guestCountError;
    }

    if (travelDatesError) {
      nextErrors.travelDates = travelDatesError;
    }

    if (numberOfDaysError) {
      nextErrors.numberOfDays = numberOfDaysError;
    }

    return nextErrors;
  }

  function buildSubmissionPayload() {
    return {
      variant: "b2b",
      workEmail: values.workEmail.trim().toLowerCase(),
      guestCount: values.guestCount.trim(),
      travelDates: values.travelDates.trim(),
      numberOfDays: values.numberOfDays.trim(),
      pagePath: window.location.pathname,
      submittedAt: new Date().toISOString(),
      honeypot: honeypotRef.current?.value ?? ""
    };
  }

  async function submitLeadRequest() {
    const response = await fetch("/api/leads/b2b", {
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

    if (!(field instanceof HTMLInputElement)) {
      return;
    }

    const fieldErrorMap = {
      workEmail: getEmailError(field.value),
      guestCount: getGuestCountError(field.value),
      travelDates: getTravelDatesError(field.value),
      numberOfDays: getNumberOfDaysError(field.value)
    } as const;
    const fieldName = field.name as keyof LeadFormValues;
    const fieldError = fieldErrorMap[fieldName];

    if (!fieldError) {
      return;
    }

    setErrors((current) => ({ ...current, [fieldName]: fieldError }));
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

    trackEvent("b2b_lead_submit_attempt", { fieldCount: 4 });

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatusTone("error");
      setStatusMessage(content.errorSummary);
      trackEvent("b2b_lead_validation_error", {
        fieldCount: Object.keys(nextErrors).length
      });
      const firstInvalidField = (["workEmail", "guestCount", "travelDates", "numberOfDays"] as const)
        .find((field) => nextErrors[field]);

      if (firstInvalidField) {
        focusField(firstInvalidField);
      }

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

      const firstServerErrorField = ([
        "workEmail",
        "guestCount",
        "travelDates",
        "numberOfDays"
      ] as const).find((field) => serverFieldErrors[field]);

      if (firstServerErrorField) {
        focusField(firstServerErrorField);
      }

      return;
    }

    setValues(INITIAL_VALUES);
    setStatusTone("success");
    setStatusMessage(content.successMessage);
    trackEvent("b2b_lead_submit_success", { fieldCount: 4 });
  }

  const emailErrorId = "lead-work-email-error";
  const guestCountErrorId = "lead-guest-count-error";
  const travelDatesErrorId = "lead-travel-dates-error";
  const numberOfDaysErrorId = "lead-number-of-days-error";
  const guestCountField = content.fields.guestCount;
  const travelDatesField = content.fields.travelDates;
  const numberOfDaysField = content.fields.numberOfDays;

  return (
    <form className="b2b-lead-form" onInvalidCapture={handleInvalid} onSubmit={handleSubmit}>
      <div aria-live={statusTone === "error" ? "assertive" : "polite"} className="b2b-form-feedback">
        {statusMessage ? (
          <p className={`b2b-form-feedback-message b2b-form-feedback-message--${statusTone}`}>
            {statusMessage}
          </p>
        ) : null}
      </div>

      <div className="b2b-form-grid">
        <label className="b2b-form-field b2b-form-field--full" htmlFor="lead-work-email">
          <span>{content.fields.workEmail.label}</span>
          <input
            aria-describedby={errors.workEmail ? emailErrorId : undefined}
            aria-invalid={Boolean(errors.workEmail)}
            autoComplete="email"
            className={`b2b-form-input${errors.workEmail ? " b2b-form-input--error" : ""}`}
            disabled={isSubmitting}
            id="lead-work-email"
            name="workEmail"
            pattern={EMAIL_INPUT_PATTERN}
            placeholder={content.fields.workEmail.placeholder}
            ref={workEmailRef}
            required
            type="email"
            value={values.workEmail}
            onChange={(event) => handleFieldChange("workEmail", event.target.value)}
          />
          {errors.workEmail ? (
            <span className="b2b-form-field-error" id={emailErrorId}>
              {errors.workEmail}
            </span>
          ) : null}
        </label>

        {guestCountField ? (
          <label className="b2b-form-field" htmlFor="lead-guest-count">
            <span>{guestCountField.label}</span>
            <input
              aria-describedby={errors.guestCount ? guestCountErrorId : undefined}
              aria-invalid={Boolean(errors.guestCount)}
              className={`b2b-form-input${errors.guestCount ? " b2b-form-input--error" : ""}`}
              disabled={isSubmitting}
              id="lead-guest-count"
              inputMode="numeric"
              min="1"
              name="guestCount"
              placeholder={guestCountField.placeholder}
              ref={guestCountRef}
              required
              type="number"
              value={values.guestCount}
              onChange={(event) => handleFieldChange("guestCount", event.target.value)}
            />
            {errors.guestCount ? (
              <span className="b2b-form-field-error" id={guestCountErrorId}>
                {errors.guestCount}
              </span>
            ) : null}
          </label>
        ) : null}

        {travelDatesField ? (
          <label className="b2b-form-field b2b-form-field--full" htmlFor="lead-travel-dates">
            <span>{travelDatesField.label}</span>
            <input
              aria-describedby={errors.travelDates ? travelDatesErrorId : undefined}
              aria-invalid={Boolean(errors.travelDates)}
              className={`b2b-form-input${errors.travelDates ? " b2b-form-input--error" : ""}`}
              disabled={isSubmitting}
              id="lead-travel-dates"
              name="travelDates"
              placeholder={travelDatesField.placeholder}
              ref={travelDatesRef}
              required
              type="text"
              value={values.travelDates}
              onChange={(event) => handleFieldChange("travelDates", event.target.value)}
            />
            {errors.travelDates ? (
              <span className="b2b-form-field-error" id={travelDatesErrorId}>
                {errors.travelDates}
              </span>
            ) : null}
          </label>
        ) : null}

        {numberOfDaysField ? (
          <label className="b2b-form-field" htmlFor="lead-number-of-days">
            <span>{numberOfDaysField.label}</span>
            <input
              aria-describedby={errors.numberOfDays ? numberOfDaysErrorId : undefined}
              aria-invalid={Boolean(errors.numberOfDays)}
              className={`b2b-form-input${errors.numberOfDays ? " b2b-form-input--error" : ""}`}
              disabled={isSubmitting}
              id="lead-number-of-days"
              inputMode="numeric"
              min="1"
              name="numberOfDays"
              placeholder={numberOfDaysField.placeholder}
              ref={numberOfDaysRef}
              required
              type="number"
              value={values.numberOfDays}
              onChange={(event) => handleFieldChange("numberOfDays", event.target.value)}
            />
            {errors.numberOfDays ? (
              <span className="b2b-form-field-error" id={numberOfDaysErrorId}>
                {errors.numberOfDays}
              </span>
            ) : null}
          </label>
        ) : null}
      </div>

      {content.helperText ? <p className="b2b-form-helper">{content.helperText}</p> : null}

      <button className="button primary b2b-lead-form-submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending..." : content.submitLabel}
      </button>

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
