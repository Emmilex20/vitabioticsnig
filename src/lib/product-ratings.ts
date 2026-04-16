import { prisma } from "@/lib/prisma";

type ProductRatingReview = {
  productId: string;
  rating: number;
};

export async function getProductRatingsMap(productIds: string[]) {
  if (productIds.length === 0) {
    return {};
  }

  const reviews: ProductRatingReview[] = await prisma.productReview.findMany({
    where: {
      productId: {
        in: productIds,
      },
    },
    select: {
      productId: true,
      rating: true,
    },
  });

  const grouped = reviews.reduce<Record<string, number[]>>(
    (acc: Record<string, number[]>, review: ProductRatingReview) => {
      if (!acc[review.productId]) {
        acc[review.productId] = [];
      }

      acc[review.productId].push(review.rating);
      return acc;
    },
    {}
  );

  const result: Record<
    string,
    {
      averageRating: number;
      reviewCount: number;
    }
  > = {};

  for (const [productId, ratings] of Object.entries(grouped)) {
    const reviewCount = ratings.length;
    const averageRating =
      reviewCount > 0
        ? ratings.reduce(
            (sum: number, rating: number) => sum + rating,
            0
          ) / reviewCount
        : 0;

    result[productId] = {
      averageRating,
      reviewCount,
    };
  }

  return result;
}
