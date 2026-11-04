import flightsImg from "@/assets/journeys/flights_sunset.webp";
import maldivesImg from "@/assets/journeys/maldives_resort.webp";
import santoriniImg from "@/assets/journeys/santorini.webp";
import cruiseImg from "@/assets/journeys/cruise_ship.webp";
import suvImg from "@/assets/journeys/suv_coast_road.webp";
import visaImg from "@/assets/journeys/visa_passport.webp";

export type ServiceSlug =
  | "flights"
  | "hotels"
  | "vacations"
  | "cruises"
  | "cars"
  | "visa-assistance";

export type ServiceIconName =
  | "route"
  | "badge-check"
  | "heart-handshake"
  | "headphones"
  | "hotel"
  | "sparkles"
  | "compass"
  | "clipboard-check"
  | "shield-check"
  | "ship"
  | "car"
  | "map-pinned"
  | "file-check"
  | "plane";

export type ServiceContent = {
  slug: ServiceSlug;
  title: string;
  line: string;
  img: string;
  eyebrow: string;
  intro: string[];
  benefits: { title: string; body: string; icon: ServiceIconName }[];
  steps: { title: string; body: string }[];
  included: string[];
  whyKarpo: string;
  ctaLabel: string;
  metaDescription: string;
};

export const SERVICE_SLUGS: ServiceSlug[] = [
  "flights",
  "hotels",
  "vacations",
  "cruises",
  "cars",
  "visa-assistance",
];

