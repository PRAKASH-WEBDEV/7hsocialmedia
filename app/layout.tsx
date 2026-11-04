import type { Metadata, Viewport } from "next";
import { Allura, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/data/site";
import JsonLd from "@/components/seo/JsonLd";
import { DEFAULT_TITLE, OG_IMAGE, SITE_NAME, graph, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
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
        <JsonLd data={graph(organizationJsonLd, websiteJsonLd)} />
        {children}
      </body>
    </html>
  );
}
