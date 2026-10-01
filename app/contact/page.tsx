import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow, Gold } from "@/components/ui/SectionHeading";
import JsonLd from "@/components/seo/JsonLd";
import { site, whatsappLink } from "@/data/site";
import { breadcrumbNode, graph, pageMetadata, webPageJsonLd } from "@/lib/seo";

const seo = {
  title: "Contact Us: Start a Project",
  description: "Start a project with 7H Media. Tell us about your brand and goals and we'll build a custom strategy.",
  path: "/contact",
};

export const metadata = pageMetadata(seo);

const details = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Phone", value: site.phone, href: undefined },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: whatsappLink() },
  { icon: MapPin, label: "Location", value: site.location, href: undefined },
] as const;

export default function ContactPage() {
  return (
    <>
    <JsonLd data={graph(webPageJsonLd(seo, "ContactPage"), breadcrumbNode(seo.path, "Contact"))} />
    <section className="relative pb-24 pt-32 sm:pt-40" aria-labelledby="contact-heading">
      <div className="mx-auto grid max-w-[1240px] gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
          <h1
            id="contact-heading"
            className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-cream sm:text-6xl"
          >
            Let&apos;s Build Your
            <br />
            <Gold>Next Story.</Gold>
          </h1>
          <p className="mt-6 max-w-md text-white/60">
            Tell us about your brand and goals. We&apos;ll come back with a custom strategy.
          </p>
          <ul className="mt-10 space-y-5">
            {details.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-full border border-gold-500/30 text-gold-300">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-white/40">{label}</span>
                  {href ? (
                    <a href={href} className="text-cream transition-colors hover:text-gold-200">{value}</a>
                  ) : (
                    <span className="text-cream">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
    </>
  );
}
