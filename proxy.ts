import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";

/** Sends signed-out visitors to the admin login, and signed-in ones past it. */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const signedIn = await verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
  const onLogin = pathname === "/admin/login";

  if (!signedIn && !onLogin) return NextResponse.redirect(new URL("/admin/login", request.nextUrl));
  if (signedIn && onLogin) return NextResponse.redirect(new URL("/admin", request.nextUrl));
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
