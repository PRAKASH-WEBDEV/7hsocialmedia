/** Slow CSS-only smoke and breathing glow. Decorative; sits behind content. */
export default function Smoke({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="glow absolute left-1/2 top-1/3 size-[70%] -translate-x-1/2 -translate-y-1/2" />
      <div className="smoke smoke-a absolute -left-[10%] bottom-[-10%] h-[60%] w-[75%]" />
      <div className="smoke smoke-b absolute -right-[15%] top-[5%] h-[55%] w-[70%]" />
      <div className="smoke smoke-c absolute bottom-[-15%] right-[10%] h-[45%] w-[60%]" />
    </div>
  );
}
