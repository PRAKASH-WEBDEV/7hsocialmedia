import type { Metadata, Viewport } from "next";
import { Allura, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/data/site";
import JsonLd from "@/components/seo/JsonLd";
import { DEFAULT_TITLE, OG_IMAGE, SITE_NAME, graph, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Providers from "@/components/layout/Providers";
import Atmosphere from "@/components/ui/Atmosphere";
import ShutterSound from "@/components/ui/ShutterSound";
import "./globals.css";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const script = Allura({ subsets: ["latin"], weight: "400", variable: "--font-script", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: DEFAULT_TITLE, template: `%s | ${SITE_NAME}` },
  description: site.description,
  applicationName: SITE_NAME,
  keywords: [
    "digital marketing agency",
    "creative agency",
    "social media marketing",
    "performance marketing",
    "content creation",
    "brand strategy",
    "influencer marketing",
    "web development",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: site.description,
    url: "/",
    locale: "en_IN",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: site.description,
    images: [OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${script.variable}`}>
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only z-[80] rounded-full bg-gold-400 px-4 py-2 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <JsonLd data={graph(organizationJsonLd, websiteJsonLd)} />
        <Atmosphere />
        <Providers>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <ShutterSound />
        </Providers>
      </body>
    </html>
  );
}
