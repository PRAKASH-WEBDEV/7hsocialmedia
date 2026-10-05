import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ownerEmail, thankYouEmail } from "@/lib/email";

export const runtime = "nodejs";

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const enquiry = {
    name: str(body.name, 120),
    email: str(body.email, 200),
    phone: str(body.phone, 40),
    service: str(body.service, 120),
    message: str(body.message, 5000),
  };

  if (!enquiry.name || !enquiry.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
    return NextResponse.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM_EMAIL || "7H Media <noreply@7hmediaagency.com>";

  const { error } = await resend.emails.send({ from, to: [to], replyTo: enquiry.email, ...ownerEmail(enquiry) });
  if (error) {
    console.error("Resend error (owner):", error);
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 502 });
  }

  // The enquiry is already delivered, so a failed auto-reply is logged but not surfaced to the user.
  const thanks = await resend.emails.send({ from, to: [enquiry.email], replyTo: to, ...thankYouEmail(enquiry) });
  if (thanks.error) console.error("Resend error (auto-reply):", thanks.error);

  return NextResponse.json({ ok: true });
}
