/** Fixed, page-wide cinematic backdrop: dark base, warm light, grain. Pure CSS. */
export default function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 15% 0%, rgba(217,154,58,0.12), transparent 70%), radial-gradient(50% 40% at 100% 30%, rgba(199,131,40,0.08), transparent 70%), linear-gradient(180deg, #080808 0%, #050505 60%, #0b0b0b 100%)",
        }}
      />
      <div className="smoke smoke-a absolute -left-[20%] top-[10%] h-[50vh] w-[60vw] opacity-40" />
      <div className="smoke smoke-b absolute -right-[20%] top-[40%] h-[50vh] w-[60vw] opacity-30" />
      <div className="noise absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
      />
    </div>
  );
}
