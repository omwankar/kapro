type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Server-rendered JSON-LD for crawlers and AI search. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
