import Link from "next/link";
import AccountShell from "@/components/account/account-shell";
import AccountHeader from "@/components/account/account-header";
import StarRating from "@/components/shop/star-rating";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/session";

type ReviewItem = {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: Date;
};

type ReviewProduct = {
  id: string;
  name: string;
  slug: string;
};

export default async function AccountReviewsPage() {
  const user = await requireCustomer();

  const reviews: ReviewItem[] = await prisma.productReview.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const productIds = reviews.map((review: ReviewItem) => review.productId);

  const products: ReviewProduct[] = productIds.length
    ? await prisma.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
        select: {
          id: true,
          name: true,
          slug: true,
        },
      })
    : [];

  const productMap = new Map(
    products.map((product: ReviewProduct) => [product.id, product])
  );

  return (
    <AccountShell>
      <AccountHeader
        title="My Reviews"
        description="Review and revisit the feedback you’ve shared on products."
        firstName={user.firstName}
      />

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="rounded-[2rem] border border-[var(--border)] bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              You haven’t written any reviews yet
            </h2>
            <p className="mt-3 text-[var(--muted-foreground)]">
              Reviews you submit on product pages will appear here.
            </p>
          </div>
        ) : (
          reviews.map((review: ReviewItem) => {
            const product = productMap.get(review.productId);

            return (
              <div
                key={review.id}
                className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    {product ? (
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-block text-sm font-semibold text-[var(--primary)]"
                      >
                        {product.name}
                      </Link>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-2 sm:items-end">
                    <StarRating rating={review.rating} />
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-[var(--foreground)]">
                  {review.comment}
                </p>
              </div>
            );
          })
        )}
      </div>
    </AccountShell>
  );
}
