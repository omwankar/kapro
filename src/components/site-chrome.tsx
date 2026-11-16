import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  FileCheck,
  Hotel,
  Mail,
  Palmtree,
  Plane,
  Ship,
  type LucideIcon,
} from "lucide-react";

import ctaWhereNextImg from "@/assets/journeys/cta_where_next.jpg";
import { JOURNEYS, destinationPath, journeySlug } from "@/data/journeys";
import { SERVICES_NAV, type ServiceSlug } from "@/data/services";

export const EMBLEM_SRC = "/images/karpo-emblem-only.png";
export const EMBLEM_WIDTH = 256;
export const EMBLEM_HEIGHT = 417;

export const WHATSAPP = "https://wa.me/15169690000";
export const PHONE_DISPLAY = "+1 (516) 969-0000";
export const PHONE_TEL = "tel:+15169690000";
export const EMAIL = "info@karpotravel.com";
export const EMAIL_SUBJECT = "Trip inquiry — Karpo Travel Inc.";
export const EMAIL_BODY = `Hello Karpo Travel Inc.,

I would like help planning a trip.

Destination:
Travel dates:
Number of travelers:

Thank you.`;
export const EMAIL_MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`;
export const EMAIL_GMAIL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`;
export const ADDRESS = "Long Island, New York, USA";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const SERVICES = SERVICES_NAV;

