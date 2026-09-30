import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";
import GoldButton from "@/components/ui/GoldButton";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow, Gold } from "@/components/ui/SectionHeading";
import Smoke from "@/components/ui/Smoke";

export default function CtaSection() {
  return (
    <section className="relative py-16 sm:py-24" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-white/8 bg-ink-900">
            <Image
              src="/img/studio.webp"
              alt=""
              fill
              sizes="(min-width: 1240px) 1240px, 100vw"
              loading="lazy"
              className="-z-20 object-cover object-right opacity-70"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/20" />
            <Smoke className="-z-10 opacity-60" />

            <div className="relative grid items-center gap-10 px-6 py-16 sm:px-12 sm:py-24 lg:grid-cols-2">
              <div>
                <Eyebrow>Let&apos;s work together</Eyebrow>
                <h2
                  id="cta-heading"
                  className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-cream sm:text-6xl"
                >
                  Ready to Grow
                  <br />
                  Your <Gold>Brand?</Gold>
                </h2>
                <p className="mt-5 max-w-md text-white/60">
                  Let&apos;s create a custom strategy for your business.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <GoldButton href="/contact" size="lg">Start a Project</GoldButton>
                  <GoldButton
                    href={whatsappLink()}
                    variant="outline"
                    size="lg"
                    icon={<MessageCircle aria-hidden className="size-5" />}
                  >
                    Chat on WhatsApp
                  </GoldButton>
                </div>
              </div>

              <div className="hidden justify-end lg:flex">
                <Image
                  src="/img/logo-mark.webp"
                  alt="7H Media — Your Face = Your Business"
                  width={280}
                  height={280}
                  sizes="280px"
                  loading="lazy"
                  className="rounded-full opacity-90 shadow-[0_0_80px_-10px_rgba(217,154,58,0.45)]"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
