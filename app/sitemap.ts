import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Static content: bump this date when page content meaningfully changes.
const lastModified = new Date("2026-10-01");

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/work", priority: 0.8, changeFrequency: "monthly" },
  { path: "/team", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, ...rest }) => ({ url: `${site.url}${path}`, lastModified, ...rest }));
}
