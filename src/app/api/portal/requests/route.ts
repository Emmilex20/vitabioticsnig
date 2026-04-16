import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { portalRequestSchema } from "@/lib/portal";
import { getAuthUser } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const authUser = await getAuthUser();

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = portalRequestSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];

      return NextResponse.json(
        { error: firstIssue?.message || "Invalid request data" },
        { status: 400 }
      );
    }

    const prisma = getPrisma();
    const created = await prisma.portalRequest.create({
      data: {
        userId: authUser.id,
        type: parsed.data.type,
        title: parsed.data.title,
        organization: parsed.data.organization,
        phone: parsed.data.phone,
        location: parsed.data.location,
        message: parsed.data.message,
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        requestId: created.id,
        message: "Your request has been submitted successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Portal request create error:", error);

    return NextResponse.json(
      { error: "Something went wrong while submitting your request" },
      { status: 500 }
    );
  }
}
