"use client";

import { useCallback, useEffect, useState } from "react";
import ReviewForm from "./review-form";
import StarRating from "./star-rating";

type Review = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
};

type ProductReviewsSectionProps = {
  productId: string;
};

export default function ProductReviewsSection({
  productId,
}: ProductReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/products/${productId}/reviews`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to load reviews");
        return;
      }

      setReviews(data.reviews || []);
      setAverageRating(data.stats?.averageRating || 0);
      setCount(data.stats?.count || 0);
    } catch {
      setError("Something went wrong while loading reviews.");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  async function handleDelete() {
    setDeleteMessage("");
    setError("");

    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to delete review");
        return;
      }

      setDeleteMessage(data.message || "Review deleted successfully.");
      await loadReviews();
    } catch {
      setError("Something went wrong while deleting your review.");
    }
  }

  useEffect(() => {
    void loadReviews();
  }, [loadReviews]);

  return (
    <section className="mt-14 space-y-8">
      <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
              Reviews & Ratings
            </h2>
            <p className="mt-2 text-[var(--muted-foreground)]">
              See what customers think about this product.
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-slate-50 px-5 py-4">
            <StarRating rating={averageRating} showValue />
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              {count} review{count === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </div>

      <ReviewForm productId={productId} onSubmitted={loadReviews} />

      <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
            Customer Reviews
          </h3>

          <button
            onClick={handleDelete}
            className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
          >
            Delete My Review
          </button>
        </div>

        {deleteMessage ? (
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {deleteMessage}
          </div>
        ) : null}

        {loading ? (
          <p className="mt-5 text-[var(--muted-foreground)]">
            Loading reviews...
          </p>
        ) : error ? (
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : reviews.length === 0 ? (
          <p className="mt-5 text-[var(--muted-foreground)]">
            No reviews yet. Be the first to review this product.
          </p>
        ) : (
          <div className="mt-6 space-y-5">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-[1.5rem] border border-[var(--border)] bg-slate-50 p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {review.user.firstName} {review.user.lastName}
                    </p>
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
