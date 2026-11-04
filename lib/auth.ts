// Admin auth shared by proxy.ts and server code. Web Crypto only, so it runs in any runtime.
// Credentials and secret come from env on Vercel; the fallbacks are the agreed static login.

export const ADMIN_COOKIE = "7h_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

const adminEmail = () => (process.env.ADMIN_EMAIL || "admin@7hmedia.com").toLowerCase();
const adminPassword = () => process.env.ADMIN_PASSWORD || "admin@1234";
const secret = () => process.env.ADMIN_SESSION_SECRET || `7h-admin:${adminEmail()}:${adminPassword()}`;

const encoder = new TextEncoder();

/** Compares two strings without leaking where they differ through timing. */
function safeEqual(a: string, b: string) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
  return btoa(String.fromCharCode(...sig)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function checkCredentials(email: string, password: string) {
  // Evaluate both so a wrong email and a wrong password take the same time.
  const emailOk = safeEqual(email.trim().toLowerCase(), adminEmail());
  const passwordOk = safeEqual(password, adminPassword());
  return emailOk && passwordOk;
}

/** Token format: `<expiry ms>.<HMAC of expiry>`. */
export async function createSessionToken() {
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  return `${expires}.${await sign(String(expires))}`;
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig || !(Number(expires) > Date.now())) return false;
  return safeEqual(sig, await sign(expires));
}
