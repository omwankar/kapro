import { useEffect, useRef, useState } from "react";
import { Plane } from "lucide-react";

import { Eyebrow } from "@/components/site-chrome";
import { JOURNEY_COUNT, JOURNEYS, type Journey } from "@/data/journeys";

const ROW1 = JOURNEYS.slice(0, 10);
const ROW2 = JOURNEYS.slice(6, 16);

type JourneyCardProps = {
  journey: Journey;
  eager: boolean;
  interactive: boolean;
};

function JourneyCard({ journey, eager, interactive }: JourneyCardProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const href = `/contact?service=vacations&destination=${encodeURIComponent(journey.query)}`;
  const alt = `${journey.name}, ${journey.place}`;

  function activate() {
    linkRef.current?.click();
  }

  return (
    <article
      className="journey-card"
      tabIndex={interactive ? 0 : -1}
      aria-hidden={interactive ? undefined : true}
      onClick={(event) => {
        if (!interactive) return;
        if ((event.target as HTMLElement).closest("a")) return;
        activate();
      }}
      onKeyDown={(event) => {
        if (!interactive) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      }}
    >
      <img
        src={journey.image}
        alt={interactive ? alt : ""}
        width={280}
        height={380}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        sizes="(max-width: 767px) 220px, 280px"
        className="journey-card-img"
        draggable={false}
      />
      <div className="journey-card-overlay" aria-hidden="true" />

      <span className="journey-card-tag">
        <Plane size={11} strokeWidth={2} aria-hidden="true" />
        {journey.code}
      </span>
      <span className="journey-card-stamp" aria-hidden="true">
        {journey.initials}
      </span>

      <div className="journey-card-copy">
        <h3 className="journey-card-name font-display">{journey.name}</h3>
        <p className="journey-card-line">{journey.tagline}</p>
      </div>

      <a
        ref={linkRef}
        href={href}
        className="journey-card-cta"
        tabIndex={interactive ? 0 : -1}
        aria-hidden={interactive ? undefined : true}
        onClick={(event) => event.stopPropagation()}
      >
        Plan this trip
        <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}

type MarqueeRowProps = {
  items: Journey[];
  row: 1 | 2;
};

function MarqueeRow({ items, row }: MarqueeRowProps) {
  return (
    <div className={`journey-marquee-row journey-marquee-row--${row}`}>
      <div className="journey-marquee-track">
        <div className="journey-marquee-set">
          {items.map((journey, index) => (
            <JourneyCard
              key={`${row}-a-${journey.code}`}
              journey={journey}
              eager={index < 4}
              interactive
            />
          ))}
        </div>
        <div className="journey-marquee-set" aria-hidden="true">
          {items.map((journey) => (
            <JourneyCard
              key={`${row}-b-${journey.code}`}
              journey={journey}
              eager={false}
              interactive={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function JourneyMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offscreen, setOffscreen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!(entry?.isIntersecting ?? true)),
      { rootMargin: "80px 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journeys"
      className={[
        "journey-marquee scroll-mt-24 border-b border-border",
        offscreen ? "is-paused" : "",
        reduceMotion ? "is-reduced" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="journey-marquee-shell">
        <div className="journey-marquee-header">
          <div>
            <Eyebrow>Signature journeys</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.08] text-ink">
              Places we <span className="italic text-red-500">carry you to</span>
            </h2>
          </div>
          <p className="journey-marquee-count">{JOURNEY_COUNT} destinations</p>
        </div>

        <div className="journey-flight-path" aria-hidden="true">
          <svg
            className="journey-flight-svg"
            viewBox="0 0 1200 60"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C200,10 400,55 600,28 C800,2 1000,48 1200,22"
              stroke="rgba(179,147,98,0.6)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
            />
          </svg>
          <span className="journey-flight-plane">
            <Plane size={18} strokeWidth={1.8} />
          </span>
        </div>
      </div>

      <div className="journey-marquee-rows">
        <MarqueeRow items={ROW1} row={1} />
        <MarqueeRow items={ROW2} row={2} />
      </div>
    </section>
  );
}
