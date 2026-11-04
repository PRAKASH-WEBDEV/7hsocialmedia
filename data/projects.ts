export const categories = [
  "All",
  "Reels",
  "Brand Videos",
  "Ad Campaigns",
  "Event Coverage",
  "Behind The Scenes",
] as const;

export type Category = Exclude<(typeof categories)[number], "All">;
export type Filter = (typeof categories)[number];

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  thumbnail: string;
  videoUrl?: string;
  description: string;
  stats?: { value: string; label: string }[];
};

// Portfolio items come from the admin panel (videos uploaded at /admin/videos).
