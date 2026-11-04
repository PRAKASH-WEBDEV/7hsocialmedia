"use client";

import { motion } from "framer-motion";
import { Clapperboard, Gift, Megaphone, Sparkles } from "lucide-react";
import { diwaliOffers } from "@/data/festive";
import { whatsappLink } from "@/data/site";
import GoldButton from "@/components/ui/GoldButton";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow, Gold } from "@/components/ui/SectionHeading";
import Diya from "./Diya";
import Rangoli from "./Rangoli";
import StringLights from "./StringLights";

const icons = { reels: Clapperboard, greeting: Sparkles, ads: Megaphone, kit: Gift };

export default function DiwaliSection() {
  return (
    <section id="diwali" className="relative overflow-hidden py-20 sm:py-24" aria-labelledby="diwali-heading">
      <StringLights className="absolute inset-x-0 top-0" />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,122,61,0.16),transparent)]" />
        <Rangoli className="absolute -right-40 -top-24 w-[520px] opacity-40 sm:-right-24" />
        <Rangoli className="absolute -bottom-48 -left-48 w-[460px] opacity-25 [animation-direction:reverse]" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="glass glass-gold relative overflow-hidden rounded-[2rem] px-5 py-12 sm:px-10 sm:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <Eyebrow>Diwali Special</Eyebrow>
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="diwali-greeting mt-5 font-script text-6xl leading-none text-gold-300 sm:text-7xl"
              >
                Shubh Deepavali
              </motion.p>
              <h2 id="diwali-heading" className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-cream sm:text-5xl">
                Light Up Your Brand
                <br />
                This <Gold>Diwali.</Gold>
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">
                Festive season is when your customers shop and scroll the most. We&apos;ll plan, shoot and run your
                Diwali campaign so your brand shines the brightest.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <GoldButton href={whatsappLink("Hi 7H Media, I'd like to plan a Diwali campaign for my brand.")}>
                  Plan My Diwali Campaign
                </GoldButton>
                <GoldButton href="/contact" variant="outline">Talk to Us</GoldButton>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {diwaliOffers.map((o, i) => {
                const Icon = icons[o.icon];
                return (
                  <Reveal key={o.title} delay={0.1 + i * 0.1}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="festive-card group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-ink-900/70 p-5"
                    >
                      <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-gold-300/25 to-orange-500/20 text-gold-200 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <h3 className="mt-4 font-semibold text-cream">{o.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">{o.text}</p>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="mt-12 flex items-end justify-center gap-6 sm:gap-10">
            {[0, 0.4, 0.15, 0.55, 0.25].map((delay, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
              >
                <Diya delay={delay} className={i === 2 ? "w-20 sm:w-24" : "w-12 sm:w-16"} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
