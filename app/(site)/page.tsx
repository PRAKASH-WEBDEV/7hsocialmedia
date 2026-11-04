import type { Metadata } from "next";
import CtaSection from "@/components/layout/CtaSection";
import Hero from "@/components/hero/Hero";
import DiwaliSection from "@/components/festive/DiwaliSection";
import { isDiwali } from "@/data/festive";
import FeaturedShowcase from "@/components/portfolio/FeaturedShowcase";
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
  const festive = isDiwali();
  return (
    <>
      <JsonLd data={graph(webPageJsonLd({ path: "/", title: DEFAULT_TITLE, description: site.description }))} />
      <Hero festive={festive} />
      {festive && <DiwaliSection />}
      <TeamSection showLink />
      <FeaturedShowcase projects={uploaded} />
      <ServicesSection showLink />
      <CtaSection />
    </>
  );
}
