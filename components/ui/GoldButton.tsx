"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "gold" | "outline";
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
};

const sizes = {
  sm: "h-10 px-5 text-[13px]",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-sm",
};

const variants = {
  gold: "bg-gradient-to-b from-gold-300 to-gold-500 text-ink-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_30px_-12px_rgba(217,154,58,0.7)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_14px_40px_-8px_rgba(232,173,85,0.8)]",
  outline:
    "border border-gold-500/40 bg-ink-950/50 text-cream backdrop-blur hover:border-gold-300/70 hover:bg-gold-500/10",
};

export default function GoldButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "gold",
  size = "md",
  arrow = true,
  icon,
  className = "",
  disabled,
}: Props) {
  const cls = `group inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold tracking-wide transition-[box-shadow,background-color,border-color] duration-300 disabled:opacity-60 ${sizes[size]} ${variants[variant]} ${className}`;
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  );

  let el: ReactNode;
  if (href && /^https?:/.test(href)) {
    el = (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  } else if (href) {
    el = (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  } else {
    el = (
      <button type={type} onClick={onClick} disabled={disabled} className={cls}>
        {content}
      </button>
    );
  }

  return (
    <motion.span className="inline-flex" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
      {el}
    </motion.span>
  );
}
