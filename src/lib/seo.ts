import { JOURNEYS, destinationPath, type Journey } from "@/data/journeys";

export const SITE_URL = "https://www.karpotravel.com";
export const SITE_NAME = "Karpo Travel Inc.";
export const SITE_LOCALE = "en_US";
export const THEME_COLOR = "#8F1D22";

/** Keep in sync with site-chrome contact constants. */
export const PHONE_DISPLAY = "+1 (516) 969-0000";
export const PHONE_E164 = "+15169690000";
export const EMAIL = "info@karpotravel.com";
/** Visible NAP on the site: no street address is published. */
export const LOCALITY = "Long Island";
export const REGION = "NY";
export const COUNTRY = "US";
export const PLACE_NAME = "Long Island, New York";

export const FOUNDER = {
  name: "Jenson Daniel",
  jobTitle: "Founder & Managing Director",
} as const;

export const PAGE_META = {
  home: {
    title: "Karpo Travel Inc. | Personalized Travel Agency in New York",
    description:
      "Flights, hotels, vacations, cruises, car rental and visa assistance, planned personally by Karpo Travel Inc. in Long Island, New York. Call or WhatsApp 24/7.",
    path: "/",
    ogImage: "/og/home.jpg",
  },
  about: {
    title: "Our Story | Karpo Travel Inc.",
    description:
      "Over 60 years of family travel experience, now in a personal, transparent travel practice founded in New York. Meet Karpo Travel Inc.",
    path: "/about",
    ogImage: "/og/about.jpg",
  },
  contact: {
    title: "Contact Karpo Travel | Plan Your Trip",
    description: `Tell us about your trip and a travel specialist replies within one business day. Call or WhatsApp ${PHONE_DISPLAY}, 24/7.`,
    path: "/contact",
    ogImage: "/og/contact.jpg",
  },
  services: {
    title: "Travel Services | Karpo Travel Inc.",
    description:
      "Six ways Karpo Travel Inc. takes you there: flights, hotels, vacations, cruises, car rental and visa assistance, planned personally from New York.",
    path: "/services",
    ogImage: "/og/home.jpg",
  },
  destinations: {
    title: "Destinations | Karpo Travel Inc.",
    description:
      "Personalized trip planning to Bali, Tokyo, Paris, the Maldives and more. Karpo Travel Inc. in Long Island, New York arranges flights, hotels and itineraries.",
    path: "/destinations",
    ogImage: "/og/home.jpg",
  },
} as const;

/** Shared, factual FAQ used on the home page and in FAQPage schema. */
export const SITE_FAQ = [
  {
    q: "Where is Karpo Travel Inc. based?",
    a: "Karpo Travel Inc. is based in Long Island, New York, and works with travelers remotely by phone, WhatsApp and email. No public storefront address is published.",
  },
  {
    q: "What does Karpo Travel help with?",
    a: "Flights, hotels, vacations, cruises, car rental and visa assistance, planned personally around each client's preferences, pace and priorities.",
  },
  {
    q: "How do I reach Karpo Travel?",
    a: `Call or WhatsApp ${PHONE_DISPLAY} any time, 24/7, or email ${EMAIL}. A travel specialist replies within one business day.`,
  },
  {
    q: "How experienced is the team?",
    a: "Karpo Travel Inc. draws on over 60 years of family experience in the travel industry. The practice was established in New York in 2026 by Jenson Daniel, Founder & Managing Director.",
  },
  {
    q: "Where can Karpo plan a trip?",
    a: "Karpo Travel Inc. plans personalized trips worldwide, including destinations featured on this site such as Bali, Tokyo, Paris, the Maldives, Santorini and more. Browse destinations or tell us where you want to go.",
  },
] as const;

export function faqJsonLd(
  id: string,
  items: ReadonlyArray<{ q: string; a: string }>,
) {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}

export function canonicalForPath(pathname: string): string {
  if (pathname.startsWith("/contact")) return absoluteUrl("/contact");
  if (pathname === "/" || pathname === "") return absoluteUrl("/");
  const clean = pathname.split("?")[0]?.replace(/\/$/, "") || "/";
  return absoluteUrl(clean === "" ? "/" : clean);
}

type MetaInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
};

export function buildPageHead({
  title,
  description,
  path,
  ogImage = "/og/home.jpg",
  ogType = "website",
  noIndex = false,
}: MetaInput) {
  const url = canonicalForPath(path);
  const image = absoluteUrl(ogImage);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "author", content: SITE_NAME },
      {
        name: "robots",
        content: noIndex
          ? "noindex, nofollow"
          : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "theme-color", content: THEME_COLOR },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: SITE_LOCALE },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: `${title} — ${SITE_NAME}` },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "geo.region", content: "US-NY" },
      { name: "geo.placename", content: PLACE_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: `${title} — ${SITE_NAME}` },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "en-US", href: url },
      { rel: "alternate", hrefLang: "x-default", href: url },
    ],
  };
}

