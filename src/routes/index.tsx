import { useEffect, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import heroImg from "@/assets/journeys/motorcycle_road_hero.webp";
import heroVideo from "@/assets/journeys/motorcycle_road_hero.mp4";
import timesSquareImg from "@/assets/journeys/times_square.webp";
import { TripForm } from "@/components/trip-form";
import { DepartureHall } from "@/components/departure-hall";
import { JsonLd } from "@/components/json-ld";
import {
  CtaBand,
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
import { HOME_ABOUT_SUMMARY, PAGE_META, buildPageHead, homeGraphJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => buildPageHead(PAGE_META.home),
  component: Index,
});

const MARQUEE =
  "SANTORINI ✦ MALDIVES ✦ SWISS ALPS ✦ NEW YORK ✦ BALI ✦ PARIS ✦ TOKYO ✦ DUBAI ✦ ROME ✦ CAPE TOWN ✦ ";

function Index() {
  return (
    <main className="bg-background font-sans">
      <JsonLd data={homeGraphJsonLd()} />
      <ScrollProgress />
      <Nav />
      <Hero />
      <AboutKarpoSummary />
      <Marquee />
      <Services />
      <DepartureHall />
      <Founder />
      <CtaBand />
      <ContactSection />
      <Footer />
    </main>
  );
}

function AboutKarpoSummary() {
  return (
    <section
      className="border-b border-border bg-background px-4 py-10 sm:px-6 sm:py-12 md:px-8"
      aria-labelledby="about-karpo-summary-heading"
    >
      <div className="content-shell mx-auto max-w-3xl text-center">
        <h2
          id="about-karpo-summary-heading"
          className="font-display text-[clamp(1.5rem,3vw,2rem)] font-medium text-ink"
        >
          About Karpo Travel
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          {HOME_ABOUT_SUMMARY}
        </p>
      </div>
    </section>
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
          data-intro-hero
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
            preload="metadata"
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
        <div
          className="intro-enter flex flex-col items-center"
          style={{ ["--intro-delay" as string]: 0 }}
        >
          <span className="gold-hairline mb-5" aria-hidden="true" />
          <Eyebrow light>Karpo Travel Inc. · New York</Eyebrow>
        </div>

        <h1
          className="intro-enter mt-5 max-w-[16ch] font-display text-[clamp(2.75rem,11vw,5.75rem)] font-medium italic leading-[1.05] tracking-[-0.01em] text-ivory sm:mt-6"
          style={{ ["--intro-delay" as string]: 90 }}
        >
          Your Journey,
          <span className="block italic text-ivory">Our Priority.</span>
        </h1>

        <p
          className="intro-enter mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-ivory/85 sm:mt-6 sm:text-base md:text-[17px]"
          style={{ ["--intro-delay" as string]: 180 }}
        >
          Generations of travel knowledge, a fresh personal touch. Flights to
          cruises, cars to visas — one call takes care of it all.
        </p>

        <div
          className="intro-enter mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
          style={{ ["--intro-delay" as string]: 270 }}
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
        </div>
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
          {SERVICES.map((s, i) => {
            const href = s.href;
            return (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <a
                href={href}
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
              </a>
            </Reveal>
            );
          })}
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
                  src={timesSquareImg}
                  alt="Times Square in New York City at night"
                  loading="lazy"
                  decoding="async"
                  width={1400}
                  height={1800}
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
        <Reveal>
          <TripForm idPrefix="home-trip" />
        </Reveal>
        <p className="mt-6 text-center md:text-left">
          <Link to="/contact" className="story-full-link text-[14px]">
            Open full contact page
            <span aria-hidden="true"> →</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
