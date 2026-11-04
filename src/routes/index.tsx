import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { CheckCircle2, Clock, LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react";

import heroImg from "@/assets/journeys/motorcycle_road_hero.webp";
import heroVideo from "@/assets/journeys/motorcycle_road_hero.mp4";
import flightsImg from "@/assets/journeys/flights_sunset.webp";
import santoriniImg from "@/assets/journeys/santorini.webp";
import maldivesImg from "@/assets/journeys/maldives_resort.webp";
import cruiseImg from "@/assets/journeys/cruise_ship.webp";
import suvImg from "@/assets/journeys/suv_coast_road.webp";
import visaImg from "@/assets/journeys/visa_passport.webp";
import nycImg from "@/assets/journeys/new_york_dusk.webp";
import alpsImg from "@/assets/journeys/swiss_alps_tall.webp";
import baliImg from "@/assets/journeys/bali_temple.webp";
import tokyoImg from "@/assets/journeys/tokyo_night.webp";
import romeImg from "@/assets/journeys/rome_colosseum.webp";
import amalfiImg from "@/assets/journeys/amalfi_coast.webp";
import founderImg from "@/assets/jenson-daniel.webp";

const EMBLEM_SRC = "/images/karpo-emblem-only.png";
const EMBLEM_WIDTH = 256;
const EMBLEM_HEIGHT = 417;

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

const WHATSAPP = "https://wa.me/15167846446";
const PHONE_DISPLAY = "+1 (516) 784 6446";
const PHONE_TEL = "tel:+15167846446";
const EMAIL = "Karpotravel@gmail.com";
const FORM_ENDPOINT = "https://api.web3forms.com/submit";
// Set VITE_WEB3FORMS_ACCESS_KEY in .env.local using the key for Karpotravel@gmail.com.
const FORM_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "";
const FIELD_CLASS =
  "contact-field min-h-[52px] w-full rounded-[12px] border border-border bg-card px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground";
const ADDRESS = "2080 North Jerusalem Road, Bellmore, New York 11710";

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  departure: string;
  returnDate: string;
  travellers: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const INITIAL_CONTACT_VALUES: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  departure: "",
  returnDate: "",
  travellers: "",
  message: "",
};

const INTEREST_OPTIONS = [
  "Flights",
  "Hotels",
  "Vacations",
  "Cruises",
  "Car rental",
  "Visa assistance",
  "Multiple services",
];

const SERVICES = [
  { img: flightsImg, title: "Flights", line: "Best fares, worldwide" },
  { img: maldivesImg, title: "Hotels", line: "Handpicked stays" },
  { img: santoriniImg, title: "Vacations", line: "Curated getaways" },
  { img: cruiseImg, title: "Cruises", line: "Sail the seven seas" },
  { img: suvImg, title: "Cars", line: "Chauffeured & self-drive" },
  { img: visaImg, title: "Visa Assistance", line: "Paperwork, handled" },
];

const JOURNEYS = [
  { img: baliImg, title: "Bali", line: "Temples above the jungle canopy", tall: true },
  { img: tokyoImg, title: "Tokyo", line: "Neon nights, quiet shrines", tall: false },
  { img: alpsImg, title: "Swiss Alps", line: "Rails through the high passes", tall: true },
  { img: romeImg, title: "Rome", line: "Stone, light, and late dinners", tall: false },
  { img: nycImg, title: "New York", line: "Where it all began", tall: true },
];

const NAV_LINKS = [
  ["Services", "#services"],
  ["Journeys", "#journeys"],
  ["Our Story", "#story"],
  ["Contact", "#contact"],
] as const;

