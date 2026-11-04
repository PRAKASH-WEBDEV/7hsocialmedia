import Link from "next/link";
import { FileText, Images, Video } from "lucide-react";
import ItemList from "@/components/admin/ItemList";
import { Panel } from "@/components/admin/ui";
import { getAll } from "@/lib/content";

export const metadata = { title: "Overview" };

export default async function AdminHome() {
  const items = await getAll();
  const count = (kind: string) => items.filter((i) => i.kind === kind).length;
  const cards = [
    { href: "/admin/videos", label: "Videos", hint: "Shown on Our Work", icon: Video, n: count("video") },
    { href: "/admin/posts", label: "Posts", hint: "Shown on the Blog page", icon: Images, n: count("post") },
    { href: "/admin/blogs", label: "Blogs", hint: "Articles on the Blog page", icon: FileText, n: count("blog") },
  ];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ href, label, hint, icon: Icon, n }) => (
          <Link key={href} href={href} className="glass rounded-2xl p-5 transition-colors hover:border-gold-500/40">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
              {label}
              <Icon aria-hidden className="size-5 text-gold-300" />
            </div>
            <p className="mt-3 text-4xl font-bold text-cream">{n}</p>
            <p className="mt-1 text-xs text-white/45">{hint}</p>
          </Link>
        ))}
      </div>
      <Panel title="Recent uploads">
        <ItemList items={items.slice(0, 10)} empty="Nothing uploaded yet. Pick Videos, Posts or Blogs above to add your first one." />
      </Panel>
    </>
  );
}
