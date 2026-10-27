import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { CheckCircle2, LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react";

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
import emblemImg from "@/assets/karpo-emblem.webp";
import logoImg from "@/assets/karpo-logo.webp";
import founderImg from "@/assets/jenson-daniel.webp";

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
  "contact-field min-h-11 w-full rounded-lg border border-cream/20 bg-cream/8 px-4 py-3 text-sm text-cream placeholder:text-cream/45";
const LABEL_CLASS =
  "mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-light";

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

const STATS = [
  { value: "60+", label: "years of family legacy in travel" },
  { value: "2023", label: "first personalized journeys" },
  { value: "2026", label: "established in New York" },
  { value: "24/7", label: "call or WhatsApp support" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  delay = 0,
  y = 28,
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
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-[11px] sm:tracking-[0.35em] ${
        light ? "text-accent-light" : "text-accent"
      }`}
    >
      {children}
    </p>
  );
}

function Index() {
  return (
    <main className="bg-background font-sans">
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
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-500 motion-reduce:transition-none ${
        solid
          ? "bg-navy-deep/80 py-3 shadow-lg shadow-navy-deep/25 backdrop-blur-sm"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-5 md:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-2 sm:gap-3" onClick={() => setMenuOpen(false)}>
          <img
            src={emblemImg}
            alt="Karpo Travel emblem"
            width={40}
            height={40}
            decoding="async"
            className="h-10 w-10 shrink-0 rounded-full bg-cream object-cover ring-1 ring-accent/40 sm:h-11 sm:w-11"
          />
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-[0.16em] text-cream sm:text-xl sm:tracking-[0.18em]">
              KARPO
            </span>
            <span className="block text-[8px] font-semibold uppercase tracking-[0.32em] text-accent-light sm:text-[9px] sm:tracking-[0.4em]">
              Travel Inc.
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium tracking-wide text-cream/85 md:flex">
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="accent-nav-link transition-colors hover:text-accent-light"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="accent-button rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-all motion-reduce:transition-none sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.18em]"
          >
            Plan my trip
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream md:hidden"
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
          className="border-t border-cream/10 bg-navy-deep px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="accent-nav-link flex min-h-11 items-center rounded-lg px-3 text-sm font-medium tracking-wide text-cream/90"
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
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/28 via-transparent to-navy-deep/22" />

      <motion.div
        style={reduceMotion ? undefined : { y: textY, opacity: fade }}
        className="hero-text-scrim relative z-10 flex h-full flex-col items-center justify-center px-4 pb-16 pt-24 text-center sm:px-5 sm:pt-28"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.9, delay: 0.5, ease: EASE }}
        >
          <Eyebrow light>Karpo Travel Inc. · New York</Eyebrow>
        </motion.div>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 1, delay: 0.7, ease: EASE }}
          className="mt-4 max-w-[16ch] font-display text-[clamp(2.6rem,12vw,4.5rem)] font-semibold leading-[0.95] text-cream sm:mt-6 sm:text-7xl md:text-8xl lg:text-[7.5rem]"
        >
          Your Journey,
          <span className="text-accent-light block italic">Our Priority.</span>
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.9, delay: 1, ease: EASE }}
          className="mt-5 max-w-xl text-sm leading-relaxed text-cream/80 sm:mt-6 sm:text-base md:text-lg"
        >
          Generations of travel knowledge, a fresh personal touch. Flights to
          cruises, cars to visas — one call takes care of it all.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.9, delay: 1.2, ease: EASE }}
          className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
        >
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="accent-button rounded-full px-6 py-3.5 text-center text-xs font-bold uppercase tracking-[0.16em] transition-all hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.2em]"
          >
            Plan my trip
          </a>
          <a
            href={PHONE_TEL}
            className="accent-outline rounded-full border border-cream/40 px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-cream transition-colors motion-reduce:transition-none sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.2em]"
          >
            Call us 24/7
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#services"
        style={reduceMotion ? undefined : { opacity: fade }}
        className="scroll-cue absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-accent-light sm:bottom-8"
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
    <div className="overflow-hidden border-y border-accent/30 bg-navy py-4">
      <div className="marquee-track">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="whitespace-nowrap font-display text-lg font-semibold tracking-[0.3em] text-accent-light md:text-xl"
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
    <section id="services" className="defer-paint mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-5 sm:py-24 md:px-8 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Eyebrow>What we do</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-6xl">
          Six ways we take <span className="italic text-accent">you there</span>
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.12}>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden rounded-2xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-navy-deep/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-6">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-cream md:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-cream/70">{s.line}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/50 text-accent-light opacity-100 transition-all duration-500 md:opacity-0 md:group-hover:opacity-100 motion-reduce:opacity-100 motion-reduce:transition-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </a>
          </Reveal>
        ))}
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
      <Eyebrow light>Signature journeys</Eyebrow>
      <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl md:text-7xl">
        Places we
        <span className="text-accent-gradient block italic">carry you to</span>
      </h2>
      <p className="mt-5 max-w-sm text-sm text-cream/70 md:mt-6 md:text-base">
        {pinScroll ? "Keep scrolling — the world moves past your window." : "Swipe to see the world move past your window."}
      </p>
      <div className="accent-rule mt-8 w-40 md:mt-10" />
    </>
  );

  return (
    <section ref={ref} id="journeys" className="relative scroll-mt-24 bg-navy-deep md:h-[340vh]">
      <div className="flex flex-col justify-center py-16 md:sticky md:top-0 md:h-screen md:overflow-hidden md:py-0">
        <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_at_top,oklch(0.3_0.07_262)_0%,transparent_60%)] md:block" />

        <div className="relative z-10 px-4 pb-8 sm:px-6 md:hidden">{intro}</div>

        <div className="journey-rail-scroll overflow-x-auto overscroll-x-contain px-0 snap-x snap-mandatory md:overflow-visible md:snap-none">
          <motion.div
            style={pinScroll && !reduceMotion ? { x } : undefined}
            className="relative flex w-max items-center gap-4 px-4 sm:gap-6 sm:px-6 md:gap-10 md:px-16"
          >
            <div className="hidden w-[34rem] shrink-0 md:block">{intro}</div>

            {JOURNEYS.map((j) => (
              <div
                key={j.title}
                className={`group relative shrink-0 snap-center overflow-hidden rounded-2xl md:snap-align-none ${
                  j.tall
                    ? "h-[52vh] w-[min(82vw,20rem)] sm:h-[62vh] md:h-[74vh] md:w-[26rem]"
                    : "h-[46vh] w-[min(78vw,19rem)] sm:h-[52vh] md:h-[60vh] md:w-[24rem]"
                }`}
              >
                <img
                  src={j.img}
                  alt={j.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/65 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 sm:p-6">
                  <h3 className="font-display text-2xl font-semibold text-cream sm:text-3xl">{j.title}</h3>
                  <p className="mt-1 text-sm text-accent-light">{j.line}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute inset-x-6 bottom-8 hidden h-px bg-cream/15 md:block md:inset-x-16">
          <motion.div
            style={pinScroll && !reduceMotion ? { scaleX: scrollYProgress } : undefined}
            className="h-full origin-left bg-accent"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Founder ---------------- */

function Founder() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="story" className="defer-paint mx-auto max-w-7xl scroll-mt-24 overflow-x-clip px-4 py-16 sm:px-5 sm:py-24 md:px-8 md:py-32">
      <div ref={ref} className="grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>The founder</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-6xl">
              Jenson <span className="italic text-accent">Daniel</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:mt-8 sm:space-y-5 md:text-lg">
              <p>
                A passionate traveler and adventurer, Jenson grew up around a
                family legacy of over 60 years in the global travel industry —
                with an international presence and millions of satisfied
                customers.
              </p>
              <p>
                Driven by new destinations, motorcycle adventures, hiking,
                diverse cultures and authentic cuisines, he began helping
                travelers with personalized solutions in 2023. Trust, referrals
                and growing demand turned that passion into Karpo Travel,
                officially established in New York in 2026.
              </p>
              <p className="font-display text-2xl italic text-foreground">
                “Your journey, our priority.”
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="relative mx-auto max-w-md lg:ml-auto lg:mr-0">
            <div className="absolute -inset-2 rounded-3xl border border-accent/40 sm:-inset-3" />
            <div className="absolute -bottom-4 -left-4 h-full w-full rounded-3xl bg-navy/5 sm:-bottom-6 sm:-left-6" />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-navy/20">
              <motion.img
                style={reduceMotion ? undefined : { y: imgY, scale: 1.04 }}
                src={founderImg}
                alt="Jenson Daniel, founder of Karpo Travel"
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:mt-20 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="bg-card">
            <div className="px-3 py-7 text-center sm:px-6 sm:py-10">
              <p className="font-display text-3xl font-semibold text-navy sm:text-4xl md:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-[10px] uppercase leading-snug tracking-[0.08em] text-muted-foreground sm:text-xs sm:tracking-[0.15em] md:text-sm">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
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
      <div className="absolute inset-0 bg-navy-deep/45" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-5 sm:py-28 md:py-36">
        <Reveal>
          <Eyebrow light>Ready when you are</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-semibold text-cream sm:text-4xl md:text-6xl">
            Where to <span className="text-accent-gradient italic">next?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm text-cream/75 sm:text-base">
            Message us any time — we answer 24/7, and the first consult is
            always personal.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="accent-button rounded-full px-6 py-3.5 text-center text-xs font-bold uppercase tracking-[0.16em] transition-all hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.2em]"
            >
              WhatsApp us
            </a>
            <a
              href={PHONE_TEL}
              className="accent-outline rounded-full border border-cream/40 px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.12em] text-cream transition-colors sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.2em]"
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
      <span id={`${field}-error`} className="mt-1.5 block text-xs text-accent-light">
        {errors[field]}
      </span>
    ) : null;
  }

  return (
    <section id="contact" className="defer-paint scroll-mt-24 bg-navy-deep text-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16 md:px-8 md:py-20">
        <div className="grid gap-6 md:grid-cols-[minmax(16rem,0.88fr)_minmax(0,1.12fr)] md:items-stretch md:gap-8">
          <Reveal className="order-2 md:order-1">
            <div className="flex h-full flex-col rounded-2xl border border-cream/10 bg-navy/35 p-6 sm:p-8">
              <div className="brand-plate mx-auto w-full max-w-[160px] sm:max-w-[176px]">
                <img
                  src={logoImg}
                  alt="Karpo Travel Inc. emblem"
                  width={1024}
                  height={1536}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="mt-8 text-center md:text-left">
                <Eyebrow light>Get in touch</Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
                  Tell us about your{" "}
                  <span className="text-accent-gradient italic">trip.</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-cream/70 sm:text-base">
                  Share a few details and a travel specialist will get back to you
                  within one business day.
                </p>
              </div>
              <div className="mt-8 space-y-5 md:mt-auto md:pt-10">
                <a className="contact-detail" href={PHONE_TEL}>
                  <span className="contact-icon"><Phone aria-hidden="true" size={18} /></span>
                  <span>
                    <span className="contact-detail-label">Call or WhatsApp 24/7</span>
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
                    <span className="contact-detail-label">Visit us</span>
                    <span className="contact-detail-value">
                      2080 North Jerusalem Road
                      <br />
                      Bellmore, New York 11710
                    </span>
                  </span>
                </div>
                <a
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cream/20 px-5 py-2 text-sm font-semibold text-cream transition-colors hover:border-accent-light hover:bg-accent/10 hover:text-accent-light"
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
                <CheckCircle2 className="text-accent-light" size={42} aria-hidden="true" />
                <h3 className="mt-5 font-display text-3xl font-semibold">
                  Thanks, we&apos;ve got your message.
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/70">
                  We&apos;ll reply within one business day.
                </p>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    className="text-sm font-semibold text-accent-light underline underline-offset-4"
                    onClick={startAnotherMessage}
                  >
                    Send another message
                  </button>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                    className="accent-button inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.15em]"
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
                  <label className={LABEL_CLASS} htmlFor="contact-name">Full name *</label>
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
                    <label className={LABEL_CLASS} htmlFor="contact-email">Email *</label>
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
                    <label className={LABEL_CLASS} htmlFor="contact-phone">Phone / WhatsApp</label>
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
                  <label className={LABEL_CLASS} htmlFor="contact-interest">I&apos;m interested in</label>
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
                    <label className={LABEL_CLASS} htmlFor="contact-departure">Departure</label>
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
                    <label className={LABEL_CLASS} htmlFor="contact-return">Return</label>
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
                  <label className={LABEL_CLASS} htmlFor="contact-travellers">
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
                  <label className={LABEL_CLASS} htmlFor="contact-message">Message *</label>
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
                  <p className="text-sm leading-relaxed text-accent-light" role="alert">
                    {submitError}{" "}
                    <a className="underline underline-offset-2" href={PHONE_TEL}>
                      {PHONE_DISPLAY}
                    </a>{" "}
                    or{" "}
                    <a
                      className="underline underline-offset-2"
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
                  className="accent-button inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:scale-[1.01] motion-reduce:transition-none motion-reduce:hover:scale-100 disabled:cursor-not-allowed disabled:opacity-60"
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
    <footer className="bg-navy-deep pb-[env(safe-area-inset-bottom)] text-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-20 md:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="brand-plate w-full max-w-[180px]">
              <img
                src={logoImg}
                alt="Karpo Travel Inc. emblem"
                loading="lazy"
                decoding="async"
                width={1024}
                height={1536}
                className="h-auto w-full object-contain"
              />
            </div>
            <p className="mt-5 text-sm text-cream/50">
              Established 2026 · New York
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
              Talk to us
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-cream/80">
              <li>
                <a
                  href={PHONE_TEL}
                  className="transition-colors hover:text-accent-light"
                >
                  Call or WhatsApp 24/7 — {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-accent-light">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-accent-light">
              Services
            </h4>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-cream/80">
              {SERVICES.map((s) => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="accent-rule mt-14" />
        <p className="mt-6 text-center text-[10px] leading-relaxed tracking-[0.12em] text-cream/40 sm:text-xs sm:tracking-[0.2em]">
          © 2026 KARPO TRAVEL INC. · NEW YORK · YOUR JOURNEY, OUR PRIORITY.
        </p>
      </div>
    </footer>
  );
}
