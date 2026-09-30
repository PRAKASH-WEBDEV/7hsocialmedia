import { stats } from "@/data/site";

export default function HeroStats() {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-0">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`sm:px-5 ${i === 0 ? "sm:pl-0" : "sm:border-l sm:border-white/10"}`}
        >
          <dd className="text-3xl font-semibold tracking-tight text-gold-gradient sm:text-[2rem]">
            {s.value}
          </dd>
          <dt className="mt-1 text-xs text-white/40">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}