const SERVICES_OFFERED = [
  "Flights",
  "Hotels",
  "Vacations",
  "Cruises",
  "Car rental",
  "Visa assistance",
] as const;

export function organizationJsonLd() {
  return {
    "@type": ["TravelAgency", "Organization"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: SITE_NAME,
    alternateName: ["Karpo Travel", "Karpo"],
    url: SITE_URL,
    slogan: "Your Journey, Our Priority.",
    foundingDate: "2026",
    naics: "561510",
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/karpo-emblem-only.png"),
      contentUrl: absoluteUrl("/images/karpo-emblem-only.png"),
    },
    image: absoluteUrl("/images/karpo-medallion.png"),
    brand: { "@type": "Brand", name: "Karpo" },
    email: EMAIL,
    telephone: PHONE_E164,
    address: {
      "@type": "PostalAddress",
      addressLocality: LOCALITY,
      addressRegion: REGION,
      addressCountry: COUNTRY,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Long Island" },
      { "@type": "State", name: "New York" },
      { "@type": "Country", name: "United States" },
    ],
    foundingLocation: { "@type": "Place", name: "New York, USA" },
    founder: { "@id": `${SITE_URL}/about#founder` },
    knowsAbout: [...SERVICES_OFFERED, "Personalized travel planning", "Remote travel agency"],
    knowsLanguage: "en",
    potentialAction: {
      "@type": "CommunicateAction",
      name: "Plan a trip",
      target: absoluteUrl("/contact"),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Travel services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Flight planning", url: absoluteUrl("/services/flights") } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hotel planning", url: absoluteUrl("/services/hotels") } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vacation planning", url: absoluteUrl("/services/vacations") } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cruise planning", url: absoluteUrl("/services/cruises") } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Car and transfer planning", url: absoluteUrl("/services/cars") } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Visa assistance", url: absoluteUrl("/services/visa-assistance") } },
      ],
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE_E164,
        email: EMAIL,
        contactType: "customer service",
        availableLanguage: ["English"],
        areaServed: "US",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      },
    ],
    description:
      "Personalized travel agency based in Long Island, New York. Karpo Travel Inc. plans flights, hotels, vacations, cruises, car rentals and visa assistance. Call or WhatsApp 24/7.",
  };
}

export function serviceJsonLd(service: {
  title: string;
  slug: string;
  description: string;
  faq?: ReadonlyArray<{ q: string; a: string }>;
}) {
  const url = absoluteUrl(`/services/${service.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      websiteJsonLd(),
      webPageJsonLd({
        path: `/services/${service.slug}`,
        title: `${service.title} | ${SITE_NAME}`,
        description: service.description,
      }),
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        description: service.description,
        url,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: ["Long Island", "New York", "United States"],
        serviceType: service.title,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.title, path: `/services/${service.slug}` },
      ]),
      ...(service.faq ? [faqJsonLd(`${url}#faq`, service.faq)] : []),
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: ["Karpo Travel", "Karpo"],
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
    copyrightHolder: { "@id": `${SITE_URL}/#organization` },
    copyrightYear: 2026,
  };
}

export function webPageJsonLd(
  {
    path,
    title,
    description,
  }: {
    path: string;
    title: string;
    description: string;
  },
  type: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" = "WebPage",
) {
  return {
    "@type": type,
    "@id": `${canonicalForPath(path)}#webpage`,
    url: canonicalForPath(path),
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".faq-summary", ".faq-answer"],
    },
  };
}

export function founderJsonLd() {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/about#founder`,
    name: FOUNDER.name,
    jobTitle: FOUNDER.jobTitle,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    url: absoluteUrl("/about"),
    knowsAbout: "Travel planning",
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalForPath(items[items.length - 1]?.path ?? "/")}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalForPath(item.path),
    })),
  };
}

export function homeGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      websiteJsonLd(),
      founderJsonLd(),
      webPageJsonLd(PAGE_META.home),
      faqJsonLd(`${SITE_URL}/#faq`, SITE_FAQ),
      destinationsItemListJsonLd(),
    ],
  };
}

export function aboutGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      websiteJsonLd(),
      founderJsonLd(),
      webPageJsonLd(PAGE_META.about, "AboutPage"),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Our Story", path: "/about" },
      ]),
    ],
  };
}

export const CONTACT_FAQ = [
  {
    q: "How quickly will I hear back?",
    a: "A travel specialist will get back to you within one business day.",
  },
  {
    q: "Can I reach you outside business hours?",
    a: "Yes. You can call or WhatsApp us any time, 24/7.",
  },
  {
    q: "What can you help me with?",
    a: "Flights, hotels, vacations, cruises, cars and visa assistance.",
  },
] as const;

