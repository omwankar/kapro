export type ServiceId =
  | "flights"
  | "hotels"
  | "vacations"
  | "cruises"
  | "car"
  | "visa"
  | "multiple";

export type FieldType =
  | "text"
  | "select"
  | "segmented"
  | "date"
  | "time"
  | "counter"
  | "toggle"
  | "checkboxes"
  | "textarea";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  helper?: string;
  showIf?: { key: string; equals?: string | boolean | number; notEquals?: string | boolean | number };
  min?: number;
  max?: number;
  placeholder?: string;
  /** 12-column grid span (default 12). */
  span?: number;
};

export type ServiceConfig = {
  id: ServiceId;
  label: string;
  icon: string;
  intro: string;
  tips: string[];
  fields: FieldDef[];
};

const MONTH_OPTIONS = (() => {
  const months = ["Flexible"] as string[];
  const now = new Date();
  for (let i = 0; i < 12; i += 1) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    months.push(
      d.toLocaleString("en-US", { month: "long", year: "numeric" }),
    );
  }
  return months;
})();

export const SERVICE_CONFIG: ServiceConfig[] = [
  {
    id: "flights",
    label: "Flights",
    icon: "plane",
    intro: "Tell us your route and cabin preferences.",
    tips: ["Preferred dates", "Passenger names as on passports", "Baggage needs"],
    fields: [
      { key: "tripType", label: "Trip type", type: "segmented", required: true, options: ["Return", "One way", "Multi-city"], span: 12 },
      { key: "from", label: "From", type: "text", required: true, placeholder: "City or airport", span: 6 },
      { key: "to", label: "To", type: "text", required: true, placeholder: "City or airport", span: 6 },
      { key: "departureDate", label: "Departure", type: "date", required: true, span: 6 },
      { key: "returnDate", label: "Return", type: "date", required: true, showIf: { key: "tripType", equals: "Return" }, span: 6 },
      { key: "adults", label: "Adults", type: "counter", required: true, min: 1, max: 9, span: 4 },
      { key: "children", label: "Children (0–11)", type: "counter", min: 0, max: 8, helper: "Age 0–11", span: 4 },
      { key: "infants", label: "Infants (0–2)", type: "counter", min: 0, max: 9, helper: "Age 0–2", span: 4 },
      { key: "cabin", label: "Cabin", type: "segmented", options: ["Economy", "Premium economy", "Business", "First"], span: 12 },
      { key: "flexibleDates", label: "My dates are flexible by a few days", type: "toggle", span: 6 },
      { key: "directOnly", label: "Direct flights only", type: "toggle", span: 6 },
      { key: "preferredAirline", label: "Preferred airline", type: "text", placeholder: "Optional", span: 12 },
    ],
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: "hotel",
    intro: "Share where you’re staying and what matters most.",
    tips: ["Check-in and check-out dates", "Room needs", "Must-have amenities"],
    fields: [
      { key: "destination", label: "Destination", type: "text", required: true, span: 12 },
      { key: "checkIn", label: "Check-in", type: "date", required: true, span: 6 },
      { key: "checkOut", label: "Check-out", type: "date", required: true, span: 6 },
      { key: "rooms", label: "Rooms", type: "counter", min: 1, max: 6, span: 4 },
      { key: "adults", label: "Adults", type: "counter", min: 1, max: 9, span: 4 },
      { key: "children", label: "Children", type: "counter", min: 0, max: 8, span: 4 },
      { key: "hotelStyle", label: "Hotel style", type: "segmented", options: ["3-star", "4-star", "5-star", "Boutique", "Resort"], span: 12 },
      { key: "budgetPerNight", label: "Budget per night", type: "select", options: ["Under $150", "$150-300", "$300-600", "$600+", "Not sure"], span: 12 },
      { key: "mustHaves", label: "Must-haves", type: "checkboxes", options: ["Breakfast included", "Pool", "Beachfront", "Spa", "Family-friendly", "Airport transfer"], span: 12 },
    ],
  },
  {
    id: "vacations",
    label: "Vacations",
    icon: "palmtree",
    intro: "Describe the holiday you’d love — we’ll shape the itinerary.",
    tips: ["Rough travel window", "Who’s travelling", "Trip style and budget"],
    fields: [
      { key: "destination", label: "Destination", type: "text", placeholder: "City or region", span: 12 },
      { key: "needIdeas", label: "I need destination ideas", type: "toggle", span: 12 },
      { key: "useExactDates", label: "I have exact dates", type: "toggle", span: 12 },
      { key: "travelWindow", label: "Travel window", type: "select", options: MONTH_OPTIONS, showIf: { key: "useExactDates", equals: false }, span: 6 },
      { key: "departureDate", label: "Departure", type: "date", showIf: { key: "useExactDates", equals: true }, span: 6 },
      { key: "returnDate", label: "Return", type: "date", showIf: { key: "useExactDates", equals: true }, span: 6 },
      { key: "tripLength", label: "Trip length", type: "select", options: ["3-5 nights", "6-8 nights", "9-14 nights", "15+ nights"], span: 6 },
      { key: "adults", label: "Adults", type: "counter", min: 1, max: 9, span: 6 },
      { key: "children", label: "Children", type: "counter", min: 0, max: 8, span: 6 },
      { key: "tripStyle", label: "Trip style", type: "checkboxes", options: ["Relaxation", "Adventure", "Culture", "Family", "Honeymoon", "Luxury", "Food"], span: 12 },
      { key: "budgetPerPerson", label: "Budget per person", type: "select", options: ["Under $1,500", "$1,500-3,000", "$3,000-6,000", "$6,000+", "Not sure"], span: 6 },
      { key: "hotelLevel", label: "Hotel level", type: "segmented", options: ["3-star", "4-star", "5-star"], span: 6 },
      { key: "includeFlights", label: "Include flights", type: "toggle", span: 12 },
    ],
  },
  {
    id: "cruises",
    label: "Cruises",
    icon: "ship",
    intro: "Pick a region and cabin style — we’ll find the right sailing.",
    tips: ["Preferred region", "Travel month", "Cabin preferences"],
    fields: [
      { key: "region", label: "Region", type: "select", required: true, options: ["Caribbean", "Mediterranean", "Alaska", "Northern Europe", "Asia", "Rivers", "Other"], span: 6 },
      { key: "departurePort", label: "Departure port", type: "text", placeholder: "Optional", span: 6 },
      { key: "travelWindow", label: "Travel window", type: "select", options: MONTH_OPTIONS, span: 6 },
      { key: "length", label: "Length", type: "segmented", options: ["3-5", "6-8", "9-14", "15+"], span: 6 },
      { key: "cabinType", label: "Cabin type", type: "segmented", options: ["Inside", "Ocean view", "Balcony", "Suite"], span: 12 },
      { key: "adults", label: "Adults", type: "counter", min: 1, max: 9, span: 6 },
      { key: "children", label: "Children", type: "counter", min: 0, max: 8, span: 6 },
      { key: "cruiseLine", label: "Cruise line", type: "text", placeholder: "Optional", span: 6 },
      { key: "occasion", label: "Occasion", type: "select", options: ["None", "Honeymoon", "Anniversary", "Family", "Birthday", "Other"], span: 6 },
    ],
  },
  {
    id: "car",
    label: "Car rental",
    icon: "car",
    intro: "Self-drive or chauffeured — we’ll arrange the right vehicle.",
    tips: ["Pickup and drop-off cities", "Dates and times", "Vehicle type"],
    fields: [
      { key: "serviceType", label: "Service type", type: "segmented", required: true, options: ["Self-drive", "Chauffeured"], span: 12 },
      { key: "pickupLocation", label: "Pickup location", type: "text", required: true, span: 12 },
      { key: "dropoffSame", label: "Drop off at the same location", type: "toggle", span: 12 },
      { key: "dropoffLocation", label: "Drop-off location", type: "text", required: true, showIf: { key: "dropoffSame", equals: false }, span: 12 },
      { key: "pickupDate", label: "Pickup date", type: "date", required: true, span: 6 },
      { key: "pickupTime", label: "Pickup time", type: "time", span: 6 },
      { key: "dropoffDate", label: "Drop-off date", type: "date", required: true, span: 6 },
      { key: "dropoffTime", label: "Drop-off time", type: "time", span: 6 },
      { key: "vehicleType", label: "Vehicle type", type: "select", options: ["Economy", "SUV", "Luxury", "Van", "Convertible"], span: 6 },
      { key: "passengers", label: "Passengers", type: "counter", min: 1, max: 9, span: 6 },
      { key: "driverAge25Plus", label: "Driver is 25+", type: "toggle", showIf: { key: "serviceType", equals: "Self-drive" }, span: 12 },
      { key: "extras", label: "Extras", type: "checkboxes", options: ["GPS", "Child seat", "Additional driver", "Airport pickup"], span: 12 },
    ],
  },
  {
    id: "visa",
    label: "Visa assistance",
    icon: "file-check",
    intro: "We’ll guide the right visa path — no passport numbers needed here.",
    tips: ["Passport expiry date", "Travel dates", "Purpose of travel"],
    fields: [
      { key: "passportCountry", label: "Passport country", type: "text", required: true, span: 6 },
      { key: "destinationCountry", label: "Destination country", type: "text", required: true, span: 6 },
      { key: "visaType", label: "Visa type", type: "select", required: true, options: ["Tourist", "Business", "Student", "Transit", "Other"], span: 6 },
      { key: "travelDate", label: "Travel date", type: "date", span: 6 },
      { key: "applicants", label: "Applicants", type: "counter", min: 1, max: 9, span: 6 },
      { key: "urgency", label: "Urgency", type: "segmented", options: ["Standard", "Urgent"], span: 6 },
      { key: "passportValid", label: "Passport valid 6+ months?", type: "segmented", options: ["Yes, 6+ months", "No", "Not sure"], span: 12 },
    ],
  },
  {
    id: "multiple",
    label: "Multiple services",
    icon: "layers",
    intro: "Select everything you need — one specialist will coordinate it.",
    tips: ["Which services you need", "Destination and dates", "Traveller count"],
    fields: [
      { key: "services", label: "Services needed", type: "checkboxes", required: true, options: ["Flights", "Hotels", "Vacations", "Cruises", "Car rental", "Visa assistance"], span: 12 },
      { key: "destination", label: "Destination", type: "text", span: 12 },
      { key: "departureDate", label: "Departure", type: "date", span: 6 },
      { key: "returnDate", label: "Return", type: "date", span: 6 },
      { key: "adults", label: "Adults", type: "counter", min: 1, max: 9, span: 6 },
      { key: "children", label: "Children", type: "counter", min: 0, max: 8, span: 6 },
      { key: "budget", label: "Budget", type: "select", options: ["Under $1,500", "$1,500-3,000", "$3,000-6,000", "$6,000+", "Not sure"], span: 12 },
    ],
  },
];

