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
  /** Add a real video URL (mp4/webm) to enable playback in the modal. */
  videoUrl?: string;
  description: string;
  stats?: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    id: "product-reel",
    title: "Product Reel",
    subtitle: "E-Commerce Brand",
    category: "Reels",
    thumbnail: "/img/side-1.webp",
    videoUrl: "",
    description: "Scroll-stopping product reels shot and cut for a fast-growing e-commerce brand.",
  },
  {
    id: "brand-campaign",
    title: "Brand Campaign",
    subtitle: "Education Sector",
    category: "Brand Videos",
    thumbnail: "/img/side-2.webp",
    videoUrl: "",
    description: "A brand film and cut-down series positioning an education brand for a new intake.",
  },
  {
    id: "event-coverage",
    title: "Event Coverage",
    subtitle: "On-Ground Event",
    category: "Event Coverage",
    thumbnail: "/img/side-3.webp",
    videoUrl: "",
    description: "Multi-camera event coverage with same-day highlight reels for social.",
  },
  {
    id: "behind-the-scenes",
    title: "Behind The Scenes",
    subtitle: "Our Production",
    category: "Behind The Scenes",
    thumbnail: "/img/work-5.webp",
    videoUrl: "",
    description: "A look inside our studio and sets: the people, gear and process behind the work.",
  },
  {
    id: "social-campaign",
    title: "Reels",
    subtitle: "Social Campaign",
    category: "Reels",
    thumbnail: "/img/work-1.webp",
    videoUrl: "",
    description: "A month-long reels campaign built around one idea and many short stories.",
  },
  {
    id: "university-brand-video",
    title: "Brand Video",
    subtitle: "University",
    category: "Brand Videos",
    thumbnail: "/img/work-2.webp",
    videoUrl: "",
    description: "Campus, culture and student voices woven into a cinematic university brand video.",
  },
  {
    id: "real-estate-ad",
    title: "Ad Campaign",
    subtitle: "Real Estate",
    category: "Ad Campaigns",
    thumbnail: "/img/work-3.webp",
    videoUrl: "",
    description: "Lead-generation ad creative for a real estate launch, tested across formats.",
  },
  {
    id: "college-fest",
    title: "Event Coverage",
    subtitle: "College Fest",
    category: "Event Coverage",
    thumbnail: "/img/work-4.webp",
    videoUrl: "",
    description: "Three days of stage, crowd and backstage energy distilled into a festival film.",
  },
  {
    id: "admissions-cutdown",
    title: "Ad Campaign",
    subtitle: "Admissions Cut-downs",
    category: "Ad Campaigns",
    thumbnail: "/img/work-6.webp",
    videoUrl: "",
    description: "Short-form ad cut-downs built from a single shoot for multiple admission channels.",
  },
];

export const featuredProject: Project = {
  id: "university-admission-campaign",
  title: "University Admission Campaign",
  subtitle: "Featured Project",
  category: "Ad Campaigns",
  thumbnail: "/img/featured.webp",
  videoUrl: "",
  description:
    "Complete digital campaign including reels, brand video, ad creatives and lead generation strategy.",
  stats: [
    { value: "+320%", label: "Lead Generation" },
    { value: "4.5x", label: "ROAS" },
    { value: "12M+", label: "Video Views" },
  ],
};
