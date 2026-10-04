"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronRight, Quote } from "lucide-react";
import { heroSlides } from "@/data/team";
import { useMouseParallax, useParallaxLayer } from "@/hooks/useMouseParallax";
import GoldButton from "@/components/ui/GoldButton";
import GlassCard from "@/components/ui/GlassCard";
import { Eyebrow, Gold } from "@/components/ui/SectionHeading";
import Smoke from "@/components/ui/Smoke";
import CameraSilhouette from "./CameraSilhouette";
import HeroStats from "./HeroStats";
import TeamLeaderCard from "./TeamLeaderCard";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const portraitMask =
  "radial-gradient(ellipse 62% 78% at 48% 40%, #000 45%, transparent 100%)";

export default function Hero() {
  const [active, setActive] = useState(0);
  const member = heroSlides[active];

  const pointer = useMouseParallax();
  const bg = useParallaxLayer(pointer, 10);
  const camera = useParallaxLayer(pointer, 14);
  const portrait = useParallaxLayer(pointer, 5);
  const cards = useParallaxLayer(pointer, 8);

  return (
    <section className="relative overflow-hidden pb-10 pt-28 sm:pt-32 lg:pt-36" aria-labelledby="hero-heading">
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.12fr] lg:gap-6">
        {/* ---------- Copy ---------- */}
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10">
          <motion.div variants={item}>
            <Eyebrow>Digital Marketing Agency</Eyebrow>
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={item}
            className="mt-6 text-[2.4rem] min-[400px]:text-[2.9rem] font-extrabold leading-[0.98] tracking-[-0.03em] text-cream sm:text-6xl lg:text-[4.6rem] xl:text-[5.25rem]"
          >
            Your Brand
            <br />
            Deserves To
            <br />
            Be <Gold>Seen.</Gold>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-md text-lg leading-relaxed text-white/70">
            Founded by Ashish Thakur, 7H Media is a digital marketing startup creating strategy, content and campaigns that turn attention into measurable growth.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <GoldButton href="/contact" size="lg">Start Your Project</GoldButton>
            <GoldButton href="/work" variant="outline" size="lg">Watch Showreel</GoldButton>
          </motion.div>

          <motion.div variants={item} className="mt-12 lg:mt-14">
            <HeroStats />
          </motion.div>
        </motion.div>

        {/* ---------- Visual ---------- */}
        <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
          <div className="relative h-[430px] sm:h-[520px] lg:h-[560px]">
            {/* atmosphere */}
            <motion.div style={bg} className="absolute inset-0">
              <Smoke />
            </motion.div>
            <motion.div style={camera} className="absolute -left-2 bottom-[6%] w-[34%] text-gold-500/[0.14]">
              <CameraSilhouette className="w-full" />
            </motion.div>

            {/* viewfinder frame + REC */}
            <div aria-hidden className="pointer-events-none absolute inset-2 sm:inset-4">
              {["left-0 top-0 border-l border-t rounded-tl-xl", "right-0 top-0 border-r border-t rounded-tr-xl", "left-0 bottom-0 border-l border-b rounded-bl-xl", "right-0 bottom-0 border-r border-b rounded-br-xl"].map((c) => (
                <span key={c} className={`absolute size-7 border-white/25 ${c}`} />
              ))}
              <span className="absolute left-5 top-5 flex items-center gap-2 text-xs font-semibold tracking-widest text-white/80">
                <span className="rec-dot size-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                REC
              </span>
            </div>

            {/* portrait */}
            <motion.div
              style={portrait}
              className="absolute bottom-[4%] left-[6%] top-[4%] w-[68%] sm:left-[10%] sm:w-[62%]"
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={member.slug}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease }}
                  className="absolute inset-0"
                  style={{ WebkitMaskImage: portraitMask, maskImage: portraitMask }}
                >
                  <Image
                    src={member.heroImage ?? member.image}
                    alt={`${member.name}, ${member.role} at 7H Media, founder of 7H Media`}
                    fill
                    priority={active === 0}
                    sizes="(min-width: 1024px) 380px, 70vw"
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>
              {/* warm rim light */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 top-[10%] h-[60%] w-1/2 bg-[radial-gradient(closest-side,rgba(232,173,85,0.22),transparent)]"
              />
            </motion.div>

            <motion.div style={cards} className="absolute inset-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={member.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                  className="absolute inset-0"
                >
                  <TeamLeaderCard member={member} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* quote + thumbnails */}
          <motion.div
            style={cards}
            className="relative z-10 mt-2 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0"
          >
            <GlassCard gold className="w-full max-w-[280px] p-5">
              <Quote aria-hidden className="size-6 fill-gold-400/30 text-gold-400" />
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={member.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="mt-2 text-sm leading-relaxed text-cream/90">&ldquo;{member.quote}&rdquo;</p>
                  <footer className="mt-3 text-xs text-white/50">
                    <span className="font-script text-2xl leading-none text-gold-300">{member.name}</span>
                    <span className="mt-1 block">{member.role}, 7H Media</span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </GlassCard>

            <div className="flex items-center gap-2.5" role="group" aria-label="Team leaders">
              {heroSlides.map((m, i) => (
                <button
                  key={m.slug}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${m.name}, ${m.role}`}
                  aria-pressed={i === active}
                  className={`relative size-[52px] overflow-hidden rounded-lg border-2 transition-all duration-300 sm:size-14 ${
                    i === active ? "border-gold-400 shadow-[0_0_18px_-4px_rgba(232,173,85,0.7)]" : "border-white/15 opacity-75 hover:border-white/40 hover:opacity-100"
                  }`}
                >
                  <Image src={m.heroImage ?? m.image} alt="" fill sizes="56px" className="object-cover object-top" />
                </button>
              ))}
              {heroSlides.length > 1 && (
                <button
                  type="button"
                  onClick={() => setActive((active + 1) % heroSlides.length)}
                  aria-label="Next team member"
                  className="grid size-[52px] place-items-center rounded-full border border-gold-500/50 bg-ink-950/70 text-gold-300 backdrop-blur transition-colors hover:border-gold-300 hover:bg-gold-500/15 sm:size-14"
                >
                  <ChevronRight aria-hidden className="size-5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
