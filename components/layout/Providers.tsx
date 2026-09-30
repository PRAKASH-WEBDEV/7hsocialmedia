"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { ProjectModalProvider } from "@/components/portfolio/PortfolioModal";

/** `reducedMotion="user"` disables transform animations for prefers-reduced-motion. */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ProjectModalProvider>{children}</ProjectModalProvider>
    </MotionConfig>
  );
}
