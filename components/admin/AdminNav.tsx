"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Images, LayoutDashboard, Video } from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/videos", label: "Videos", icon: Video },
  { href: "/admin/posts", label: "Posts", icon: Images },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active ? "border-gold-400/60 bg-gold-500/15 text-gold-200" : "border-white/10 text-white/60 hover:border-white/25 hover:text-cream"
            }`}
          >
            <Icon aria-hidden className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
