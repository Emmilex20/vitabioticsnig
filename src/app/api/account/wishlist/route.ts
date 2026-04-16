import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/session";

export async function GET() {
  try {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== "CUSTOMER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await prisma.wishlistItem.findMany({
      where: {
        userId: authUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error("Get wishlist error:", error);

    return NextResponse.json(
      { error: "Unable to fetch wishlist" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== "CUSTOMER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { productId } = body as { productId?: string };

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    await prisma.wishlistItem.upsert({
      where: {
        userId_productId: {
          userId: authUser.id,
          productId,
        },
      },
      update: {},
      create: {
        userId: authUser.id,
        productId,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Add wishlist item error:", error);

    return NextResponse.json(
      { error: "Unable to save wishlist item" },
      { status: 500 }
    );
  }
}
