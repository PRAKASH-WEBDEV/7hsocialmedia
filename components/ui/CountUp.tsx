"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

/** Counts a stat like "120+" or "4.8x" up from zero the first time it scrolls into view. */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    const el = ref.current;
    const m = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!inView || !el || !m || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const decimals = m[1].split(".")[1]?.length ?? 0;
    const controls = animate(0, parseFloat(m[1]), {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = v.toFixed(decimals) + m[2]),
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{value}</span>;
}
