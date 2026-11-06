import { useRef } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Eye, HeartHandshake, MapPinned, ShieldCheck } from "lucide-react";

import baliImg from "@/assets/journeys/bali_temple.webp";
import veniceImg from "@/assets/journeys/venice_canal.jpg";
import kyotoImg from "@/assets/journeys/kyoto_fushimi.jpg";
import machuPicchuImg from "@/assets/journeys/machu_picchu.jpg";
import founderImg from "@/assets/jenson-daniel.webp";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import {
  CtaBand,
  EASE,
  Eyebrow,
  Footer,
  Nav,
  Reveal,
  SERVICES,
  ScrollProgress,
} from "@/components/site-chrome";
import { PAGE_META, aboutGraphJsonLd, buildPageHead } from "@/lib/seo";

const SHOW_FOUNDER_PHOTO = true;

const INTRO_DESCRIPTION =
  "Karpo Travel Inc. was founded to make personalized travel simpler, more thoughtful, and more reliable. Drawing on over 60 years of family experience in the travel industry, we focus on carefully planned journeys that reflect each client’s preferences, pace, and priorities.";

export const Route = createFileRoute("/about")({
  head: () => buildPageHead(PAGE_META.about),
  component: AboutPage,
});

const MILESTONES = [
  {
    value: "1960s",
    label: "A family built on travel",
  },
  {
    value: "2023",
    label: "The personal touch begins",
  },
  {
    value: "2026",
    label: "Karpo Travel Inc. is born",
  },
];

const VALUES = [
  {
    title: "Personal",
    body: "Journeys planned around each client's preferences, pace, and priorities.",
    Icon: HeartHandshake,
  },
  {
    title: "Transparent",
    body: "Every detail handled with care and transparency.",
    Icon: Eye,
  },
  {
    title: "Reliable",
    body: "24/7 call or WhatsApp support.",
    Icon: ShieldCheck,
  },
  {
    title: "Detail-first",
    body: "Careful attention to detail so every journey feels seamless and meaningful.",
    Icon: MapPinned,
  },
];

function AboutPage() {
  return (
    <main className="bg-background font-sans">
      <JsonLd data={aboutGraphJsonLd()} />
      <ScrollProgress />
      <Nav />
      <AboutHero />
      <StorySplit />
      <JourneyTimeline />
      <ValuesSection />
      <FoundersNote />
      <ServicesStrip />
      <CtaBand />
      <Footer />
    </main>
  );
}

function AboutHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="about-hero relative flex items-end overflow-hidden">
      <img
        src={baliImg}
        alt="Temple rising above the jungle canopy in Bali"
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
            "linear-gradient(180deg, rgba(74,15,19,0.55), rgba(20,12,16,0.70))",
        }}
        aria-hidden="true"
      />

      <div className="content-shell relative z-10 w-full px-4 pb-14 pt-[9.5rem] text-center sm:px-6 sm:pb-16 sm:pt-[10.5rem] md:px-8">
        <Reveal>
          <Breadcrumbs
            light
            items={[
              { name: "Home", path: "/" },
              { name: "Our Story" },
            ]}
          />
          <div className="mt-6 flex justify-center">
            <Eyebrow light>Our Story</Eyebrow>
          </div>
          <span className="about-hero-goldline mx-auto mt-3 block" aria-hidden="true" />
          <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.05] text-[#FBF3EE]">
            Built on Trust. Driven by{" "}
            <span className="italic text-[#F7EDE6]">Experience.</span>
          </h1>
        </Reveal>
        <motion.div
          className="about-hero-chevron mx-auto mt-10"
          aria-hidden="true"
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>
    </section>
  );
}

function StorySplit() {
  return (
    <section className="about-story-split bg-background">
      <div className="about-story-shell px-4 sm:px-6 md:px-8">
        <div className="about-story-row-a">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="about-story-heading mt-4 font-display font-medium text-ink">
              Personalized travel, simpler and more{" "}
              <span className="italic text-red-500">thoughtful</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="about-story-lead">
              <p className="font-display text-ink">
                Karpo Travel Inc. was founded to make personalized travel simpler,
                more thoughtful, and more reliable.
              </p>
              <span className="about-story-lead-rule" aria-hidden="true" />
              <p className="about-story-lead-continue">
                Drawing on over 60 years of family experience in the travel
                industry, we focus on carefully planned journeys that reflect each
                client’s preferences, pace, and priorities.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="about-story-row-b">
          <Reveal>
            <StoryMosaic />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="about-story-body">
              <p className="about-story-dropcap">
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
              <p className="about-pull-quote font-display italic text-ink">
                “Your Journey, Our Priority.”
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StoryMosaic() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [10, -10]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [14, -8]);
  const y3 = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [8, -14]);

  return (
    <div ref={ref} className="about-mosaic">
      <div className="about-mosaic-stage">
        <div className="about-mosaic-frame" aria-hidden="true" />

        <motion.figure className="about-mosaic-photo about-mosaic-photo--1" style={{ y: y1 }}>
          <div className="about-mosaic-photo-media">
            <img
              src={veniceImg}
              alt="Gondolas along a canal in Venice"
              width={1600}
              height={1067}
              loading="lazy"
              decoding="async"
            />
            <figcaption>Venice</figcaption>
          </div>
          <div className="about-mosaic-stat">
            <p className="about-mosaic-stat-value font-display">60+</p>
            <p className="about-mosaic-stat-label">Years of family legacy in travel</p>
          </div>
        </motion.figure>

        <motion.figure className="about-mosaic-photo about-mosaic-photo--2" style={{ y: y2 }}>
          <img
            src={kyotoImg}
            alt="Vermilion torii gates at a shrine in Kyoto"
            width={1200}
            height={1600}
            loading="lazy"
            decoding="async"
          />
          <figcaption>Kyoto</figcaption>
        </motion.figure>

        <motion.figure className="about-mosaic-photo about-mosaic-photo--3" style={{ y: y3 }}>
          <img
            src={machuPicchuImg}
            alt="Stone terraces of Machu Picchu in the Andes"
            width={1200}
            height={1200}
            loading="lazy"
            decoding="async"
          />
          <figcaption>Machu Picchu</figcaption>
        </motion.figure>
      </div>
    </div>
  );
}

