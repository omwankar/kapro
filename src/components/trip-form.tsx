import { useEffect, useMemo, useRef, useState } from "react";
import {
  Car,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileCheck,
  Hotel,
  Layers,
  LoaderCircle,
  Mail,
  Minus,
  Palmtree,
  Phone,
  Plane,
  Plus,
  Send,
  Ship,
  type LucideIcon,
} from "lucide-react";

import { EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP } from "@/components/site-chrome";
import {
  SERVICE_BY_ID,
  SERVICE_CONFIG,
  defaultServiceValues,
  fieldIsVisible,
  sanitizeDestination,
  sanitizeServiceParam,
  type FieldDef,
  type ServiceId,
} from "@/data/trip-services";

const FORM_ENDPOINT = "https://api.web3forms.com/submit";
const FORM_ACCESS_KEY = import.meta.env["VITE_WEB3FORMS_ACCESS_KEY"] ?? "";
const DRAFT_KEY = "karpo-trip-form-draft";

export const FIELD_CLASS = "trip-input";

type TripFormProps = {
  className?: string;
  idPrefix?: string;
  heading?: React.ReactNode;
  successTitle?: string;
  successBody?: string;
  /** Kept for API compat; layout always shows the left summary column. */
  showTipsCard?: boolean;
};

function dash(value: string) {
  return value.trim() ? value : "—";
}

function liveTripSummary(serviceId: ServiceId | "", values: Record<string, unknown>) {
  if (!serviceId) {
    return {
      route: "—",
      dates: "—",
      travellers: "—",
      preferences: "—",
    };
  }
  const from = String(values["from"] ?? "");
  const to = String(values["to"] ?? "");
  const destination = String(
    values["destination"] ?? values["destinationCountry"] ?? values["pickupLocation"] ?? "",
  );
  const route =
    from && to ? `${from} → ${to}` : destination || (values["region"] ? String(values["region"]) : "");

  const departure = String(
    values["departureDate"] ?? values["checkIn"] ?? values["pickupDate"] ?? values["travelDate"] ?? "",
  );
  const ret = String(
    values["returnDate"] ?? values["checkOut"] ?? values["dropoffDate"] ?? "",
  );
  const window = String(values["travelWindow"] ?? "");
  const dates = departure
    ? ret
      ? `${departure} → ${ret}`
      : departure
    : window || "";

  const adults = Number(values["adults"] ?? values["passengers"] ?? values["applicants"] ?? 0);
  const children = Number(values["children"] ?? 0);
  const infants = Number(values["infants"] ?? 0);
  const travellerBits = [
    adults > 0 ? `${adults} adult${adults === 1 ? "" : "s"}` : "",
    children > 0 ? `${children} child${children === 1 ? "" : "ren"}` : "",
    infants > 0 ? `${infants} infant${infants === 1 ? "" : "s"}` : "",
  ].filter(Boolean);
  const travellers = travellerBits.join(", ");

  const prefs: string[] = [];
  for (const key of [
    "cabin",
    "hotelStyle",
    "hotelLevel",
    "tripStyle",
    "mustHaves",
    "cabinType",
    "vehicleType",
    "visaType",
    "services",
    "budgetPerNight",
    "budgetPerPerson",
    "budget",
  ]) {
    const value = values[key];
    if (Array.isArray(value) && value.length) prefs.push(...value.map(String));
    else if (typeof value === "string" && value) prefs.push(value);
  }
  if (values["includeFlights"] === true) prefs.push("Include flights");
  if (values["flexibleDates"] === true) prefs.push("Flexible dates");
  if (values["directOnly"] === true) prefs.push("Direct only");

  return {
    route: dash(route),
    dates: dash(dates),
    travellers: dash(travellers),
    preferences: dash(prefs.join(", ")),
  };
}

function fieldSpan(field: FieldDef, values: Record<string, unknown>, serviceId: ServiceId) {
  let span = field.span ?? 12;
  if (serviceId === "flights" && field.key === "departureDate" && values["tripType"] === "One way") {
    span = 12;
  }
  if (serviceId === "vacations" && field.key === "tripLength") {
    span = values["useExactDates"] === true ? 12 : 6;
  }
  return span;
}

const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  flights: Plane,
  hotels: Hotel,
  vacations: Palmtree,
  cruises: Ship,
  car: Car,
  visa: FileCheck,
  multiple: Layers,
};

type SharedValues = {
  name: string;
  email: string;
  phone: string;
  preferredContact: "Email" | "Phone" | "WhatsApp";
  message: string;
};

