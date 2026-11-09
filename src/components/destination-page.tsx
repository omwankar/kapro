import {
  ArrowRight,
  Check,
  Compass,
  FileCheck2,
  Hotel,
  Plane,
} from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqSection } from "@/components/faq-section";
import { JsonLd } from "@/components/json-ld";
import {
  CtaBand,
  Eyebrow,
  Footer,
  Nav,
  Reveal,
  ScrollProgress,
} from "@/components/site-chrome";
import {
  JOURNEYS,
  contactHrefForJourney,
  destinationPath,
  type Journey,
} from "@/data/journeys";
import { SERVICES_NAV } from "@/data/services";
import { destinationFaq, destinationJsonLd } from "@/lib/seo";

const ARRANGE = [
  {
    slug: "flights" as const,
    title: "Flights",
    body: "Routes, timing and cabin preferences researched for this trip.",
    Icon: Plane,
  },
  {
    slug: "hotels" as const,
    title: "Hotels",
    body: "Stays shortlisted for location, room type and how you like to travel.",
    Icon: Hotel,
  },
  {
    slug: "vacations" as const,
    title: "Vacations",
    body: "A trip built around your pace — not a generic package.",
    Icon: Compass,
  },
  {
    slug: "visa-assistance" as const,
    title: "Visa assistance",
    body: "Guidance on requirements when your itinerary needs it.",
    Icon: FileCheck2,
  },
] as const;

const STEPS = [
  {
    title: "Tell us the trip",
    body: "Dates, who is travelling, and how you like to move through a place.",
  },
  {
    title: "See clear options",
    body: "Flights, stays and the days in between — explained in plain language.",
  },
  {
    title: "We coordinate the details",
    body: "Booking support so you are not piecing the journey together alone.",
  },
  {
    title: "Stay in touch",
    body: "Call or WhatsApp any time, 24/7, before and during the trip.",
  },
] as const;

export function DestinationPage({ journey }: { journey: Journey }) {
  const faq = destinationFaq(journey);
  const contactHref = contactHrefForJourney(journey);
  const others = JOURNEYS.filter((item) => item.code !== journey.code).slice(0, 6);

  return (
    <main key={journey.code} className="bg-background font-sans">
      <JsonLd data={destinationJsonLd(journey)} />
      <ScrollProgress />
      <Nav />
      <DestinationHero journey={journey} contactHref={contactHref} />
      <DestinationIntro journey={journey} />
      <DestinationArrange journey={journey} />
      <DestinationHow journey={journey} contactHref={contactHref} />
      <DestinationWhy journey={journey} contactHref={contactHref} />
      <FaqSection heading={`${journey.name}: common questions`} items={faq} />
      <DestinationSiblings current={journey} others={others} />
      <CtaBand />
      <Footer />
    </main>
  );
}