export const SERVICE_BY_ID = Object.fromEntries(
  SERVICE_CONFIG.map((service) => [service.id, service]),
) as Record<ServiceId, ServiceConfig>;

export function sanitizeServiceParam(raw: string | null): ServiceId | "" {
  if (!raw) return "";
  const value = raw.trim().toLowerCase();
  const aliases: Record<string, ServiceId> = {
    flights: "flights",
    hotels: "hotels",
    vacations: "vacations",
    cruises: "cruises",
    car: "car",
    cars: "car",
    "car-rental": "car",
    visa: "visa",
    "visa-assistance": "visa",
    multiple: "multiple",
  };
  return aliases[value] ?? "";
}

export function sanitizeDestination(raw: string | null) {
  if (!raw) return "";
  return raw
    .replace(/[^a-zA-Z\s()]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
}

export function defaultServiceValues(serviceId: ServiceId): Record<string, unknown> {
  const base: Record<string, unknown> = {};
  const service = SERVICE_BY_ID[serviceId];
  for (const field of service.fields) {
    if (field.type === "counter") base[field.key] = field.min ?? 0;
    else if (field.type === "toggle") {
      if (field.key === "dropoffSame" || field.key === "driverAge25Plus") base[field.key] = true;
      else base[field.key] = false;
    } else if (field.type === "checkboxes") base[field.key] = [] as string[];
    else if (field.type === "segmented" && field.options?.[0] && field.required) {
      base[field.key] = "";
    } else base[field.key] = "";
  }
  if (serviceId === "flights") {
    base["adults"] = 1;
    base["children"] = 0;
    base["infants"] = 0;
    base["multiCityLegs"] = [{ from: "", to: "", date: "" }];
  }
  if (serviceId === "hotels") {
    base["rooms"] = 1;
    base["adults"] = 2;
    base["children"] = 0;
  }
  if (serviceId === "vacations" || serviceId === "cruises" || serviceId === "multiple") {
    base["adults"] = 2;
    base["children"] = 0;
  }
  if (serviceId === "car") {
    base["passengers"] = 2;
    base["dropoffSame"] = true;
    base["driverAge25Plus"] = true;
  }
  if (serviceId === "visa") {
    base["applicants"] = 1;
  }
  return base;
}

export function fieldIsVisible(
  field: FieldDef,
  values: Record<string, unknown>,
): boolean {
  if (!field.showIf) return true;
  const current = values[field.showIf.key];
  if (field.showIf.equals !== undefined) return current === field.showIf.equals;
  if (field.showIf.notEquals !== undefined) return current !== field.showIf.notEquals;
  return true;
}

export function serviceContactHref(
  serviceId: ServiceId,
  destination?: string,
): string {
  const params = new URLSearchParams({ service: serviceId });
  if (destination) params.set("destination", destination);
  return `/contact?${params.toString()}`;
}

/** Map site service slug → trip form service id */
export function slugToServiceId(slug: string): ServiceId | "" {
  if (slug === "cars") return "car";
  if (slug === "visa-assistance") return "visa";
  return sanitizeServiceParam(slug);
}
