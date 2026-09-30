import {
  Clapperboard,
  Code2,
  HeartHandshake,
  Send,
  Sparkles,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    tagline: "Reels, content & growth",
    description:
      "Content calendars, community management and reels-first storytelling that grow an audience that actually engages.",
    deliverables: ["Content strategy", "Reels & short-form", "Community management"],
    icon: Sparkles,
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing",
    tagline: "Ads that convert",
    description:
      "Meta, Google and YouTube campaigns built around creative testing and clear return on ad spend.",
    deliverables: ["Meta & Google Ads", "Creative testing", "Conversion tracking"],
    icon: Send,
  },
  {
    id: "content-creation",
    title: "Content Creation",
    tagline: "Reels, shoots & editing",
    description:
      "Full-service production: concept, shoot, edit and delivery for reels, brand films, products and events.",
    deliverables: ["Brand videos", "Product & event shoots", "Editing & motion"],
    icon: Clapperboard,
  },
  {
    id: "brand-strategy",
    title: "Brand Strategy",
    tagline: "Positioning & identity",
    description:
      "Positioning, messaging and visual identity that make a brand memorable and consistent everywhere it appears.",
    deliverables: ["Positioning", "Visual identity", "Brand guidelines"],
    icon: HeartHandshake,
  },
  {
    id: "influencer-marketing",
    title: "Influencer Marketing",
    tagline: "Collaborations & reach",
    description:
      "Creator partnerships matched to your audience, managed from outreach to reporting.",
    deliverables: ["Creator sourcing", "Campaign management", "Performance reports"],
    icon: UserRoundCheck,
  },
  {
    id: "web-development",
    title: "Web Development",
    tagline: "Modern & high-performing",
    description:
      "Fast, elegant websites and landing pages designed to turn the attention you earn into enquiries.",
    deliverables: ["Websites & landing pages", "SEO foundations", "Analytics setup"],
    icon: Code2,
  },
];
