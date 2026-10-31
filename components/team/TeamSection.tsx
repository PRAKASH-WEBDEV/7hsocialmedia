"use client";

import { team } from "@/data/team";
import GoldButton from "@/components/ui/GoldButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading, { Gold } from "@/components/ui/SectionHeading";
import TeamCard from "./TeamCard";

type Props = { variant?: "carousel" | "grid"; showLink?: boolean; headingAs?: "h1" | "h2" };

export default function TeamSection({ variant = "carousel", showLink, headingAs = "h2" }: Props) {
  return (
    <section id="team" className="relative py-20 sm:py-24" aria-labelledby="team-heading">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            as={headingAs}
            eyebrow="Our Team"
            title={
              <span id="team-heading">
                Creative Minds
                <br />
                Behind Your <Gold>Growth.</Gold>
              </span>
            }
            description="A young, skilled team of video editors, designers and developers, led by founder Ashish Thakur, bringing your brand's story to life."
            action={showLink ? <GoldButton href="/team" variant="outline" size="sm">Meet Our Full Team</GoldButton> : undefined}
          />
        </Reveal>

        {variant === "grid" ? (
          <Reveal delay={0.1} className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {team.map((m, i) => (
              <TeamCard
                key={m.slug}
                member={m}
                featured={i === 0}
                showBio
                sizes="(min-width: 768px) 33vw, 50vw"
              />
            ))}
          </Reveal>
        ) : (
          <Reveal delay={0.1} className="relative mt-12">
            <div
              className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 pt-2 sm:mx-0 sm:px-0"
            >
              {team.map((m, i) => (
                <div
                  key={m.slug}
                  className="w-[44%] shrink-0 snap-start sm:w-[30%] md:w-[30%] lg:w-[calc((100%-24px)/3)]"
                >
                  <TeamCard
                    member={m}
                    featured={i === 0}
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 30vw, 44vw"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
