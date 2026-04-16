import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import { authCookieName } from "@/lib/session";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(authCookieName)?.value;
  const user = token ? verifyToken(token) : null;
  const { pathname } = request.nextUrl;

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/portal") {
    const destination =
      user.role === "ADMIN"
        ? "/admin"
        : user.role === "DOCTOR"
          ? "/portal/doctor"
          : "/portal/pharmacist";

    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
    const destination =
      user.role === "DOCTOR" ? "/portal/doctor" : "/portal/pharmacist";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (pathname.startsWith("/portal/doctor") && user.role !== "DOCTOR") {
    const destination = user.role === "ADMIN" ? "/admin" : "/portal/pharmacist";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  if (pathname.startsWith("/portal/pharmacist") && user.role !== "PHARMACIST") {
    const destination = user.role === "ADMIN" ? "/admin" : "/portal/doctor";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
