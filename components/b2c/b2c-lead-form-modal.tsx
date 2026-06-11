"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

import { coercePositiveIntegerInput } from "@/components/b2c/b2c-gate-form-utils";
import { submitValidatedB2CGateLead } from "@/components/b2c/b2c-gate-submission";
import {
  VALID_DESTINATIONS,
  validateB2CGatedLead,
  type B2CGatedLeadData
} from "@/lib/b2c/b2c-lead-validation";
import type { LandingLeadFormContent } from "@/lib/landing-content";

type FieldName = "numberOfPeople" | "travelDate" | "numberOfNights" | "phone" | "destinations" | "notes";
type TextFieldName = Exclude<FieldName, "numberOfPeople" | "numberOfNights" | "destinations">;

interface FormValues {
  numberOfPeople: string;
  travelDate: string;
  numberOfNights: string;
  phone: string;
  destinations: string[];
  notes: string;
}

type FieldErrors = Partial<Record<FieldName, string>>;

interface B2CLeadFormModalProps {
  content: LandingLeadFormContent;
  onCancel: () => void;
  onSuccess: () => void;
}

const initialValues: FormValues = {
  numberOfPeople: "",
  travelDate: "",
  numberOfNights: "",
  phone: "",
  destinations: [],
  notes: ""
};

