import { useEffect, useRef } from "react";

const EMBLEM_SRC = "/images/karpo-emblem-only.png";
const STORAGE_KEY = "karpo-intro-seen";
const MIN_MS = 1200;
const HARD_CAP_MS = 2800;
const EXIT_HOLD_MS = 250;
const EMBLEM_EXIT_MS = 500;
const OVERLAY_EXIT_MS = 900;
const SKIP_ARM_MS = 1000;
const DISABLE_INTRO = import.meta.env["VITE_DISABLE_INTRO"] === "true";

const LETTERS = ["K", "A", "R", "P", "O"] as const;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function waitForFonts() {
  if (!document.fonts?.ready) return Promise.resolve();
  return document.fonts.ready.then(
    () => undefined,
    () => undefined,
  );
}

function waitForImage(img: HTMLImageElement | null) {
  if (!img) return Promise.resolve();
  if (img.complete && img.naturalWidth > 0) {
    return img.decode ? img.decode().catch(() => undefined) : Promise.resolve();
  }
  return new Promise<void>((resolve) => {
    const done = () => resolve();
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
    if (img.decode) {
      img.decode().then(done, done);
    }
  });
}

function waitForHeroPoster() {
  const path = window.location.pathname;
  if (path !== "/" && path !== "") {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const started = performance.now();
    const attempt = () => {
      const hero = document.querySelector<HTMLImageElement>("[data-intro-hero]");
      if (hero) {
        waitForImage(hero).then(resolve);
        return;
      }
      if (performance.now() - started > 800) {
        resolve();
        return;
      }
      window.setTimeout(attempt, 50);
    };
    attempt();
  });
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const html = document.documentElement;
    const introState = html.dataset["intro"];

    if (DISABLE_INTRO || introState === "skip") {
      html.dataset["intro"] = "skip";
      root.style.display = "none";
      html.style.overflow = "";
      document.getElementById("app-root")?.removeAttribute("aria-busy");
      return;
    }

    html.dataset["intro"] = "active";
    html.style.overflow = "hidden";
    const appRoot = document.getElementById("app-root");
    appRoot?.setAttribute("aria-busy", "true");
    root.style.setProperty("--progress", "0");

    const startedAt = performance.now();
    let progress = 0;
    let ready = false;
    let exiting = false;
    let rafId = 0;
    let skipArmed = false;
    let disposed = false;
    const timers: number[] = [];

    const emblemImg = root.querySelector<HTMLImageElement>(".preloader-emblem");

    const setProgress = (value: number) => {
      progress = Math.max(progress, Math.min(1, value));
      root.style.setProperty("--progress", String(progress));
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const tickProgress = (now: number) => {
      if (disposed || ready) return;
      const elapsed = now - startedAt;
      const target = easeOutCubic(Math.min(1, elapsed / MIN_MS)) * 0.9;
      setProgress(target);
      rafId = window.requestAnimationFrame(tickProgress);
    };
    rafId = window.requestAnimationFrame(tickProgress);

    const markReady = () => {
      if (ready || disposed || exiting) return;
      ready = true;
      exiting = true;
      window.cancelAnimationFrame(rafId);
      setProgress(1);

      const reduced = prefersReducedMotion();
      const hold = window.setTimeout(() => {
        if (disposed) return;
        html.dataset["intro"] = "done";
        root.classList.add(reduced ? "is-exiting-reduced" : "is-exiting");

        const cleanupDelay = reduced ? 300 : EMBLEM_EXIT_MS + OVERLAY_EXIT_MS;
        const cleanupTimer = window.setTimeout(() => {
          if (disposed) return;
          root.style.display = "none";
          html.style.overflow = "";
          appRoot?.removeAttribute("aria-busy");
          // Settle to skip so later client navigations do not replay entrance.
          html.dataset["intro"] = "skip";
          try {
            sessionStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* private mode */
          }
        }, cleanupDelay);
        timers.push(cleanupTimer);
      }, EXIT_HOLD_MS);
      timers.push(hold);
    };

    const hardCap = window.setTimeout(markReady, HARD_CAP_MS);
    timers.push(hardCap);

    Promise.all([
      new Promise<void>((resolve) => {
        const delay = window.setTimeout(resolve, MIN_MS);
        timers.push(delay);
      }),
      waitForFonts(),
      waitForImage(emblemImg),
      waitForHeroPoster(),
    ]).then(markReady);

    const armSkip = window.setTimeout(() => {
      skipArmed = true;
      root.classList.add("is-skippable");
    }, SKIP_ARM_MS);
    timers.push(armSkip);

    const onSkip = () => {
      if (!skipArmed || exiting || disposed) return;
      markReady();
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onSkip();
    };

    root.addEventListener("click", onSkip);
    window.addEventListener("keydown", onKey);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      timers.forEach((id) => window.clearTimeout(id));
      root.removeEventListener("click", onSkip);
      window.removeEventListener("keydown", onKey);
      html.style.overflow = "";
      document.getElementById("app-root")?.removeAttribute("aria-busy");
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="preloader"
      aria-hidden="false"
      style={{ ["--progress" as string]: 0 }}
    >
      <div className="preloader-vignette" aria-hidden="true" />
      <div className="preloader-center">
        <div className="preloader-emblem-wrap">
          <img
            className="preloader-emblem"
            src={EMBLEM_SRC}
            alt=""
            width={256}
            height={417}
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="preloader-wordmark">
          <p className="preloader-karpo" aria-label="KARPO">
            {LETTERS.map((letter, index) => (
              <span
                key={letter}
                className="preloader-letter"
                style={{ ["--i" as string]: index }}
              >
                {letter}
              </span>
            ))}
          </p>
          <p className="preloader-sub">Travel Inc.</p>
        </div>

        <p className="preloader-tagline">Your Journey, Our Priority.</p>

        <div className="preloader-progress" aria-hidden="true">
          <div ref={progressRef} className="preloader-progress-fill" />
        </div>
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        Loading Karpo Travel
      </div>
    </div>
  );
}
