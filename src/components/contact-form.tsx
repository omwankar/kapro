import { useRef, useState } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";

import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP } from "@/components/site-chrome";

const FORM_ENDPOINT = "https://api.web3forms.com/submit";
// Set VITE_WEB3FORMS_ACCESS_KEY in .env.local using the key for Karpotravel@gmail.com.
const FORM_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "";

export const FIELD_CLASS =
  "contact-field min-h-[52px] w-full rounded-[12px] border border-border bg-card px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground";

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  departure: string;
  returnDate: string;
  travellers: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const INITIAL_CONTACT_VALUES: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  departure: "",
  returnDate: "",
  travellers: "",
  message: "",
};

export const INTEREST_OPTIONS = [
  "Flights",
  "Hotels",
  "Vacations",
  "Cruises",
  "Car rental",
  "Visa assistance",
  "Multiple services",
];

type ContactFormProps = {
  className?: string;
  idPrefix?: string;
  heading?: React.ReactNode;
  successTitle?: string;
  successBody?: string;
};

export function ContactForm({
  className = "contact-card h-full space-y-5 p-5 sm:p-7",
  idPrefix = "contact",
  heading,
  successTitle = "Thanks, we've got your message.",
  successBody = "We'll reply within one business day.",
}: ContactFormProps) {
  const submissionInProgress = useRef(false);
  const [values, setValues] = useState(INITIAL_CONTACT_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function updateField<K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  }

  function validate(): ContactFormErrors {
    const nextErrors: ContactFormErrors = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (values.departure && values.returnDate && values.returnDate < values.departure) {
      nextErrors.returnDate = "Return date must be after departure.";
    }
    if (
      values.travellers &&
      (!Number.isInteger(Number(values.travellers)) || Number(values.travellers) < 1)
    ) {
      nextErrors.travellers = "Enter at least one traveller.";
    }
    if (values.message.trim().length < 10) {
      nextErrors.message = "Please enter at least 10 characters.";
    }
    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgress.current) return;

    const form = event.currentTarget;
    const honeypot = new FormData(form).get("company");
    if (honeypot) {
      setIsSubmitted(true);
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = Object.keys(nextErrors)[0];
      document
        .getElementById(
          `${idPrefix}-${firstInvalidField === "returnDate" ? "return" : firstInvalidField}`,
        )
        ?.focus();
      return;
    }

    if (!FORM_ACCESS_KEY) {
      setSubmitError(
        "The contact form is not configured yet. Please call or WhatsApp us while we finish setup.",
      );
      return;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: FORM_ACCESS_KEY,
          subject: `New Karpo Travel inquiry from ${values.name.trim()}`,
          from_name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          interest: values.interest,
          departure_date: values.departure,
          return_date: values.returnDate,
          travellers: values.travellers,
          message: values.message.trim(),
        }),
      });
      const result = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) {
        throw new Error(result.message || "The form service could not accept your message.");
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setSubmitError(
        "We couldn't send your message just now. Please call or WhatsApp us using the details here.",
      );
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  }

  function startAnotherMessage() {
    setValues(INITIAL_CONTACT_VALUES);
    setErrors({});
    setSubmitError("");
    setIsSubmitted(false);
  }

  function fieldError(field: keyof ContactFormValues) {
    return errors[field] ? (
      <span id={`${idPrefix}-${field}-error`} className="mt-1.5 block text-xs text-accent">
        {errors[field]}
      </span>
    ) : null;
  }

  if (isSubmitted) {
    return (
      <div
        className={`contact-card flex min-h-80 flex-col items-center justify-center px-6 py-10 text-center ${className.includes("contact-card") ? "" : className}`}
        role="status"
        aria-live="polite"
      >
        <div className="contact-success-icon" aria-hidden="true">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="mt-5 font-display text-3xl font-medium text-ink">{successTitle}</h3>
        <p className="mt-3 max-w-md text-[15px] leading-[1.7] text-muted-foreground">
          {successBody}
        </p>
        <button
          type="button"
          className="mt-7 text-sm font-semibold text-accent underline underline-offset-4 hover:text-accent-hover"
          onClick={startAnotherMessage}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={className} noValidate onSubmit={handleSubmit}>
      {heading}
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor={`${idPrefix}-company`}>Leave this field empty</label>
        <input
          id={`${idPrefix}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label className="form-label" htmlFor={`${idPrefix}-name`}>
          Full name <span className="form-label-required">*</span>
        </label>
        <input
          className={FIELD_CLASS}
          id={`${idPrefix}-name`}
          name="name"
          autoComplete="name"
          required
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
        />
        {fieldError("name")}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="form-label" htmlFor={`${idPrefix}-email`}>
            Email <span className="form-label-required">*</span>
          </label>
          <input
            className={FIELD_CLASS}
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${idPrefix}-email-error` : undefined}
          />
          {fieldError("email")}
        </div>
        <div>
          <label className="form-label" htmlFor={`${idPrefix}-phone`}>
            Phone / WhatsApp
          </label>
          <input
            className={FIELD_CLASS}
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor={`${idPrefix}-interest`}>
          I&apos;m interested in
        </label>
        <select
          className={FIELD_CLASS}
          id={`${idPrefix}-interest`}
          name="interest"
          value={values.interest}
          onChange={(event) => updateField("interest", event.target.value)}
        >
          <option value="">Select a service</option>
          {INTEREST_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="form-label" htmlFor={`${idPrefix}-departure`}>
            Departure
          </label>
          <input
            className={`${FIELD_CLASS} contact-date`}
            id={`${idPrefix}-departure`}
            name="departure"
            type="date"
            value={values.departure}
            onChange={(event) => updateField("departure", event.target.value)}
          />
        </div>
        <div>
          <label className="form-label" htmlFor={`${idPrefix}-return`}>
            Return
          </label>
          <input
            className={`${FIELD_CLASS} contact-date`}
            id={`${idPrefix}-return`}
            name="returnDate"
            type="date"
            value={values.returnDate}
            onChange={(event) => updateField("returnDate", event.target.value)}
            aria-invalid={Boolean(errors.returnDate)}
            aria-describedby={errors.returnDate ? `${idPrefix}-returnDate-error` : undefined}
          />
          {fieldError("returnDate")}
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor={`${idPrefix}-travellers`}>
          Number of travellers
        </label>
        <input
          className={FIELD_CLASS}
          id={`${idPrefix}-travellers`}
          name="travellers"
          type="number"
          min="1"
          inputMode="numeric"
          value={values.travellers}
          onChange={(event) => updateField("travellers", event.target.value)}
          aria-invalid={Boolean(errors.travellers)}
          aria-describedby={errors.travellers ? `${idPrefix}-travellers-error` : undefined}
        />
        {fieldError("travellers")}
      </div>

      <div>
        <label className="form-label" htmlFor={`${idPrefix}-message`}>
          Message <span className="form-label-required">*</span>
        </label>
        <textarea
          className={`${FIELD_CLASS} min-h-32 resize-y`}
          id={`${idPrefix}-message`}
          name="message"
          required
          minLength={10}
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${idPrefix}-message-error` : undefined}
        />
        {fieldError("message")}
      </div>

      <p className="sr-only" aria-live="polite">
        {isSubmitting ? "Sending your message." : submitError}
      </p>
      {submitError ? (
        <p className="text-sm leading-relaxed text-accent" role="alert">
          {submitError}{" "}
          <a className="underline underline-offset-2 hover:text-accent-hover" href={PHONE_TEL}>
            {PHONE_DISPLAY}
          </a>{" "}
          or{" "}
          <a
            className="underline underline-offset-2 hover:text-accent-hover"
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp us
          </a>
          .
        </p>
      ) : null}

      <button
        className="accent-button inline-flex min-h-[52px] min-w-[220px] items-center justify-center gap-2 rounded-full px-8 py-3 text-[11px] font-semibold uppercase motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="animate-spin motion-reduce:animate-none" size={17} aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send size={15} aria-hidden="true" />
            Send message
          </>
        )}
      </button>
    </form>
  );
}