function toLeadData(values: FormValues): B2CGatedLeadData {
  return {
    numberOfPeople: Number(values.numberOfPeople),
    travelDate: values.travelDate,
    numberOfNights: Number(values.numberOfNights),
    phone: values.phone,
    destinations: values.destinations,
    notes: values.notes || null,
    pagePath: window.location.pathname,
    submittedAt: new Date().toISOString()
  };
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

export function B2CLeadFormModal({ content, onCancel, onSuccess }: B2CLeadFormModalProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const notesLength = values.notes.length;
  const destinationOptions = content.fields.destinations?.options ?? [...VALID_DESTINATIONS];

  function getFieldError(field: FieldName, nextValues: FormValues) {
    return validateB2CGatedLead(toLeadData(nextValues)).fieldErrors[field];
  }

  function updateValue(field: TextFieldName, value: string) {
    const nextValues = { ...values, [field]: value };

    setValues(nextValues);
    setErrors((current) => ({ ...current, [field]: getFieldError(field, nextValues) }));
    setStatusMessage("");
  }

  function updateNumberValue(field: "numberOfPeople" | "numberOfNights", value: string) {
    const normalizedValue = coercePositiveIntegerInput(value);
    const maxValue = field === "numberOfNights" ? 30 : undefined;
    const nextValue =
      normalizedValue && typeof maxValue === "number"
        ? String(Math.min(Number.parseInt(normalizedValue, 10), maxValue))
        : normalizedValue;

    const nextValues = { ...values, [field]: nextValue };
    setValues(nextValues);
    setErrors((current) => ({ ...current, [field]: getFieldError(field, nextValues) }));
    setStatusMessage("");
  }

  function stepNumberValue(field: "numberOfPeople" | "numberOfNights", direction: -1 | 1) {
    const currentValue = Number.parseInt(values[field], 10);
    const maxValue = field === "numberOfNights" ? 30 : undefined;
    const baseValue = Number.isFinite(currentValue) ? currentValue : 1;
    const steppedValue = Math.max(1, baseValue + direction);
    const nextValue = typeof maxValue === "number" ? Math.min(steppedValue, maxValue) : steppedValue;

    updateNumberValue(field, String(nextValue));
  }

  function toggleDestination(destination: string) {
    const nextDestinations = values.destinations.includes(destination)
      ? values.destinations.filter((item) => item !== destination)
      : [...values.destinations, destination];
    const nextValues = { ...values, destinations: nextDestinations };

    setValues(nextValues);
    setErrors((current) => ({ ...current, destinations: getFieldError("destinations", nextValues) }));
    setStatusMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    const leadData = toLeadData(values);
    const submission = await submitValidatedB2CGateLead(validateB2CGatedLead(leadData), leadData);

    setIsSubmitting(false);

    if (submission.action === "show_errors") {
      setErrors(submission.fieldErrors as FieldErrors);
      setStatusMessage(submission.message ?? content.errorSummary);
      return;
    }

    setErrors({});
    setStatusMessage("");
    setValues(initialValues);
    onSuccess();
  }

  return (
    <form aria-busy={isSubmitting} className="b2c-gate-form" onSubmit={handleSubmit}>
      <button
        aria-label="Close advice form"
        className="b2c-gate-form__close"
        disabled={isSubmitting}
        type="button"
        onClick={onCancel}
      >
        x
      </button>
      <div className="b2c-gate-form__logo" aria-hidden="true">
        <Image alt="" fill sizes="120px" src="/logo/chalo-logo-transparent.png" />
      </div>
      <div className="b2c-gate-form__intro">
        <p className="eyebrow">Free Vietnam tour quote</p>
        <h2>GET YOUR CUSTOMIZED VIETNAM ITINERARY IN 15 MINUTES FOR FREE</h2>
        <p>Share a few trip details for a faster quote, or continue browsing and come back later.</p>
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
              type="button"
              onClick={() => stepNumberValue("numberOfPeople", 1)}
            >
              +
            </button>
          </div>
          <FieldError message={errors.numberOfPeople} />
        </label>

        <label className="b2c-form-field" htmlFor="b2c-gate-date">
          <span>{labelWithRequired(content.fields.travelDate?.label ?? "Travel date")}</span>
          <input
            aria-invalid={Boolean(errors.travelDate)}
            className={errors.travelDate ? "b2c-form-input b2c-form-input--error" : "b2c-form-input"}
            disabled={isSubmitting}
            id="b2c-gate-date"
            type="date"
            value={values.travelDate}
            onChange={(event) => updateValue("travelDate", event.target.value)}
          />
          <FieldError message={errors.travelDate} />
        </label>

        <label className="b2c-form-field" htmlFor="b2c-gate-nights">
          <span>{labelWithRequired(content.fields.numberOfNights?.label ?? "Number of nights")}</span>
          <div className="b2c-number-stepper">
            <button
              aria-label="Decrease number of nights"
              className="b2c-number-stepper__button"
              disabled={isSubmitting}
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
              disabled={isSubmitting}
              max={30}
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
              disabled={isSubmitting}
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
            disabled={isSubmitting}
            id="b2c-gate-phone"
            inputMode="tel"
            placeholder={content.fields.phone?.placeholder ?? "+91 98765 43210"}
            type="tel"
            value={values.phone}
            onChange={(event) => updateValue("phone", event.target.value)}
          />
          <FieldError message={errors.phone} />
        </label>

        <fieldset className="b2c-form-field b2c-form-field--full">
          <legend>{labelWithRequired(content.fields.destinations?.label ?? "Destinations")}</legend>
          <p className="b2c-gate-form__helper">Choose the places you want your trip to include.</p>
          <div className="b2c-destination-options">
            {destinationOptions.map((destination) => {
              const isSelected = values.destinations.includes(destination);

              return (
                <label
                  key={destination}
                  className={
                    isSelected
                      ? "b2c-destination-option b2c-destination-option--selected"
                      : "b2c-destination-option"
                  }
                >
                  <input
                    checked={isSelected}
                    className="b2c-destination-option__input"
                    disabled={isSubmitting}
                    type="checkbox"
                    value={destination}
                    onChange={() => toggleDestination(destination)}
                  />
                  <span>{destination}</span>
                </label>
              );
            })}
          </div>
          <FieldError message={errors.destinations} />
        </fieldset>
      </div>

      <label className="b2c-form-field" htmlFor="b2c-gate-notes">
        <span>{content.fields.notes?.label ?? "Notes"}</span>
        <textarea
          aria-invalid={Boolean(errors.notes)}
          className={errors.notes ? "b2c-form-input b2c-form-input--error" : "b2c-form-input"}
          disabled={isSubmitting}
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

      <div className="b2c-gate-form__actions">
        <button className="button primary b2c-gate-form__submit" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : content.submitLabel}
        </button>
        <button className="button secondary b2c-gate-form__skip" disabled={isSubmitting} type="button" onClick={onCancel}>
          Continue without form
        </button>
      </div>
    </form>
  );
}
