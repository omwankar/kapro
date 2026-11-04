import { useEffect, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Clock, Mail, Phone } from "lucide-react";

import heroImg from "@/assets/journeys/motorcycle_road_hero.webp";
import heroVideo from "@/assets/journeys/motorcycle_road_hero.mp4";
import nycImg from "@/assets/journeys/new_york_dusk.webp";
import alpsImg from "@/assets/journeys/swiss_alps_tall.webp";
import baliImg from "@/assets/journeys/bali_temple.webp";
import tokyoImg from "@/assets/journeys/tokyo_night.webp";
import romeImg from "@/assets/journeys/rome_colosseum.webp";
import santoriniImg from "@/assets/journeys/santorini.webp";
import { ContactForm } from "@/components/contact-form";
import {
  CtaBand,
  EMAIL,
  EASE,
  Eyebrow,
  Footer,
  Nav,
  PHONE_DISPLAY,
  PHONE_TEL,
  Reveal,
  SERVICES,
  ScrollProgress,
  WHATSAPP,
} from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Karpo Travel Inc. — Your Journey, Our Priority" },
      {
        name: "description",
        content:
          "Flights, hotels, vacations, cruises, cars and visa assistance — personalized travel from New York, backed by a 60-year family legacy.",
      },
      {
        property: "og:title",
        content: "Karpo Travel Inc. — Your Journey, Our Priority",
      },
      {
        property: "og:description",
        content:
          "Flights, hotels, vacations, cruises, cars and visa assistance — personalized travel from New York.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const JOURNEYS = [
  { img: baliImg, title: "Bali", line: "Temples above the jungle canopy", tall: true },
  { img: tokyoImg, title: "Tokyo", line: "Neon nights, quiet shrines", tall: false },
  { img: alpsImg, title: "Swiss Alps", line: "Rails through the high passes", tall: true },
  { img: romeImg, title: "Rome", line: "Stone, light, and late dinners", tall: false },
  { img: nycImg, title: "New York", line: "Where it all began", tall: true },
];

const MARQUEE =
  "SANTORINI ✦ MALDIVES ✦ SWISS ALPS ✦ NEW YORK ✦ BALI ✦ PARIS ✦ TOKYO ✦ DUBAI ✦ ROME ✦ CAPE TOWN ✦ ";

function Index() {
  return (
    <main className="bg-background font-sans">
      <ScrollProgress />
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <JourneyRail />
      <Founder />
      <CtaBand />
      <ContactSection />
      <Footer />
    </main>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | undefined>();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (reduceMotion) return;
    let cancelled = false;
    const load = () => {
      if (!cancelled) setVideoSrc(heroVideo);
    };
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(load, { timeout: 2000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }
    const timer = window.setTimeout(load, 600);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reduceMotion]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] overflow-hidden">
      <motion.div
        style={reduceMotion ? undefined : { y: imgY, scale: imgScale }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="A rider on a mountain road at golden hour"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
          className={`hero-media absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ease-out motion-reduce:transition-none ${videoReady ? "opacity-0" : "opacity-100"}`}
        />
        {videoSrc ? (
          <video
            aria-hidden="true"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={heroImg}
            src={videoSrc}
            onPlaying={() => setVideoReady(true)}
            onError={() => {
              setVideoReady(false);
              console.error("Hero video could not be played; keeping the fallback image visible.");
            }}
            className={`hero-media absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ease-out motion-reduce:transition-none ${videoReady ? "opacity-100" : "opacity-0"}`}
          />
        ) : null}
      </motion.div>
      <div className="photo-overlay absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-[color-mix(in_srgb,var(--ink)_45%,transparent)] via-[color-mix(in_srgb,var(--ink)_20%,transparent)] to-[color-mix(in_srgb,var(--ink)_40%,transparent)]" />

      <motion.div
        style={reduceMotion ? undefined : { y: textY, opacity: fade }}
        className="hero-text-scrim relative z-10 flex h-full flex-col items-center justify-center px-4 pb-16 pt-36 text-center sm:px-5 sm:pt-40"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.45, ease: EASE }}
          className="flex flex-col items-center"
        >
          <span className="gold-hairline mb-5" aria-hidden="true" />
          <Eyebrow light>Karpo Travel Inc. · New York</Eyebrow>
        </motion.div>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.75, delay: 0.6, ease: EASE }}
          className="mt-5 max-w-[16ch] font-display text-[clamp(2.75rem,11vw,5.75rem)] font-medium italic leading-[1.05] tracking-[-0.01em] text-ivory sm:mt-6"
        >
          Your Journey,
          <span className="block italic text-ivory">Our Priority.</span>
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.8, ease: EASE }}
          className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-ivory/85 sm:mt-6 sm:text-base md:text-[17px]"
        >
          Generations of travel knowledge, a fresh personal touch. Flights to
          cruises, cars to visas — one call takes care of it all.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.95, ease: EASE }}
          className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
        >
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="accent-button rounded-full px-7 py-3.5 text-center text-[11px] font-semibold uppercase motion-reduce:transition-none sm:px-8 sm:py-4 sm:text-xs"
          >
            Plan my trip
          </a>
          <a
            href={PHONE_TEL}
            className="accent-outline-light rounded-full px-7 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] motion-reduce:transition-none sm:px-8 sm:py-4 sm:text-xs"
          >
            Call us 24/7
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#services"
        style={reduceMotion ? undefined : { opacity: fade }}
        className="scroll-cue absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-ivory/80 sm:bottom-8"
        aria-label="Scroll down"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>
  );
}

