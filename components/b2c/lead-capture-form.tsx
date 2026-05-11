"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { useB2CTourSelection } from "@/components/b2c/tour-selection-context";
import { trackEvent } from "@/lib/analytics";
import { isValidWorkEmail } from "@/lib/email-validation";
import { formatUsdPrice } from "@/lib/b2c/tour-pricing";
import type { LandingLeadFormContent, TourPackage } from "@/lib/landing-content";

interface LeadCaptureFormProps {
  content: LandingLeadFormContent;
  tourPackages: TourPackage[];
}

interface FormValues {
  name: string;
  workEmail: string;
  phoneNumber: string;
  tourPackageId: string;
}

type FormErrors = Partial<Record<keyof FormValues | "honeypot", string>>;

type LeadSubmissionResponse =
  | { ok: true }
  | {
      ok: false;
      code: "validation_error" | "spam_rejected" | "mail_unavailable" | "mail_failed";
      message: string;
      fieldErrors?: FormErrors;
    };

const INTERNATIONAL_PHONE_REGEX = /^\+?[0-9][0-9\s()-]{7,18}$/;

const initialValues: FormValues = {
  name: "",
  workEmail: "",
  phoneNumber: "",
  tourPackageId: ""
};

export function LeadCaptureForm({ content, tourPackages }: LeadCaptureFormProps) {
  const { selectedTourId } = useB2CTourSelection();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState<"idle" | "error" | "success">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const tourRef = useRef<HTMLSelectElement | null>(null);
  const honeypotRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!selectedTourId || values.tourPackageId === selectedTourId) {
      return;
    }

    setValues((current) => ({ ...current, tourPackageId: selectedTourId }));
    setErrors((current) => ({ ...current, tourPackageId: undefined }));
  }, [selectedTourId, values.tourPackageId]);

  function updateValue(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));

    if (statusTone !== "idle") {
      setStatusTone("idle");
      setStatusMessage("");
    }
  }

  function validateForm() {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!isValidWorkEmail(values.workEmail)) {
      nextErrors.workEmail = content.validationMessages.workEmailInvalid;
    }

    if (!values.tourPackageId) {
      nextErrors.tourPackageId = "Please choose a tour or request a private consultation.";
    }

    if (values.phoneNumber.trim() && !INTERNATIONAL_PHONE_REGEX.test(values.phoneNumber.trim())) {
      nextErrors.phoneNumber = "Please enter a valid phone or WhatsApp number.";
    }

    return nextErrors;
  }

  function buildPayload() {
    return {
      variant: "b2c",
      name: values.name.trim(),
      workEmail: values.workEmail.trim().toLowerCase(),
      phoneNumber: values.phoneNumber.trim() || undefined,
      tourPackageId: values.tourPackageId,
      sourceMarket: "b2c-vietnam-tours",
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
      body: JSON.stringify(buildPayload())
    });

    return (await response.json().catch(() => ({
      ok: false,
      code: "mail_failed",
      message: "We could not send your request right now. Please try again later."
    }))) as LeadSubmissionResponse;
  }

  function focusFirstError(nextErrors: FormErrors) {
    const target =
      (nextErrors.name ? nameRef.current : null) ||
      (nextErrors.workEmail ? emailRef.current : null) ||
      (nextErrors.phoneNumber ? phoneRef.current : null) ||
      (nextErrors.tourPackageId ? tourRef.current : null);

    target?.focus();
    target?.scrollIntoView({ block: "center" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    trackEvent("b2c_lead_submit_attempt", { fieldCount: 4 });

    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatusTone("error");
      setStatusMessage(content.errorSummary);
      trackEvent("b2c_lead_validation_error", {
        fieldCount: Object.keys(nextErrors).length
      });
      focusFirstError(nextErrors);
      return;
    }

    setErrors({});
    setStatusTone("idle");
    setStatusMessage("");
    setIsSubmitting(true);

    const result = await submitLeadRequest();
    setIsSubmitting(false);

    if (!result.ok) {
      const fieldErrors = result.fieldErrors ?? {};
      setErrors(fieldErrors);
      setStatusTone("error");
      setStatusMessage(result.message || content.errorSummary);
      trackEvent("b2c_lead_submit_failure", {
        code: result.code,
        fieldCount: Object.keys(fieldErrors).length
      });
      focusFirstError(fieldErrors);
      return;
    }

    setValues(initialValues);
    setStatusTone("success");
    setStatusMessage(content.successMessage);
    trackEvent("b2c_lead_submit_success", { fieldCount: 4 });
  }

  const selectedTour = tourPackages.find((tour) => tour.id === values.tourPackageId);

  return (
    <form className="b2c-lead-form" onSubmit={handleSubmit}>
      <div className="b2c-form-trust-strip" aria-label="Lead form trust signals">
        <span>No payment required</span>
        <span>Quote first</span>
        <span>Secure details</span>
      </div>

      <div aria-live={statusTone === "error" ? "assertive" : "polite"} className="b2c-form-feedback">
        {statusMessage ? (
          <p className={`b2c-form-feedback-message b2c-form-feedback-message--${statusTone}`}>
            {statusMessage}
          </p>
        ) : null}
      </div>

      <div className="b2c-form-grid">
        <label className="b2c-form-field" htmlFor="b2c-lead-name">
          <span>Full name</span>
          <input
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            className={errors.name ? "b2c-form-input b2c-form-input--error" : "b2c-form-input"}
            disabled={isSubmitting}
            id="b2c-lead-name"
            name="name"
            placeholder="Aarav Sharma"
            ref={nameRef}
            type="text"
            value={values.name}
            onChange={(event) => updateValue("name", event.target.value)}
          />
          {errors.name ? <span className="b2c-form-field-error">{errors.name}</span> : null}
        </label>

        <label className="b2c-form-field" htmlFor="b2c-lead-email">
          <span>{content.fields.workEmail.label}</span>
          <input
            aria-invalid={Boolean(errors.workEmail)}
            autoComplete="email"
            className={
              errors.workEmail ? "b2c-form-input b2c-form-input--error" : "b2c-form-input"
            }
            disabled={isSubmitting}
            id="b2c-lead-email"
            name="workEmail"
            placeholder={content.fields.workEmail.placeholder}
            ref={emailRef}
            required
            type="email"
            value={values.workEmail}
            onChange={(event) => updateValue("workEmail", event.target.value)}
          />
          {errors.workEmail ? (
            <span className="b2c-form-field-error">{errors.workEmail}</span>
          ) : null}
        </label>

        <label className="b2c-form-field" htmlFor="b2c-lead-phone">
          <span>Phone / WhatsApp</span>
          <input
            aria-invalid={Boolean(errors.phoneNumber)}
            autoComplete="tel"
            className={
              errors.phoneNumber ? "b2c-form-input b2c-form-input--error" : "b2c-form-input"
            }
            disabled={isSubmitting}
            id="b2c-lead-phone"
            inputMode="tel"
            name="phoneNumber"
            placeholder="+91 98765 43210"
            ref={phoneRef}
            type="tel"
            value={values.phoneNumber}
            onChange={(event) => updateValue("phoneNumber", event.target.value)}
          />
          {errors.phoneNumber ? (
            <span className="b2c-form-field-error">{errors.phoneNumber}</span>
          ) : null}
        </label>

        <label className="b2c-form-field" htmlFor="b2c-lead-tour">
          <span>Tour interest</span>
          <select
            aria-invalid={Boolean(errors.tourPackageId)}
            className={
              errors.tourPackageId ? "b2c-form-input b2c-form-input--error" : "b2c-form-input"
            }
            disabled={isSubmitting}
            id="b2c-lead-tour"
            name="tourPackageId"
            ref={tourRef}
            value={values.tourPackageId}
            onChange={(event) => updateValue("tourPackageId", event.target.value)}
          >
            <option value="">Choose a tour</option>
            {tourPackages.map((tour) => (
              <option key={tour.id} value={tour.id}>
                {tour.title} - {formatUsdPrice(tour.priceSale)}
              </option>
            ))}
            <option value="consultation">Private quote</option>
          </select>
          {errors.tourPackageId ? (
            <span className="b2c-form-field-error">{errors.tourPackageId}</span>
          ) : null}
        </label>
      </div>

      {selectedTour ? (
        <p className="b2c-form-selected-tour">
          Selected: <strong>{selectedTour.title}</strong> from{" "}
          <strong>{formatUsdPrice(selectedTour.priceSale)}</strong>.
        </p>
      ) : null}

      <button className="button primary b2c-lead-form-submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending..." : content.submitLabel}
      </button>

      <p className="b2c-form-note">Pay only after itinerary and price are confirmed.</p>

      <label className="b2c-form-honeypot" htmlFor="b2c-lead-website">
        <span>Website</span>
        <input
          autoComplete="off"
          id="b2c-lead-website"
          name="website"
          ref={honeypotRef}
          tabIndex={-1}
          type="text"
        />
      </label>
    </form>
  );
}
