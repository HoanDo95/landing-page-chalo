"use client";

import { useState, type FormEvent } from "react";

import { coercePositiveIntegerInput } from "@/components/b2c/b2c-gate-form-utils";
import { resolveB2CGateSubmission } from "@/components/b2c/b2c-gate-submission";
import {
  validateB2CGatedLead,
  VALID_TRAVEL_MONTHS,
  type B2CGatedLeadData
} from "@/lib/b2c/b2c-lead-validation";
import type { LandingLeadFormContent } from "@/lib/landing-content";

type FieldName = keyof Pick<
  B2CGatedLeadData,
  "numberOfPeople" | "travelMonth" | "numberOfNights" | "phone" | "city" | "notes"
>;

type FormValues = Record<FieldName, string>;
type FieldErrors = Partial<Record<FieldName, string>>;

interface B2CLeadFormModalProps {
  content: LandingLeadFormContent;
  onSuccess: () => void;
}

const initialValues: FormValues = {
  numberOfPeople: "",
  travelMonth: "",
  numberOfNights: "",
  phone: "",
  city: "",
  notes: ""
};

function toLeadData(values: FormValues): Partial<B2CGatedLeadData> {
  return {
    numberOfPeople: Number(values.numberOfPeople),
    travelMonth: values.travelMonth,
    numberOfNights: Number(values.numberOfNights),
    phone: values.phone,
    city: values.city,
    notes: values.notes || null,
    pagePath: window.location.pathname,
    submittedAt: new Date().toISOString()
  };
}

function getFieldError(field: FieldName, values: FormValues) {
  return validateB2CGatedLead(toLeadData(values)).fieldErrors[field];
}

function labelWithRequired(label: string) {
  return (
    <>
      {label} <span aria-hidden="true">*</span>
    </>
  );
}

function FieldError({ message }: { message?: string }) {
  return (
    <span
      aria-hidden={!message}
      aria-live="polite"
      className={message ? "b2c-form-field-error" : "b2c-form-field-error b2c-form-field-error--hidden"}
    >
      {message || "No error"}
    </span>
  );
}

