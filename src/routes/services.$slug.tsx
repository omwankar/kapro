import { createFileRoute, notFound } from "@tanstack/react-router";

import { ServicePage } from "@/components/service-page";
import { getServiceBySlug } from "@/data/services";
import { buildPageHead } from "@/lib/seo";

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
    return buildPageHead({
      title: `${service.title} | Karpo Travel Inc.`,
      description: service.metaDescription,
      path: `/services/${service.slug}`,
      ogImage: "/og/home.jpg",
    });
  },
  component: ServiceSlugPage,
});

function ServiceSlugPage() {
  const { service } = Route.useLoaderData();
  return <ServicePage service={service} />;
}
