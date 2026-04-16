import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authCookieName, getAuthUser } from "@/lib/session";
import { createToken } from "@/lib/auth";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
});

export async function PATCH(request: Request) {
  try {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== "CUSTOMER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = profileSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];

      return NextResponse.json(
        { error: firstIssue?.message || "Invalid profile data" },
        { status: 400 }
      );
    }

    const { firstName, lastName, email } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    const existingUser = await prisma.user.findFirst({
      where: {
        email: normalizedEmail,
        NOT: { id: authUser.id },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "That email is already in use" },
        { status: 409 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: authUser.id },
      data: {
        firstName,
        lastName,
        email: normalizedEmail,
      },
    });

    const token = createToken({
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
      firstName: updatedUser.firstName,
    });

    const response = NextResponse.json(
      {
        success: true,
        user: {
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
        },
      },
      { status: 200 }
    );

    response.cookies.set(authCookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Update profile error:", error);

    return NextResponse.json(
      { error: "Unable to update profile" },
      { status: 500 }
    );
  }
}
