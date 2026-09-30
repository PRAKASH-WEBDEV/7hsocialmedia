"use client";

import { services } from "@/data/services";
import GoldButton from "@/components/ui/GoldButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading, { Gold } from "@/components/ui/SectionHeading";
import ServiceCard from "./ServiceCard";

type Props = { detailed?: boolean; showLink?: boolean; headingAs?: "h1" | "h2" };

export default function ServicesSection({ detailed, showLink, headingAs = "h2" }: Props) {
  return (
    <section id="services" className="relative py-20 sm:py-24" aria-labelledby="services-heading">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            as={headingAs}
            eyebrow="Our Services"
            title={
              <span id="services-heading">
                End-to-End Digital
                <br />
                Growth <Gold>Solutions.</Gold>
              </span>
            }
            description="Strategy, creativity and technology: everything your brand needs to grow in the digital world."
            action={showLink ? <GoldButton href="/services" variant="outline" size="sm">View All Services</GoldButton> : undefined}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.08}>
              <ServiceCard service={s} index={i} detailed={detailed} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
