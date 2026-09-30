"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/data/projects";

type Ctx = { open: (project: Project) => void };
const ProjectModalContext = createContext<Ctx>({ open: () => {} });

export const useProjectModal = () => useContext(ProjectModalContext);

/** Provides `open(project)` to the tree and renders the video modal. */
export function ProjectModalProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<Project | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback((p: Project) => {
    opener.current = document.activeElement as HTMLElement | null;
    setProject(p);
  }, []);
  const close = useCallback(() => {
    setProject(null);
    opener.current?.focus?.();
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <ProjectModalContext.Provider value={value}>
      {children}
      <AnimatePresence>{project && <Modal project={project} onClose={close} />}</AnimatePresence>
    </ProjectModalContext.Provider>
  );
}

function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — ${project.subtitle}`}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="glass glass-gold relative w-full max-w-4xl overflow-hidden rounded-3xl bg-ink-900"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full border border-white/15 bg-black/60 text-cream backdrop-blur transition-colors hover:border-gold-300/60 hover:text-gold-200"
        >
          <X aria-hidden className="size-5" />
        </button>

        <div className="relative aspect-video bg-black">
          {project.videoUrl ? (
            <video
              src={project.videoUrl}
              poster={project.thumbnail}
              controls
              autoPlay
              playsInline
              className="size-full object-contain"
            />
          ) : (
            <>
              <Image
                src={project.thumbnail}
                alt={`${project.title} — ${project.subtitle}`}
                fill
                sizes="(min-width: 896px) 896px, 100vw"
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 grid place-items-center bg-black/40 px-6 text-center">
                <p className="max-w-sm text-sm text-white/70">
                  Video coming soon. Set <code className="text-gold-300">videoUrl</code> for this
                  project in <code className="text-gold-300">data/projects.ts</code> to play it here.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
          <div>
            <span className="rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold-300">
              {project.category}
            </span>
            <h3 className="mt-3 text-2xl font-bold text-cream">{project.title}</h3>
            <p className="text-sm text-gold-400">{project.subtitle}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">{project.description}</p>
          </div>
          {project.stats && (
            <dl className="flex gap-6">
              {project.stats.map((s) => (
                <div key={s.label}>
                  <dd className="text-2xl font-bold text-gold-gradient">{s.value}</dd>
                  <dt className="text-xs text-white/40">{s.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