function DestinationHero({
  journey,
  contactHref,
}: {
  journey: Journey;
  contactHref: string;
}) {
  return (
    <section className="service-hero relative flex items-end overflow-hidden">
      <img
        src={journey.image}
        alt={`${journey.name}, ${journey.place} — ${journey.tagline}`}
        width={1600}
        height={1067}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ objectPosition: journey.focus }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(74,15,19,0.45) 0%, rgba(20,12,16,0.72) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="content-shell relative z-10 w-full px-4 pb-14 pt-[9.5rem] sm:px-6 sm:pb-16 sm:pt-[10.5rem] md:px-8">
        <Reveal>
          <Breadcrumbs
            light
            align="start"
            items={[
              { name: "Home", path: "/" },
              { name: "Destinations", path: "/destinations" },
              { name: journey.name },
            ]}
          />
          <div className="mt-6">
            <Eyebrow light>{journey.place}</Eyebrow>
          </div>
          <span className="service-hero-goldline mt-3 block" aria-hidden="true" />
          <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.75rem,7vw,5rem)] font-medium leading-[1.02] text-[#FBF3EE]">
            {journey.name}
          </h1>
          <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-[#FBF3EE]/85 sm:text-[17px]">
            {journey.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={contactHref}
              className="accent-button-on-red rounded-full px-7 py-3.5 text-[11px] font-semibold uppercase sm:text-xs"
            >
              Plan this trip
            </a>
            <a
              href={contactHref}
              className="accent-outline-light rounded-full px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs"
            >
              Get a quote
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DestinationIntro({ journey }: { journey: Journey }) {
  const notes = journey.highlights.join(", ");
  return (
    <section className="service-section bg-background">
      <div className="content-shell px-4 sm:px-6 md:px-8">
        <div className="service-intro-grid">
          <Reveal>
            <Eyebrow>How we help</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-medium leading-[1.12] text-ink">
              Personalized {journey.name} travel, planned with care
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="service-intro-copy space-y-5">
              <p>
                Karpo Travel Inc. plans personalized trips to {journey.name} from
                Long Island, New York. {journey.tagline}.
              </p>
              <p>
                We arrange flights, hotels and the details of the journey around
                how you like to travel — including {notes} when they fit your
                itinerary. Support is available by call or WhatsApp, 24/7.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DestinationArrange({ journey }: { journey: Journey }) {
  return (
    <section className="service-section bg-[var(--bg-alt)]">
      <div className="content-shell px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>What you can expect</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-medium text-ink">
              The same services, built around {journey.name}
            </h2>
          </div>
        </Reveal>

        <div className="service-benefit-grid mt-12 sm:mt-14">
          {ARRANGE.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.06}>
              <a
                href={`/services/${item.slug}`}
                className="service-benefit-card group block no-underline"
              >
                <div className="service-benefit-icon" aria-hidden="true">
                  <item.Icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 font-display text-[1.25rem] font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600">
                  Explore {item.title.toLowerCase()}
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationHow({
  journey,
  contactHref,
}: {
  journey: Journey;
  contactHref: string;
}) {
  const included = [
    `Flight planning for ${journey.name}`,
    "Hotel and stay shortlisting",
    `A trip built around ${journey.highlights.join(", ")} when they fit`,
    "Visa assistance when your itinerary needs it",
    "Support by call or WhatsApp, 24/7",
  ];

  return (
    <section className="service-section bg-background">
      <div className="content-shell px-4 sm:px-6 md:px-8">
        <div className="service-included-grid">
          <div>
            <Reveal>
              <Eyebrow>How it works</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-medium text-ink">
                A clear path from inquiry to confirmation
              </h2>
            </Reveal>
            <ol className="service-steps mt-10">
              {STEPS.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.06}>
                  <li className="service-step">
                    <span className="service-step-num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.2rem] font-medium text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={0.1}>
            <aside className="service-included-card">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-600">
                What’s included
              </p>
              <ul className="mt-6 space-y-4">
                {included.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                    <span className="service-included-check" aria-hidden="true">
                      <Check size={14} strokeWidth={2.2} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={contactHref}
                className="accent-button mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-center text-[11px] font-semibold uppercase sm:text-xs"
              >
                Plan my {journey.name} trip
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DestinationWhy({
  journey,
  contactHref,
}: {
  journey: Journey;
  contactHref: string;
}) {
  return (
    <section className="service-section bg-[var(--bg-alt)]">
      <div className="content-shell px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="service-why-card mx-auto max-w-3xl text-center">
            <Eyebrow>Why choose Karpo</Eyebrow>
            <p className="mt-5 font-display text-[clamp(1.35rem,2.8vw,1.85rem)] font-medium leading-snug text-ink">
              A {journey.name} trip planned around your preferences, pace and
              priorities — with the same personal care we bring to every journey.
            </p>
            <div className="mx-auto mt-8 h-px w-10 bg-gold" aria-hidden="true" />
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
              Personalized planning, transparent recommendations, and support by call or
              WhatsApp, 24/7.
            </p>
            <a
              href={contactHref}
              className="accent-button mt-8 inline-flex rounded-full px-8 py-3.5 text-[11px] font-semibold uppercase sm:text-xs"
            >
              Plan my trip
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DestinationSiblings({
  current,
  others,
}: {
  current: Journey;
  others: Journey[];
}) {
  return (
    <section className="service-section border-t border-border bg-background">
      <div className="content-shell px-4 sm:px-6 md:px-8">
        <Reveal>
          <Eyebrow>More destinations</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium text-ink">
            Explore what else we arrange
          </h2>
        </Reveal>
        <div className="service-sibling-grid mt-10">
          {others.map((item, i) => (
            <Reveal key={item.code} delay={i * 0.04}>
              <a href={destinationPath(item)} className="service-sibling-card">
                <div className="service-sibling-thumb">
                  <img
                    src={item.image}
                    alt={`${item.name} — ${item.tagline}`}
                    width={120}
                    height={90}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: item.focus }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-[1.1rem] font-medium text-ink">{item.name}</p>
                  <p className="mt-1 text-[13px] text-muted-foreground">{item.place}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <p className="mt-8">
          <a
            href="/destinations"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600"
          >
            All destinations
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </p>
        <p className="sr-only">Currently viewing {current.name}.</p>
      </div>
    </section>
  );
}

export function CrossLinkStrip({
  heading,
  eyebrow,
}: {
  heading: string;
  eyebrow: string;
}) {
  return (
    <section className="service-section border-t border-border bg-background">
      <div className="content-shell px-4 sm:px-6 md:px-8">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium text-ink">
            {heading}
          </h2>
        </Reveal>
        <div className="service-sibling-grid mt-10">
          {SERVICES_NAV.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.04}>
              <a href={`/services/${s.slug}`} className="service-sibling-card">
                <div className="service-sibling-thumb">
                  <img
                    src={s.img}
                    alt={`${s.title} — ${s.line}`}
                    width={120}
                    height={90}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-[1.1rem] font-medium text-ink">{s.title}</p>
                  <p className="mt-1 text-[13px] text-muted-foreground">{s.line}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
