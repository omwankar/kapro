import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { FaqSection } from "@/components/faq-section";
import { JsonLd } from "@/components/json-ld";
import {
  CtaBand,
  EMAIL,
  Eyebrow,
  Footer,
  Nav,
  PHONE_DISPLAY,
  PHONE_TEL,
  Reveal,
  ScrollProgress,
  WHATSAPP,
} from "@/components/site-chrome";
import {
  JOURNEYS,
  contactHrefForJourney,
  journeySlug,
  type Journey,
} from "@/data/journeys";
import { destinationFaq, destinationJsonLd } from "@/lib/seo";

export function DestinationPage({ journey }: { journey: Journey }) {
  const faq = destinationFaq(journey);
  const contactHref = contactHrefForJourney(journey);
  const others = JOURNEYS.filter((item) => item.code !== journey.code).slice(0, 6);

  return (
    <main className="bg-background font-sans">
      <JsonLd data={destinationJsonLd(journey)} />
      <ScrollProgress />
      <Nav />
      <DestinationHero journey={journey} contactHref={contactHref} />
      <DestinationIntro journey={journey} />
      <DestinationNotes journey={journey} contactHref={contactHref} />
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
          <nav
            aria-label="Breadcrumb"
            className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#FBF3EE]/80 sm:text-[11px]"
          >
            <ol className="flex flex-wrap items-center gap-x-2">
              <li>
                <Link to="/" className="transition-colors hover:text-[#FBF3EE]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/destinations" className="transition-colors hover:text-[#FBF3EE]">
                  Destinations
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{journey.name}</li>
            </ol>
          </nav>
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
              href={PHONE_TEL}
              className="accent-outline-light rounded-full px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs"
            >
              Call us 24/7
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
            <Eyebrow>Personalized planning</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-medium leading-[1.12] text-ink">
              A {journey.name} trip, planned around you
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
              <p>
                Airport code in our gallery: {journey.code}. Tell us your dates
                and we will plan the rest.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DestinationNotes({
  journey,
  contactHref,
}: {
  journey: Journey;
  contactHref: string;
}) {
  return (
    <section className="service-section bg-[var(--bg-alt)]">
      <div className="content-shell px-4 sm:px-6 md:px-8">
        <div className="service-included-grid">
          <div>
            <Reveal>
              <Eyebrow>Trip notes</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-medium text-ink">
                What we often plan around in {journey.name}
              </h2>
            </Reveal>
            <ul className="destination-notes mt-10">
              {journey.highlights.map((item, i) => (
                <Reveal key={item} delay={i * 0.06}>
                  <li className="destination-note">
                    <span className="service-step-num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-display text-[1.2rem] font-medium text-ink">{item}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1}>
            <aside className="service-included-card">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-600">
                Start with Karpo
              </p>
              <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink">
                <li>
                  Flights, hotels and vacation planning for {journey.name}
                </li>
                <li>
                  Call or WhatsApp {PHONE_DISPLAY}, 24/7
                </li>
                <li>
                  Email {EMAIL}
                </li>
                <li>
                  A travel specialist replies within one business day
                </li>
              </ul>
              <a
                href={contactHref}
                className="accent-button mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-center text-[11px] font-semibold uppercase sm:text-xs"
              >
                Plan my {journey.name} trip
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-border px-6 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-ink"
              >
                WhatsApp us
              </a>
            </aside>
          </Reveal>
        </div>
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
            Other trips we plan
          </h2>
        </Reveal>
        <div className="service-sibling-grid mt-10">
          {others.map((item, i) => (
            <Reveal key={item.code} delay={i * 0.04}>
              <Link
                to="/destinations/$slug"
                params={{ slug: journeySlug(item) }}
                className="service-sibling-card"
              >
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
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-8">
          <Link
            to="/destinations"
            activeOptions={{ exact: true }}
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600"
          >
            All destinations
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </p>
        <p className="sr-only">Currently viewing {current.name}.</p>
      </div>
    </section>
  );
}