/* ---------------- Marquee ---------------- */

function Marquee() {
  return (
    <div className="overflow-hidden border-b border-border py-5" style={{ backgroundColor: "var(--bg-alt)" }}>
      <div className="marquee-track">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="whitespace-nowrap font-display text-base font-medium tracking-[0.28em] text-muted-foreground md:text-lg"
          >
            {MARQUEE}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Services ---------------- */

function Services() {
  return (
    <section id="services" className="defer-paint scroll-mt-24 border-b border-border bg-background">
      <div className="content-shell section-pad px-4 sm:px-6 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.75rem)] font-medium text-ink">
            Six ways we take <span className="italic text-red-500">you there</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="service-card group relative block overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover motion-reduce:transition-none"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--ink)_72%,transparent)] via-[color-mix(in_srgb,var(--ink)_12%,transparent)] to-transparent" />
                <span className="service-card-arrow motion-reduce:opacity-100" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <h3 className="font-display text-2xl font-medium text-ivory md:text-[1.75rem]">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-ivory/80">{s.line}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Horizontal journey rail ---------------- */

function JourneyRail() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [pinScroll, setPinScroll] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-68%"]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => setPinScroll(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const intro = (
    <>
      <Eyebrow>Signature journeys</Eyebrow>
      <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[1.08] text-ink">
        Places we
        <span className="block italic text-red-500">carry you to</span>
      </h2>
      <p className="mt-5 max-w-[36ch] text-[15px] leading-[1.7] text-muted-foreground md:mt-6 md:text-[17px]">
        {pinScroll ? "Keep scrolling — the world moves past your window." : "Swipe to see the world move past your window."}
      </p>
      <div className="accent-rule mt-8 w-28 md:mt-10" />
    </>
  );

  return (
    <section ref={ref} id="journeys" className="relative scroll-mt-24 border-b border-border md:h-[340vh]" style={{ backgroundColor: "var(--bg-alt)" }}>
      <div className="flex flex-col justify-center py-16 md:sticky md:top-0 md:h-screen md:overflow-hidden md:py-0">
        <div className="relative z-10 px-4 pb-8 sm:px-6 md:hidden">{intro}</div>

        <div className="journey-rail-scroll overflow-x-auto overscroll-x-contain px-0 snap-x snap-mandatory md:overflow-visible md:snap-none">
          <motion.div
            style={pinScroll && !reduceMotion ? { x } : undefined}
            className="relative flex w-max items-center gap-5 px-4 sm:gap-6 sm:px-6 md:gap-8 md:px-16"
          >
            <div className="hidden w-[32rem] shrink-0 md:block">{intro}</div>

            {JOURNEYS.map((j) => (
              <div
                key={j.title}
                className="group relative h-[52vh] w-[min(80vw,20rem)] shrink-0 snap-center overflow-hidden rounded-[1.5rem] sm:h-[58vh] md:h-[64vh] md:w-[23rem] md:snap-align-none"
              >
                <img
                  src={j.img}
                  alt={j.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--ink)_70%,transparent)] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 sm:p-6">
                  <h3 className="font-display text-2xl font-medium text-ivory sm:text-3xl">{j.title}</h3>
                  <p className="mt-1 text-sm text-ivory/80">{j.line}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute inset-x-6 bottom-8 hidden h-px md:block md:inset-x-16" style={{ backgroundColor: "var(--border)" }}>
          <motion.div
            style={{
              backgroundColor: "var(--red-600)",
              ...(pinScroll && !reduceMotion ? { scaleX: scrollYProgress } : {}),
            }}
            className="h-full origin-left"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Our Story ---------------- */

function Founder() {
  const STATS = [
    { value: "60+", label: "years of family legacy in travel" },
    { value: "2023", label: "first personalized journeys" },
    { value: "2026", label: "established in New York" },
    { value: "24/7", label: "call or WhatsApp support" },
  ];

  const reduceMotion = useReducedMotion();
  const motionOff = Boolean(reduceMotion);

  return (
    <section id="story" className="defer-paint relative scroll-mt-24 overflow-x-clip bg-background">
      <div className="content-shell relative section-pad px-4 sm:px-6 md:px-8">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-16">
          <div className="min-w-0 max-w-3xl">
            <Reveal>
              <Eyebrow>Our Story</Eyebrow>
              <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.75rem)] font-medium text-ink">
                Built on Trust. Driven by{" "}
                <span className="italic text-red-500">Experience.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-6 max-w-[62ch] space-y-5 text-[15px] leading-[1.7] text-muted-foreground sm:mt-8 sm:text-[17px]">
                <p>
                  <span className="font-medium text-ink">Karpo Travel Inc.</span>{" "}
                  was founded to make personalized travel simpler, more thoughtful,
                  and more reliable. Drawing on over 60 years of family experience
                  in the travel industry, we focus on carefully planned journeys
                  that reflect each client’s preferences, pace, and priorities.
                </p>
                <p>
                  From flights and accommodations to full itineraries and ongoing
                  support, every detail is handled with care and transparency.
                  Whether you’re planning a family vacation, a luxury escape, or a
                  complex multi-destination trip, our goal is the same — to take
                  care of the planning so you can focus on the experience.
                </p>
                <p>
                  Founded in New York, Karpo Travel grew from a passion for
                  exploration into a trusted practice built on personal referrals,
                  careful attention to detail, and a commitment to making every
                  journey seamless and meaningful.
                </p>
                <p className="quote-rule font-display text-[clamp(1.5rem,3vw,2rem)] italic leading-snug text-ink">
                  “Your Journey, Our Priority.”
                </p>
                <p>
                  <Link to="/about" className="story-full-link">
                    Read our full story
                    <span aria-hidden="true"> →</span>
                  </Link>
                </p>
              </div>
            </Reveal>
          </div>

          <div className="story-visual justify-self-center lg:self-center">
            <motion.div
              className="story-visual-rings"
              aria-hidden="true"
              initial={motionOff ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={motionOff ? { duration: 0 } : { duration: 0.7, ease: EASE }}
            >
              <span className="story-ring story-ring--sm" />
              <span className="story-ring story-ring--md" />
              <span className="story-ring story-ring--lg" />
              <span className="story-ring-dot story-ring-dot--a" />
              <span className="story-ring-dot story-ring-dot--b" />
            </motion.div>

            <div className="story-visual-blush" aria-hidden="true" />
            <div className="story-visual-arch" aria-hidden="true" />

            <div className="story-visual-photo">
              <motion.div
                className="h-full w-full"
                initial={motionOff ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={motionOff ? { duration: 0 } : { duration: 0.7, ease: EASE }}
              >
                <img
                  src={santoriniImg}
                  alt="Whitewashed cliffside houses overlooking the Aegean in Santorini"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={1040}
                />
              </motion.div>
            </div>

            <motion.div
              className="story-visual-namecard story-visual-legacycard"
              initial={motionOff ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={
                motionOff ? { duration: 0 } : { duration: 0.65, delay: 0.12, ease: EASE }
              }
            >
              <p className="story-visual-namecard-name">60+</p>
              <div className="story-visual-namecard-rule" aria-hidden="true" />
              <p className="story-visual-namecard-role">Years of family legacy in travel</p>
            </motion.div>

            <div className="story-visual-seal" aria-hidden="true">
              <motion.div
                initial={motionOff ? false : { opacity: 0, y: -14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={
                  motionOff ? { duration: 0 } : { duration: 0.65, delay: 0.12, ease: EASE }
                }
              >
                <p className="story-visual-seal-est">Est.</p>
                <p className="story-visual-seal-year">2026</p>
                <p className="story-visual-seal-place">New York</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-border bg-red-50 sm:mt-6">
        <div className="content-shell px-4 py-10 sm:px-6 sm:py-12 md:px-8">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {STATS.map((s, i) => (
                <Reveal
                  key={s.label}
                  delay={i * 0.08}
                  className={`border-border ${i % 2 === 1 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} md:border-l md:first:border-l-0`}
                >
                  <div className="px-3 py-8 text-center sm:px-6 sm:py-10">
                    <p className="stat-numeral font-display text-3xl font-medium text-red-500 sm:text-4xl md:text-5xl">
                      {s.value}
                    </p>
                    <p className="mt-3 text-[10px] uppercase leading-snug tracking-[0.14em] text-muted-foreground sm:text-[11px]">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact form ---------------- */

function ContactSection() {
  return (
    <section id="contact" className="defer-paint scroll-mt-24 text-ink" style={{ backgroundColor: "var(--bg-alt)" }}>
      <div className="content-shell section-pad px-4 sm:px-6 md:px-8">
        <div className="grid gap-6 md:grid-cols-[minmax(16rem,0.88fr)_minmax(0,1.12fr)] md:items-stretch md:gap-8">
          <Reveal className="order-2 md:order-1">
            <div className="card-accent-top flex flex-col gap-7 rounded-[1.5rem] border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
              <div className="text-center md:text-left">
                <Eyebrow>Get in touch</Eyebrow>
                <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] font-medium text-ink">
                  Tell us about your{" "}
                  <span className="italic text-red-500">trip.</span>
                </h2>
                <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.7] text-muted-foreground sm:text-[17px]">
                  Share a few details and a travel specialist will get back to you
                  within one business day.
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <a className="contact-detail" href={PHONE_TEL}>
                  <span className="contact-icon"><Phone aria-hidden="true" size={18} /></span>
                  <span>
                    <span className="contact-detail-label">Phone</span>
                    <span className="contact-detail-value">{PHONE_DISPLAY}</span>
                  </span>
                </a>
                <a className="contact-detail" href={`mailto:${EMAIL}`}>
                  <span className="contact-icon"><Mail aria-hidden="true" size={18} /></span>
                  <span>
                    <span className="contact-detail-label">Email</span>
                    <span className="contact-detail-value">{EMAIL}</span>
                  </span>
                </a>
                <div className="contact-detail">
                  <span className="contact-icon"><Clock aria-hidden="true" size={18} /></span>
                  <span>
                    <span className="contact-detail-label">Hours</span>
                    <span className="contact-detail-value">Call or WhatsApp, 24/7</span>
                  </span>
                </div>
                <a
                  className="accent-outline inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                >
                  Message us on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className="order-1 h-full md:order-2">
            <div className="flex h-full flex-col gap-4">
              <ContactForm className="contact-card h-full space-y-5 p-5 sm:p-7" />
              <p className="text-center md:text-left">
                <Link to="/contact" className="story-full-link text-[14px]">
                  Open full contact page
                  <span aria-hidden="true"> →</span>
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