type MultiCityLeg = { from: string; to: string; date: string };

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function buildSummary(
  serviceId: ServiceId,
  serviceValues: Record<string, unknown>,
  shared: SharedValues,
) {
  const service = SERVICE_BY_ID[serviceId];
  const lines: string[] = [`Service: ${service.label}`];

  for (const field of service.fields) {
    if (!fieldIsVisible(field, serviceValues)) continue;
    const value = serviceValues[field.key];
    if (value === "" || value === undefined || value === null) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    if (typeof value === "boolean") {
      lines.push(`${field.label}: ${value ? "Yes" : "No"}`);
      continue;
    }
    if (Array.isArray(value)) {
      lines.push(`${field.label}: ${value.join(", ")}`);
      continue;
    }
    lines.push(`${field.label}: ${String(value)}`);
  }

  if (serviceId === "flights" && serviceValues["tripType"] === "Multi-city") {
    const legs = (serviceValues["multiCityLegs"] as MultiCityLeg[]) ?? [];
    legs.forEach((leg, index) => {
      if (!leg.from && !leg.to && !leg.date) return;
      lines.push(
        `Leg ${index + 1}: ${leg.from || "—"} → ${leg.to || "—"} on ${leg.date || "TBD"}`,
      );
    });
  }

  lines.push(`Preferred contact: ${shared.preferredContact}`);
  if (shared.message.trim()) lines.push(`Notes: ${shared.message.trim()}`);
  return lines.join("\n");
}

function shouldShowField(field: FieldDef, values: Record<string, unknown>, serviceId: ServiceId) {
  if (serviceId === "flights" && values["tripType"] === "Multi-city") {
    if (field.key === "from" || field.key === "to" || field.key === "departureDate" || field.key === "returnDate") {
      return false;
    }
  }
  return fieldIsVisible(field, values);
}

