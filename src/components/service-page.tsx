import {
  ArrowRight,
  BadgeCheck,
  Car,
  Check,
  ClipboardCheck,
  Compass,
  FileCheck2,
  Headphones,
  HeartHandshake,
  Hotel,
  MapPinned,
  Route,
  ShieldCheck,
  Ship,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqSection } from "@/components/faq-section";
import { JsonLd } from "@/components/json-ld";
import { TripForm } from "@/components/trip-form";
import { JOURNEYS, destinationPath } from "@/data/journeys";
import type { ServiceContent, ServiceIconName } from "@/data/services";
import { SERVICES_NAV } from "@/data/services";
import { serviceFaq, serviceJsonLd } from "@/lib/seo";
import {
  Eyebrow,
  Footer,
  Nav,
  Reveal,
  ScrollProgress,
} from "@/components/site-chrome";
import { slugToServiceId, type ServiceId } from "@/data/trip-services";

const SERVICE_ICONS: Record<ServiceIconName, LucideIcon> = {
  route: Route,
  "badge-check": BadgeCheck,
  "heart-handshake": HeartHandshake,
  headphones: Headphones,
  hotel: Hotel,
  sparkles: Sparkles,
  compass: Compass,
  "clipboard-check": ClipboardCheck,
  "shield-check": ShieldCheck,
  ship: Ship,
  car: Car,
  "map-pinned": MapPinned,
  "file-check": FileCheck2,
  plane: Compass,
};

export function ServicePage({ service }: { service: ServiceContent }) {
  const faq = serviceFaq(service);
  const formService = slugToServiceId(service.slug);
  return (
    <main className="bg-background font-sans">
      <JsonLd
        data={serviceJsonLd({
          title: service.title,
          slug: service.slug,
          description: service.metaDescription,
          faq,
        })}
      />
      <ScrollProgress />
      <Nav />
      <ServiceHero service={service} />
      <ServicePlan service={service} formService={formService} />
      <ServiceSupport service={service} />
      <FaqSection
        heading={`${service.title}: common questions`}
        items={faq}
      />
      <ServiceSiblingNav current={service.slug} />
      <Footer />
    </main>
  );
}

function ServiceHero({ service }: { service: ServiceContent }) {
  return (
    <section className="service-hero relative flex items-end overflow-hidden">
      <img
        src={service.img}
        alt={`${service.title} arranged by Karpo Travel Inc.`}
        width={1600}
        height={1067}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
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
              { name: "Services", path: "/services" },
              { name: service.title },
            ]}
          />
          <div className="mt-6">
            <Eyebrow light>{service.eyebrow}</Eyebrow>
          </div>
          <span className="service-hero-goldline mt-3 block" aria-hidden="true" />
          <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.75rem,7vw,5rem)] font-medium leading-[1.02] text-[#FBF3EE]">
            {service.title}
          </h1>
          <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-[#FBF3EE]/85 sm:text-[17px]">
            {service.line}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#plan" className="accent-button-on-red rounded-full px-7 py-3.5 text-[11px] font-semibold uppercase sm:text-xs">
              {service.ctaLabel}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServicePlan({
  service,
  formService,
}: {
  service: ServiceContent;
  formService: ServiceId | "";
}) {
  return (
    <section
      id="plan"
      className="service-plan"
      aria-labelledby="service-plan-heading"
    >
      <div className="content-shell px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
            <Eyebrow>Start here</Eyebrow>
            <h2
              id="service-plan-heading"
              className="mt-4 font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-medium text-ink"
            >
              {service.ctaLabel}
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
              {service.intro[0]}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <TripForm
            idPrefix={`service-${service.slug}`}
            initialService={formService || undefined}
            successTitle="Thanks — a specialist will follow up on this request."
            successBody="We'll reply within one business day with options for your trip."
          />
        </Reveal>
      </div>
    </section>
  );
}

function ServiceSupport({ service }: { service: ServiceContent }) {
  return (
    <section className="service-section service-section--tight bg-background">
      <div className="content-shell px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>How we help</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium text-ink">
              {service.title} planned around you
            </h2>
          </div>
        </Reveal>

        <ul className="service-support-benefits">
          {service.benefits.map((item, i) => {
            const Icon = SERVICE_ICONS[item.icon];
            return (
              <li key={item.title}>
                <Reveal delay={i * 0.05}>
                  <article className="service-support-card">
                    <div className="service-benefit-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.6} />
                    </div>
                    <h3 className="mt-4 font-display text-[1.15rem] font-medium text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <div className="service-support-split">
          <ol className="service-steps service-steps--compact">
            {service.steps.map((step, i) => (
              <li key={step.title} className="service-step">
                <span className="service-step-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-[1.15rem] font-medium text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="service-included-card">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-600">
              What’s included
            </p>
            <ul className="mt-5 space-y-3">
              {service.included.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-ink">
                  <span className="service-included-check" aria-hidden="true">
                    <Check size={14} strokeWidth={2.2} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#plan"
              className="accent-button mt-7 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-center text-[11px] font-semibold uppercase sm:text-xs"
            >
              {service.ctaLabel}
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ServiceSiblingNav({ current }: { current: string }) {
  return (
    <section className="service-section border-t border-border bg-background">
      <div className="content-shell px-4 sm:px-6 md:px-8">
        <Reveal>
          <Eyebrow>More services</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium text-ink">
            Explore what else we arrange
          </h2>
        </Reveal>
        <div className="service-sibling-grid mt-10">
          {SERVICES_NAV.filter((s) => s.slug !== current).map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.04}>
              <a href={s.href} className="service-sibling-card">
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
        <div className="mt-14 border-t border-border pt-10">
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
      </div>
    </section>
  );
}
