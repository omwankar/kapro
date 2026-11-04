import { createFileRoute, notFound } from "@tanstack/react-router";

import { ServicePage } from "@/components/service-page";
import { getServiceBySlug } from "@/data/services";

export const Route = createFileRoute("/services/$slug")({
  beforeLoad: ({ params }) => {
    if (!getServiceBySlug(params.slug)) {
      throw notFound();
    }
  },
  loader: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const service = loaderData?.service;
    if (!service) return {};
    return {
      meta: [
        { title: `${service.title} | Karpo Travel Inc.` },
        { name: "description", content: service.metaDescription },
        { property: "og:title", content: `${service.title} | Karpo Travel Inc.` },
        { property: "og:description", content: service.metaDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ServiceSlugPage,
});

function ServiceSlugPage() {
  const { service } = Route.useLoaderData();
  return <ServicePage service={service} />;
}
