"use client";

import { categories, type Filter } from "@/data/projects";

type Props = { active: Filter; onChange: (f: Filter) => void };

export default function PortfolioFilters({ active, onChange }: Props) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
    >
      {categories.map((c) => {
        const on = c === active;
        return (
          <button
            key={c}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(c)}
            className={`h-10 shrink-0 rounded-full px-5 text-[13px] font-medium transition-all duration-300 ${
              on
                ? "bg-gradient-to-b from-gold-300 to-gold-500 text-ink-950 shadow-[0_8px_24px_-10px_rgba(217,154,58,0.8)]"
                : "border border-white/12 bg-transparent text-white/70 hover:border-gold-500/50 hover:text-gold-200"
            }`}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}
