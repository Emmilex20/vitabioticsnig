import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mapDbProductToStorefront } from "@/lib/storefront-products";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { product: mapDbProductToStorefront(product) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get product by id error:", error);

    return NextResponse.json(
      { error: "Unable to fetch product" },
      { status: 500 }
    );
  }
}
