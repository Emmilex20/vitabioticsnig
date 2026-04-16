import { NextResponse } from "next/server";
import { authCookieName } from "@/lib/session";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set(authCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
