import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";
import Logo from "@/components/ui/Logo";

export const metadata: Metadata = { title: "Admin Login", robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo size={52} />
        </div>
        <div className="glass glass-gold rounded-2xl p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-cream">Admin Panel</h1>
          <p className="mt-1 mb-6 text-sm text-white/50">Sign in to upload videos, posts and blogs.</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
