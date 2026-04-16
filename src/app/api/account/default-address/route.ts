import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/session";

export async function GET() {
  try {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== "CUSTOMER") {
      return NextResponse.json({ address: null }, { status: 200 });
    }

    const address = await prisma.address.findFirst({
      where: {
        userId: authUser.id,
        isDefault: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ address }, { status: 200 });
  } catch (error) {
    console.error("Get default address error:", error);

    return NextResponse.json(
      { error: "Unable to fetch default address" },
      { status: 500 }
    );
  }
}
