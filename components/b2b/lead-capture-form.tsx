"use client";

import { useRef, useState, type FormEvent, type InvalidEvent } from "react";

import { trackEvent } from "@/lib/analytics";
import type { LandingLeadFormContent } from "@/lib/landing-content";

interface LeadCaptureFormProps {
  content: LandingLeadFormContent;
}

interface LeadFormValues {
  name: string;
  company: string;
  workEmail: string;
  sourceMarket: string;
  requestDetails: string;
}

type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;
type LeadFormFieldName = keyof LeadFormValues;

const WORK_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_VALUES: LeadFormValues = {
  name: "",
  company: "",
  workEmail: "",
  sourceMarket: "",
  requestDetails: ""
};

const FIELD_ORDER: LeadFormFieldName[] = [
  "name",
  "company",
  "workEmail",
  "sourceMarket",
  "requestDetails"
];

/** Renders the Phase 4 lead form with local validation and analytics hooks. */
export function LeadCaptureForm({ content }: LeadCaptureFormProps) {
  const [values, setValues] = useState<LeadFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState<"idle" | "error" | "success">("idle");
  const fieldRefs = useRef<
    Partial<Record<LeadFormFieldName, HTMLInputElement | HTMLTextAreaElement | null>>
  >({});

  function handleFieldChange(field: LeadFormFieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));

    if (statusTone !== "idle") {
      setStatusTone("idle");
      setStatusMessage("");
    }
  }

  function setFieldRef(
    field: LeadFormFieldName,
    element: HTMLInputElement | HTMLTextAreaElement | null
  ) {
    fieldRefs.current[field] = element;
  }

  function focusField(field: LeadFormFieldName) {
    const element = fieldRefs.current[field];
    if (!element) {
      return;
    }

    element.focus();
    element.scrollIntoView({ block: "center" });
  }

  function getFieldError(field: LeadFormFieldName, value: string) {
    if (field === "name" && !value.trim()) {
      return content.validationMessages.nameRequired;
    }

    if (field === "company" && !value.trim()) {
      return content.validationMessages.companyRequired;
    }

    if (field === "workEmail" && !WORK_EMAIL_REGEX.test(value.trim())) {
      return content.validationMessages.workEmailInvalid;
    }

    if (
      field === "requestDetails" &&
      value.trim().length < content.requestDetailsMinLength
    ) {
      return content.validationMessages.requestDetailsTooShort;
    }

    return undefined;
  }

  function validateForm() {
    const nextErrors: LeadFormErrors = {};

    (Object.keys(values) as LeadFormFieldName[]).forEach((field) => {
      const fieldError = getFieldError(field, values[field]);
      if (fieldError) {
        nextErrors[field] = fieldError;
      }
    });

    return nextErrors;
  }

  function handleInvalid(event: InvalidEvent<HTMLFormElement>) {
    const field = event.target;

    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) {
      return;
    }

    const fieldName = field.name as LeadFormFieldName;
    const fieldError = getFieldError(fieldName, field.value);

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackEvent("b2b_lead_submit_attempt", { fieldCount: 5 });

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatusTone("error");
      setStatusMessage(content.errorSummary);
      trackEvent("b2b_lead_validation_error", {
        fieldCount: Object.keys(nextErrors).length,
        hasRequestDetails: values.requestDetails.trim().length >= content.requestDetailsMinLength
      });

      const firstInvalidField = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalidField) {
        focusField(firstInvalidField);
      }
      return;
    }

    setErrors({});
    setValues(INITIAL_VALUES);
    setStatusTone("success");
    setStatusMessage(content.successMessage);
    trackEvent("b2b_lead_submit_success", { fieldCount: 5 });
  }

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
        <FormField
          autoComplete="name"
          content={content.fields.name}
          error={errors.name}
          id="lead-name"
          inputRef={(element) => setFieldRef("name", element)}
          name="name"
          onChange={handleFieldChange}
          value={values.name}
        />
        <FormField
          autoComplete="organization"
          content={content.fields.company}
          error={errors.company}
          id="lead-company"
          inputRef={(element) => setFieldRef("company", element)}
          name="company"
          onChange={handleFieldChange}
          value={values.company}
        />
        <FormField
          autoComplete="email"
          content={content.fields.workEmail}
          error={errors.workEmail}
          id="lead-work-email"
          inputRef={(element) => setFieldRef("workEmail", element)}
          name="workEmail"
          onChange={handleFieldChange}
          type="email"
          value={values.workEmail}
        />
        <FormField
          content={content.fields.sourceMarket}
          error={errors.sourceMarket}
          id="lead-source-market"
          inputRef={(element) => setFieldRef("sourceMarket", element)}
          name="sourceMarket"
          onChange={handleFieldChange}
          value={values.sourceMarket}
        />
        <FormTextarea
          content={content.fields.requestDetails}
          error={errors.requestDetails}
          id="lead-request-details"
          inputRef={(element) => setFieldRef("requestDetails", element)}
          minLength={content.requestDetailsMinLength}
          name="requestDetails"
          onChange={handleFieldChange}
          value={values.requestDetails}
        />
      </div>

      <button className="button primary b2b-lead-form-submit" type="submit">
        {content.submitLabel}
      </button>
    </form>
  );
}

interface FormFieldProps {
  id: string;
  name: keyof LeadFormValues;
  value: string;
  error?: string;
  content: LandingLeadFormContent["fields"]["name"];
  type?: "text" | "email";
  autoComplete?: string;
  inputRef?: (element: HTMLInputElement | null) => void;
  onChange: (field: LeadFormFieldName, value: string) => void;
}

/** Renders a single-line lead form field. */
function FormField({
  id,
  name,
  value,
  error,
  content,
  type = "text",
  autoComplete,
  inputRef,
  onChange
}: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <label className="b2b-form-field" htmlFor={id}>
      <span>{content.label}</span>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        className={`b2b-form-input${error ? " b2b-form-input--error" : ""}`}
        id={id}
        name={name}
        placeholder={content.placeholder}
        pattern={type === "email" ? "[^\\s@]+@[^\\s@]+\\.[^\\s@]+" : undefined}
        ref={inputRef}
        required={name !== "sourceMarket"}
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      />
      {error ? (
        <span className="b2b-form-field-error" id={errorId}>
          {error}
        </span>
      ) : null}
    </label>
  );
}

interface FormTextareaProps {
  id: string;
  minLength: number;
  name: keyof LeadFormValues;
  value: string;
  error?: string;
  content: LandingLeadFormContent["fields"]["requestDetails"];
  inputRef?: (element: HTMLTextAreaElement | null) => void;
  onChange: (field: LeadFormFieldName, value: string) => void;
}

/** Renders the multi-line request details field. */
function FormTextarea({
  id,
  minLength,
  name,
  value,
  error,
  content,
  inputRef,
  onChange
}: FormTextareaProps) {
  const errorId = `${id}-error`;

  return (
    <label className="b2b-form-field b2b-form-field--full" htmlFor={id}>
      <span>{content.label}</span>
      <textarea
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className={`b2b-form-input b2b-form-input--textarea${error ? " b2b-form-input--error" : ""}`}
        id={id}
        minLength={minLength}
        name={name}
        placeholder={content.placeholder}
        ref={inputRef}
        required
        rows={5}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      />
      {error ? (
        <span className="b2b-form-field-error" id={errorId}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
