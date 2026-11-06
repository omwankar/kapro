import { useEffect, useId, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, Minus, Phone, Plus } from "lucide-react";

import tokyoImg from "@/assets/journeys/tokyo_night.webp";
import travelersImg from "@/assets/journeys/travelers_together.jpg";
import { TripForm } from "@/components/trip-form";
import {
  CtaBand,
  EMAIL,
  Eyebrow,
  Footer,
  Nav,
  ADDRESS,
  PHONE_DISPLAY,
  PHONE_TEL,
  Reveal,
  ScrollProgress,
  WHATSAPP,
} from "@/components/site-chrome";
import { resolveTripImages, type TripImage } from "@/data/trip-images";

const HERO_SUB =
  "Share a few details and a travel specialist will get back to you within one business day.";

const FAQ_ITEMS = [
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

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Karpo Travel Inc." },
      { name: "description", content: HERO_SUB },
      { property: "og:title", content: "Contact | Karpo Travel Inc." },
      { property: "og:description", content: HERO_SUB },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="bg-background font-sans">
      <ScrollProgress />
      <Nav />
      <ContactHero />
      <ContactCards />
      <ContactSplit />
      <WhatHappensNext />
      <DestinationStrip />
      <LifestyleAndFaq />
      <CtaBand />
      <Footer />
    </main>
  );
}

function ContactHero() {
  return (
    <section className="contact-page-hero relative flex items-end overflow-hidden">
      <img
        src={tokyoImg}
        alt="Tokyo, Japan"
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
            "linear-gradient(180deg, rgba(74,15,19,0.55), rgba(20,12,16,0.72))",
        }}
        aria-hidden="true"
      />
      <div className="content-shell relative z-10 w-full px-4 pb-28 pt-[7.5rem] text-center sm:px-6 sm:pb-32 sm:pt-[8.5rem] md:px-8">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#FBF3EE]/80 sm:text-[11px]">
            <Link to="/" className="transition-colors hover:text-[#FBF3EE]">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <span>Contact</span>
          </p>
          <h1 className="mx-auto mt-6 max-w-[18ch] font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.05] text-[#FBF3EE]">
            Let&apos;s plan your{" "}
            <span className="italic text-[#F7EDE6]">next journey</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[42ch] text-[15px] leading-relaxed text-[#FBF3EE]/90 sm:text-[17px]">
            {HERO_SUB}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ContactCards() {
  return (
    <section className="contact-cards-wrap relative z-[5] -mt-16 px-4 sm:-mt-16 sm:px-6 md:px-8" aria-label="Contact details">
      <div className="contact-page-shell">
        <div className="contact-cards-grid">
          <Reveal>
            <article className="contact-info-card">
              <div className="contact-info-icon" aria-hidden="true">
                <Phone size={22} strokeWidth={1.6} />
              </div>
              <p className="contact-info-label">Call or WhatsApp, 24/7</p>
              <a href={PHONE_TEL} className="contact-info-value">
                {PHONE_DISPLAY}
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-[13px] font-semibold text-red-600 underline-offset-4 hover:underline"
              >
                Message us on WhatsApp
              </a>
            </article>
          </Reveal>
          <Reveal delay={0.06}>
            <article className="contact-info-card">
              <div className="contact-info-icon" aria-hidden="true">
                <Mail size={22} strokeWidth={1.6} />
              </div>
              <p className="contact-info-label">Email</p>
              <a href={`mailto:${EMAIL}`} className="contact-info-value break-all">
                {EMAIL}
              </a>
            </article>
          </Reveal>
          <Reveal delay={0.12}>
            <article className="contact-info-card">
              <div className="contact-info-icon" aria-hidden="true">
                <Clock size={22} strokeWidth={1.6} />
              </div>
              <p className="contact-info-label">Address</p>
              <p className="contact-info-value">{ADDRESS}</p>
              <p className="mt-2 text-[13px] text-muted-foreground">
                Established 2026
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactSplit() {
  return (
    <section className="contact-split bg-background">
      <div className="contact-page-shell px-4 sm:px-6 md:px-8">
        <Reveal>
          <TripForm
            idPrefix="page-contact"
            successTitle="Thank you, we'll be in touch within one business day."
            successBody="A travel specialist will follow up soon."
          />
        </Reveal>
      </div>
    </section>
  );
}

function WhatHappensNext() {
  return (
    <section className="contact-next bg-red-50">
      <div className="contact-page-shell px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="text-center">
            <Eyebrow>What happens next</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-medium text-ink">
              Three simple steps
            </h2>
          </div>
        </Reveal>
        <ol className="contact-next-track mt-14">
          {[
            {
              title: "Share a few details",
              body: "Tell us where you want to go and what matters most.",
            },
            {
              title: "A specialist replies",
              body: "A travel specialist will get back to you within one business day.",
            },
            {
              title: "We plan, you travel",
              body: "Careful planning and ongoing support, so you can focus on the experience.",
            },
          ].map((step, i) => (
            <li key={step.title} className="contact-next-item">
              <span className="contact-next-num" aria-hidden="true">
                {i + 1}
              </span>
              <Reveal delay={i * 0.08}>
                <h3 className="font-display text-[1.35rem] font-medium text-ink">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function DestinationStrip() {
  const [images, setImages] = useState<TripImage[]>([]);

  useEffect(() => {
    let active = true;
    resolveTripImages().then((list) => {
      if (active) setImages(list);
    });
    return () => {
      active = false;
    };
  }, []);

  if (images.length === 0) return null;

  const loop = [...images, ...images];

  return (
    <section className="contact-marquee-section bg-background">
      <div className="contact-page-shell px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Where will you go?</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-medium text-ink">
              Places we carry you to
            </h2>
          </div>
        </Reveal>
      </div>
      <div className="contact-marquee mt-12" aria-label="Destination photos">
        <div className="contact-marquee-track">
          {loop.map((trip, i) => (
            <figure key={`${trip.label}-${i}`} className="contact-marquee-card">
              <img
                src={trip.src}
                alt={trip.label}
                width={240}
                height={320}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="font-display">{trip.label.split(",")[0]}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function LifestyleAndFaq() {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <section className="contact-mapfaq bg-[var(--bg-alt)]">
      <div className="contact-page-shell px-4 sm:px-6 md:px-8">
        <div className="contact-mapfaq-grid">
          <Reveal>
            <figure className="contact-lifestyle-frame">
              <img
                src={travelersImg}
                alt="Travelers enjoying a trip together abroad"
                width={1600}
                height={1200}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="contact-lifestyle-caption font-display">
                Journeys made personal — wherever you go.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <Eyebrow>Good to know</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-medium text-ink">
                Quick answers
              </h2>
              <div className="contact-faq mt-8">
                {FAQ_ITEMS.map((item, index) => {
                  const open = openIndex === index;
                  const panelId = `${baseId}-panel-${index}`;
                  const buttonId = `${baseId}-button-${index}`;
                  return (
                    <div key={item.q} className={`contact-faq-item ${open ? "is-open" : ""}`}>
                      <h3>
                        <button
                          type="button"
                          id={buttonId}
                          className="contact-faq-trigger"
                          aria-expanded={open}
                          aria-controls={panelId}
                          onClick={() => setOpenIndex(open ? -1 : index)}
                        >
                          <span>{item.q}</span>
                          <span className="contact-faq-icon" aria-hidden="true">
                            {open ? <Minus size={18} /> : <Plus size={18} />}
                          </span>
                        </button>
                      </h3>
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="contact-faq-panel"
                        aria-hidden={!open}
                      >
                        <div className="contact-faq-panel-inner">
                          <p>{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
