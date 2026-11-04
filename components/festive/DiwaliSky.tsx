"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { isDiwali } from "@/data/festive";

type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; color: string; kind: "rocket" | "spark" | "ember" };

const COLORS = ["#ffd66b", "#ffb347", "#ff7a3d", "#ff4f8b", "#fff3c4", "#7ee0ff"];
const pick = <T,>(a: readonly T[]) => a[Math.floor(Math.random() * a.length)];
const noop = () => () => {};

/** Page-wide Diwali backdrop: distant fireworks, rising embers and a sparkle trail on the cursor. */
export default function DiwaliSky() {
  const enabled = useSyncExternalStore(
    noop,
    () => isDiwali() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!enabled || !el || !ctx) return;

    const parts: Particle[] = [];
    let w = 0, h = 0, raf = 0, last = performance.now(), nextLaunch = 600;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      el.width = w * dpr;
      el.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ember = (): Particle => ({
      x: Math.random() * w, y: h + 10, vx: (Math.random() - 0.5) * 8, vy: -(12 + Math.random() * 22),
      life: 0, max: 8 + Math.random() * 8, size: 0.8 + Math.random() * 1.6, color: pick(COLORS.slice(0, 3)), kind: "ember",
    });

    const burst = (x: number, y: number) => {
      const color = pick(COLORS);
      const n = 46 + Math.floor(Math.random() * 24);
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n;
        const s = 60 + Math.random() * 90;
        parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, max: 1.2 + Math.random() * 0.8, size: 1.4, color: Math.random() < 0.2 ? "#fff3c4" : color, kind: "spark" });
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || parts.length > 500) return;
      for (let i = 0; i < 2; i++) {
        parts.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - 0.5) * 40, vy: (Math.random() - 0.2) * 40, life: 0, max: 0.6 + Math.random() * 0.4, size: 1.2, color: pick(COLORS.slice(0, 4)), kind: "spark" });
      }
    };

    for (let i = 0; i < 26; i++) {
      const e = ember();
      e.y = Math.random() * h;
      parts.push(e);
    }

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      nextLaunch -= dt * 1000;
      if (nextLaunch <= 0 && parts.length < 450) {
        nextLaunch = 1600 + Math.random() * 1800;
        parts.push({ x: w * (0.15 + Math.random() * 0.7), y: h, vx: (Math.random() - 0.5) * 30, vy: -(h * 0.75 + Math.random() * h * 0.25), life: 0, max: 0.9 + Math.random() * 0.3, size: 1.8, color: "#ffe0a0", kind: "rocket" });
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life += dt;
        if (p.kind === "spark") {
          p.vx *= 0.97;
          p.vy = p.vy * 0.97 + 60 * dt;
        } else if (p.kind === "rocket") {
          p.vy += h * 0.6 * dt;
        } else {
          p.vx += (Math.random() - 0.5) * 6 * dt;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.life >= p.max || p.y < -20) {
          parts.splice(i, 1);
          if (p.kind === "rocket") burst(p.x, p.y);
          else if (p.kind === "ember") parts.push(ember());
          continue;
        }

        const fade = 1 - p.life / p.max;
        const alpha = p.kind === "ember" ? 0.55 * Math.min(1, p.life * 2) * fade * (0.7 + 0.3 * Math.sin(now / 120 + i)) : fade;
        ctx.globalAlpha = Math.max(0, alpha) * 0.85;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (p.kind === "spark" ? 0.6 + fade : 1), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <canvas ref={canvas} aria-hidden className="pointer-events-none fixed inset-0 -z-[5] h-full w-full" />;
}
