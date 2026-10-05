import { site, whatsappLink } from "@/data/site";

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type Email = { subject: string; html: string; text: string };

// Email clients need absolute URLs; the live site serves from www.
const ORIGIN = "https://www.7hmediaagency.com";
const LOGO = `${ORIGIN}/apple-icon.png`;

const C = {
  bg: "#050505",
  card: "#0d0d0d",
  panel: "#141414",
  border: "#2a2316",
  gold: "#e8ad55",
  goldLight: "#ffe0a0",
  cream: "#f7f5ef",
  muted: "#a8a29a",
  dim: "#6f6a62",
};
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const multiline = (v: string) => esc(v).replace(/\n/g, "<br>");
const firstName = (name: string) => name.split(/\s+/)[0] || name;

const button = (href: string, label: string, primary = true) => `
  <a href="${esc(href)}" target="_blank" style="display:inline-block;margin:4px 6px 4px 0;padding:12px 22px;border-radius:999px;font:600 14px ${FONT};text-decoration:none;${
    primary
      ? `background:${C.gold};background-image:linear-gradient(180deg,${C.goldLight},${C.gold} 55%,#c78328);color:#1a1205;`
      : `border:1px solid ${C.border};color:${C.goldLight};`
  }">${label}</a>`;

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:12px 0;border-bottom:1px solid ${C.border};font:600 11px ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${C.dim};width:110px;vertical-align:top;">${label}</td>
    <td style="padding:12px 0;border-bottom:1px solid ${C.border};font:15px ${FONT};color:${C.cream};vertical-align:top;">${value}</td>
  </tr>`;

/** Branded shell shared by both emails: header, card body, footer. */
function layout({ preheader, eyebrow, title, body }: { preheader: string; eyebrow: string; title: string; body: string }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
      <tr><td align="center" style="padding-bottom:24px;">
        <a href="${ORIGIN}" target="_blank" style="text-decoration:none;">
          <img src="${LOGO}" width="64" height="64" alt="7H Media" style="display:block;border:0;border-radius:50%;margin:0 auto 12px;">
          <div style="font:700 18px ${FONT};letter-spacing:3px;color:${C.goldLight};">7H MEDIA</div>
          <div style="font:12px ${FONT};letter-spacing:1px;color:${C.gold};margin-top:4px;">${esc(site.tagline)}</div>
        </a>
      </td></tr>
      <tr><td style="background:${C.card};border:1px solid ${C.border};border-radius:20px;overflow:hidden;">
        <div style="height:3px;background:${C.gold};background-image:linear-gradient(90deg,#c78328,${C.goldLight},#c78328);"></div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:36px 32px 32px;">
            <div style="font:600 11px ${FONT};letter-spacing:2.5px;text-transform:uppercase;color:${C.gold};">${eyebrow}</div>
            <h1 style="margin:10px 0 0;font:700 26px/1.3 ${FONT};color:${C.cream};">${title}</h1>
            ${body}
          </td></tr>
        </table>
      </td></tr>
      <tr><td align="center" style="padding:28px 16px 0;font:12px/1.7 ${FONT};color:${C.dim};">
        <a href="${ORIGIN}" target="_blank" style="color:${C.gold};text-decoration:none;">7hmediaagency.com</a>
        &nbsp;·&nbsp; <a href="mailto:${site.email}" style="color:${C.muted};text-decoration:none;">${site.email}</a>
        &nbsp;·&nbsp; <a href="tel:${site.phone.replace(/\s/g, "")}" style="color:${C.muted};text-decoration:none;">${site.phone}</a><br>
        © ${new Date().getFullYear()} 7H Media · ${esc(site.location)}
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

/** Notification sent to the 7H Media inbox for every website enquiry. */
export function ownerEmail(e: Enquiry): Email {
  const received = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
  const phoneDigits = e.phone.replace(/\D/g, "");
  const replyHref = `mailto:${e.email}?subject=${encodeURIComponent(`Re: Your enquiry with 7H Media${e.service ? ` — ${e.service}` : ""}`)}`;

  const body = `
    <p style="margin:12px 0 24px;font:15px/1.6 ${FONT};color:${C.muted};">Received ${esc(received)} IST via the website contact form.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Name", esc(e.name))}
      ${row("Email", `<a href="mailto:${esc(e.email)}" style="color:${C.goldLight};text-decoration:none;">${esc(e.email)}</a>`)}
      ${e.phone ? row("Phone", `<a href="tel:${esc(e.phone.replace(/\s/g, ""))}" style="color:${C.goldLight};text-decoration:none;">${esc(e.phone)}</a>`) : ""}
      ${e.service ? row("Service", `<span style="display:inline-block;padding:4px 12px;border-radius:999px;background:#2a1f0e;color:${C.goldLight};font:600 13px ${FONT};">${esc(e.service)}</span>`) : ""}
    </table>
    <div style="margin:24px 0 8px;font:600 11px ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${C.dim};">Message</div>
    <div style="padding:18px 20px;background:${C.panel};border-left:3px solid ${C.gold};border-radius:10px;font:15px/1.7 ${FONT};color:${C.cream};">${multiline(e.message)}</div>
    <div style="margin-top:28px;">
      ${button(replyHref, "Reply by email")}
      ${phoneDigits.length >= 10 ? button(`https://wa.me/${phoneDigits.length === 10 ? `91${phoneDigits}` : phoneDigits}`, "WhatsApp", false) : ""}
    </div>`;

  return {
    subject: `New enquiry from ${e.name}${e.service ? ` — ${e.service}` : ""}`,
    html: layout({ preheader: `${e.name}: ${e.message.slice(0, 120)}`, eyebrow: "New website enquiry", title: esc(e.name), body }),
    text: [
      `New website enquiry (${received} IST)`,
      ``,
      `Name: ${e.name}`,
      `Email: ${e.email}`,
      e.phone ? `Phone: ${e.phone}` : null,
      e.service ? `Service: ${e.service}` : null,
      ``,
      e.message,
    ]
      .filter((l) => l !== null)
      .join("\n"),
  };
}

/** Auto-reply thanking the person who submitted the form. */
export function thankYouEmail(e: Enquiry): Email {
  const name = esc(firstName(e.name));
  const steps = [
    ["01", "We review your brief", "Our team reads through your goals and requirements."],
    ["02", "We reach out", "Expect a call or email from us within one business day."],
    ["03", "We plan your growth", "A tailored strategy to put your brand in front of the right people."],
  ];

  const body = `
    <p style="margin:16px 0 0;font:16px/1.7 ${FONT};color:${C.muted};">Thank you for reaching out to <span style="color:${C.goldLight};">7H Media</span>. We've received your enquiry${
      e.service ? ` about <strong style="color:${C.cream};">${esc(e.service)}</strong>` : ""
    } and we're excited to learn more about your brand.</p>

    <div style="margin:28px 0 8px;font:600 11px ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${C.dim};">What happens next</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${steps
        .map(
          ([n, h, d]) => `
      <tr>
        <td style="padding:12px 16px 12px 0;width:36px;vertical-align:top;font:700 15px ${FONT};color:${C.gold};">${n}</td>
        <td style="padding:12px 0;border-bottom:1px solid ${C.border};vertical-align:top;">
          <div style="font:600 15px ${FONT};color:${C.cream};">${h}</div>
          <div style="margin-top:4px;font:14px/1.6 ${FONT};color:${C.muted};">${d}</div>
        </td>
      </tr>`,
        )
        .join("")}
    </table>

    <div style="margin:28px 0 8px;font:600 11px ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${C.dim};">Your message</div>
    <div style="padding:18px 20px;background:${C.panel};border-left:3px solid ${C.gold};border-radius:10px;font:14px/1.7 ${FONT};color:${C.muted};">${multiline(e.message)}</div>

    <p style="margin:28px 0 16px;font:15px/1.7 ${FONT};color:${C.muted};">Need to talk sooner? Message us on WhatsApp or simply reply to this email.</p>
    <div>
      ${button(whatsappLink(`Hi 7H Media, I just sent an enquiry${e.service ? ` about ${e.service}` : ""}.`), "Chat on WhatsApp")}
      ${button(`${ORIGIN}/work`, "See our work", false)}
    </div>

    <p style="margin:32px 0 0;font:15px/1.7 ${FONT};color:${C.muted};">Warm regards,<br><span style="font-weight:600;color:${C.goldLight};">Team 7H Media</span></p>`;

  return {
    subject: "Thanks for reaching out to 7H Media",
    html: layout({
      preheader: "We've received your enquiry and will get back to you within one business day.",
      eyebrow: "Enquiry received",
      title: `Thank you, ${name}!`,
      body,
    }),
    text: [
      `Hi ${firstName(e.name)},`,
      ``,
      `Thank you for reaching out to 7H Media. We've received your enquiry${e.service ? ` about ${e.service}` : ""} and will get back to you within one business day.`,
      ``,
      `Your message:`,
      e.message,
      ``,
      `Need to talk sooner? WhatsApp us: ${whatsappLink()}`,
      `Or call ${site.phone}.`,
      ``,
      `Warm regards,`,
      `Team 7H Media`,
      ORIGIN,
    ].join("\n"),
  };
}