export function contactGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      websiteJsonLd(),
      webPageJsonLd(PAGE_META.contact, "ContactPage"),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
      faqJsonLd(`${SITE_URL}/contact#faq`, CONTACT_FAQ),
    ],
  };
}

export function servicesHubJsonLd(
  services: ReadonlyArray<{ title: string; slug: string; line: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      websiteJsonLd(),
      webPageJsonLd(PAGE_META.services, "CollectionPage"),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ]),
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/services#list`,
        name: "Karpo Travel services",
        itemListElement: services.map((s, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: s.title,
          description: s.line,
          url: absoluteUrl(`/services/${s.slug}`),
        })),
      },
    ],
  };
}

/** Builds factual service FAQs from the service's own content (no invented claims). */
export function serviceFaq(service: {
  title: string;
  included: string[];
  steps: { title: string; body: string }[];
}) {
  const includedText = service.included.join("; ");
  const stepsText = service.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`).join(" ");
  return [
    {
      q: `What is included in Karpo Travel's ${service.title.toLowerCase()} service?`,
      a: `${includedText}.`,
    },
    {
      q: `How does ${service.title.toLowerCase()} planning work with Karpo Travel?`,
      a: stepsText,
    },
    {
      q: "How do I get support before or during my trip?",
      a: `Call or WhatsApp ${PHONE_DISPLAY} any time, 24/7, or email ${EMAIL}.`,
    },
  ];
}

export function destinationsItemListJsonLd() {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/destinations#list`,
    name: "Destinations Karpo Travel plans",
    numberOfItems: JOURNEYS.length,
    itemListElement: JOURNEYS.map((journey, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: journey.name,
      description: journey.tagline,
      url: absoluteUrl(destinationPath(journey)),
    })),
  };
}

export function destinationsHubJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      websiteJsonLd(),
      webPageJsonLd(PAGE_META.destinations, "CollectionPage"),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Destinations", path: "/destinations" },
      ]),
      destinationsItemListJsonLd(),
    ],
  };
}

export function destinationMeta(journey: Journey) {
  return {
    title: `${journey.name} Travel | Karpo Travel Inc.`,
    description: `Personalized ${journey.name} trip planning from Karpo Travel Inc. in Long Island, New York. ${journey.tagline}. Flights, hotels and itineraries, planned personally.`,
    path: destinationPath(journey),
    ogImage: "/og/home.jpg" as const,
  };
}

export function destinationFaq(journey: Journey) {
  const notes = journey.highlights.join(", ");
  return [
    {
      q: `Can Karpo Travel plan a trip to ${journey.name}?`,
      a: `Yes. Karpo Travel Inc. plans personalized vacations, including trips to ${journey.name}. Share your dates and preferences on the contact form, or call or WhatsApp ${PHONE_DISPLAY}.`,
    },
    {
      q: `What can Karpo arrange for ${journey.name}?`,
      a: `Flights, hotels and a trip built around how you like to travel — including ${notes} when they fit your itinerary. Visa assistance is available when your itinerary needs it.`,
    },
    {
      q: "How do I start planning?",
      a: `Call or WhatsApp ${PHONE_DISPLAY} any time, 24/7, or email ${EMAIL}. A travel specialist replies within one business day.`,
    },
  ];
}

export function destinationJsonLd(journey: Journey) {
  const url = absoluteUrl(destinationPath(journey));
  const meta = destinationMeta(journey);
  const faq = destinationFaq(journey);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      websiteJsonLd(),
      webPageJsonLd(meta),
      {
        "@type": "TouristDestination",
        "@id": `${url}#place`,
        name: journey.name,
        description: journey.tagline,
        url,
        geo: {
          "@type": "GeoCoordinates",
          latitude: journey.lat,
          longitude: journey.lng,
        },
        containedInPlace: { "@type": "Place", name: journey.place },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${journey.name} trip planning`,
        description: meta.description,
        url,
        provider: { "@id": `${SITE_URL}/#organization` },
        serviceType: "Vacation planning",
        areaServed: {
          "@type": "Place",
          name: `${journey.name}, ${journey.place}`,
        },
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Destinations", path: "/destinations" },
        { name: journey.name, path: destinationPath(journey) },
      ]),
      faqJsonLd(`${url}#faq`, faq),
    ],
  };
}

export const HOME_ABOUT_SUMMARY =
  `Karpo Travel Inc. is a personalized travel agency based in Long Island, New York. We plan flights, hotels, vacations, cruises, car rentals and visa assistance for travellers, drawing on over 60 years of family experience in the travel industry. Call or WhatsApp us 24/7 at ${PHONE_DISPLAY}.`;
