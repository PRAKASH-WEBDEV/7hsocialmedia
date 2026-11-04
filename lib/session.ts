import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, SESSION_MAX_AGE, createSessionToken, verifySessionToken } from "@/lib/auth";

export async function isAdmin() {
  return verifySessionToken((await cookies()).get(ADMIN_COOKIE)?.value);
}

/** Guards server actions and admin pages; proxy.ts only does the optimistic redirect. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function startSession() {
  (await cookies()).set(ADMIN_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(ADMIN_COOKIE);
}
