"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { team } from "@/data/team";
import GoldButton from "@/components/ui/GoldButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading, { Gold } from "@/components/ui/SectionHeading";
import TeamCard from "./TeamCard";

type Props = { variant?: "carousel" | "grid"; showLink?: boolean; headingAs?: "h1" | "h2" };

function ArrowBtn({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Scroll team left" : "Scroll team right"}
      className="grid size-10 place-items-center rounded-full border border-gold-500/40 bg-ink-950/80 text-gold-300 backdrop-blur transition-colors hover:border-gold-300 hover:bg-gold-500/15"
    >
      <Icon aria-hidden className="size-5" />
    </button>
  );
}

export default function TeamSection({ variant = "carousel", showLink, headingAs = "h2" }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

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
            description="A passionate team of strategists, creators, designers and marketers working together to bring your brand's story to life."
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
            <div className="pointer-events-none absolute inset-y-0 -left-3 z-10 hidden items-center lg:flex">
              <span className="pointer-events-auto"><ArrowBtn dir="prev" onClick={() => scroll(-1)} /></span>
            </div>
            <div className="pointer-events-none absolute inset-y-0 -right-3 z-10 hidden items-center lg:flex">
              <span className="pointer-events-auto"><ArrowBtn dir="next" onClick={() => scroll(1)} /></span>
            </div>
            <div
              ref={track}
              className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 pt-2 sm:mx-0 sm:px-0"
            >
              {team.map((m, i) => (
                <div
                  key={m.slug}
                  className="w-[44%] shrink-0 snap-start sm:w-[30%] md:w-[23%] lg:w-[calc((100%-60px)/6)]"
                >
                  <TeamCard
                    member={m}
                    featured={i === 0}
                    sizes="(min-width: 1024px) 190px, (min-width: 640px) 30vw, 44vw"
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
