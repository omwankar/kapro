import { createFileRoute, notFound } from "@tanstack/react-router";

import { DestinationPage } from "@/components/destination-page";
import { getJourneyBySlug } from "@/data/journeys";
import { buildPageHead, destinationMeta } from "@/lib/seo";

export const Route = createFileRoute("/destinations/$slug")({
  beforeLoad: ({ params }) => {
    if (!getJourneyBySlug(params.slug)) {
      throw notFound();
    }
  },
  loader: ({ params }) => {
    const journey = getJourneyBySlug(params.slug);
    if (!journey) throw notFound();
    return { journey };
  },
  head: ({ loaderData }) => {
    const journey = loaderData?.journey;
    if (!journey) return {};
    return buildPageHead(destinationMeta(journey));
  },
  component: DestinationSlugPage,
});

function DestinationSlugPage() {
  const { journey } = Route.useLoaderData();
  return <DestinationPage journey={journey} />;
}