function JourneyTimeline() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="about-timeline bg-red-50">
      <div className="content-shell px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Roots & Routes</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium text-ink">
              Three generations of getting it right
            </h2>
          </div>
        </Reveal>

        <div className="about-timeline-track mt-14 sm:mt-16">
          <div className="about-timeline-line" aria-hidden="true">
            <motion.span
              className="about-timeline-progress"
              initial={reduceMotion ? { scaleX: 1, scaleY: 1 } : { scaleX: 0, scaleY: 0 }}
              whileInView={{ scaleX: 1, scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 1.1, ease: EASE, delay: 0.15 }
              }
            />
          </div>

          <ol className="about-timeline-items">
            {MILESTONES.map((item, i) => (
              <li key={item.value} className="about-timeline-item">
                <span className="about-timeline-dot" aria-hidden="true" />
                <Reveal delay={0.1 + i * 0.08} className="about-timeline-reveal">
                  <p className="about-timeline-value font-display">{item.value}</p>
                  <p className="about-timeline-label">{item.label}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="about-values bg-background">
      <div className="content-shell px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>What guides us</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium text-ink">
              How we work
            </h2>
          </div>
        </Reveal>

        <div className="about-values-grid mt-12 sm:mt-14">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.06}>
              <article className="about-value-card">
                <div className="about-value-icon" aria-hidden="true">
                  <value.Icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 font-display text-[1.35rem] font-medium text-ink">
                  {value.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {value.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FoundersNote() {
  return (
    <section className="about-founder-note bg-[var(--bg-alt)]">
      <div className="about-story-shell px-4 sm:px-6 md:px-8">
        <div className="about-founder-grid">
          {SHOW_FOUNDER_PHOTO ? (
            <Reveal>
              <div className="about-founder-portrait">
                <div className="about-founder-portrait-frame" aria-hidden="true" />
                <div className="about-founder-portrait-photo">
                  <img
                    src={founderImg}
                    alt="Jenson Daniel, Founder & Managing Director of Karpo Travel Inc."
                    width={300}
                    height={375}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="about-founder-tab">
                  <p className="about-founder-tab-name">Jenson Daniel</p>
                  <p className="about-founder-tab-role">Founder & Managing Director</p>
                </div>
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={SHOW_FOUNDER_PHOTO ? 0.08 : 0}>
            <div className="about-founder-copy">
              <span className="about-founder-mark" aria-hidden="true">
                “
              </span>
              <blockquote className="about-founder-quote font-display italic text-ink">
                “Your Journey, Our Priority.”
              </blockquote>
              <p className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-muted-foreground sm:text-[17px]">
                Our goal is to take care of the planning so you can focus on the
                experience.
              </p>
              <div className="about-founder-rule mt-8" aria-hidden="true" />
              {!SHOW_FOUNDER_PHOTO ? (
                <>
                  <p className="mt-6 font-display text-[1.35rem] font-medium text-ink">
                    Jenson Daniel
                  </p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-red-600">
                    Founder & Managing Director
                  </p>
                </>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServicesStrip() {
  return (
    <section className="about-services bg-background">
      <div className="content-shell px-4 sm:px-6 md:px-8">
        <Reveal>
          <Eyebrow>What we do</Eyebrow>
          <h2 className="sr-only">Services</h2>
        </Reveal>
        <div className="about-services-grid mt-10 sm:mt-12">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05}>
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="about-service-tile"
              >
                <div className="about-service-thumb">
                  <img
                    src={service.img}
                    alt=""
                    width={120}
                    height={90}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-[1.15rem] font-medium text-ink">
                    {service.title}
                  </p>
                  <p className="mt-1 text-[13px] text-muted-foreground">{service.line}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
