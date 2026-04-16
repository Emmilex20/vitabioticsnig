import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/session";

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(5, "Review comment is too short"),
});

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const reviews = await prisma.productReview.findMany({
      where: {
        productId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    const count = reviews.length;
    const averageRating =
      count > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / count
        : 0;

    return NextResponse.json(
      {
        reviews,
        stats: {
          count,
          averageRating,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get product reviews error:", error);

    return NextResponse.json(
      { error: "Unable to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== "CUSTOMER") {
      return NextResponse.json(
        { error: "Only signed-in customers can leave reviews" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];

      return NextResponse.json(
        { error: firstIssue?.message || "Invalid review data" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const existingReview = await prisma.productReview.findFirst({
      where: {
        userId: authUser.id,
        productId: id,
      },
    });

    if (existingReview) {
      await prisma.productReview.update({
        where: { id: existingReview.id },
        data: {
          rating: parsed.data.rating,
          comment: parsed.data.comment,
        },
      });

      return NextResponse.json(
        { success: true, message: "Review updated successfully." },
        { status: 200 }
      );
    }

    await prisma.productReview.create({
      data: {
        userId: authUser.id,
        productId: id,
        rating: parsed.data.rating,
        comment: parsed.data.comment,
      },
    });

    return NextResponse.json(
      { success: true, message: "Review submitted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create product review error:", error);

    return NextResponse.json(
      { error: "Unable to submit review" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const authUser = await getAuthUser();

    if (!authUser || authUser.role !== "CUSTOMER") {
      return NextResponse.json(
        { error: "Only signed-in customers can delete reviews" },
        { status: 401 }
      );
    }

    const { id } = await params;

    await prisma.productReview.deleteMany({
      where: {
        userId: authUser.id,
        productId: id,
      },
    });

    return NextResponse.json(
      { success: true, message: "Review deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete product review error:", error);

    return NextResponse.json(
      { error: "Unable to delete review" },
      { status: 500 }
    );
  }
}