const MARQUEE =
  "SANTORINI ✦ MALDIVES ✦ SWISS ALPS ✦ NEW YORK ✦ BALI ✦ PARIS ✦ TOKYO ✦ DUBAI ✦ ROME ✦ CAPE TOWN ✦ ";

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.28em] sm:text-xs ${
        light ? "text-ivory/90" : "text-red-600"
      }`}
    >
      {!light ? <span className="eyebrow-mark" aria-hidden="true" /> : null}
      {children}
    </p>
  );
}

function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  if (reduceMotion) return null;
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}

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

/* ---------------- Navigation ---------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.8, ease: EASE, delay: 0.2 }}
      className={`site-header ${solid ? "is-scrolled border-b border-border bg-[rgba(252,247,245,0.92)] shadow-none backdrop-blur-[14px]" : "border-b border-transparent bg-transparent"}`}
    >
      <div className="content-shell site-header-bar flex items-center justify-between gap-3 px-4 sm:px-6 md:px-8">
        <a href="#top" className="site-brand" onClick={() => setMenuOpen(false)}>
          <img
            src={EMBLEM_SRC}
            alt="Karpo Travel emblem"
            width={EMBLEM_WIDTH}
            height={EMBLEM_HEIGHT}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="site-header-emblem"
          />
          <span className="site-wordmark">
            <span className="site-wordmark-name">KARPO</span>
            <span className="site-wordmark-sub">Travel Inc.</span>
          </span>
        </a>

        <nav
          className={`hidden items-center gap-8 font-medium md:flex ${
            solid ? "text-ink" : "text-[#FBF3EE]/90"
          }`}
        >
          {NAV_LINKS.map(([label, href]) => (
            <a key={href} href={href} className="accent-nav-link">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="accent-button rounded-full px-4 py-2.5 text-[10px] font-semibold uppercase motion-reduce:transition-none sm:px-5 sm:text-[11px]"
          >
            Plan my trip
          </a>
          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border md:hidden ${
              solid
                ? "border-border text-ink"
                : "border-[#FBF3EE]/35 text-[#FBF3EE]"
            }`}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M4 7h16" strokeLinecap="round" />
                  <path d="M4 12h16" strokeLinecap="round" />
                  <path d="M4 17h16" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-[rgba(252,247,245,0.96)] px-4 py-4 backdrop-blur-md md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="accent-nav-link flex min-h-11 items-center rounded-lg px-3 font-medium text-ink"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </motion.header>
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
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
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

  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section id="story" className="defer-paint relative scroll-mt-24 overflow-x-clip bg-background">
      <div className="content-shell relative section-pad px-4 sm:px-6 md:px-8">
        <img
          src={EMBLEM_SRC}
          alt=""
          aria-hidden="true"
          width={EMBLEM_WIDTH}
          height={EMBLEM_HEIGHT}
          loading="lazy"
          decoding="async"
          className="story-watermark hidden md:block"
        />
        <div ref={ref} className="relative z-[1] grid items-start gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
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
                  Founded in New York by Jenson Daniel, Karpo Travel grew from a
                  passion for exploration into a trusted practice built on personal
                  referrals, careful attention to detail, and a commitment to
                  making every journey seamless and meaningful.
                </p>
                <p className="quote-rule font-display text-[clamp(1.5rem,3vw,2rem)] italic leading-snug text-ink">
                  “Your Journey, Our Priority.”
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="justify-self-center lg:justify-self-end lg:pt-8" delay={0.16}>
            <figure className="card-accent-top card-accent-top--sm relative z-[1] w-[11rem] overflow-hidden rounded-[24px] border border-border bg-card sm:w-[12.5rem]">
              <div className="p-[6px]">
                <motion.img
                  style={reduceMotion ? undefined : { y: imgY, scale: 1.02 }}
                  src={founderImg}
                  alt="Jenson Daniel, founder of Karpo Travel Inc."
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] h-auto w-full rounded-[18px] object-cover"
                />
              </div>
              <div className="mx-5 h-px bg-gold" aria-hidden="true" />
              <figcaption className="px-4 py-4 text-center">
                <p className="font-display text-base font-medium text-ink">
                  Jenson Daniel
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Founder
                </p>
              </figcaption>
            </figure>
          </Reveal>
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

/* ---------------- CTA band ---------------- */

function CtaBand() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.img
        style={reduceMotion ? undefined : { y: imgY, scale: 1.06 }}
        src={amalfiImg}
        alt="Colorful cliffside villages on the Amalfi Coast"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[center_32%]"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(100deg, rgba(74,15,19,0.92) 0%, rgba(112,18,23,0.78) 40%, rgba(112,18,23,0.25) 75%, rgba(74,15,19,0.15) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 30%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-5 sm:py-28 md:mx-0 md:max-w-xl md:px-8 md:py-36 md:text-left lg:px-16 xl:px-24">
        <Reveal>
          <Eyebrow light>Ready when you are</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.75rem)] font-medium text-ivory">
            Where to <span className="italic text-ivory">next?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-ivory/90 sm:text-[17px] md:mx-0">
            Message us any time — we answer 24/7, and the first consult is
            always personal.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 md:justify-start">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="accent-button-on-red rounded-full px-7 py-3.5 text-center text-[11px] font-semibold uppercase motion-reduce:transition-none sm:px-8 sm:py-4 sm:text-xs"
            >
              WhatsApp us
            </a>
            <a
              href={PHONE_TEL}
              className="accent-outline-light rounded-full px-7 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.14em] sm:px-8 sm:py-4 sm:text-xs"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Contact form ---------------- */

