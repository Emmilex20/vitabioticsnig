import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/session";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function parseLines(value?: string) {
  if (!value) return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseElementItems(value?: string) {
  if (!value) return [];

  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [titlePart, ...descriptionParts] = line.split("|");
      const title = titlePart?.trim() || "";
      const description = descriptionParts.join("|").trim();

      if (!title || !description) {
        return null;
      }

      return { title, description };
    })
    .filter(Boolean);
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const {
      name,
      category,
      price,
      oldPrice,
      shortDescription,
      badge,
      sku,
      inStock,
      description,
      usage,
      imageUrl,
      benefits,
      ingredients,
      elementItems,
      spotlightTitle,
      bestFor,
    } = body;

    if (
      !name ||
      !category ||
      price === undefined ||
      !shortDescription ||
      !sku ||
      !description ||
      !usage
    ) {
      return NextResponse.json(
        { error: "Required product fields are missing" },
        { status: 400 }
      );
    }

    if (!["WOMEN", "MEN", "KIDS", "PREGNANCY"].includes(category)) {
      return NextResponse.json(
        { error: "Invalid product category" },
        { status: 400 }
      );
    }

    await prisma.product.update({
      where: { id },
      data: {
        name,
        slug: slugify(name),
        category,
        price: Number(price),
        oldPrice: oldPrice ? Number(oldPrice) : null,
        shortDescription,
        badge: badge || null,
        sku,
        inStock: Boolean(inStock),
        description,
        usage,
        imageUrl: imageUrl || null,
        benefits: parseLines(benefits),
        ingredients: parseLines(ingredients),
        elementItems: parseElementItems(elementItems),
        spotlightTitle: spotlightTitle?.trim() || null,
        bestFor: bestFor?.trim() || null,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Admin update product error:", error);

    return NextResponse.json(
      { error: "Unable to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Admin delete product error:", error);

    return NextResponse.json(
      { error: "Unable to delete product" },
      { status: 500 }
    );
  }
}
