import CtaSection from "@/components/layout/CtaSection";
import Hero from "@/components/hero/Hero";
import TrustedBrands from "@/components/hero/TrustedBrands";
import FeaturedShowcase from "@/components/portfolio/FeaturedShowcase";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import ServicesSection from "@/components/services/ServicesSection";
import TeamSection from "@/components/team/TeamSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBrands />
      <TeamSection showLink />
      <PortfolioSection limit={5} showAllLink />
      <FeaturedShowcase />
      <ServicesSection showLink />
      <CtaSection />
    </>
  );
}
