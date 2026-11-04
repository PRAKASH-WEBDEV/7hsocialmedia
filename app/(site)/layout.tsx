import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Providers from "@/components/layout/Providers";
import Atmosphere from "@/components/ui/Atmosphere";
import DiwaliSky from "@/components/festive/DiwaliSky";
import ShutterSound from "@/components/ui/ShutterSound";

/** Public site chrome; the admin panel renders without it. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[80] rounded-full bg-gold-400 px-4 py-2 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Atmosphere />
      <DiwaliSky />
      <Providers>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ShutterSound />
      </Providers>
    </>
  );
}
