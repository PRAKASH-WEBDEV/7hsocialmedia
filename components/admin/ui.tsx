import type { ReactNode } from "react";

export const field =
  "mt-2 w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-cream placeholder:text-white/30 transition-colors focus:border-gold-500/60 focus:outline-none";

export const fileField =
  "mt-2 block w-full cursor-pointer rounded-xl border border-dashed border-white/15 bg-ink-950/40 p-3 text-sm text-white/60 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-gold-500/15 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gold-200 hover:border-gold-500/40";

export function Field({ label, hint, children, className = "" }: { label: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block text-sm text-white/70 ${className}`}>
      {label}
      {hint && <span className="text-white/30"> {hint}</span>}
      {children}
    </label>
  );
}

export function Panel({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="glass rounded-2xl p-5 sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-cream">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-gold-400 transition-[width]" style={{ width: `${value}%` }} />
    </div>
  );
}
