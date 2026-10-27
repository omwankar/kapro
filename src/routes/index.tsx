import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { CheckCircle2, LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react";

import heroImg from "@/assets/journeys/motorcycle_road_hero.jpg";
import heroVideo from "@/assets/journeys/motorcycle_road_hero.mp4";
import flightsImg from "@/assets/journeys/flights_sunset.jpg";
import santoriniImg from "@/assets/journeys/santorini.jpg";
import maldivesImg from "@/assets/journeys/maldives_resort.jpg";
import cruiseImg from "@/assets/journeys/cruise_ship.jpg";
import suvImg from "@/assets/journeys/suv_coast_road.jpg";
import visaImg from "@/assets/journeys/visa_passport.jpg";
import nycImg from "@/assets/journeys/new_york_dusk.jpg";
import alpsImg from "@/assets/journeys/swiss_alps_tall.jpg";
import emblemImg from "@/assets/karpo-emblem.webp";
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
  "contact-field min-h-11 w-full rounded-lg border border-cream/15 bg-navy-deep/60 px-4 py-3 text-sm text-cream placeholder:text-cream/40";
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
  { img: santoriniImg, title: "Santorini", line: "White villages over the Aegean", tall: true },
  { img: maldivesImg, title: "Maldives", line: "Overwater mornings", tall: false },
  { img: alpsImg, title: "Swiss Alps", line: "Rails through the high passes", tall: true },
  { img: cruiseImg, title: "The Mediterranean", line: "Sea days, done right", tall: false },
  { img: nycImg, title: "New York", line: "Where it all began", tall: true },
  { img: heroImg, title: "Mountain Roads", line: "For the riders", tall: false },
];

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
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.35em] ${
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
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-deep/90 py-3 shadow-lg shadow-navy-deep/40 backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={emblemImg}
            alt="Karpo Travel emblem"
            className="h-10 w-10 rounded-full object-contain ring-1 ring-accent/40"
          />
          <span className="leading-tight">
            <span className="block font-display text-xl font-bold tracking-[0.18em] text-cream">
              KARPO
            </span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.4em] text-accent-light">
              Travel Inc.
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium tracking-wide text-cream/85 md:flex">
          {[
            ["Services", "#services"],
            ["Journeys", "#journeys"],
            ["Our Story", "#story"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="accent-nav-link transition-colors hover:text-accent-light"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="accent-button rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] transition-all"
        >
          Plan my trip
        </a>
      </div>
    </motion.header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] overflow-hidden">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="A rider on a mountain road at golden hour"
          className={`h-full w-full object-cover transition-opacity duration-200 ease-out ${videoReady ? "opacity-0" : "opacity-100"}`}
        />
        <video
          aria-hidden="true"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={heroImg}
          src={heroVideo}
          onPlaying={() => setVideoReady(true)}
          onError={() => {
            setVideoReady(false);
            console.error("Hero video could not be played; keeping the fallback image visible.");
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ease-out ${videoReady ? "opacity-100" : "opacity-0"}`}
        />
      </motion.div>
      <div className="photo-overlay absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep/40" />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        >
          <Eyebrow light>Karpo Travel Inc. · New York</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
          className="mt-6 font-display text-[13vw] font-semibold leading-[0.95] text-cream sm:text-7xl md:text-8xl lg:text-[7.5rem]"
        >
          Your Journey,
          <span className="text-accent-light block italic">Our Priority.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: EASE }}
          className="mt-6 max-w-xl text-base text-cream/80 md:text-lg"
        >
          Generations of travel knowledge, a fresh personal touch. Flights to
          cruises, cars to visas — one call takes care of it all.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="accent-button rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] transition-all hover:scale-[1.03]"
          >
            Plan my trip
          </a>
          <a
            href="#journeys"
            className="accent-outline rounded-full border border-cream/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-cream transition-colors"
          >
            Explore journeys
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#services"
        style={{ opacity: fade }}
        className="scroll-cue absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-accent-light"
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
    <section id="services" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Eyebrow>What we do</Eyebrow>
        <h2 className="mt-4 font-display text-4xl font-semibold text-foreground md:text-6xl">
          Six ways we take <span className="italic text-accent">you there</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-cream md:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-cream/70">{s.line}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/50 text-accent-light opacity-0 transition-all duration-500 group-hover:opacity-100">
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
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-68%"]);

  return (
    <section ref={ref} id="journeys" className="relative h-[340vh] bg-navy-deep">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.3_0.07_262)_0%,transparent_60%)]" />

        <motion.div style={{ x }} className="relative flex w-max items-center gap-6 px-6 md:gap-10 md:px-16">
          {/* Intro panel */}
          <div className="w-[80vw] shrink-0 md:w-[34rem]">
            <Eyebrow light>Signature journeys</Eyebrow>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-tight text-cream md:text-7xl">
              Places we
              <span className="text-accent-gradient block italic">carry you to</span>
            </h2>
            <p className="mt-6 max-w-sm text-cream/70">
              Keep scrolling — the world moves past your window.
            </p>
            <div className="accent-rule mt-10 w-40" />
          </div>

          {JOURNEYS.map((j) => (
            <div
              key={j.title}
              className={`group relative shrink-0 overflow-hidden rounded-2xl ${
                j.tall ? "h-[62vh] w-[72vw] md:h-[74vh] md:w-[26rem]" : "h-[52vh] w-[68vw] md:h-[60vh] md:w-[24rem]"
              }`}
            >
              <img
                src={j.img}
                alt={j.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-display text-3xl font-semibold text-cream">{j.title}</h3>
                <p className="mt-1 text-sm text-accent-light">{j.line}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Progress */}
        <div className="absolute inset-x-6 bottom-8 h-px bg-cream/15 md:inset-x-16">
          <motion.div
            style={{ scaleX: scrollYProgress }}
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="story" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div ref={ref} className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-3 rounded-3xl border border-accent/40" />
            <div className="absolute -bottom-6 -right-6 h-full w-full rounded-3xl bg-navy/5" />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-navy/20">
              <motion.img
                style={{ y: imgY, scale: 1.12 }}
                src={founderImg}
                alt="Jenson Daniel, founder of Karpo Travel"
                loading="lazy"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>The founder</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-semibold text-foreground md:text-6xl">
              Jenson <span className="italic text-accent">Daniel</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
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
      </div>

      <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="bg-card">
            <div className="px-6 py-10 text-center">
              <p className="font-display text-4xl font-semibold text-navy md:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted-foreground md:text-sm">
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.img
        style={{ y: imgY, scale: 1.2 }}
        src={nycImg}
        alt="New York City at dusk"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy-deep/70" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-28 text-center md:py-36">
        <Reveal>
          <Eyebrow light>Ready when you are</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold text-cream md:text-6xl">
            Where to <span className="text-accent-gradient italic">next?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-cream/75">
            Message us any time — we answer 24/7, and the first consult is
            always personal.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="accent-button rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] transition-all hover:scale-[1.03]"
            >
              WhatsApp us
            </a>
            <a
              href={PHONE_TEL}
              className="accent-outline rounded-full border border-cream/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-cream transition-colors"
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
    <section id="contact" className="scroll-mt-24 bg-navy-deep text-cream">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow light>Get in touch</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold md:text-6xl">
            Tell us about your{" "}
            <span className="text-accent-gradient italic">trip.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-cream/70">
            Share a few details and a travel specialist will get back to you
            within one business day.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:items-start md:gap-14 lg:gap-20">
          <Reveal className="order-2 md:order-1">
            <div className="space-y-7">
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
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cream/20 px-5 py-2 text-sm font-semibold text-cream transition-colors hover:border-accent-light hover:bg-accent/10 hover:text-accent-light"
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
              >
                Message us on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal className="order-1 md:order-2">
            {isSubmitted ? (
              <div
                className="contact-card flex min-h-80 flex-col items-center justify-center px-6 py-10 text-center"
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
              <form className="contact-card space-y-5 p-5 sm:p-7" noValidate onSubmit={handleSubmit}>
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
                  className="accent-button inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="animate-spin" size={17} aria-hidden="true" />
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
    <footer className="bg-navy-deep text-cream">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={emblemImg}
                alt="Karpo Travel emblem"
                className="h-12 w-12 object-contain"
              />
              <span className="leading-tight">
                <span className="block font-display text-2xl font-bold tracking-[0.18em]">
                  KARPO
                </span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.4em] text-accent-light">
                  Travel Inc.
                </span>
              </span>
            </div>
            <p className="mt-5 font-display text-lg italic text-cream/80">
              Your Journey, Our Priority.
            </p>
            <p className="mt-2 text-sm text-cream/50">
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
                  href="#contact"
                  className="transition-colors hover:text-accent-light"
                >
                  Call or WhatsApp 24/7 — {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-accent-light">
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
        <p className="mt-6 text-center text-xs tracking-[0.2em] text-cream/40">
          © 2026 KARPO TRAVEL INC. · NEW YORK · YOUR JOURNEY, OUR PRIORITY.
        </p>
      </div>
    </footer>
  );
}
