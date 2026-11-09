import { Eyebrow, Reveal } from "@/components/site-chrome";

type FaqItem = { q: string; a: string };

/**
 * Visible FAQ that mirrors the FAQPage JSON-LD on the same page.
 * Uses native <details> so answers are in the HTML for crawlers and answer engines.
 */
export function FaqSection({
  eyebrow = "Questions",
  heading,
  items,
  alt = false,
}: {
  eyebrow?: string;
  heading: string;
  items: ReadonlyArray<FaqItem>;
  alt?: boolean;
}) {
  return (
    <section
      className={`service-section ${alt ? "bg-[var(--bg-alt)]" : "bg-background"}`}
      aria-labelledby="faq-heading"
    >
      <div className="content-shell px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2
              id="faq-heading"
              className="mt-4 font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-medium leading-[1.12] text-ink"
            >
              {heading}
            </h2>
          </div>
        </Reveal>
        <div className="faq-list mt-10 max-w-3xl">
          {items.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <details className="faq-item" open={i === 0}>
                <summary className="faq-summary">
                  <span>{item.q}</span>
                  <span className="faq-marker" aria-hidden="true" />
                </summary>
                <p className="faq-answer">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
