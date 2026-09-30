"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  isSoundEnabled,
  playShutterSound,
  setSoundEnabled,
  subscribeSound,
} from "@/lib/shutter";

export function useShutterSound() {
  const enabled = useSyncExternalStore(subscribeSound, isSoundEnabled, () => true);

  const toggle = useCallback(() => {
    const next = !isSoundEnabled();
    setSoundEnabled(next);
    if (next) playShutterSound();
  }, []);

  return { enabled, toggle, play: playShutterSound };
}
