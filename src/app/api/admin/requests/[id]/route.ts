import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/session";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { status } = body;
    const { id } = await params;

    const prisma = getPrisma();
    await prisma.portalRequest.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Admin request status update error:", error);

    return NextResponse.json(
      { error: "Unable to update request status" },
      { status: 500 }
    );
  }
}
