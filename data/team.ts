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
    slug: "mukul",
    name: "Mukul Dhurvanshi",
    role: "Senior Video Editor",
    specialty: "Reels & Post-Production",
    bio: "Shapes raw footage into polished, scroll-stopping edits with cinematic pacing, colour and sound.",
    image: "/team01.png",
    quote: "Every frame should earn its place on screen.",
  },
  {
    slug: "aman",
    name: "Aman",
    role: "3D UI/UX Designer",
    specialty: "3D, UI & UX Design",
    bio: "Designs immersive 3D visuals and intuitive interfaces that make brands feel premium and easy to use.",
    image: "/team02.png",
    quote: "Design is how a brand feels before it says a word.",
  },
  {
    slug: "prince",
    name: "Prince",
    role: "Full Stack Developer",
    specialty: "Web & App Development",
    bio: "Builds fast, scalable websites and web apps, from sleek front ends to solid back-end systems.",
    image: "/team03.png",
    quote: "Great ideas deserve code that ships.",
  },
];

/** Founder shown in the hero; not part of the team grid. */
export const leader: TeamMember = {
  slug: "ashish",
  name: "Ashish Thakur",
  role: "Team Leader",
  specialty: "Singer & Founder",
  bio: "Singer turned entrepreneur who founded 7H Media to help brands grow through digital marketing.",
  image: "/pic01.png",
  quote: "We don't just post content, we create opportunities for your brand.",
};

/** Members shown as hero thumbnails. */
export const heroSlides: TeamMember[] = [leader];
