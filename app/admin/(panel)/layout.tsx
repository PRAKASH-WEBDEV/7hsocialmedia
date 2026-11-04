import type { Metadata } from "next";
import { ExternalLink, LogOut } from "lucide-react";
import { logout } from "@/app/admin/actions";
import AdminNav from "@/components/admin/AdminNav";
import Logo from "@/components/ui/Logo";
import { blobEnabled } from "@/lib/content";
import { requireAdmin } from "@/lib/session";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | 7H Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const storageMissing = !blobEnabled() && Boolean(process.env.VERCEL);

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-white/8 bg-ink-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Logo size={38} />
          <div className="flex items-center gap-1">
            <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/60 hover:text-cream">
              <ExternalLink aria-hidden className="size-4" />
              <span className="hidden sm:inline">View site</span>
            </a>
            <form action={logout}>
              <button type="submit" className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/60 hover:text-cream">
                <LogOut aria-hidden className="size-4" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1100px] space-y-6 px-4 py-8 sm:px-6">
        <AdminNav />
        {storageMissing && (
          <p role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
            Uploads are off: no storage is connected. In Vercel, open this project → Storage → Create → Blob, connect it,
            then redeploy.
          </p>
        )}
        {children}
      </main>
    </div>
  );
}
