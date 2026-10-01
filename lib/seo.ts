import type { Metadata } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { team } from "@/data/team";

export const SITE_NAME = "7H Media";
export const DEFAULT_TITLE = "7H Media | Digital Marketing & Creative Agency";
export const OG_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "7H Media: Your Face = Your Business",
};

const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;

type PageSeo = { title: string; description: string; path: string };

/**
 * Per-page metadata. Next.js replaces (not merges) `openGraph`/`twitter`,
 * so every field is set here to keep each page complete.
 */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_IN",
      title: fullTitle,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/* ---------------- JSON-LD builders (only facts present in the project) ---------------- */

const orgId = `${site.url}/#organization`;
const siteId = `${site.url}/#website`;

export const organizationJsonLd = {
  "@type": "Organization",
  "@id": orgId,
  name: SITE_NAME,
  alternateName: "7H Media Agency",
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/img/logo-mark.webp`,
    width: 640,
    height: 640,
  },
  image: `${site.url}${OG_IMAGE.url}`,
  slogan: site.tagline,
  description: site.description,
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": siteId,
  url: site.url,
  name: SITE_NAME,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": orgId },
};

export const graph = (...nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function webPageJsonLd(
  { path, title, description }: { path: string; title: string; description: string },
  type: "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage" = "WebPage",
) {
  return {
    "@type": type,
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": siteId },
    about: { "@id": orgId },
    breadcrumb: { "@id": `${abs(path)}#breadcrumb` },
  };
}

/** Breadcrumb with an @id so WebPage can reference it. */
export const breadcrumbNode = (path: string, name: string) => ({
  ...breadcrumbJsonLd([{ name, path }]),
  "@id": `${abs(path)}#breadcrumb`,
});

export const serviceListJsonLd = {
  "@type": "ItemList",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      "@id": `${abs("/services")}#${s.id}`,
      name: s.title,
      serviceType: s.title,
      description: s.description,
      provider: { "@id": orgId },
    },
  })),
};

export const workListJsonLd = {
  "@type": "ItemList",
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: `${p.title}: ${p.subtitle}`,
      description: p.description,
      genre: p.category,
      image: `${site.url}${p.thumbnail}`,
      creator: { "@id": orgId },
    },
  })),
};

export const teamJsonLd = team.map((m) => ({
  "@type": "Person",
  name: m.name,
  jobTitle: m.role,
  description: m.bio,
  image: `${site.url}${m.image}`,
  worksFor: { "@id": orgId },
}));
