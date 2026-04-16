"use client";

import { FormEvent, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import ButtonSpinner from "@/components/shared/button-spinner";

type ReviewFormProps = {
  productId: string;
  onSubmitted?: () => void;
};

export default function ReviewForm({
  productId,
  onSubmitted,
}: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("");
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to submit review");
        toast.error(data.error || "Unable to submit review");
        return;
      }

      setSuccess(data.message || "Review submitted successfully.");
      toast.success(data.message || "Review submitted successfully.");
      setComment("");
      setRating(5);
      onSubmitted?.();
    } catch {
      setError("Something went wrong while submitting your review.");
      toast.error("Something went wrong while submitting your review.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
        Write a Review
      </h3>

      <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
        {success ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {success}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : null}

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
            Rating
          </label>

          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => {
              const value = index + 1;
              const active = value <= rating;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="rounded-full p-1"
                  aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                >
                  <Star
                    size={22}
                    className={
                      active
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-300"
                    }
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
            Review Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
        >
          {isSubmitting ? (
            <ButtonSpinner label="Submitting..." />
          ) : (
            "Submit Review"
          )}
        </button>
      </form>
    </div>
  );
}
