import { createFileRoute } from "@tanstack/react-router";
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
import { JOURNEYS, destinationPath } from "@/data/journeys";
import { SERVICES_NAV } from "@/data/services";
import { PAGE_META, SITE_FAQ, buildPageHead, servicesHubJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () => buildPageHead(PAGE_META.services),
  component: ServicesHubPage,
});

function ServicesHubPage() {
  return (
    <main className="bg-background font-sans">
      <JsonLd data={servicesHubJsonLd(SERVICES_NAV)} />
      <ScrollProgress />
      <Nav />

      <section className="services-hub-hero bg-[var(--bg-alt)]">
        <div className="content-shell px-4 pb-14 pt-[9.5rem] sm:px-6 sm:pb-16 sm:pt-[10.5rem] md:px-8">
          <Reveal>
            <Breadcrumbs
              align="start"
              items={[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
              ]}
            />
            <div className="mt-6">
              <Eyebrow>Six ways we take you there</Eyebrow>
            </div>
            <h1 className="mt-5 max-w-[18ch] font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.04] text-ink">
              Travel services, planned personally
            </h1>
            <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
              Flights, hotels, vacations, cruises, car rental and visa assistance,
              arranged by Karpo Travel Inc. from New York and supported by call or
              WhatsApp, 24/7. Pick a service to see how it works and what is included.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="service-section bg-background" aria-labelledby="services-list-heading">
        <div className="content-shell px-4 sm:px-6 md:px-8">
          <h2 id="services-list-heading" className="sr-only">
            All services
          </h2>
          <ul className="services-hub-grid">
            {SERVICES_NAV.map((s, i) => (
              <li key={s.slug}>
                <Reveal delay={i * 0.05}>
                  <a href={s.href} className="services-hub-card group">
                    <div className="services-hub-thumb">
                      <img
                        src={s.img}
                        alt={`${s.title} — ${s.line}`}
                        width={640}
                        height={427}
                        loading={i < 2 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </div>
                    <div className="services-hub-body">
                      <h3 className="font-display text-[1.45rem] font-medium text-ink">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                        {s.line}
                      </p>
                      <span className="services-hub-link mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600">
                        Explore {s.title.toLowerCase()}
                        <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="service-section border-t border-border bg-[var(--bg-alt)]">
        <div className="content-shell px-4 sm:px-6 md:px-8">
          <Reveal>
            <Eyebrow>Where we take you</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium text-ink">
              Destinations, planned personally
            </h2>
          </Reveal>
          <div className="service-sibling-grid mt-10">
            {JOURNEYS.slice(0, 6).map((journey, i) => (
              <Reveal key={journey.code} delay={i * 0.04}>
                <a href={destinationPath(journey)} className="service-sibling-card">
                  <div className="service-sibling-thumb">
                    <img
                      src={journey.image}
                      alt={`${journey.name} — ${journey.tagline}`}
                      width={120}
                      height={90}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: journey.focus }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-[1.1rem] font-medium text-ink">{journey.name}</p>
                    <p className="mt-1 text-[13px] text-muted-foreground">{journey.place}</p>
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
