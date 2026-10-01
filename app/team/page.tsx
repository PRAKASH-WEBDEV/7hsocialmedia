import CtaSection from "@/components/layout/CtaSection";
import JsonLd from "@/components/seo/JsonLd";
import TeamSection from "@/components/team/TeamSection";
import { breadcrumbNode, graph, pageMetadata, teamJsonLd, webPageJsonLd } from "@/lib/seo";

const seo = {
  title: "Meet Our Team",
  description:
    "Meet the strategists, creators, designers and marketers behind 7H Media.",
  path: "/team",
};

export const metadata = pageMetadata(seo);

export default function TeamPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <JsonLd data={graph(webPageJsonLd(seo, "AboutPage"), breadcrumbNode(seo.path, "Team"), ...teamJsonLd)} />
      <TeamSection variant="grid" headingAs="h1" />
      <CtaSection />
    </div>
  );
}
