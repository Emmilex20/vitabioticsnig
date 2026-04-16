import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/session";

type RouteContext = {
  params: Promise<{
    productId: string;
  }>;
};

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== "CUSTOMER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await params;

    await prisma.wishlistItem.deleteMany({
      where: {
        userId: authUser.id,
        productId,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Remove wishlist item error:", error);

    return NextResponse.json(
      { error: "Unable to remove wishlist item" },
      { status: 500 }
    );
  }
}
