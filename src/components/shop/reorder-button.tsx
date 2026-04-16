"use client";

import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ButtonSpinner from "@/components/shared/button-spinner";

type ReorderButtonProps = {
  items: {
    id: string;
    productName: string;
    quantity: number;
  }[];
};

export default function ReorderButton({ items }: ReorderButtonProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleReorder() {
    setLoading(true);

    try {
      let addedCount = 0;

      for (const item of items) {
        const response = await fetch(`/api/products/by-id/${item.id}`);
        const data = await response.json();

        if (response.ok && data.product) {
          addItem(data.product, item.quantity, { silent: true });
          addedCount += item.quantity;
        }
      }

      if (addedCount > 0) {
        toast.success(
          addedCount === 1
            ? "1 item added back to cart"
            : `${addedCount} items added back to cart`
        );
      } else {
        toast.error("No reorderable items were added");
      }

      router.push("/cart");
      router.refresh();
    } catch {
      toast.error("Something went wrong while reordering.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleReorder}
      disabled={loading}
      className="w-full rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
    >
      {loading ? <ButtonSpinner label="Reordering..." /> : "Reorder Items"}
    </button>
  );
}
