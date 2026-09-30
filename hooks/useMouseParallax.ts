"use client";

import { useEffect } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

type Pointer = { x: MotionValue<number>; y: MotionValue<number> };

/** Smoothed pointer position normalised to -1..1. Inert for touch and reduced motion. */
export function useMouseParallax(): Pointer {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 40, damping: 20 });
  const y = useSpring(my, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return { x, y };
}

/** Offset in px for one layer. Keep `depth` <= 14 so movement stays subtle. */
export function useParallaxLayer(pointer: Pointer, depth: number) {
  const x = useTransform(pointer.x, (v) => v * depth);
  const y = useTransform(pointer.y, (v) => v * depth);
  return { x, y };
}
