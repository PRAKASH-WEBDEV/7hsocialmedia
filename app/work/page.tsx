import CtaSection from "@/components/layout/CtaSection";
import JsonLd from "@/components/seo/JsonLd";
import FeaturedShowcase from "@/components/portfolio/FeaturedShowcase";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import { breadcrumbNode, graph, pageMetadata, webPageJsonLd, workListJsonLd } from "@/lib/seo";

const seo = {
  title: "Our Work: Reels, Brand Videos & Ad Campaigns",
  description:
    "Reels, brand videos, ad campaigns and event coverage: a look at the media 7H Media has produced for its clients.",
  path: "/work",
};

export const metadata = pageMetadata(seo);

export default function WorkPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <JsonLd
        data={graph(webPageJsonLd(seo, "CollectionPage"), breadcrumbNode(seo.path, "Our Work"), workListJsonLd)}
      />
      <PortfolioSection headingAs="h1" />
      <FeaturedShowcase />
      <CtaSection />
    </div>
  );
}
