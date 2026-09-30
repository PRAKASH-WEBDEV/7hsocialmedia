"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/site";
import GoldButton from "@/components/ui/GoldButton";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on route change, lock body scroll and close on Escape while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6"
    >
      <div className="glass relative mx-auto flex h-[68px] max-w-[1240px] items-center justify-between rounded-2xl bg-ink-950/70 pl-4 pr-3 sm:h-[72px] sm:pl-5">
        <Logo size={46} priority />

        <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block rounded-full border px-5 py-2.5 text-[13px] font-medium transition-colors duration-300 ${
                    isActive(l.href)
                      ? "border-white/10 bg-white/[0.06] text-cream"
                      : "border-transparent text-white/60 hover:text-gold-200"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <GoldButton href="/contact" size="sm">Start a Project</GoldButton>
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className="grid size-11 place-items-center rounded-full border border-white/15 text-cream transition-colors hover:border-gold-500/50 lg:hidden"
          >
            <Menu aria-hidden className="size-5" />
          </button>
        </div>
      </div>

    </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden"
            />
            <motion.nav
              key="drawer"
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col overflow-y-auto border-l border-white/10 bg-ink-950 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="pl-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-400">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-11 place-items-center rounded-full border border-white/15 text-cream transition-colors hover:border-gold-500/50"
                >
                  <X aria-hidden className="size-5" />
                </button>
              </div>
              <ul className="mt-6">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.35 }}
                  >
                    <Link
                      href={l.href}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      className={`flex min-h-12 items-center rounded-xl px-4 py-3.5 text-lg font-medium ${
                        isActive(l.href) ? "bg-white/[0.06] text-gold-200" : "text-white/75"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <GoldButton href="/contact" className="w-full">Start a Project</GoldButton>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
