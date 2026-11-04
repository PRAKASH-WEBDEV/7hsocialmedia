const COLORS = ["#ffd66b", "#ff8a1f", "#ff4f8b", "#ffe0a0", "#7ee0ff"];
const SCALLOP = 100;
const COUNT = 16;

/** A swagged string of twinkling festival lights, cropped to the container width. */
export default function StringLights({ className = "" }: { className?: string }) {
  const width = SCALLOP * COUNT;
  const wire = Array.from({ length: COUNT }, (_, i) => `Q${i * SCALLOP + SCALLOP / 2},42 ${(i + 1) * SCALLOP},4`).join(" ");
  const bulbs = Array.from({ length: COUNT * 3 }, (_, i) => {
    const t = ((i % 3) + 1) / 4; // three bulbs along each scallop
    const x0 = Math.floor(i / 3) * SCALLOP;
    const x = x0 + t * SCALLOP;
    const y = 4 + 76 * t * (1 - t); // point on the wire's quadratic curve
    return { x, y: y + 5, color: COLORS[i % COLORS.length], delay: (i % 7) * 0.35 };
  });

  return (
    <svg aria-hidden viewBox={`0 0 ${width} 60`} preserveAspectRatio="xMidYMin slice" className={`h-[60px] w-full ${className}`}>
      <path d={`M0,4 ${wire}`} fill="none" stroke="#3a2a16" strokeWidth="1.5" />
      {bulbs.map((b, i) => (
        <g key={i} className="bulb" style={{ animationDelay: `${b.delay}s`, color: b.color }}>
          <circle cx={b.x} cy={b.y} r="9" fill="currentColor" opacity=".25" />
          <circle cx={b.x} cy={b.y} r="4" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}
