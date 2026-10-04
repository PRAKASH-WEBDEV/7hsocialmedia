"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/data/services";
import GoldButton from "@/components/ui/GoldButton";
import GlassCard from "@/components/ui/GlassCard";

const field =
  "mt-2 w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-cream placeholder:text-white/30 transition-colors focus:border-gold-500/60 focus:outline-none";

type Status = "idle" | "sending" | "sent" | "error";

/** Posts the enquiry to /api/contact, which emails it via Resend. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(d)),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <GlassCard gold className="p-6 sm:p-8">
      <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
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
          <GoldButton type="submit" size="lg" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send Enquiry"}
          </GoldButton>
          {status === "sent" && (
            <p role="status" className="text-sm text-gold-300">
              Thanks! Your enquiry has been sent. We&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-sm text-red-400">{error}</p>
          )}
        </div>
      </form>
    </GlassCard>
  );
}
