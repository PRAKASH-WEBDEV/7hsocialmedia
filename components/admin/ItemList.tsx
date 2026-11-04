"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ExternalLink, FileText, Images, Trash2, Video } from "lucide-react";
import { removeItem } from "@/app/admin/actions";
import type { ContentItem } from "@/lib/content";

function describe(item: ContentItem) {
  if (item.kind === "video") return { icon: Video, title: item.title, meta: item.category, thumb: item.thumbnail, href: "/work" };
  if (item.kind === "post")
    return { icon: Images, title: item.caption || "Untitled post", meta: `${item.images.length} image${item.images.length > 1 ? "s" : ""}`, thumb: item.images[0], href: "/blog" };
  return { icon: FileText, title: item.title, meta: "Blog", thumb: item.cover, href: `/blog/${item.slug}` };
}

const date = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function ItemList({ items, empty }: { items: ContentItem[]; empty: string }) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState("");

  const onDelete = async (item: ContentItem) => {
    if (!confirm(`Delete "${describe(item).title}"? This also deletes its uploaded files.`)) return;
    setPending(item.id);
    setError("");
    const res = await removeItem(item.id);
    setPending(null);
    if (!res.ok) setError(res.error ?? "Delete failed.");
    router.refresh();
  };

  if (!items.length) return <p className="py-6 text-center text-sm text-white/45">{empty}</p>;

  return (
    <>
      {error && <p role="alert" className="mb-3 text-sm text-red-400">{error}</p>}
      <ul className="divide-y divide-white/8">
        {items.map((item) => {
          const d = describe(item);
          return (
            <li key={item.id} className="flex items-center gap-4 py-3">
              <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg border border-white/10 bg-ink-900">
                {d.thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element -- tiny admin preview
                  <img src={d.thumb} alt="" className="size-full object-cover" />
                ) : (
                  <d.icon aria-hidden className="size-5 text-gold-300" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-cream">{d.title}</p>
                <p className="text-xs text-white/45">{d.meta} · {date(item.createdAt)}</p>
              </div>
              <a href={d.href} target="_blank" rel="noopener noreferrer" aria-label="View on site" className="grid size-9 place-items-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-cream">
                <ExternalLink aria-hidden className="size-4" />
              </a>
              <button
                type="button"
                onClick={() => onDelete(item)}
                disabled={pending === item.id}
                aria-label={`Delete ${d.title}`}
                className="grid size-9 place-items-center rounded-full text-white/55 transition-colors hover:bg-red-500/15 hover:text-red-300 disabled:opacity-40"
              >
                <Trash2 aria-hidden className="size-4" />
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
