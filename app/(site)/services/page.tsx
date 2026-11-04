import CtaSection from "@/components/layout/CtaSection";
import JsonLd from "@/components/seo/JsonLd";
import ServicesSection from "@/components/services/ServicesSection";
import { breadcrumbNode, graph, pageMetadata, serviceListJsonLd, webPageJsonLd } from "@/lib/seo";

const seo = {
  title: "Marketing & Creative Services",
  description:
    "Social media marketing, performance marketing, content creation, brand strategy, influencer marketing and web development from 7H Media.",
  path: "/services",
};

export const metadata = pageMetadata(seo);

export default function ServicesPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <JsonLd
        data={graph(
          webPageJsonLd(seo, "CollectionPage"),
          breadcrumbNode(seo.path, "Services"),
          serviceListJsonLd,
        )}
      />
      <ServicesSection detailed headingAs="h1" />
      <CtaSection />
    </div>
  );
}
