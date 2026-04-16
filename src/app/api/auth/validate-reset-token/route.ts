import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const prisma = getPrisma();
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { valid: false, error: "Missing token" },
      { status: 400 }
    );
  }

  const resetRecord = await prisma.passwordResetToken.findUnique({
    where: { token },
    select: {
      id: true,
      expiresAt: true,
      usedAt: true,
    },
  });

  if (!resetRecord) {
    return NextResponse.json(
      { valid: false, error: "Invalid token" },
      { status: 400 }
    );
  }

  if (resetRecord.usedAt) {
    return NextResponse.json(
      { valid: false, error: "Token already used" },
      { status: 400 }
    );
  }

  if (resetRecord.expiresAt < new Date()) {
    return NextResponse.json(
      { valid: false, error: "Token expired" },
      { status: 400 }
    );
  }

  return NextResponse.json({ valid: true }, { status: 200 });
}
