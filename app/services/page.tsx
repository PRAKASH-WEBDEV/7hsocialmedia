import type { Metadata } from "next";
import CtaSection from "@/components/layout/CtaSection";
import ServicesSection from "@/components/services/ServicesSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Social media, performance marketing, content production, brand strategy, influencer marketing and web development from 7H Media.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <ServicesSection detailed headingAs="h1" />
      <CtaSection />
    </div>
  );
}