function ContactSection() {
  const submissionInProgress = useRef(false);
  const [values, setValues] = useState(INITIAL_CONTACT_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function updateField<K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  }

  function validate(): ContactFormErrors {
    const nextErrors: ContactFormErrors = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (
      values.departure &&
      values.returnDate &&
      values.returnDate < values.departure
    ) {
      nextErrors.returnDate = "Return date must be after departure.";
    }
    if (values.travellers && (!Number.isInteger(Number(values.travellers)) || Number(values.travellers) < 1)) {
      nextErrors.travellers = "Enter at least one traveller.";
    }
    if (values.message.trim().length < 10) {
      nextErrors.message = "Please enter at least 10 characters.";
    }
    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgress.current) return;

    const form = event.currentTarget;
    const honeypot = new FormData(form).get("company");
    if (honeypot) {
      setIsSubmitted(true);
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = Object.keys(nextErrors)[0];
      document
        .getElementById(`contact-${firstInvalidField === "returnDate" ? "return" : firstInvalidField}`)
        ?.focus();
      return;
    }

    if (!FORM_ACCESS_KEY) {
      setSubmitError(
        "The contact form is not configured yet. Please call or WhatsApp us while we finish setup.",
      );
      return;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: FORM_ACCESS_KEY,
          subject: `New Karpo Travel inquiry from ${values.name.trim()}`,
          from_name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          interest: values.interest,
          departure_date: values.departure,
          return_date: values.returnDate,
          travellers: values.travellers,
          message: values.message.trim(),
        }),
      });
      const result = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) {
        throw new Error(result.message || "The form service could not accept your message.");
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setSubmitError(
        "We couldn't send your message just now. Please call or WhatsApp us using the details here.",
      );
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  }

  function startAnotherMessage() {
    setValues(INITIAL_CONTACT_VALUES);
    setErrors({});
    setSubmitError("");
    setIsSubmitted(false);
  }

  function fieldError(field: keyof ContactFormValues) {
    return errors[field] ? (
      <span id={`${field}-error`} className="mt-1.5 block text-xs text-accent">
        {errors[field]}
      </span>
    ) : null;
  }

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
                  <span className="contact-icon"><MapPin aria-hidden="true" size={18} /></span>
                  <span>
                    <span className="contact-detail-label">Office</span>
                    <span className="contact-detail-value">
                      2080 North Jerusalem Road, Bellmore, NY 11710
                    </span>
                  </span>
                </div>
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
            {isSubmitted ? (
              <div
                className="contact-card flex h-full min-h-80 flex-col items-center justify-center px-6 py-10 text-center"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2 className="text-accent" size={42} aria-hidden="true" />
                <h3 className="mt-5 font-display text-3xl font-medium text-ink">
                  Thanks, we&apos;ve got your message.
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-[1.7] text-muted-foreground">
                  We&apos;ll reply within one business day.
                </p>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    className="text-sm font-semibold text-accent underline underline-offset-4 hover:text-accent-hover"
                    onClick={startAnotherMessage}
                  >
                    Send another message
                  </button>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                    className="accent-button inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-3 text-[11px] font-semibold uppercase"
                  >
                    <Phone size={15} aria-hidden="true" />
                    WhatsApp us
                  </a>
                </div>
              </div>
            ) : (
              <form className="contact-card h-full space-y-5 p-5 sm:p-7" noValidate onSubmit={handleSubmit}>
                <div className="contact-honeypot" aria-hidden="true">
                  <label htmlFor="contact-company">Leave this field empty</label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="contact-name">
                    Full name <span className="form-label-required">*</span>
                  </label>
                  <input
                    className={FIELD_CLASS}
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    required
                    value={values.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {fieldError("name")}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="form-label" htmlFor="contact-email">
                      Email <span className="form-label-required">*</span>
                    </label>
                    <input
                      className={FIELD_CLASS}
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={values.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {fieldError("email")}
                  </div>
                  <div>
                    <label className="form-label" htmlFor="contact-phone">Phone / WhatsApp</label>
                    <input
                      className={FIELD_CLASS}
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label" htmlFor="contact-interest">I&apos;m interested in</label>
                  <select
                    className={FIELD_CLASS}
                    id="contact-interest"
                    name="interest"
                    value={values.interest}
                    onChange={(event) => updateField("interest", event.target.value)}
                  >
                    <option value="">Select a service</option>
                    {INTEREST_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="form-label" htmlFor="contact-departure">Departure</label>
                    <input
                      className={`${FIELD_CLASS} contact-date`}
                      id="contact-departure"
                      name="departure"
                      type="date"
                      value={values.departure}
                      onChange={(event) => updateField("departure", event.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="contact-return">Return</label>
                    <input
                      className={`${FIELD_CLASS} contact-date`}
                      id="contact-return"
                      name="returnDate"
                      type="date"
                      value={values.returnDate}
                      onChange={(event) => updateField("returnDate", event.target.value)}
                      aria-invalid={Boolean(errors.returnDate)}
                      aria-describedby={errors.returnDate ? "returnDate-error" : undefined}
                    />
                    {fieldError("returnDate")}
                  </div>
                </div>

                <div>
                  <label className="form-label" htmlFor="contact-travellers">
                    Number of travellers
                  </label>
                  <input
                    className={FIELD_CLASS}
                    id="contact-travellers"
                    name="travellers"
                    type="number"
                    min="1"
                    inputMode="numeric"
                    value={values.travellers}
                    onChange={(event) => updateField("travellers", event.target.value)}
                    aria-invalid={Boolean(errors.travellers)}
                    aria-describedby={errors.travellers ? "travellers-error" : undefined}
                  />
                  {fieldError("travellers")}
                </div>

                <div>
                  <label className="form-label" htmlFor="contact-message">
                    Message <span className="form-label-required">*</span>
                  </label>
                  <textarea
                    className={`${FIELD_CLASS} min-h-32 resize-y`}
                    id="contact-message"
                    name="message"
                    required
                    minLength={10}
                    value={values.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {fieldError("message")}
                </div>

                <p className="sr-only" aria-live="polite">
                  {isSubmitting ? "Sending your message." : submitError}
                </p>
                {submitError && (
                  <p className="text-sm leading-relaxed text-accent" role="alert">
                    {submitError}{" "}
                    <a className="underline underline-offset-2 hover:text-accent-hover" href={PHONE_TEL}>
                      {PHONE_DISPLAY}
                    </a>{" "}
                    or{" "}
                    <a
                      className="underline underline-offset-2 hover:text-accent-hover"
                      href={WHATSAPP}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp us
                    </a>
                    .
                  </p>
                )}
                <button
                  className="accent-button inline-flex min-h-[52px] min-w-[220px] items-center justify-center gap-2 rounded-full px-8 py-3 text-[11px] font-semibold uppercase motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="animate-spin motion-reduce:animate-none" size={17} aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} aria-hidden="true" />
                      Send message
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="relative pb-[env(safe-area-inset-bottom)] text-ivory/85" style={{ backgroundColor: "var(--red-900)" }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gold" aria-hidden="true" />
      <div className="content-shell px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <img
              src={EMBLEM_SRC}
              alt="Karpo Travel emblem"
              loading="lazy"
              decoding="async"
              width={EMBLEM_WIDTH}
              height={EMBLEM_HEIGHT}
              className="footer-brand-emblem"
            />
            <div className="footer-gold-rule" aria-hidden="true" />
            <p className="mt-5 font-display text-[clamp(1.25rem,2.5vw,1.75rem)] italic leading-snug text-ivory">
              Your Journey, Our Priority.
            </p>
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-ivory/70 sm:text-[11px]">
              Established 2026 · New York
            </p>
          </div>

          <div className="footer-links">
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                Talk to us
              </h4>
              <ul className="mt-5 space-y-3 text-[15px] text-ivory/85">
                <li>
                  <a
                    href={PHONE_TEL}
                    className="transition-colors duration-300 hover:text-white"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="transition-colors duration-300 hover:text-white"
                  >
                    {EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors duration-300 hover:text-white"
                  >
                    WhatsApp
                  </a>
                </li>
                <li className="footer-address">{ADDRESS}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                Services
              </h4>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-[15px] text-ivory/85 md:grid-cols-1">
                {SERVICES.map((s) => (
                  <li key={s.title}>{s.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-ivory/15 pt-6">
          <p className="text-center text-[10px] uppercase leading-relaxed tracking-[0.18em] text-ivory/65 sm:text-[11px]">
            © 2026 Karpo Travel Inc. · New York · Your Journey, Our Priority.
          </p>
        </div>
      </div>
    </footer>
  );
}
