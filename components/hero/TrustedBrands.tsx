import { clients, type Client } from "@/data/clients";
import Reveal from "@/components/ui/Reveal";
import GoldButton from "@/components/ui/GoldButton";

const styleClass: Record<Client["style"], string> = {
  sans: "text-[15px] font-medium tracking-tight",
  serif: "font-serif text-lg tracking-wider uppercase",
  caps: "text-sm font-semibold uppercase tracking-[0.18em]",
};

export default function TrustedBrands() {
  return (
    <section aria-labelledby="trusted-heading" className="relative py-6">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <Reveal>
          <div className="glass rounded-3xl px-6 py-6 sm:px-8">
            <h2 id="trusted-heading" className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
              Trusted by leading brands
            </h2>
            <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <ul className="no-scrollbar -mx-2 flex items-center gap-10 overflow-x-auto px-2 lg:mx-0 lg:flex-1 lg:justify-between lg:overflow-visible lg:px-0">
                {clients.slice(0, 5).map(({ name, style, icon: Icon }) => (
                  <li
                    key={name}
                    className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap text-white/55 transition-colors duration-300 hover:text-white/90 ${styleClass[style]}`}
                  >
                    {Icon && <Icon aria-hidden strokeWidth={1.5} className="size-6" />}
                    {name}
                  </li>
                ))}
              </ul>
              <GoldButton href="/work" variant="outline" size="sm" className="lg:ml-8 self-start">
                &amp; More
              </GoldButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
