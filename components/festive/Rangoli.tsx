/** A slowly turning rangoli mandala, drawn with SVG. Decorative only. */
export default function Rangoli({ className = "" }: { className?: string }) {
  const ring = (count: number, render: (angle: number, i: number) => React.ReactNode) =>
    Array.from({ length: count }, (_, i) => render((360 / count) * i, i));

  return (
    <svg aria-hidden viewBox="-100 -100 200 200" className={`rangoli ${className}`}>
      <g fill="none" strokeWidth=".8">
        {ring(16, (a, i) => (
          <ellipse key={`o${i}`} rx="9" ry="34" cy="-58" transform={`rotate(${a})`} stroke="#d99a3a" strokeOpacity=".55" />
        ))}
        {ring(12, (a, i) => (
          <ellipse key={`m${i}`} rx="11" ry="26" cy="-34" transform={`rotate(${a + 15})`} stroke="#ff7a3d" strokeOpacity=".5" fill="#ff7a3d" fillOpacity=".05" />
        ))}
        {ring(8, (a, i) => (
          <ellipse key={`i${i}`} rx="8" ry="15" cy="-17" transform={`rotate(${a})`} stroke="#ff4f8b" strokeOpacity=".5" fill="#ff4f8b" fillOpacity=".06" />
        ))}
        {ring(24, (a, i) => (
          <circle key={`d${i}`} r="2.2" cy="-95" transform={`rotate(${a})`} fill="#ffd66b" fillOpacity=".55" stroke="none" />
        ))}
        <circle r="92" stroke="#d99a3a" strokeOpacity=".25" strokeDasharray="2 4" />
        <circle r="46" stroke="#ffd66b" strokeOpacity=".3" />
        <circle r="8" fill="#ffd66b" fillOpacity=".35" stroke="#ffe0a0" strokeOpacity=".6" />
      </g>
    </svg>
  );
}
