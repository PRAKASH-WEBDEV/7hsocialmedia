import { BookOpen, Award, GraduationCap, Landmark, School, type LucideIcon } from "lucide-react";

export type Client = {
  name: string;
  /** Typographic treatment for the wordmark placeholder. */
  style: "sans" | "serif" | "caps";
  icon?: LucideIcon;
};

// Wordmark placeholders. Swap for real (monochrome) logo files when available.
export const clients: Client[] = [
  { name: "Manipal University", style: "sans", icon: Landmark },
  { name: "Amity University", style: "serif" },
  { name: "Uttaranchal University", style: "sans", icon: BookOpen },
  { name: "Sharda University", style: "sans", icon: School },
  { name: "Lovely Professional University", style: "sans", icon: GraduationCap },
  { name: "Chandigarh University", style: "caps", icon: Award },
];
