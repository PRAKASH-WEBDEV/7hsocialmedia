"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Clapperboard } from "lucide-react";
import type { Filter, Project } from "@/data/projects";
import GoldButton from "@/components/ui/GoldButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading, { Gold } from "@/components/ui/SectionHeading";
import PortfolioCard from "./PortfolioCard";
import PortfolioFilters from "./PortfolioFilters";

type Props = {
  limit?: number;
  showAllLink?: boolean;
  headingAs?: "h1" | "h2";
  /** Videos uploaded from the admin panel. */
  projects: Project[];
};

const SIZES_SMALL = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";
const SIZES_LARGE = "(min-width: 1024px) 50vw, 100vw";

export default function PortfolioSection({ limit, showAllLink, headingAs = "h2", projects }: Props) {
  const [filter, setFilter] = useState<Filter>("All");

  const items = useMemo(() => {
    const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [filter, limit, projects]);

  // Asymmetric layout (one 2x2 hero tile) only when it tiles a 4-column grid cleanly.
  const bento = items.length > 1 && (items.length - 1) % 4 === 0;

  return (
    <section id="work" className="relative py-20 sm:py-28" aria-labelledby="work-heading">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            as={headingAs}
            eyebrow="Our Work"
            title={
              <span id="work-heading">
                Brands We&apos;ve
                <br />
                Brought To <Gold>Life.</Gold>{" "}
                <Clapperboard aria-hidden className="ml-1 inline size-8 text-gold-400/80" />
              </span>
            }
            description="From high-performing ad campaigns to creative reels and brand videos, here's a glimpse of the work we've created for our clients."
            action={
              showAllLink ? <GoldButton href="/work" variant="outline" size="sm">View All Work</GoldButton> : undefined
            }
          />
        </Reveal>

        {projects.length > 0 && (
          <Reveal delay={0.1} className="mt-8">
            <PortfolioFilters active={filter} onChange={setFilter} />
          </Reveal>
        )}

        <div className="mt-8 grid auto-rows-[230px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => {
              const large = bento && i === 0;
              return (
                <PortfolioCard
                  key={p.id}
                  project={p}
                  large={large}
                  sizes={large ? SIZES_LARGE : SIZES_SMALL}
                  className={large ? "sm:col-span-2 sm:row-span-2" : ""}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {projects.length === 0 ? (
          <div className="mt-2 rounded-3xl border border-dashed border-gold-500/25 px-6 py-16 text-center">
            <Clapperboard aria-hidden className="mx-auto size-10 text-gold-400/70" />
            <p className="mt-4 text-lg font-semibold text-cream">Fresh work is on its way.</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-white/50">
              We&apos;re cutting our latest reels and campaigns. Check back soon, or start a project with us today.
            </p>
            <div className="mt-6 flex justify-center">
              <GoldButton href="/contact" size="sm">Start a Project</GoldButton>
            </div>
          </div>
        ) : (
          items.length === 0 && <p className="mt-10 text-center text-white/50">No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
}
