"use client";

import Image from "next/image";
import { featuredProject, projects, type Project } from "@/data/projects";
import GoldButton from "@/components/ui/GoldButton";
import Reveal from "@/components/ui/Reveal";
import SectionHeading, { Gold } from "@/components/ui/SectionHeading";
import PlayButton from "./PlayButton";
import { useProjectModal } from "./PortfolioModal";

const sideProjects = projects.slice(0, 3);

function SideCard({ project }: { project: Project }) {
  const { open } = useProjectModal();
  return (
    <div className="group relative min-h-[150px] overflow-hidden rounded-2xl border border-white/8 bg-ink-800 transition-colors duration-500 hover:border-gold-500/40">
      <Image
        src={project.thumbnail}
        alt=""
        fill
        sizes="(min-width: 1024px) 22vw, 100vw"
        loading="lazy"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />
      <span className="absolute inset-0 grid place-items-center">
        <PlayButton size={52} />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-sm font-semibold text-cream">{project.title}</p>
        <p className="text-xs text-white/55">{project.subtitle}</p>
      </div>
      <button
        type="button"
        onClick={() => open(project)}
        aria-label={`Play ${project.title}, ${project.subtitle}`}
        className="absolute inset-0 rounded-2xl"
      />
    </div>
  );
}

export default function FeaturedShowcase() {
  const { open } = useProjectModal();
  const f = featuredProject;

  return (
    <section className="relative py-20 sm:py-24" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Work"
            title={
              <span id="featured-heading">
                Real Brands.
                <br />
                Real <Gold>Results.</Gold>
              </span>
            }
            description="A showcase of our most impactful projects, from viral reels to full-scale digital campaigns."
            action={<GoldButton href="/work" variant="outline" size="sm">View All Projects</GoldButton>}
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-10 grid gap-4 lg:grid-cols-[2.35fr_1fr]">
          <div className="group relative min-h-[380px] overflow-hidden rounded-3xl border border-white/8 bg-ink-800 transition-colors duration-500 hover:border-gold-500/40 sm:min-h-[460px]">
            <Image
              src={f.thumbnail}
              alt="Camera monitor on a production set during the University Admission Campaign shoot"
              fill
              sizes="(min-width: 1024px) 65vw, 100vw"
              loading="lazy"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
            <span className="absolute inset-0 -translate-y-8 grid place-items-center">
              <PlayButton size={104} />
            </span>

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-md">
                <span className="rounded-full bg-gradient-to-b from-gold-300 to-gold-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-950">
                  Featured Project
                </span>
                <h3 className="mt-3 text-2xl font-bold text-cream sm:text-3xl">{f.title}</h3>
                <p className="mt-2 text-sm text-white/55">{f.description}</p>
              </div>
              <dl className="flex gap-7">
                {f.stats?.map((s) => (
                  <div key={s.label}>
                    <dd className="text-2xl font-bold text-gold-gradient sm:text-3xl">{s.value}</dd>
                    <dt className="text-xs text-white/45">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </div>

            <button
              type="button"
              onClick={() => open(f)}
              aria-label={`Play featured project: ${f.title}`}
              className="absolute inset-0 rounded-3xl"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {sideProjects.map((p) => (
              <SideCard key={p.id} project={p} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
