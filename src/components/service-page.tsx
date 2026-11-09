import { Link } from "@tanstack/react-router";
import {
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

import type { ServiceContent, ServiceIconName } from "@/data/services";
import { FaqSection } from "@/components/faq-section";
import { JsonLd } from "@/components/json-ld";
import { SERVICES_NAV } from "@/data/services";
import { serviceFaq, serviceJsonLd } from "@/lib/seo";
import {
  CtaBand,
  Eyebrow,
  Footer,
  Nav,
  Reveal,
  ScrollProgress,
} from "@/components/site-chrome";
import { serviceContactHref, slugToServiceId } from "@/data/trip-services";

function contactHrefForService(slug: string) {
  const id = slugToServiceId(slug);
  return id ? serviceContactHref(id) : "/contact";
}

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
      <ServiceIntro service={service} />
      <ServiceBenefits service={service} />
      <ServiceIncluded service={service} />
      <ServiceWhy service={service} />
      <FaqSection
        heading={`${service.title}: common questions`}
        items={faq}
      />
      <ServiceSiblingNav current={service.slug} />
      <CtaBand />
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
                <Link to="/services" className="transition-colors hover:text-[#FBF3EE]">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{service.title}</li>
            </ol>
          </nav>
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
            <a href={contactHrefForService(service.slug)} className="accent-button-on-red rounded-full px-7 py-3.5 text-[11px] font-semibold uppercase sm:text-xs">
              {service.ctaLabel}
            </a>
            <a
              href={contactHrefForService(service.slug)}
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

function ServiceIntro({ service }: { service: ServiceContent }) {
  return (
    <section className="service-section bg-background">
      <div className="content-shell px-4 sm:px-6 md:px-8">
        <div className="service-intro-grid">
          <Reveal>
            <Eyebrow>How we help</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-medium leading-[1.12] text-ink">
              Personalized {service.title.toLowerCase()}, planned with care
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="service-intro-copy space-y-5">
              {service.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServiceBenefits({ service }: { service: ServiceContent }) {
  return (
    <section className="service-section bg-[var(--bg-alt)]">
      <div className="content-shell px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>What you can expect</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-medium text-ink">
              Built around reliability and detail
            </h2>
          </div>
        </Reveal>

        <div className="service-benefit-grid mt-12 sm:mt-14">
          {service.benefits.map((item, i) => {
            const Icon = SERVICE_ICONS[item.icon];
            return (
            <Reveal key={item.title} delay={i * 0.06}>
              <article className="service-benefit-card">
                <div className="service-benefit-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 font-display text-[1.25rem] font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceIncluded({ service }: { service: ServiceContent }) {
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
              {service.steps.map((step, i) => (
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
                {service.included.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                    <span className="service-included-check" aria-hidden="true">
                      <Check size={14} strokeWidth={2.2} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={contactHrefForService(service.slug)}
                className="accent-button mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-center text-[11px] font-semibold uppercase sm:text-xs"
              >
                {service.ctaLabel}
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServiceWhy({ service }: { service: ServiceContent }) {
  return (
    <section className="service-section bg-[var(--bg-alt)]">
      <div className="content-shell px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="service-why-card mx-auto max-w-3xl text-center">
            <Eyebrow>Why choose Karpo</Eyebrow>
            <p className="mt-5 font-display text-[clamp(1.35rem,2.8vw,1.85rem)] font-medium leading-snug text-ink">
              {service.whyKarpo}
            </p>
            <div className="mx-auto mt-8 h-px w-10 bg-gold" aria-hidden="true" />
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
              Personalized planning, transparent recommendations, and support by call or
              WhatsApp, 24/7.
            </p>
            <a
              href={contactHrefForService(service.slug)}
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
              <Link to="/services/$slug" params={{ slug: s.slug }} className="service-sibling-card">
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
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
