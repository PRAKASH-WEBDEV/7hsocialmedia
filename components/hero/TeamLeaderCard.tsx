import GlassCard from "@/components/ui/GlassCard";
import type { TeamMember } from "@/data/team";

/** Small glass name plate. */
export default function TeamLeaderCard({ member }: { member: TeamMember }) {
  return (
    <GlassCard className="absolute right-0 top-[46%] w-fit px-4 py-3">
      <p className="text-lg font-semibold leading-none text-cream">{member.name}</p>
      <p className="mt-1 text-xs text-white/50">7H Media</p>
    </GlassCard>
  );
}
