import { Play } from "lucide-react";

/** Obvious, ring-on-hover play button. Parent must have the `group` class. */
export default function PlayButton({ size = 64 }: { size?: number }) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className="relative grid place-items-center rounded-full border border-white/70 bg-black/65 text-white shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-gold-300 group-hover:bg-black/80"
    >
      <span className="absolute -inset-1.5 rounded-full border border-gold-300/0 transition-all duration-500 group-hover:border-gold-300/70" />
      <Play className="ml-0.5 fill-current" style={{ width: size * 0.36, height: size * 0.36 }} />
    </span>
  );
}
