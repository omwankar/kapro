export const SITE_URL = "https://www.karpotravel.com";
export const SITE_NAME = "Karpo Travel Inc.";
export const SITE_LOCALE = "en_US";
export const THEME_COLOR = "#8F1D22";

/** Keep in sync with site-chrome contact constants. */
export const PHONE_DISPLAY = "+1 (516) 969-0000";
export const PHONE_E164 = "+15169690000";
export const EMAIL = "info@karpotravel.com";

export const PAGE_META = {
  home: {
    title: "Karpo Travel Inc. | Personalized Travel Agency in New York",
    description:
      "Flights, hotels, vacations, cruises, car rental and visa assistance, planned personally by Karpo Travel Inc. in Bellmore, NY. Call or WhatsApp 24/7.",
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
} as const;

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
        content: noIndex ? "noindex, nofollow" : "index, follow",
      },
      { name: "theme-color", content: THEME_COLOR },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: SITE_LOCALE },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function organizationJsonLd() {
  return {
    "@type": ["TravelAgency", "Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/images/karpo-emblem-only.png"),
    image: absoluteUrl("/images/karpo-medallion.png"),
    email: EMAIL,
    telephone: PHONE_E164,
    address: {
      "@type": "PostalAddress",
      // TODO: streetAddress (full street number + road)
      addressLocality: "Bellmore",
      addressRegion: "NY",
      addressCountry: "US",
      // TODO: postalCode
    },
    areaServed: ["New York", "United States"],
    // TODO: geo (latitude/longitude for the Bellmore office)
    // TODO: sameAs (official social profile URLs)
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE_E164,
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
      "Personalized travel agency in New York offering flights, hotels, vacations, cruises, car rental and visa assistance.",
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

export function webPageJsonLd({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}) {
  return {
    "@type": "WebPage",
    "@id": `${canonicalForPath(path)}#webpage`,
    url: canonicalForPath(path),
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
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
    "@graph": [organizationJsonLd(), websiteJsonLd(), webPageJsonLd(PAGE_META.home)],
  };
}

export function aboutGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      websiteJsonLd(),
      webPageJsonLd(PAGE_META.about),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Our Story", path: "/about" },
      ]),
    ],
  };
}

export function contactGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      websiteJsonLd(),
      webPageJsonLd(PAGE_META.contact),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/contact#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How quickly will I hear back?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A travel specialist will get back to you within one business day.",
            },
          },
          {
            "@type": "Question",
            name: "Can I reach you outside business hours?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You can call or WhatsApp us any time, 24/7.",
            },
          },
          {
            "@type": "Question",
            name: "What can you help me with?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Flights, hotels, vacations, cruises, cars and visa assistance.",
            },
          },
        ],
      },
    ],
  };
}

export const HOME_ABOUT_SUMMARY =
  `Karpo Travel Inc. is a personalized travel agency based in Bellmore, New York. We plan flights, hotels, vacations, cruises, car rentals and visa assistance for travellers, drawing on over 60 years of family experience in the travel industry. Call or WhatsApp us 24/7 at ${PHONE_DISPLAY}.`;
