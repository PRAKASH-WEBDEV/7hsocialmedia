export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  /** Card portrait. Replace with real photography in /public/team. */
  image: string;
  /** Large hero portrait; falls back to `image`. */
  heroImage?: string;
  quote: string;
};

export const team: TeamMember[] = [
  {
    slug: "prince",
    name: "Prince",
    role: "Team Leader",
    specialty: "Strategy & Growth",
    bio: "Leads creative direction and growth strategy, turning brand stories into campaigns people remember.",
    image: "/img/team-prince.webp",
    heroImage: "/img/hero-prince.webp",
    quote: "We don't just post content, we create opportunities for your brand.",
  },
  {
    slug: "sneha",
    name: "Sneha",
    role: "Content Strategist",
    specialty: "Social Media",
    bio: "Plans content systems and social calendars that keep audiences engaged and brands consistent.",
    image: "/img/team-sneha.webp",
    quote: "Great content starts with a great question, not a great caption.",
  },
  {
    slug: "aman",
    name: "Aman",
    role: "Video Producer",
    specialty: "Reels & Shoots",
    bio: "Directs shoots end to end, from concept and lighting to the final cut that stops the scroll.",
    image: "/img/team-aman.webp",
    quote: "Every frame should earn its place on screen.",
  },
  {
    slug: "riya",
    name: "Riya",
    role: "Graphic Designer",
    specialty: "Branding & Design",
    bio: "Builds visual identities and campaign design that look premium and stay unmistakably yours.",
    image: "/img/team-riya.webp",
    quote: "Design is how a brand feels before it says a word.",
  },
  {
    slug: "karan",
    name: "Karan",
    role: "Performance Marketer",
    specialty: "Ads & Growth",
    bio: "Runs and optimises paid campaigns with a relentless focus on measurable return.",
    image: "/img/team-karan.webp",
    quote: "Attention is only useful when it converts.",
  },
  {
    slug: "muskan",
    name: "Muskan",
    role: "Project Manager",
    specialty: "Client Success",
    bio: "Keeps every project on time and every client in the loop, from kickoff to delivery.",
    image: "/img/team-muskan.webp",
    quote: "Smooth delivery is part of the creative.",
  },
];

/** Members shown as hero thumbnails. */
export const heroSlides = ["prince", "aman", "karan"]
  .map((slug) => team.find((m) => m.slug === slug))
  .filter((m): m is TeamMember => Boolean(m));
