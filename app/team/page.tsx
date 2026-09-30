import type { Metadata } from "next";
import CtaSection from "@/components/layout/CtaSection";
import TeamSection from "@/components/team/TeamSection";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the strategists, creators, designers and marketers behind 7H Media.",
};

export default function TeamPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <TeamSection variant="grid" headingAs="h1" />
      <CtaSection />
    </div>
  );
}
