import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
  size?: number;
  showValue?: boolean;
};

export default function StarRating({
  rating,
  size = 16,
  showValue = false,
}: StarRatingProps) {
  const rounded = Math.round(rating);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => {
          const filled = index < rounded;

          return (
            <Star
              key={index}
              size={size}
              className={
                filled ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
              }
            />
          );
        })}
      </div>

      {showValue ? (
        <span className="text-sm font-semibold text-[var(--foreground)]">
          {rating.toFixed(1)}
        </span>
      ) : null}
    </div>
  );
}
