import { NextResponse } from "next/server";
import { authCookieName } from "@/lib/session";

export async function POST() {
  const response = NextResponse.json(
    {
      success: true,
      redirectTo: "/shop-auth/login",
    },
    { status: 200 }
  );

  response.cookies.set(authCookieName, "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
