"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import PlayButton from "./PlayButton";
import { useProjectModal } from "./PortfolioModal";

type Props = { project: Project; large?: boolean; className?: string; sizes: string };

export default function PortfolioCard({ project, large, className = "", sizes }: Props) {
  const { open } = useProjectModal();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-ink-800 transition-colors duration-500 hover:border-gold-500/40 ${className}`}
    >
      <Image
        src={project.thumbnail}
        alt=""
        fill
        sizes={sizes}
        loading="lazy"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30 transition-colors duration-500 group-hover:from-black/95 group-hover:via-black/40" />

      <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold-200 backdrop-blur">
        {project.category}
      </span>

      <span className="absolute inset-0 grid place-items-center">
        <PlayButton size={large ? 84 : 64} />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3 className={`font-semibold text-cream ${large ? "text-xl sm:text-2xl" : "text-base"}`}>
          {project.title}
        </h3>
        <p className="text-xs text-white/55 sm:text-sm">{project.subtitle}</p>
      </div>

      <button
        type="button"
        onClick={() => open(project)}
        aria-label={`Play ${project.title}, ${project.subtitle}`}
        className="absolute inset-0 rounded-2xl"
      />
    </motion.article>
  );
}
