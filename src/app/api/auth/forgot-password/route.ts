import { NextResponse } from "next/server";
import { z } from "zod";
import { getPrisma } from "@/lib/prisma";
import {
  buildResetUrl,
  generateResetToken,
  getResetTokenExpiry,
} from "@/lib/password-reset";
import { sendEmail } from "@/lib/email";
import { passwordResetEmailTemplate } from "@/lib/email-templates";

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export async function POST(request: Request) {
  try {
    const prisma = getPrisma();
    const body = await request.json();
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];

      return NextResponse.json(
        { error: firstIssue?.message || "Invalid email address" },
        { status: 400 }
      );
    }

    const email = parsed.data.email.toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: true,
          message:
            "If an account exists with that email, a password reset link has been sent.",
        },
        { status: 200 }
      );
    }

    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
        OR: [{ expiresAt: { lt: new Date() } }, { usedAt: { not: null } }],
      },
    });

    const token = generateResetToken();
    const expiresAt = getResetTokenExpiry();

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    const resetUrl = buildResetUrl(token);

    await sendEmail({
      to: user.email,
      subject: "Reset your Vitabiotics Professional Portal password",
      html: passwordResetEmailTemplate({
        firstName: user.firstName,
        resetUrl,
      }),
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "If an account exists with that email, a password reset link has been sent.",
        resetUrl: process.env.NODE_ENV === "development" ? resetUrl : undefined,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);

    return NextResponse.json(
      { error: "Something went wrong while sending the reset email" },
      { status: 500 }
    );
  }
}