export function Reveal({
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

export function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
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

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  if (reduceMotion) return null;
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setServicesOpen(false);
        setDestinationsOpen(false);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    setServicesOpen(false);
    setDestinationsOpen(false);
  }, [pathname]);

  const solid = scrolled || menuOpen || !pathnameIsHero(pathname);
  const homeHref = pathname === "/" ? "#top" : "/";
  const onServicePage = pathname.startsWith("/services");
  const onDestinationsPage = pathname.startsWith("/destinations");
  const aboutActive = pathname === "/about";
  const contactActive = pathname === "/contact";

  return (
    <header
      className={`site-header intro-header ${solid ? "is-scrolled border-b border-border bg-[rgba(252,247,245,0.92)] shadow-none backdrop-blur-[14px]" : "border-b border-transparent bg-transparent"}`}
    >
      <div className="content-shell site-header-bar flex items-center justify-between gap-3 px-4 sm:px-6 md:px-8">
        <a href={homeHref} className="site-brand" onClick={() => setMenuOpen(false)}>
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
          aria-label="Primary"
          className={`hidden items-center gap-8 font-medium md:flex ${
            solid ? "text-ink" : "text-[#FBF3EE]/90"
          }`}
        >
          <div
            className="nav-services"
            onMouseEnter={() => {
              setServicesOpen(true);
              setDestinationsOpen(false);
            }}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              to="/services"
              className="accent-nav-link inline-flex items-center gap-1.5"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              aria-current={onServicePage ? "page" : undefined}
              onFocus={() => {
                setServicesOpen(true);
                setDestinationsOpen(false);
              }}
            >
              Services
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Link>
            <div className={`nav-services-panel ${servicesOpen ? "is-open" : ""}`}>
              <ul>
                {SERVICES.map((s) => {
                  const active = pathname === s.href;
                  return (
                    <li key={s.slug}>
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="nav-services-link"
                        aria-current={active ? "page" : undefined}
                        onClick={() => setServicesOpen(false)}
                      >
                        <span className="nav-services-link-title">{s.title}</span>
                        <span className="nav-services-link-line">{s.line}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div
            className="nav-services nav-destinations"
            onMouseEnter={() => {
              setDestinationsOpen(true);
              setServicesOpen(false);
            }}
            onMouseLeave={() => setDestinationsOpen(false)}
          >
            <a
              href="/destinations"
              className="accent-nav-link inline-flex items-center gap-1.5"
              aria-expanded={destinationsOpen}
              aria-haspopup="true"
              aria-current={onDestinationsPage ? "page" : undefined}
              onFocus={() => {
                setDestinationsOpen(true);
                setServicesOpen(false);
              }}
            >
              Destinations
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
            <div className={`nav-services-panel nav-destinations-panel ${destinationsOpen ? "is-open" : ""}`}>
              <ul>
                {JOURNEYS.map((journey) => {
                  const href = destinationPath(journey);
                  const active = pathname === href;
                  return (
                    <li key={journey.code}>
                      <a
                        href={href}
                        className="nav-services-link"
                        aria-current={active ? "page" : undefined}
                      >
                        <span className="nav-services-link-title">{journey.name}</span>
                        <span className="nav-services-link-line">{journey.place}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <a href="/destinations" className="nav-services-link nav-destinations-all">
                <span className="nav-services-link-title">All destinations</span>
                <span className="nav-services-link-line">Every journey we feature</span>
              </a>
            </div>
          </div>
          <Link
            to="/about"
            className="accent-nav-link"
            aria-current={aboutActive ? "page" : undefined}
          >
            Our Story
          </Link>
          <Link
            to="/contact"
            className="accent-nav-link"
            aria-current={contactActive ? "page" : undefined}
          >
            Contact
          </Link>
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
              solid ? "border-border text-ink" : "border-[#FBF3EE]/35 text-[#FBF3EE]"
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
          aria-label="Mobile"
          className="border-t border-border bg-[rgba(252,247,245,0.96)] px-4 py-4 backdrop-blur-md md:hidden"
        >
          <ul className="flex flex-col gap-1">
            <li>
              <button
                type="button"
                className="accent-nav-link flex min-h-11 w-full items-center justify-between rounded-lg px-3 font-medium text-ink"
                aria-expanded={servicesOpen}
                onClick={() => {
                  setServicesOpen((open) => !open);
                  setDestinationsOpen(false);
                }}
              >
                Services
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={servicesOpen ? "rotate-180" : ""}>
                  <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {servicesOpen ? (
                <ul className="mb-2 ml-2 border-l border-border pl-3">
                  <li>
                    <Link
                      to="/services"
                      className="flex min-h-10 items-center rounded-lg px-3 text-[14px] font-medium text-ink"
                      aria-current={pathname === "/services" ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      All services
                    </Link>
                  </li>
                  {SERVICES.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="flex min-h-10 items-center rounded-lg px-3 text-[14px] font-medium text-ink"
                        aria-current={pathname === s.href ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
            <li>
              <button
                type="button"
                className="accent-nav-link flex min-h-11 w-full items-center justify-between rounded-lg px-3 font-medium text-ink"
                aria-expanded={destinationsOpen}
                onClick={() => {
                  setDestinationsOpen((open) => !open);
                  setServicesOpen(false);
                }}
              >
                Destinations
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={destinationsOpen ? "rotate-180" : ""}>
                  <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {destinationsOpen ? (
                <ul className="mb-2 ml-2 border-l border-border pl-3">
                  <li>
                    <a
                      href="/destinations"
                      className="flex min-h-10 items-center rounded-lg px-3 text-[14px] font-medium text-ink"
                      aria-current={pathname === "/destinations" ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      All destinations
                    </a>
                  </li>
                  {JOURNEYS.map((journey) => {
                    const href = destinationPath(journey);
                    return (
                      <li key={journey.code}>
                        <a
                          href={href}
                          className="flex min-h-10 items-center rounded-lg px-3 text-[14px] font-medium text-ink"
                          aria-current={pathname === href ? "page" : undefined}
                          onClick={() => setMenuOpen(false)}
                        >
                          {journey.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
            <li>
              <Link
                to="/about"
                className="accent-nav-link flex min-h-11 items-center rounded-lg px-3 font-medium text-ink"
                aria-current={aboutActive ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                Our Story
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="accent-nav-link flex min-h-11 items-center rounded-lg px-3 font-medium text-ink"
                aria-current={contactActive ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

function pathnameIsHero(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname.startsWith("/services/") ||
    pathname.startsWith("/destinations/")
  );
}

export function CtaBand() {
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
        src={ctaWhereNextImg}
        alt="Colorful cliffside town and harbor on the Amalfi Coast"
        loading="lazy"
        decoding="async"
        width={2000}
        height={1333}
        className="absolute inset-0 h-full w-full object-cover object-center"
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
          backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 30%)",
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
            Message us any time — we answer 24/7, and the first consult is always personal.
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

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="relative pb-[env(safe-area-inset-bottom)] text-ivory/85"
      style={{ backgroundColor: "var(--red-900)" }}
    >
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
              Established 2026 · Long Island, New York
            </p>
          </div>

          <div className="footer-links">
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                Talk to us
              </h4>
              <ul className="mt-5 space-y-3 text-[15px] text-ivory/85">
                <li>
                  <a href={PHONE_TEL} className="transition-colors duration-300 hover:text-white">
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
                <li className="footer-address text-ivory/85">{ADDRESS}</li>
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
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                Services
              </h4>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-[15px] text-ivory/85 md:grid-cols-1">
                {SERVICES.map((s) => {
                  const href = s.href;
                  return (
                  <li key={s.slug}>
                    <a
                      href={href}
                      className="transition-colors duration-300 hover:text-white"
                    >
                      {s.title}
                    </a>
                  </li>
                  );
                })}
                <li>
                  <a
                    href="/services"
                    className="transition-colors duration-300 hover:text-white"
                  >
                    All services
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                Destinations
              </h4>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-[15px] text-ivory/85">
                {JOURNEYS.map((journey) => (
                  <li key={journey.code}>
                    <a
                      href={`/destinations/${journeySlug(journey)}`}
                      className="transition-colors duration-300 hover:text-white"
                    >
                      {journey.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/destinations"
                    className="transition-colors duration-300 hover:text-white"
                  >
                    All destinations
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-ivory/15 pt-6">
          <p className="text-center text-[10px] uppercase leading-relaxed tracking-[0.18em] text-ivory/65 sm:text-[11px]">
            © 2026 Karpo Travel Inc. · Your Journey, Our Priority.
          </p>
        </div>
      </div>
    </footer>
  );
}

const FAB_SERVICE_ICONS: Partial<Record<ServiceSlug, LucideIcon>> = {
  flights: Plane,
  hotels: Hotel,
  vacations: Palmtree,
  cruises: Ship,
  "visa-assistance": FileCheck,
};

const FAB_SERVICES = SERVICES_NAV.filter((service) => service.slug !== "cars");

export function WhatsAppFab() {
  return (
    <div className="site-fab">
      <div className="site-fab-window">
        <p className="site-fab-kicker">Services</p>
        <ul className="site-fab-services">
          {FAB_SERVICES.map((service) => {
            const Icon = FAB_SERVICE_ICONS[service.slug];
            return (
              <li key={service.slug}>
                <a
                  href={service.href}
                  className="site-fab-service"
                  aria-label={`${service.title} — ${service.line}`}
                >
                  <span className="site-fab-service-icon" aria-hidden="true">
                    {Icon ? <Icon strokeWidth={1.75} /> : null}
                  </span>
                  <span className="site-fab-service-label">{service.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="site-fab-rule" aria-hidden="true" />
        <div className="site-fab-contact">
          <a
            href={EMAIL_MAILTO}
            className="email-fab"
            aria-label="Email Karpo Travel Inc. at info@karpotravel.com"
            title="Email us"
            onClick={(event) => {
              const usePhoneMailApp =
                window.matchMedia("(max-width: 767.98px)").matches ||
                window.matchMedia("(pointer: coarse)").matches;
              if (usePhoneMailApp) return;
              event.preventDefault();
              window.open(EMAIL_GMAIL, "_blank", "noopener,noreferrer");
            }}
          >
            <Mail strokeWidth={1.8} aria-hidden="true" />
          </a>
          <a
            href={WHATSAPP}
            className="whatsapp-fab"
            target="_blank"
            rel="noreferrer"
            aria-label="Chat with Karpo Travel Inc. on WhatsApp"
            title="WhatsApp us"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
