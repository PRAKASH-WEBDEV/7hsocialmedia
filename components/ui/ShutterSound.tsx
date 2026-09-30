"use client";

import { useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useShutterSound } from "@/hooks/useShutterSound";
import { playShutterSound } from "@/lib/shutter";

const CLICKABLE = "a[href], button, [role='button'], summary, select, [data-shutter]";

/**
 * Plays a camera-shutter sound for every clickable element (one delegated
 * listener) and renders the Sound On / Off toggle.
 */
export default function ShutterSound() {
  const { enabled, toggle } = useShutterSound();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest?.(CLICKABLE);
      if (!el || el.closest("[data-no-shutter]")) return;
      if ((el as HTMLButtonElement).disabled) return;
      playShutterSound();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const Icon = enabled ? Volume2 : VolumeX;
  return (
    <button
      type="button"
      data-no-shutter
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Sound on. Click to mute shutter sounds" : "Sound off. Click to enable shutter sounds"}
      className="glass fixed bottom-5 left-5 z-40 flex h-10 items-center gap-2 rounded-full px-4 text-xs font-medium text-white/70 transition-colors hover:border-gold-500/40 hover:text-gold-200"
    >
      <Icon aria-hidden className="size-4 text-gold-400" />
      <span>{enabled ? "Sound On" : "Sound Off"}</span>
    </button>
  );
}
