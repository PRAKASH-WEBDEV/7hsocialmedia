import { Crown, Camera } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import type { TeamMember } from "@/data/team";

/** Script role label with a crown, plus the small glass name plate. */
export default function TeamLeaderCard({ member }: { member: TeamMember }) {
  return (
    <>
      <div className="pointer-events-none absolute right-0 top-[8%] w-[9.5rem] -rotate-6 text-right sm:top-[10%] sm:w-[11rem]">
        <Crown aria-hidden strokeWidth={1.4} className="ml-auto mr-2 size-7 text-gold-300 sm:size-8" />
        <p className="font-script text-[2.6rem] leading-[0.85] text-gold-gradient drop-shadow-[0_2px_18px_rgba(217,154,58,0.35)] sm:text-[3.4rem]">
          {member.role}
        </p>
      </div>

      <GlassCard className="absolute right-0 top-[46%] w-fit px-4 py-3">
        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-400">
          <Camera aria-hidden className="size-3" />
          {member.role}
        </p>
        <p className="mt-1 text-lg font-semibold leading-none text-cream">{member.name}</p>
        <p className="mt-1 text-xs text-white/50">7H Media</p>
      </GlassCard>
    </>
  );
}
