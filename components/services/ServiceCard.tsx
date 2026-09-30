"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";

type Props = { service: Service; index: number; detailed?: boolean };

export default function ServiceCard({ service, index, detailed }: Props) {
  const Icon = service.icon;
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-colors duration-500 hover:border-gold-500/50 hover:bg-gold-500/[0.04]"
    >
      <div className="flex items-start justify-between">
        <span className="text-lg font-light text-white/70 transition-colors group-hover:text-gold-300">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Icon aria-hidden strokeWidth={1.25} className="size-9 text-gold-400/80 transition-colors group-hover:text-gold-200" />
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-cream">{service.title}</h3>
          <p className="mt-1 text-sm text-white/50">{service.tagline}</p>
          {detailed && (
            <>
              <p className="mt-4 text-sm leading-relaxed text-white/55">{service.description}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-white/70">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2">
                    <span aria-hidden className="size-1 rounded-full bg-gold-400" />
                    {d}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-full border border-gold-500/50 text-gold-300 transition-transform duration-300 group-hover:-rotate-45 group-hover:bg-gold-500/15"
        >
          <ArrowRight className="size-4" />
        </span>
      </div>

      <Link
        href="/contact"
        aria-label={`Enquire about ${service.title}`}
        className="absolute inset-0 rounded-2xl"
      />
    </motion.article>
  );
}
