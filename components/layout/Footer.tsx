import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { navLinks, site, socials } from "@/data/site";
import { services } from "@/data/services";
import Logo from "@/components/ui/Logo";
import { socialIcons } from "@/components/ui/icons";

const heading = "text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-400";
const link = "text-sm text-white/55 transition-colors hover:text-gold-200";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-ink-950/80">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 sm:py-16 lg:gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo size={56} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/45">
            Strategy, content and campaigns that turn attention into measurable growth.
          </p>
          <ul className="mt-6 flex gap-3">
            {socials.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`7H Media on ${s.label}`}
                    className="grid size-10 place-items-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-gold-500/50 hover:text-gold-200"
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className={heading}>Navigate</h2>
          <ul className="mt-5 space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>Services</h2>
          <ul className="mt-5 space-y-3">
            {services.map((s) => (
              <li key={s.id}>
                <Link href="/services" className={link}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>Contact</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/55">
            <li className="flex items-center gap-3"><Mail aria-hidden className="size-4 text-gold-400" /><a className="hover:text-gold-200" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li className="flex items-center gap-3"><Phone aria-hidden className="size-4 text-gold-400" />{site.phone}</li>
            <li className="flex items-center gap-3"><MapPin aria-hidden className="size-4 text-gold-400" />{site.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-white/35 sm:flex-row sm:px-6">
          <p>&copy; {new Date().getFullYear()} 7H Media. All rights reserved.</p>
          <p className="tracking-wide">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
