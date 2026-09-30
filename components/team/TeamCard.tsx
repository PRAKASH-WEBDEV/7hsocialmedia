"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { TeamMember } from "@/data/team";

type Props = { member: TeamMember; featured?: boolean; className?: string; sizes: string; showBio?: boolean };

export default function TeamCard({ member, featured, className = "", sizes, showBio }: Props) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      id={member.slug}
      className={`group relative aspect-[4/5] overflow-hidden rounded-2xl border bg-ink-800 transition-colors duration-500 hover:border-gold-400/70 ${
        featured ? "border-gold-500/60" : "border-white/8"
      } ${className}`}
    >
      <Image
        src={member.image}
        alt={`${member.name}, ${member.role} at 7H Media`}
        fill
        sizes={sizes}
        loading="lazy"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 sm:p-4">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-cream sm:text-base">{member.name}</h3>
          <p className="truncate text-[11px] text-white/60 sm:text-xs">{member.role}</p>
          <p className="truncate text-[11px] text-gold-400 sm:text-xs">{member.specialty}</p>
          {showBio && (
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/50">{member.bio}</p>
          )}
        </div>
        <span
          aria-hidden
          className="grid size-8 shrink-0 place-items-center rounded-full border border-gold-500/60 bg-black/50 text-gold-300 backdrop-blur transition-transform duration-300 group-hover:-rotate-45 group-hover:bg-gold-500/20"
        >
          <ArrowRight className="size-4" />
        </span>
      </div>
      <Link
        href="/contact"
        aria-label={`Work with ${member.name}, ${member.role}`}
        className="absolute inset-0 rounded-2xl"
      />
    </motion.article>
  );
}