export function B2CLeadFormModal({ content, onSuccess }: B2CLeadFormModalProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [statusMessage, setStatusMessage] = useState("");
  const notesLength = values.notes.length;

  function updateValue(field: FieldName, value: string) {
    const nextValues = { ...values, [field]: value };

    setValues(nextValues);
    setErrors((current) => ({ ...current, [field]: getFieldError(field, nextValues) }));
    setStatusMessage("");
  }

  function updateNumberValue(field: "numberOfPeople" | "numberOfNights", value: string) {
    updateValue(field, coercePositiveIntegerInput(value));
  }

  function stepNumberValue(field: "numberOfPeople" | "numberOfNights", direction: -1 | 1) {
    const currentValue = Number.parseInt(values[field], 10);
    const nextValue = Number.isFinite(currentValue) ? Math.max(1, currentValue + direction) : 1;
    updateValue(field, String(nextValue));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const leadData = toLeadData(values);
    const submission = resolveB2CGateSubmission(validateB2CGatedLead(leadData));

    if (submission.action === "show_errors") {
      setErrors(submission.fieldErrors);
      setStatusMessage(content.errorSummary);
      return;
    }

    setErrors({});
    setStatusMessage("");
    setValues(initialValues);
    onSuccess();
  }

  return (
    <form className="b2c-gate-form" onSubmit={handleSubmit}>
      <div className="b2c-gate-form__intro">
        <p className="eyebrow">Free Vietnam tour quote</p>
        <h2>Start planning your Vietnam trip.</h2>
        <p>Share a few trip details so we can suggest the most relevant routes, prices, and availability.</p>
      </div>

      <p
        aria-hidden={!statusMessage}
        className={statusMessage ? "b2c-gate-form__status" : "b2c-gate-form__status b2c-gate-form__status--hidden"}
        role={statusMessage ? "alert" : undefined}
      >
        {statusMessage || "No form errors"}
      </p>

      <div className="b2c-gate-form__grid">
        <label className="b2c-form-field" htmlFor="b2c-gate-people">
          <span>{labelWithRequired(content.fields.numberOfPeople?.label ?? "Number of people")}</span>
          <div className="b2c-number-stepper">
            <button
              aria-label="Decrease number of people"
              className="b2c-number-stepper__button"
              type="button"
              onClick={() => stepNumberValue("numberOfPeople", -1)}
            >
              -
            </button>
            <input
              aria-invalid={Boolean(errors.numberOfPeople)}
              className={errors.numberOfPeople ? "b2c-form-input b2c-form-input--error" : "b2c-form-input"}
              id="b2c-gate-people"
              inputMode="numeric"
              min={1}
              placeholder="1"
              step={1}
              type="number"
              value={values.numberOfPeople}
              onChange={(event) => updateNumberValue("numberOfPeople", event.target.value)}
            />
            <button
              aria-label="Increase number of people"
              className="b2c-number-stepper__button"
              type="button"
              onClick={() => stepNumberValue("numberOfPeople", 1)}
            >
              +
            </button>
          </div>
          <FieldError message={errors.numberOfPeople} />
        </label>

        <label className="b2c-form-field" htmlFor="b2c-gate-month">
          <span>{labelWithRequired(content.fields.travelMonth?.label ?? "Travel month")}</span>
          <select
            aria-invalid={Boolean(errors.travelMonth)}
            className={errors.travelMonth ? "b2c-form-input b2c-form-input--error" : "b2c-form-input"}
            id="b2c-gate-month"
            value={values.travelMonth}
            onChange={(event) => updateValue("travelMonth", event.target.value)}
          >
            <option value="">Select</option>
            {VALID_TRAVEL_MONTHS.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <FieldError message={errors.travelMonth} />
        </label>

        <label className="b2c-form-field" htmlFor="b2c-gate-nights">
          <span>{labelWithRequired(content.fields.numberOfNights?.label ?? "Number of nights")}</span>
          <div className="b2c-number-stepper">
            <button
              aria-label="Decrease number of nights"
              className="b2c-number-stepper__button"
              type="button"
              onClick={() => stepNumberValue("numberOfNights", -1)}
            >
              -
            </button>
            <input
              aria-invalid={Boolean(errors.numberOfNights)}
              className={errors.numberOfNights ? "b2c-form-input b2c-form-input--error" : "b2c-form-input"}
              id="b2c-gate-nights"
              inputMode="numeric"
              min={1}
              placeholder="1"
              step={1}
              type="number"
              value={values.numberOfNights}
              onChange={(event) => updateNumberValue("numberOfNights", event.target.value)}
            />
            <button
              aria-label="Increase number of nights"
              className="b2c-number-stepper__button"
              type="button"
              onClick={() => stepNumberValue("numberOfNights", 1)}
            >
              +
            </button>
          </div>
          <FieldError message={errors.numberOfNights} />
        </label>

        <label className="b2c-form-field" htmlFor="b2c-gate-phone">
          <span>{labelWithRequired(content.fields.phone?.label ?? "Phone number")}</span>
          <input
            aria-invalid={Boolean(errors.phone)}
            autoComplete="tel"
            className={errors.phone ? "b2c-form-input b2c-form-input--error" : "b2c-form-input"}
            id="b2c-gate-phone"
            inputMode="tel"
            placeholder={content.fields.phone?.placeholder ?? "+91 98765 43210"}
            type="tel"
            value={values.phone}
            onChange={(event) => updateValue("phone", event.target.value)}
          />
          <FieldError message={errors.phone} />
        </label>

        <label className="b2c-form-field" htmlFor="b2c-gate-city">
          <span>{labelWithRequired(content.fields.city?.label ?? "City")}</span>
          <input
            aria-invalid={Boolean(errors.city)}
            autoComplete="address-level2"
            className={errors.city ? "b2c-form-input b2c-form-input--error" : "b2c-form-input"}
            id="b2c-gate-city"
            placeholder={content.fields.city?.placeholder ?? "Your city"}
            type="text"
            value={values.city}
            onChange={(event) => updateValue("city", event.target.value)}
          />
          <FieldError message={errors.city} />
        </label>
      </div>

      <label className="b2c-form-field" htmlFor="b2c-gate-notes">
        <span>{content.fields.notes?.label ?? "Notes"}</span>
        <textarea
          aria-invalid={Boolean(errors.notes)}
          className={errors.notes ? "b2c-form-input b2c-form-input--error" : "b2c-form-input"}
          id="b2c-gate-notes"
          maxLength={500}
          placeholder={content.fields.notes?.placeholder ?? "Any special requests..."}
          rows={4}
          value={values.notes}
          onChange={(event) => updateValue("notes", event.target.value)}
        />
        <span className="b2c-gate-form__count">{notesLength}/500</span>
        <FieldError message={errors.notes} />
      </label>

      <button className="button primary b2c-gate-form__submit" type="submit">
        {content.submitLabel}
      </button>
    </form>
  );
}
