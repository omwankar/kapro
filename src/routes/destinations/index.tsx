import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

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
import { JOURNEYS, journeySlug } from "@/data/journeys";
import { PAGE_META, SITE_FAQ, buildPageHead, destinationsHubJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/destinations/")({
  head: () => buildPageHead(PAGE_META.destinations),
  component: DestinationsHubPage,
});

function DestinationsHubPage() {
  return (
    <main className="bg-background font-sans">
      <JsonLd data={destinationsHubJsonLd()} />
      <ScrollProgress />
      <Nav />

      <section className="services-hub-hero bg-[var(--bg-alt)]">
        <div className="content-shell px-4 pb-14 pt-[9.5rem] sm:px-6 sm:pb-16 sm:pt-[10.5rem] md:px-8">
          <Reveal>
            <Breadcrumbs
              align="start"
              items={[
                { name: "Home", path: "/" },
                { name: "Destinations", path: "/destinations" },
              ]}
            />
            <div className="mt-6">
              <Eyebrow>Where we take you</Eyebrow>
            </div>
            <h1 className="mt-5 max-w-[18ch] font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.04] text-ink">
              Destinations, planned personally
            </h1>
            <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
              Karpo Travel Inc. plans personalized trips worldwide from Long Island,
              New York — flights, hotels and itineraries around how you like to travel.
              These are destinations featured in our gallery. Tell us where you want to go.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="service-section bg-background" aria-labelledby="destinations-list-heading">
        <div className="content-shell px-4 sm:px-6 md:px-8">
          <h2 id="destinations-list-heading" className="sr-only">
            All destinations
          </h2>
          <ul className="services-hub-grid">
            {JOURNEYS.map((journey, i) => (
              <li key={journey.code}>
                <Reveal delay={i * 0.04}>
                  <Link
                    to="/destinations/$slug"
                    params={{ slug: journeySlug(journey) }}
                    className="services-hub-card group"
                  >
                    <div className="services-hub-thumb">
                      <img
                        src={journey.image}
                        alt={`${journey.name}, ${journey.place} — ${journey.tagline}`}
                        width={640}
                        height={427}
                        loading={i < 3 ? "eager" : "lazy"}
                        decoding="async"
                        style={{ objectPosition: journey.focus }}
                      />
                    </div>
                    <div className="services-hub-body">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-600">
                        {journey.place}
                      </p>
                      <h3 className="mt-2 font-display text-[1.45rem] font-medium text-ink">
                        {journey.name}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                        {journey.tagline}
                      </p>
                      <span className="services-hub-link mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600">
                        Explore {journey.name}
                        <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection
        alt
        eyebrow="Good to know"
        heading="Working with Karpo Travel"
        items={SITE_FAQ}
      />
      <CtaBand />
      <Footer />
    </main>
  );
}
