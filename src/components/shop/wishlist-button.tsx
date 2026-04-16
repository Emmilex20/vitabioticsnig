"use client";

import { Heart, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type WishlistButtonProps = {
  productId: string;
};

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadWishlist() {
      try {
        const response = await fetch("/api/account/wishlist");
        if (!response.ok) return;

        const data = await response.json();
        const items = Array.isArray(data.items) ? data.items : [];
        setSaved(
          items.some((item: { productId: string }) => item.productId === productId)
        );
      } catch {
        // ignore
      }
    }

    loadWishlist();
  }, [productId]);

  async function toggleWishlist() {
    setLoading(true);

    try {
      if (saved) {
        const response = await fetch(`/api/account/wishlist/${productId}`, {
          method: "DELETE",
        });
        if (response.status === 401) {
          toast.error("Please sign in to manage your wishlist");
          router.push("/sign-in");
          return;
        }
        if (response.ok) {
          setSaved(false);
          toast.success("Removed from wishlist");
        } else {
          const data = await response.json();
          toast.error(data.error || "Unable to update wishlist");
        }
      } else {
        const response = await fetch("/api/account/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        });
        if (response.status === 401) {
          toast.error("Please sign in to manage your wishlist");
          router.push("/sign-in");
          return;
        }
        if (response.ok) {
          setSaved(true);
          toast.success("Saved to wishlist");
        } else {
          const data = await response.json();
          toast.error(data.error || "Unable to update wishlist");
        }
      }
    } catch {
      toast.error("Something went wrong while updating your wishlist.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      disabled={loading}
      className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition ${
        saved
          ? "border-rose-200 bg-rose-50 text-rose-600"
          : "border-[var(--border)] bg-white text-[var(--foreground)] hover:bg-gray-50"
      }`}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
    >
      {loading ? (
        <LoaderCircle size={18} className="animate-spin" />
      ) : (
        <Heart size={18} fill={saved ? "currentColor" : "none"} />
      )}
    </button>
  );
}
