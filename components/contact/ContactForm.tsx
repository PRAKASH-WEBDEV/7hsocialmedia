"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/data/services";
import { whatsappLink } from "@/data/site";
import GoldButton from "@/components/ui/GoldButton";
import GlassCard from "@/components/ui/GlassCard";

const field =
  "mt-2 w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-cream placeholder:text-white/30 transition-colors focus:border-gold-500/60 focus:outline-none";

/** No backend yet: submitting hands the enquiry to WhatsApp, pre-filled. */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const message = [
      `Hi 7H Media, I'm ${d.get("name")}.`,
      `Email: ${d.get("email")}`,
      d.get("phone") ? `Phone: ${d.get("phone")}` : "",
      `Interested in: ${d.get("service")}`,
      `${d.get("message")}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <GlassCard gold className="p-6 sm:p-8">
      <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm text-white/70">
          Name
          <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="text-sm text-white/70">
          Email
          <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
        </label>
        <label className="text-sm text-white/70">
          Phone <span className="text-white/30">(optional)</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+91" className={field} />
        </label>
        <label className="text-sm text-white/70">
          Service
          <select name="service" defaultValue={services[0].title} className={field}>
            {services.map((s) => (
              <option key={s.id} value={s.title} className="bg-ink-900">{s.title}</option>
            ))}
          </select>
        </label>
        <label className="text-sm text-white/70 sm:col-span-2">
          Tell us about your project
          <textarea name="message" required rows={5} placeholder="Goals, timeline, budget…" className={`${field} resize-none`} />
        </label>
        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <GoldButton type="submit" size="lg">Send Enquiry</GoldButton>
          {sent && (
            <p role="status" className="text-sm text-gold-300">
              Opening WhatsApp with your message…
            </p>
          )}
        </div>
      </form>
    </GlassCard>
  );
}
