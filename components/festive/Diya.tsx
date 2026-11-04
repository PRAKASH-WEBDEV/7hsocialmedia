type Props = { className?: string; delay?: number };

/** A clay diya with a flickering flame. Pure CSS/SVG, decorative only. */
export default function Diya({ className = "", delay = 0 }: Props) {
  return (
    <div aria-hidden className={`relative aspect-[2/1.4] ${className}`}>
      <span className="diya-glow absolute left-1/2 top-0 aspect-square w-[140%] -translate-x-1/2 -translate-y-[35%] rounded-full" style={{ animationDelay: `${delay}s` }} />
      <span className="diya-flame absolute bottom-[52%] left-1/2 w-[22%]" style={{ animationDelay: `${delay}s` }} />
      <svg viewBox="0 0 64 30" className="absolute inset-x-0 bottom-0 w-full">
        <defs>
          <linearGradient id="diya-clay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f5c56b" />
            <stop offset="0.45" stopColor="#c7652a" />
            <stop offset="1" stopColor="#6b2a12" />
          </linearGradient>
        </defs>
        <path d="M2 8 Q32 4 62 8 Q58 28 32 29 Q6 28 2 8 Z" fill="url(#diya-clay)" />
        <path d="M2 8 Q32 13 62 8" fill="none" stroke="#ffe0a0" strokeOpacity=".7" strokeWidth="1.2" />
        <path d="M14 18 Q32 24 50 18" fill="none" stroke="#ffe0a0" strokeOpacity=".35" strokeWidth="1" strokeDasharray="2 3" />
      </svg>
    </div>
  );
}
