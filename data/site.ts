export const site = {
  name: "7H MEDIA",
  tagline: "Your Face = Your Business",
  title: "7H Media — Your Face = Your Business",
  description:
    "7H Media is a digital marketing startup founded by Ashish Thakur, helping brands grow through strategy, content, performance marketing and digital experiences.",
  url: "https://7hmediaagency.com", // canonical production origin (non-www); never env-driven so previews cannot leak into metadata
  email: "7horsemediaa@gmail.com",
  phone: "+91 88267 31020",
  whatsapp: "918826731020",
  location: "India",
};

export const whatsappLink = (message = "Hi 7H Media, I'd like to discuss a project.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;

export const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
] as const;

export const stats = [
  { value: "120+", label: "Campaigns" },
  { value: "32M+", label: "Audience Reach" },
  { value: "4.8x", label: "Average ROAS" },
  { value: "90+", label: "Brands Supported" },
] as const;
