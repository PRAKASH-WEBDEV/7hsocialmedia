import type { Metadata } from "next";
import CtaSection from "@/components/layout/CtaSection";
import Hero from "@/components/hero/Hero";
import FeaturedShowcase from "@/components/portfolio/FeaturedShowcase";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import ServicesSection from "@/components/services/ServicesSection";
import TeamSection from "@/components/team/TeamSection";
import JsonLd from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import { DEFAULT_TITLE, graph, webPageJsonLd } from "@/lib/seo";
import { getUploadedProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: DEFAULT_TITLE },
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const uploaded = await getUploadedProjects();
  return (
    <>
      <JsonLd data={graph(webPageJsonLd({ path: "/", title: DEFAULT_TITLE, description: site.description }))} />
      <Hero />
      <TeamSection showLink />
      <PortfolioSection limit={5} showAllLink uploaded={uploaded} />
      <FeaturedShowcase />
      <ServicesSection showLink />
      <CtaSection />
    </>
  );
}