export const SERVICES_CONTENT: Record<ServiceSlug, ServiceContent> = {
  flights: {
    slug: "flights",
    title: "Flights",
    line: "Best fares, worldwide",
    img: flightsImg,
    eyebrow: "Air travel",
    intro: [
      "Karpo plans your flights with the same care we bring to every journey — matching routes, timing, and cabin preferences to how you actually like to travel.",
      "From a single ticket to a complex multi-city itinerary, we handle the details so you board with clarity and confidence.",
    ],
    benefits: [
      {
        title: "Thoughtful routing",
        body: "We look beyond the cheapest click — balancing schedule, connections, and comfort for your trip.",
        icon: "route",
      },
      {
        title: "Transparent options",
        body: "Clear choices, clear pricing context, and recommendations explained in plain language.",
        icon: "badge-check",
      },
      {
        title: "Personal preferences",
        body: "Seat needs, layover limits, airline preferences — planned around you, not a generic search.",
        icon: "heart-handshake",
      },
      {
        title: "Support when plans shift",
        body: "Travel changes. When they do, you have a team that already knows your itinerary.",
        icon: "headphones",
      },
    ],
    steps: [
      {
        title: "Share your plans",
        body: "Tell us where you’re going, preferred dates, and any must-haves for the flight.",
      },
      {
        title: "Review curated options",
        body: "We present thoughtful route and fare options with the tradeoffs explained.",
      },
      {
        title: "We book and confirm",
        body: "Once you choose, we complete the booking and send clear confirmation details.",
      },
      {
        title: "Stay supported",
        body: "Before departure — and if anything changes — we’re a call or WhatsApp away, 24/7.",
      },
    ],
    included: [
      "Route and schedule research tailored to your trip",
      "Fare and cabin guidance in clear language",
      "Booking coordination and confirmation support",
      "Help with changes when travel plans shift",
    ],
    whyKarpo:
      "Flights are the backbone of most journeys. We treat them that way — carefully planned, clearly explained, and backed by personal support.",
    ctaLabel: "Plan my flight",
    metaDescription:
      "Personalized flight planning from Karpo Travel Inc. — thoughtful routes, transparent options, and support from New York.",
  },
  hotels: {
    slug: "hotels",
    title: "Hotels",
    line: "Handpicked stays",
    img: maldivesImg,
    eyebrow: "Stays",
    intro: [
      "A stay should feel right the moment you arrive. Karpo selects hotels and resorts around your preferences, pace, and the kind of trip you’re taking.",
      "Whether you want quiet luxury, a family-friendly base, or something in between, we focus on properties that fit — not a one-size list.",
    ],
    benefits: [
      {
        title: "Handpicked for you",
        body: "We shortlist stays that match location, style, and the rhythm of your itinerary.",
        icon: "hotel",
      },
      {
        title: "Preference-first planning",
        body: "Room type, view, amenities, neighborhood feel — your priorities shape the shortlist.",
        icon: "heart-handshake",
      },
      {
        title: "Careful attention to detail",
        body: "Arrival timing, special requests, and practical notes so the stay feels seamless.",
        icon: "sparkles",
      },
      {
        title: "Clear recommendations",
        body: "We explain why a property fits — so you can choose with confidence.",
        icon: "badge-check",
      },
    ],
    steps: [
      {
        title: "Tell us how you like to stay",
        body: "Share destination, dates, budget range, and what matters most in a hotel.",
      },
      {
        title: "Receive a tailored shortlist",
        body: "A focused set of options matched to your preferences — not an endless catalog.",
      },
      {
        title: "Reserve with clarity",
        body: "We coordinate the booking and confirm the details that matter for your arrival.",
      },
      {
        title: "Support during your stay",
        body: "If something needs adjusting, you can reach us by call or WhatsApp, 24/7.",
      },
    ],
    included: [
      "Hotel and resort shortlisting around your preferences",
      "Guidance on location, room type, and stay experience",
      "Booking coordination and confirmation details",
      "Ongoing support while you travel",
    ],
    whyKarpo:
      "We don’t fill rooms — we match stays to people. Every recommendation is personal, practical, and carefully considered.",
    ctaLabel: "Find my stay",
    metaDescription:
      "Handpicked hotel planning from Karpo Travel Inc. — stays chosen around your preferences, pace, and priorities.",
  },
  vacations: {
    slug: "vacations",
    title: "Vacations",
    line: "Curated getaways",
    img: santoriniImg,
    eyebrow: "Getaways",
    intro: [
      "Karpo designs vacations as complete experiences — thoughtfully paced, carefully planned, and built around what you want from the trip.",
      "From a restorative escape to a multi-destination journey, we take care of the planning so you can focus on the experience.",
    ],
    benefits: [
      {
        title: "Fully considered itineraries",
        body: "Days shaped around your energy, interests, and the destinations themselves.",
        icon: "compass",
      },
      {
        title: "Stress-free coordination",
        body: "Flights, stays, transfers, and activities brought together with care and transparency.",
        icon: "clipboard-check",
      },
      {
        title: "Personalized from the start",
        body: "Your preferences, pace, and priorities guide every recommendation.",
        icon: "heart-handshake",
      },
      {
        title: "Support throughout",
        body: "A reliable point of contact before you leave and while you’re away.",
        icon: "shield-check",
      },
    ],
    steps: [
      {
        title: "Start with a conversation",
        body: "We learn what kind of vacation you’re hoping for — and what you’d rather avoid.",
      },
      {
        title: "Shape the journey",
        body: "A clear plan covering travel, stays, and experiences that fit together.",
      },
      {
        title: "Refine and confirm",
        body: "You review the details; we adjust until it feels right, then lock it in.",
      },
      {
        title: "Travel with backup",
        body: "While you’re away, support remains available by call or WhatsApp, 24/7.",
      },
    ],
    included: [
      "Vacation concept and itinerary planning",
      "Coordination of travel, stays, and key experiences",
      "Transparent recommendations and clear next steps",
      "Support before and during your trip",
    ],
    whyKarpo:
      "A great vacation feels effortless. Behind that ease is careful planning — and a team that treats your trip as a priority.",
    ctaLabel: "Plan my vacation",
    metaDescription:
      "Curated vacation planning from Karpo Travel Inc. — personalized getaways planned with care, transparency, and support.",
  },
  cruises: {
    slug: "cruises",
    title: "Cruises",
    line: "Sail the seven seas",
    img: cruiseImg,
    eyebrow: "At sea",
    intro: [
      "Cruising should feel seamless from the first inquiry to the final disembarkation. Karpo helps you choose the right ship, itinerary, and cabin with clarity.",
      "We focus on curated options that fit your style of travel — then handle the planning details with care.",
    ],
    benefits: [
      {
        title: "Curated cruise options",
        body: "Itineraries and lines matched to the kind of voyage you want — not a generic list.",
        icon: "ship",
      },
      {
        title: "Seamless planning",
        body: "From sailing dates to cabin guidance, we keep the process orderly and clear.",
        icon: "clipboard-check",
      },
      {
        title: "Details that matter",
        body: "Dining preferences, shore plans, and practical notes considered up front.",
        icon: "sparkles",
      },
      {
        title: "Reliable coordination",
        body: "One team connecting the pieces so boarding day feels straightforward.",
        icon: "shield-check",
      },
    ],
    steps: [
      {
        title: "Describe the voyage you want",
        body: "Region, timing, cabin style, and the kind of onboard experience you prefer.",
      },
      {
        title: "Compare curated sailings",
        body: "We present focused options with clear differences so you can choose well.",
      },
      {
        title: "Book with care",
        body: "We coordinate the reservation and confirm the details you’ll need before you sail.",
      },
      {
        title: "Support around your sailing",
        body: "Questions before departure — or during travel — can reach us anytime, 24/7.",
      },
    ],
    included: [
      "Cruise itinerary and cabin guidance",
      "Curated sailing options matched to your preferences",
      "Booking coordination and pre-departure clarity",
      "Ongoing support by call or WhatsApp",
    ],
    whyKarpo:
      "A cruise is only as smooth as the planning behind it. We bring the same personal attention to every sailing we help arrange.",
    ctaLabel: "Plan my cruise",
    metaDescription:
      "Cruise planning from Karpo Travel Inc. — curated sailings, seamless coordination, and personal support.",
  },
  cars: {
    slug: "cars",
    title: "Cars",
    line: "Chauffeured & self-drive",
    img: suvImg,
    eyebrow: "Ground travel",
    intro: [
      "Getting from place to place should be simple. Karpo arranges chauffeured transfers and self-drive options with an eye on reliability and convenience.",
      "Whether you need airport pickup, day-to-day transport, or a car for exploring, we plan ground travel that fits the rest of your itinerary.",
    ],
    benefits: [
      {
        title: "Door-to-door ease",
        body: "Transfers planned around your flights, hotels, and daily rhythm.",
        icon: "car",
      },
      {
        title: "Reliable arrangements",
        body: "Clear pickup details and practical planning so you’re not left guessing.",
        icon: "shield-check",
      },
      {
        title: "Flexible to your trip",
        body: "Chauffeured comfort or self-drive freedom — chosen for how you travel.",
        icon: "map-pinned",
      },
      {
        title: "Connected to the full plan",
        body: "Ground travel that works with your flights, stays, and daily schedule.",
        icon: "clipboard-check",
      },
    ],
    steps: [
      {
        title: "Share your ground needs",
        body: "Airports, hotels, dates, and whether you prefer a driver or self-drive.",
      },
      {
        title: "Receive a clear plan",
        body: "Options that fit your itinerary, with timing and logistics spelled out.",
      },
      {
        title: "Confirm the details",
        body: "We arrange the booking and confirm pickup points, times, and contacts.",
      },
      {
        title: "Travel with backup",
        body: "If timing changes, reach us by call or WhatsApp — we’re available 24/7.",
      },
    ],
    included: [
      "Chauffeured and self-drive planning guidance",
      "Airport and hotel transfer coordination",
      "Clear timing and pickup details",
      "Support if schedules shift",
    ],
    whyKarpo:
      "Ground travel is often where stress shows up first. We plan it carefully so the journey between places feels as considered as the destinations themselves.",
    ctaLabel: "Arrange my car",
    metaDescription:
      "Car and transfer planning from Karpo Travel Inc. — chauffeured and self-drive options with reliable, convenient coordination.",
  },
  "visa-assistance": {
    slug: "visa-assistance",
    title: "Visa Assistance",
    line: "Paperwork, handled",
    img: visaImg,
    eyebrow: "Documentation",
    intro: [
      "Visa requirements can feel overwhelming. Karpo provides careful guidance so your documentation process is clearer, more accurate, and less stressful.",
      "We help you understand what’s needed and stay organized — so you can move forward with peace of mind.",
    ],
    benefits: [
      {
        title: "Clear guidance",
        body: "Straightforward direction on what’s required for your travel plans.",
        icon: "file-check",
      },
      {
        title: "Accuracy matters",
        body: "Careful attention to detail so paperwork is complete and consistent.",
        icon: "badge-check",
      },
      {
        title: "Organized process",
        body: "A calmer path through requirements, timelines, and next steps.",
        icon: "clipboard-check",
      },
      {
        title: "Peace of mind",
        body: "Someone to ask when you’re unsure — before small issues become delays.",
        icon: "shield-check",
      },
    ],
    steps: [
      {
        title: "Share your itinerary",
        body: "Destinations, nationality details, and travel timing help us guide you well.",
      },
      {
        title: "Understand the requirements",
        body: "We outline what’s needed in clear language and help you stay organized.",
      },
      {
        title: "Prepare with care",
        body: "Document checklists and careful review so details are handled thoughtfully.",
      },
      {
        title: "Stay in touch",
        body: "Questions along the way can reach us by call or WhatsApp, 24/7.",
      },
    ],
    included: [
      "Guidance on visa requirements for your trip",
      "Help organizing documents and next steps",
      "Careful review support for accuracy",
      "Ongoing answers as you prepare",
    ],
    whyKarpo:
      "Paperwork shouldn’t overshadow the journey. We bring patience, clarity, and careful attention so visa preparation feels manageable.",
    ctaLabel: "Get visa guidance",
    metaDescription:
      "Visa assistance from Karpo Travel Inc. — clear guidance, careful attention to detail, and peace of mind for your travel documents.",
  },
};

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return SERVICES_CONTENT[slug as ServiceSlug];
}

export function servicePath(slug: ServiceSlug): string {
  return `/services/${slug}`;
}

/** Compact list used by nav, footer, and home cards */
export const SERVICES_NAV = SERVICE_SLUGS.map((slug) => {
  const s = SERVICES_CONTENT[slug];
  return {
    slug: s.slug,
    title: s.title,
    line: s.line,
    img: s.img,
    href: servicePath(s.slug),
  };
});
