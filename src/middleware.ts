import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("token")?.value;

  // Restrict access to /admin-panel if not logged in
  if (!isLoggedIn && request.nextUrl.pathname.startsWith("/admin-panel")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-panel/:path*", "/admin-panel"], // apply only to admin routes
};
