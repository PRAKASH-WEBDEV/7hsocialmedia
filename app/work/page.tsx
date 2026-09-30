import type { Metadata } from "next";
import CtaSection from "@/components/layout/CtaSection";
import FeaturedShowcase from "@/components/portfolio/FeaturedShowcase";
import PortfolioSection from "@/components/portfolio/PortfolioSection";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Reels, brand videos, ad campaigns and event coverage: a look at the media we've produced for our clients.",
};

export default function WorkPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <PortfolioSection headingAs="h1" />
      <FeaturedShowcase />
      <CtaSection />
    </div>
  );
}