export function TripForm({
  className = "contact-card h-full space-y-5 p-5 sm:p-7",
  idPrefix = "trip",
  heading,
  successTitle = "Thanks, we've got your message.",
  successBody = "We'll reply within one business day.",
  showTipsCard = true,
}: TripFormProps) {
  const submissionInProgress = useRef(false);
  const prefillApplied = useRef(false);

  const [serviceId, setServiceId] = useState<ServiceId | "">("");
  const [shared, setShared] = useState<SharedValues>({
    name: "",
    email: "",
    phone: "",
    preferredContact: "Email",
    message: "",
  });
  const [serviceStore, setServiceStore] = useState<Partial<Record<ServiceId, Record<string, unknown>>>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [tipsOpen, setTipsOpen] = useState(false);

  const serviceValues = useMemo(() => {
    if (!serviceId) return {};
    return serviceStore[serviceId] ?? defaultServiceValues(serviceId);
  }, [serviceId, serviceStore]);

  useEffect(() => {
    if (prefillApplied.current || typeof window === "undefined") return;
    prefillApplied.current = true;
    const params = new URLSearchParams(window.location.search);
    const service = sanitizeServiceParam(params.get("service"));
    const destination = sanitizeDestination(params.get("destination"));

    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as {
          serviceId?: ServiceId | "";
          shared?: SharedValues;
          serviceStore?: Partial<Record<ServiceId, Record<string, unknown>>>;
        };
        if (draft.shared) setShared(draft.shared);
        if (draft.serviceStore) setServiceStore(draft.serviceStore);
        if (draft.serviceId) setServiceId(draft.serviceId);
      }
    } catch {
      /* ignore */
    }

    if (service) {
      setServiceId(service);
      setServiceStore((current) => ({
        ...current,
        [service]: {
          ...(current[service] ?? defaultServiceValues(service)),
          ...(destination ? { destination, to: destination } : {}),
        },
      }));
    } else if (destination) {
      setServiceId("vacations");
      setServiceStore((current) => ({
        ...current,
        vacations: {
          ...(current.vacations ?? defaultServiceValues("vacations")),
          destination,
        },
      }));
      setShared((current) => ({
        ...current,
        message:
          current.message.trim() ||
          `I'd like help planning a trip to ${destination}.`,
      }));
    }
  }, []);

  useEffect(() => {
    if (isSubmitted) return;
    try {
      sessionStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ serviceId, shared, serviceStore }),
      );
    } catch {
      /* ignore */
    }
  }, [serviceId, shared, serviceStore, isSubmitted]);

  function updateShared<K extends keyof SharedValues>(key: K, value: SharedValues[K]) {
    setShared((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
    setSubmitError("");
  }

  function updateServiceValue(key: string, value: unknown) {
    if (!serviceId) return;
    setServiceStore((current) => ({
      ...current,
      [serviceId]: {
        ...(current[serviceId] ?? defaultServiceValues(serviceId)),
        [key]: value,
      },
    }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
    setSubmitError("");
  }

  function selectService(nextId: ServiceId) {
    setServiceId(nextId);
    setServiceStore((current) => ({
      ...current,
      [nextId]: current[nextId] ?? defaultServiceValues(nextId),
    }));
    setErrors((current) => {
      const next = { ...current };
      delete next["service"];
      return next;
    });
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (!serviceId) next["service"] = "Please choose a service.";
    if (!shared.name.trim()) next["name"] = "Please enter your name.";
    if (!shared.email.trim()) next["email"] = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shared.email.trim())) {
      next["email"] = "Enter a valid email address.";
    }

    if (!serviceId) return next;
    const values = serviceValues;
    const service = SERVICE_BY_ID[serviceId];
    const today = todayISO();

    for (const field of service.fields) {
      if (!shouldShowField(field, values, serviceId)) continue;
      const value = values[field.key];
      if (field.required) {
        if (field.type === "checkboxes") {
          if (!Array.isArray(value) || value.length === 0) {
            next[field.key] = `Please choose at least one ${field.label.toLowerCase()}.`;
          }
        } else if (field.type === "toggle") {
          /* toggles are never empty */
        } else if (value === "" || value === undefined || value === null) {
          next[field.key] = `${field.label} is required.`;
        }
      }

      if (field.type === "counter" && typeof value === "number") {
        const min = field.min ?? 0;
        const max = field.max ?? 99;
        if (value < min || value > max) {
          next[field.key] = `${field.label} must be between ${min} and ${max}.`;
        }
      }

      if (field.type === "date" && typeof value === "string" && value) {
        if (
          (field.key === "departureDate" ||
            field.key === "checkIn" ||
            field.key === "pickupDate" ||
            field.key === "travelDate") &&
          value < today
        ) {
          next[field.key] = "Date cannot be in the past.";
        }
      }
    }

    if (serviceId === "flights") {
      if (values["tripType"] === "Return") {
        const dep = String(values["departureDate"] ?? "");
        const ret = String(values["returnDate"] ?? "");
        if (dep && ret && ret < dep) next["returnDate"] = "Return must be on or after departure.";
      }
      if (values["tripType"] === "Multi-city") {
        const legs = (values["multiCityLegs"] as MultiCityLeg[]) ?? [];
        if (legs.length < 1) next["multiCityLegs"] = "Add at least one flight leg.";
        legs.forEach((leg, index) => {
          if (!leg.from.trim()) next[`leg-${index}-from`] = "From is required.";
          if (!leg.to.trim()) next[`leg-${index}-to`] = "To is required.";
          if (!leg.date) next[`leg-${index}-date`] = "Date is required.";
          else if (leg.date < today) next[`leg-${index}-date`] = "Date cannot be in the past.";
        });
      }
      const adults = Number(values["adults"] ?? 1);
      const infants = Number(values["infants"] ?? 0);
      if (infants > adults) next["infants"] = "Infants cannot exceed adults.";
    }

    if (serviceId === "hotels") {
      const checkIn = String(values["checkIn"] ?? "");
      const checkOut = String(values["checkOut"] ?? "");
      if (checkIn && checkOut) {
        const minOut = new Date(checkIn);
        minOut.setDate(minOut.getDate() + 1);
        const minOutIso = minOut.toISOString().slice(0, 10);
        if (checkOut < minOutIso) next["checkOut"] = "Check-out must be after check-in.";
      }
    }

    if (serviceId === "vacations" || serviceId === "multiple") {
      const dep = String(values["departureDate"] ?? "");
      const ret = String(values["returnDate"] ?? "");
      if (dep && ret && ret < dep) next["returnDate"] = "Return must be on or after departure.";
    }

    if (serviceId === "car") {
      const pickup = String(values["pickupDate"] ?? "");
      const dropoff = String(values["dropoffDate"] ?? "");
      if (pickup && dropoff && dropoff < pickup) {
        next["dropoffDate"] = "Drop-off must be on or after pickup.";
      }
    }

    return next;
  }

  function focusFirstError(nextErrors: Record<string, string>) {
    const firstKey = Object.keys(nextErrors)[0];
    if (!firstKey) return;
    const el =
      document.getElementById(`${idPrefix}-${firstKey}`) ??
      document.querySelector<HTMLElement>(`[data-error-key="${firstKey}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgress.current) return;

    const honeypot = new FormData(event.currentTarget).get("company");
    if (honeypot) {
      setIsSubmitted(true);
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
      return;
    }
    if (!serviceId) return;

    if (!FORM_ACCESS_KEY) {
      setSubmitError(
        "The contact form is not configured yet. Please call or WhatsApp us while we finish setup.",
      );
      return;
    }

    const summary = buildSummary(serviceId, serviceValues, shared);
    const service = SERVICE_BY_ID[serviceId];

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: FORM_ACCESS_KEY,
          subject: `[${service.label}] New enquiry from ${shared.name.trim()}`,
          from_name: shared.name.trim(),
          email: shared.email.trim(),
          phone: shared.phone.trim(),
          preferred_contact: shared.preferredContact,
          interest: service.label,
          message: summary,
          details: JSON.stringify({
            service: serviceId,
            preferredContact: shared.preferredContact,
            ...serviceValues,
            notes: shared.message.trim(),
          }),
        }),
      });
      const result = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) {
        throw new Error(result.message || "The form service could not accept your message.");
      }
      setIsSubmitted(true);
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
    } catch (error) {
      console.error("Trip form submission failed:", error);
      setSubmitError(
        "We couldn't send your message just now. Please call or WhatsApp us using the details here.",
      );
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  }

  function startAnotherMessage() {
    setServiceId("");
    setShared({
      name: "",
      email: "",
      phone: "",
      preferredContact: "Email",
      message: "",
    });
    setServiceStore({});
    setErrors({});
    setSubmitError("");
    setIsSubmitted(false);
  }

  function onServiceKeyDown(event: React.KeyboardEvent, index: number) {
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(event.key)) return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (index + delta + SERVICE_CONFIG.length) % SERVICE_CONFIG.length;
    const next = SERVICE_CONFIG[nextIndex];
    if (!next) return;
    selectService(next.id);
    document.getElementById(`${idPrefix}-service-${next.id}`)?.focus();
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

  const selectedService = serviceId ? SERVICE_BY_ID[serviceId] : null;
  const errorCount = Object.keys(errors).length;
  const SelectedIcon = serviceId ? SERVICE_ICONS[serviceId] : null;
  const summary = liveTripSummary(serviceId, serviceValues);
  void showTipsCard;
  void heading;
  void className;

  return (
    <div className="trip-enquiry">
      <aside className="trip-enquiry-side">
        <div className="trip-contact-card">
          <h2 className="trip-enquiry-heading font-display">
            Tell us about your <span className="italic text-red-500">trip</span>
          </h2>
          <div className="trip-contact-rows">
            <a className="trip-contact-row" href={PHONE_TEL}>
              <Phone size={16} aria-hidden="true" />
              <span>
                <span className="trip-contact-label">Phone</span>
                <span className="trip-contact-value">{PHONE_DISPLAY}</span>
              </span>
            </a>
            <a className="trip-contact-row" href={`mailto:${EMAIL}`}>
              <Mail size={16} aria-hidden="true" />
              <span>
                <span className="trip-contact-label">Email</span>
                <span className="trip-contact-value">{EMAIL}</span>
              </span>
            </a>
            <div className="trip-contact-row">
              <Clock size={16} aria-hidden="true" />
              <span>
                <span className="trip-contact-label">Hours</span>
                <span className="trip-contact-value">Call or WhatsApp, 24/7</span>
              </span>
            </div>
          </div>
          <a
            className="accent-outline inline-flex min-h-11 w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold"
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp us
          </a>
        </div>

        <div className="trip-summary-card">
          <div className="trip-summary-head">
            {SelectedIcon ? (
              <span className="trip-service-icon" aria-hidden="true">
                <SelectedIcon size={18} />
              </span>
            ) : (
              <span className="trip-service-icon is-empty" aria-hidden="true" />
            )}
            <p className="trip-summary-service">
              {selectedService?.label ?? "Choose a service"}
            </p>
          </div>
          <dl className="trip-summary-rows">
            <div>
              <dt>Destination / Route</dt>
              <dd className={summary.route === "—" ? "is-empty" : ""}>{summary.route}</dd>
            </div>
            <div>
              <dt>Dates</dt>
              <dd className={summary.dates === "—" ? "is-empty" : ""}>{summary.dates}</dd>
            </div>
            <div>
              <dt>Travellers</dt>
              <dd className={summary.travellers === "—" ? "is-empty" : ""}>{summary.travellers}</dd>
            </div>
            <div>
              <dt>Preferences</dt>
              <dd className={`trip-summary-prefs ${summary.preferences === "—" ? "is-empty" : ""}`}>
                {summary.preferences}
              </dd>
            </div>
          </dl>
          <button
            type="button"
            className="trip-tips-toggle"
            aria-expanded={tipsOpen}
            onClick={() => setTipsOpen((open) => !open)}
          >
            Good to have ready
            <ChevronDown size={16} className={tipsOpen ? "is-open" : ""} aria-hidden="true" />
          </button>
          {tipsOpen ? (
            <ul className="trip-tips-list">
              {(selectedService?.tips ?? [
                "Choose a service to see helpful prep notes.",
              ]).map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </aside>

      <form className="trip-form-card" noValidate onSubmit={handleSubmit}>
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor={`${idPrefix}-company`}>Leave this field empty</label>
          <input id={`${idPrefix}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <section className="trip-section">
          <SectionHeading n={1} title="Choose your service" />
          <div
            className="trip-service-grid"
            role="radiogroup"
            aria-label="Choose your service"
            aria-required="true"
            data-error-key="service"
          >
            {SERVICE_CONFIG.map((service, index) => {
              const Icon = SERVICE_ICONS[service.id];
              const selected = serviceId === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  id={`${idPrefix}-service-${service.id}`}
                  role="radio"
                  aria-checked={selected}
                  className={`trip-service-card ${selected ? "is-selected" : ""}`}
                  onClick={() => selectService(service.id)}
                  onKeyDown={(event) => onServiceKeyDown(event, index)}
                >
                  {selected ? (
                    <span className="trip-service-check" aria-hidden="true">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  ) : null}
                  <span className="trip-service-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                  <span className="trip-service-label">{service.label}</span>
                </button>
              );
            })}
          </div>
          {errors["service"] ? <span className="trip-field-error">{errors["service"]}</span> : null}
        </section>

        <section className={`trip-section trip-section-details ${serviceId ? "is-active" : ""}`} key={serviceId || "none"}>
          <SectionHeading
            n={2}
            title={selectedService ? `${selectedService.label} details` : "Trip details"}
            {...(SelectedIcon ? { icon: SelectedIcon } : {})}
            {...(selectedService?.intro ? { helper: selectedService.intro } : {})}
          />

          {serviceId === "visa" ? (
            <p className="trip-visa-note" role="note">
              Please don&apos;t enter passport numbers or other ID details in this form. We&apos;ll ask for documents securely later.
            </p>
          ) : null}

          {selectedService && serviceId ? (
            <div className="trip-fields-grid">
              {serviceId === "vacations" ? (
                <VacationDateMode
                  idPrefix={idPrefix}
                  values={serviceValues}
                  onChange={updateServiceValue}
                />
              ) : null}
              {selectedService.fields.map((field) => {
                if (serviceId === "vacations" && (field.key === "needIdeas" || field.key === "useExactDates")) {
                  return null;
                }
                if (!shouldShowField(field, serviceValues, serviceId)) return null;
                const span = fieldSpan(field, serviceValues, serviceId);
                const inlineToggle =
                  serviceId === "vacations" && field.key === "destination"
                    ? {
                        label: "I need destination ideas",
                        checked: Boolean(serviceValues["needIdeas"]),
                        onToggle: () => updateServiceValue("needIdeas", !serviceValues["needIdeas"]),
                      }
                    : null;
                return (
                  <FieldControl
                    key={field.key}
                    field={field}
                    span={span}
                    idPrefix={idPrefix}
                    value={serviceValues[field.key]}
                    error={errors[field.key] ?? undefined}
                    onChange={(value) => updateServiceValue(field.key, value)}
                    {...(inlineToggle ? { inlineToggle } : {})}
                  />
                );
              })}
              {serviceId === "flights" && serviceValues["tripType"] === "Multi-city" ? (
                <div className="trip-field" style={{ gridColumn: "span 12" }}>
                  <MultiCityEditor
                    idPrefix={idPrefix}
                    legs={(serviceValues["multiCityLegs"] as MultiCityLeg[]) ?? [{ from: "", to: "", date: "" }]}
                    errors={errors}
                    onChange={(legs) => updateServiceValue("multiCityLegs", legs)}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <p className="trip-section-empty">Select a service above to continue with trip details.</p>
          )}

          <div className="trip-field" style={{ gridColumn: "span 12", marginTop: selectedService ? 8 : 0 }}>
            <label className="trip-label" htmlFor={`${idPrefix}-message`}>
              Anything else we should know?
            </label>
            <textarea
              className="trip-textarea"
              id={`${idPrefix}-message`}
              name="message"
              value={shared.message}
              onChange={(event) => updateShared("message", event.target.value)}
            />
          </div>
        </section>

        <section className="trip-section">
          <SectionHeading n={3} title="Your details" />
          <div className="trip-fields-grid">
            <div className="trip-field" style={{ gridColumn: "span 12" }}>
              <label className="trip-label" htmlFor={`${idPrefix}-name`}>
                Full name <span className="form-label-required">*</span>
              </label>
              <input
                className={FIELD_CLASS}
                id={`${idPrefix}-name`}
                name="name"
                autoComplete="name"
                value={shared.name}
                onChange={(event) => updateShared("name", event.target.value)}
                aria-invalid={Boolean(errors["name"])}
              />
              {errors["name"] ? <span className="trip-field-error">{errors["name"]}</span> : null}
            </div>
            <div className="trip-field" style={{ gridColumn: "span 6" }}>
              <label className="trip-label" htmlFor={`${idPrefix}-email`}>
                Email <span className="form-label-required">*</span>
              </label>
              <input
                className={FIELD_CLASS}
                id={`${idPrefix}-email`}
                name="email"
                type="email"
                autoComplete="email"
                value={shared.email}
                onChange={(event) => updateShared("email", event.target.value)}
                aria-invalid={Boolean(errors["email"])}
              />
              {errors["email"] ? <span className="trip-field-error">{errors["email"]}</span> : null}
            </div>
            <div className="trip-field" style={{ gridColumn: "span 6" }}>
              <label className="trip-label" htmlFor={`${idPrefix}-phone`}>
                Phone / WhatsApp
              </label>
              <input
                className={FIELD_CLASS}
                id={`${idPrefix}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                value={shared.phone}
                onChange={(event) => updateShared("phone", event.target.value)}
              />
            </div>
            <div className="trip-field" style={{ gridColumn: "span 12" }}>
              <p className="trip-label" id={`${idPrefix}-pref-label`}>Preferred contact</p>
              <Segmented
                labelledBy={`${idPrefix}-pref-label`}
                options={["Email", "Phone", "WhatsApp"]}
                value={shared.preferredContact}
                onChange={(value) => updateShared("preferredContact", value as SharedValues["preferredContact"])}
              />
            </div>
          </div>
        </section>

        {errorCount > 0 ? (
          <p className="trip-error-summary" role="alert">
            Please fix {errorCount} {errorCount === 1 ? "field" : "fields"} before sending.
          </p>
        ) : null}

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
            <a className="underline underline-offset-2 hover:text-accent-hover" href={WHATSAPP} target="_blank" rel="noreferrer">
              WhatsApp us
            </a>
            .
          </p>
        ) : null}

        <div className="trip-submit-row">
          <button
            className="accent-button inline-flex h-[52px] min-w-[220px] items-center justify-center gap-2 rounded-full px-8 text-[11px] font-semibold uppercase disabled:cursor-not-allowed disabled:opacity-60"
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
        </div>
      </form>
    </div>
  );
}

function SectionHeading({
  n,
  title,
  helper,
  icon: Icon,
}: {
  n: number;
  title: string;
  helper?: string;
  icon?: LucideIcon | null;
}) {
  return (
    <div className="trip-section-head">
      <span className="trip-section-num" aria-hidden="true">
        {n}
      </span>
      {Icon ? (
        <span className="trip-service-icon trip-section-service-icon" aria-hidden="true">
          <Icon size={16} />
        </span>
      ) : null}
      <div className="trip-section-titles">
        <h3 className="trip-section-title font-display">{title}</h3>
        {helper ? <p className="trip-section-helper">{helper}</p> : null}
      </div>
      <span className="trip-section-rule" aria-hidden="true" />
    </div>
  );
}

function VacationDateMode({
  idPrefix,
  values,
  onChange,
}: {
  idPrefix: string;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}) {
  const exact = values["useExactDates"] === true;
  return (
    <div className="trip-field" style={{ gridColumn: "span 12" }} data-error-key="useExactDates">
      <p className="trip-label" id={`${idPrefix}-date-mode`}>Travel window mode</p>
      <Segmented
        labelledBy={`${idPrefix}-date-mode`}
        options={["Flexible month", "Exact dates"]}
        value={exact ? "Exact dates" : "Flexible month"}
        onChange={(value) => onChange("useExactDates", value === "Exact dates")}
      />
    </div>
  );
}

function Segmented({
  options,
  value,
  onChange,
  labelledBy,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  labelledBy?: string;
}) {
  const index = Math.max(0, options.indexOf(value));
  const wrap = options.length >= 4;
  return (
    <div
      className={`trip-segmented ${wrap ? "is-wrap" : ""}`}
      role="radiogroup"
      aria-labelledby={labelledBy}
      style={{ ["--seg-count" as string]: options.length, ["--seg-index" as string]: index }}
    >
      <span className="trip-segment-indicator" aria-hidden="true" />
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          className={`trip-segment ${value === option ? "is-selected" : ""}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function FieldControl({
  field,
  idPrefix,
  value,
  error,
  onChange,
  span = 12,
  inlineToggle,
}: {
  field: FieldDef;
  idPrefix: string;
  value: unknown;
  error: string | undefined;
  onChange: (value: unknown) => void;
  span?: number;
  inlineToggle?: { label: string; checked: boolean; onToggle: () => void };
}) {
  const id = `${idPrefix}-${field.key}`;
  const min = field.min ?? 0;
  const max = field.max ?? 99;
  const count = Number(value ?? 0);

  return (
    <div className="trip-field" style={{ gridColumn: `span ${span}` }} data-error-key={field.key}>
      {field.type !== "toggle" ? (
        <label
          className="trip-label"
          htmlFor={field.type === "segmented" || field.type === "checkboxes" ? undefined : id}
          id={`${id}-label`}
        >
          {field.label}
          {field.required ? <span className="form-label-required"> *</span> : null}
        </label>
      ) : null}

      {field.type === "text" || field.type === "date" || field.type === "time" ? (
        <input
          className={`${FIELD_CLASS}${field.type === "date" ? " contact-date" : ""}`}
          id={id}
          type={field.type}
          placeholder={field.placeholder}
          value={String(value ?? "")}
          min={field.type === "date" ? todayISO() : undefined}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
        />
      ) : null}

      {field.type === "textarea" ? (
        <textarea
          className="trip-textarea"
          id={id}
          value={String(value ?? "")}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : null}

      {field.type === "select" ? (
        <div className="trip-select-wrap">
          <select
            className={`${FIELD_CLASS} trip-select`}
            id={id}
            value={String(value ?? "")}
            onChange={(event) => onChange(event.target.value)}
            aria-invalid={Boolean(error)}
          >
            <option value="">Select</option>
            {(field.options ?? []).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="trip-select-chevron" size={18} aria-hidden="true" />
        </div>
      ) : null}

      {field.type === "segmented" ? (
        <Segmented
          labelledBy={`${id}-label`}
          options={field.options ?? []}
          value={String(value ?? "")}
          onChange={onChange}
        />
      ) : null}

      {field.type === "counter" ? (
        <div className="trip-counter" id={id}>
          <button
            type="button"
            className="trip-counter-btn"
            aria-label={`Decrease ${field.label}`}
            disabled={count <= min}
            onClick={() => onChange(Math.max(min, count - 1))}
          >
            <Minus size={14} />
          </button>
          <span className="trip-counter-value" aria-live="polite">
            {count}
          </span>
          <button
            type="button"
            className="trip-counter-btn"
            aria-label={`Increase ${field.label}`}
            disabled={count >= max}
            onClick={() => onChange(Math.min(max, count + 1))}
          >
            <Plus size={14} />
          </button>
        </div>
      ) : null}

      {field.type === "toggle" ? (
        <button
          type="button"
          id={id}
          role="switch"
          aria-checked={Boolean(value)}
          className={`trip-switch-card ${value ? "is-on" : ""}`}
          onClick={() => onChange(!value)}
        >
          <span className="trip-switch-card-label">
            {field.label}
            {field.required ? <span className="form-label-required"> *</span> : null}
          </span>
          <span className={`trip-switch ${value ? "is-on" : ""}`} aria-hidden="true">
            <span className="trip-switch-thumb" />
          </span>
        </button>
      ) : null}

      {field.type === "checkboxes" ? (
        <div className="trip-chips" role="group" aria-labelledby={`${id}-label`} id={id}>
          {(field.options ?? []).map((option) => {
            const selected = Array.isArray(value) && value.includes(option);
            return (
              <button
                key={option}
                type="button"
                className={`trip-chip ${selected ? "is-selected" : ""}`}
                aria-pressed={selected}
                onClick={() => {
                  const current = Array.isArray(value) ? [...value] : [];
                  if (selected) onChange(current.filter((item) => item !== option));
                  else onChange([...current, option]);
                }}
              >
                {selected ? <Check size={12} strokeWidth={3} aria-hidden="true" /> : null}
                {option}
              </button>
            );
          })}
        </div>
      ) : null}

      {inlineToggle ? (
        <button
          type="button"
          role="switch"
          aria-checked={inlineToggle.checked}
          className={`trip-inline-switch ${inlineToggle.checked ? "is-on" : ""}`}
          onClick={inlineToggle.onToggle}
        >
          <span className={`trip-switch ${inlineToggle.checked ? "is-on" : ""}`} aria-hidden="true">
            <span className="trip-switch-thumb" />
          </span>
          <span>{inlineToggle.label}</span>
        </button>
      ) : null}

      {field.helper ? <p className="trip-field-helper">{field.helper}</p> : null}
      {error ? <span className="trip-field-error">{error}</span> : null}
    </div>
  );
}

function MultiCityEditor({
  idPrefix,
  legs,
  errors,
  onChange,
}: {
  idPrefix: string;
  legs: MultiCityLeg[];
  errors: Record<string, string>;
  onChange: (legs: MultiCityLeg[]) => void;
}) {
  return (
    <div className="trip-multicity" data-error-key="multiCityLegs">
      <p className="form-label">Multi-city flights</p>
      {legs.map((leg, index) => (
        <div key={`leg-${index}`} className="trip-multicity-row">
          <div>
            <label className="form-label" htmlFor={`${idPrefix}-leg-${index}-from`}>
              From <span className="form-label-required">*</span>
            </label>
            <input
              className={FIELD_CLASS}
              id={`${idPrefix}-leg-${index}-from`}
              value={leg.from}
              onChange={(event) => {
                const next = [...legs];
                next[index] = { ...leg, from: event.target.value };
                onChange(next);
              }}
            />
            {errors[`leg-${index}-from`] ? (
              <span className="trip-field-error">{errors[`leg-${index}-from`]}</span>
            ) : null}
          </div>
          <div>
            <label className="form-label" htmlFor={`${idPrefix}-leg-${index}-to`}>
              To <span className="form-label-required">*</span>
            </label>
            <input
              className={FIELD_CLASS}
              id={`${idPrefix}-leg-${index}-to`}
              value={leg.to}
              onChange={(event) => {
                const next = [...legs];
                next[index] = { ...leg, to: event.target.value };
                onChange(next);
              }}
            />
            {errors[`leg-${index}-to`] ? (
              <span className="trip-field-error">{errors[`leg-${index}-to`]}</span>
            ) : null}
          </div>
          <div>
            <label className="form-label" htmlFor={`${idPrefix}-leg-${index}-date`}>
              Date <span className="form-label-required">*</span>
            </label>
            <input
              className={`${FIELD_CLASS} contact-date`}
              id={`${idPrefix}-leg-${index}-date`}
              type="date"
              min={todayISO()}
              value={leg.date}
              onChange={(event) => {
                const next = [...legs];
                next[index] = { ...leg, date: event.target.value };
                onChange(next);
              }}
            />
            {errors[`leg-${index}-date`] ? (
              <span className="trip-field-error">{errors[`leg-${index}-date`]}</span>
            ) : null}
          </div>
          {legs.length > 1 ? (
            <button
              type="button"
              className="trip-multicity-remove"
              onClick={() => onChange(legs.filter((_, i) => i !== index))}
            >
              Remove
            </button>
          ) : null}
        </div>
      ))}
      {legs.length < 4 ? (
        <button
          type="button"
          className="trip-multicity-add"
          onClick={() => onChange([...legs, { from: "", to: "", date: "" }])}
        >
          <Plus size={14} /> Add another flight
        </button>
      ) : null}
      {errors["multiCityLegs"] ? (
        <span className="trip-field-error">{errors["multiCityLegs"]}</span>
      ) : null}
    </div>
  );
}

/** Back-compat alias used by existing pages */
export function ContactForm(props: TripFormProps) {
  return <TripForm {...props} />;
}
