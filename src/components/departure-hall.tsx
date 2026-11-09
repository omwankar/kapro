import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type CSSProperties,
} from "react";
import { ArrowRight, Plane } from "lucide-react";

import {
  JOURNEY_MOODS,
  JOURNEYS,
  contactHrefForJourney,
  journeySlug,
  journeysForMood,
  moodContaining,
  type Journey,
  type JourneyMood,
} from "@/data/journeys";

const AUTOPLAY_MS = 6000;
const HOVER_INTENT_MS = 120;
const MOOD_MAX = 7;

function LetterRise({ text, active, reduceMotion }: { text: string; active: boolean; reduceMotion: boolean }) {
  if (reduceMotion || !active) {
    return <span className="departure-letter-rise is-ready">{text}</span>;
  }
  return (
    <span className="departure-letter-rise is-active" aria-hidden="true">
      {text.split("").map((ch, i) => (
        <span key={`${ch}-${i}`} style={{ animationDelay: `${250 + i * 28}ms` }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

function BoardingPass({ journey }: { journey: Journey }) {
  const href = contactHrefForJourney(journey);
  return (
    <div className="departure-pass">
      <p className="departure-pass-eyebrow">Boarding pass — Karpo Travel</p>
      <p className="departure-pass-route font-display">
        JFK <ArrowRight size={18} aria-hidden="true" /> {journey.code}
      </p>
      <div className="departure-pass-cities">
        <span>New York</span>
        <span>{journey.name}</span>
      </div>
      <p className="departure-pass-passenger">Passenger: You</p>
      <div className="departure-pass-dash" aria-hidden="true" />
      <div className="departure-pass-barcode" aria-hidden="true" />
      <a className="departure-pass-cta" href={href}>
        Plan this trip
        <ArrowRight size={14} aria-hidden="true" />
      </a>
      <a className="departure-dest-link" href={`/destinations/${journeySlug(journey)}`}>
        About {journey.name}
      </a>
    </div>
  );
}

export function DepartureHall() {
  const baseId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<number | null>(null);
  const stripsRef = useRef<HTMLDivElement>(null);

  const [mood, setMood] = useState<JourneyMood>("Featured");
  const [activeCode, setActiveCode] = useState(() => journeysForMood("Featured", MOOD_MAX)[0]?.code ?? "HND");
  const [offscreen, setOffscreen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [announce, setAnnounce] = useState("");

  const visible = useMemo(() => journeysForMood(mood, MOOD_MAX), [mood]);
  const active = visible.find((j) => j.code === activeCode) ?? visible[0];
  const activeIndex = Math.max(
    0,
    visible.findIndex((j) => j.code === active?.code),
  );

  const clearHoverTimer = () => {
    if (hoverTimer.current) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  const openJourney = useCallback((journey: Journey) => {
    setActiveCode(journey.code);
    setAnnounce(`${journey.name}, ${journey.place}. ${journey.tagline}.`);
  }, []);

  const setMoodAndOpen = useCallback((next: JourneyMood) => {
    setMood(next);
    const list = journeysForMood(next, MOOD_MAX);
    if (list[0]) {
      setActiveCode(list[0].code);
      setAnnounce(`${list[0].name}, ${list[0].place}. ${list[0].tagline}.`);
    }
  }, []);

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
      { rootMargin: "40px 0px", threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    if (!visible.some((j) => j.code === active.code) && visible[0]) {
      setActiveCode(visible[0].code);
    }
  }, [visible, active]);

  const autoplayBlocked = reduceMotion || offscreen;

  useEffect(() => {
    if (autoplayBlocked || visible.length < 2) return;
    const started = performance.now();
    let frame = 0;
    const bar = () =>
      stripsRef.current?.querySelector<HTMLElement>(".departure-panel.is-active .departure-panel-progress-bar");
    const tick = (now: number) => {
      const elapsed = now - started;
      const progress = Math.min(1, elapsed / AUTOPLAY_MS);
      const node = bar();
      if (node) node.style.transform = `scaleX(${progress})`;
      if (elapsed >= AUTOPLAY_MS) {
        const next = visible[(activeIndex + 1) % visible.length];
        if (next) openJourney(next);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    const node = bar();
    if (node) node.style.transform = "scaleX(0)";
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoplayBlocked, visible, activeIndex, openJourney]);

  useEffect(() => () => clearHoverTimer(), []);

  function onPanelPointerEnter(journey: Journey) {
    clearHoverTimer();
    hoverTimer.current = window.setTimeout(() => {
      openJourney(journey);
    }, HOVER_INTENT_MS);
  }

  function onPanelKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = visible[(index + 1) % visible.length];
      if (next) {
        openJourney(next);
        document.getElementById(`${baseId}-panel-${next.code}`)?.focus();
      }
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const prev = visible[(index - 1 + visible.length) % visible.length];
      if (prev) {
        openJourney(prev);
        document.getElementById(`${baseId}-panel-${prev.code}`)?.focus();
      }
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openJourney(visible[index]!);
    }
  }

  function onTickerSelect(journey: Journey) {
    if (visible.some((j) => j.code === journey.code)) {
      openJourney(journey);
      return;
    }
    const nextMood = moodContaining(journey.code);
    setMood(nextMood);
    setActiveCode(journey.code);
    setAnnounce(`${journey.name}, ${journey.place}. ${journey.tagline}.`);
  }

  if (!active) return null;

  const stageStyle = {
    "--destination-accent": active.accent,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="journeys"
      className="departure-hall scroll-mt-24"
      aria-labelledby={`${baseId}-heading`}
    >
      <div
        className={`departure-hall-stage${reduceMotion ? " is-reduced" : ""}`}
        style={stageStyle}
      >
        <div className="departure-hall-header">
          <div>
            <p className="departure-eyebrow">
              <span className="departure-eyebrow-mark" aria-hidden="true" />
              Signature journeys
            </p>
            <h2 id={`${baseId}-heading`} className="departure-heading font-display">
              Places we <span className="italic">carry you to</span>
            </h2>
            <a className="departure-dest-link" href="/destinations">
              All destinations
            </a>
          </div>

          <div className="departure-hall-controls">
            <div className="departure-moods" role="tablist" aria-label="Journey moods">
              {JOURNEY_MOODS.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={mood === item}
                  className={`departure-mood${mood === item ? " is-selected" : ""}`}
                  onClick={() => setMoodAndOpen(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={stripsRef}
          key={mood}
          className="departure-strips"
          aria-label="Destination panels"
        >
          {visible.map((journey, index) => {
            const isActive = journey.code === active.code;
            const panelId = `${baseId}-panel-${journey.code}`;
            const regionId = `${baseId}-region-${journey.code}`;
            const href = contactHrefForJourney(journey);
            return (
              <div
                key={journey.code}
                className={`departure-panel${isActive ? " is-active" : ""}`}
              >
                <button
                  id={panelId}
                  type="button"
                  className="departure-panel-hit"
                  aria-expanded={isActive}
                  aria-controls={regionId}
                  onMouseEnter={() => onPanelPointerEnter(journey)}
                  onMouseLeave={clearHoverTimer}
                  onFocus={() => openJourney(journey)}
                  onClick={() => openJourney(journey)}
                  onKeyDown={(event) => onPanelKeyDown(event, index)}
                >
                  <img
                    src={journey.image}
                    alt={`${journey.place} — ${journey.tagline}`}
                    width={900}
                    height={1200}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                    sizes="(max-width: 1023px) 100vw, (max-width: 1440px) 40vw, 520px"
                    className="departure-panel-img"
                    style={{ objectPosition: journey.focus }}
                    draggable={false}
                  />
                  <span className="departure-panel-shade" aria-hidden="true" />

                  <span className="departure-panel-collapsed">
                    <span className="departure-panel-code-pill">{journey.code}</span>
                    <span className="departure-panel-vertical font-display">{journey.name}</span>
                  </span>

                  <span className="departure-panel-mobile-row">
                    <span className="departure-panel-mobile-code">{journey.code}</span>
                    <span className="departure-panel-mobile-name font-display">{journey.name}</span>
                  </span>
                </button>

                <div
                  id={regionId}
                  className="departure-panel-active"
                  hidden={!isActive}
                  aria-hidden={!isActive}
                >
                  <div className="departure-panel-copy">
                    <span className="departure-panel-code-pill is-large">
                      <Plane size={12} aria-hidden="true" />
                      {journey.code}
                    </span>
                    <h3 className="departure-panel-name font-display">
                      <span className="sr-only">{journey.name}</span>
                      <LetterRise text={journey.name} active={isActive} reduceMotion={reduceMotion} />
                    </h3>
                    <p className="departure-panel-tagline">{journey.tagline}</p>
                    <ul className="departure-highlights">
                      {journey.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <a className="departure-plan-btn" href={href}>
                      Plan this trip
                      <ArrowRight size={14} aria-hidden="true" />
                    </a>
                    <a
                      className="departure-dest-link"
                      href={`/destinations/${journeySlug(journey)}`}
                    >
                      About {journey.name}
                    </a>
                  </div>
                  <BoardingPass journey={journey} />
                </div>

                {isActive ? (
                  <div className="departure-panel-progress" aria-hidden="true">
                    <div className="departure-panel-progress-bar" />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div
          className={`departure-ticker${reduceMotion ? " is-paused" : ""}`}
          aria-hidden="true"
        >
          <div className="departure-ticker-track">
            {[0, 1].map((copy) => (
              <p key={copy} className="departure-ticker-set">
                {JOURNEYS.map((journey) => (
                  <button
                    key={`${copy}-${journey.code}`}
                    type="button"
                    tabIndex={-1}
                    className="departure-ticker-item"
                    onClick={() => onTickerSelect(journey)}
                  >
                    {journey.code} {journey.name}
                  </button>
                ))}
              </p>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {announce}
        </p>
      </div>
    </section>
  );
}
