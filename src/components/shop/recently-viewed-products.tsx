"use client";

import { useEffect, useState } from "react";
import ProductGrid from "./product-grid";
import type { StorefrontProduct } from "@/lib/storefront-products";

const STORAGE_KEY = "vitabiotics_recently_viewed";

export default function RecentlyViewedProducts({
  currentProductId,
}: {
  currentProductId: string;
}) {
  const [storedItems, setStoredItems] = useState<StorefrontProduct[]>([]);

  useEffect(() => {
    let frameId = 0;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const safeItems = Array.isArray(parsed) ? parsed : [];

      frameId = window.requestAnimationFrame(() => {
        setStoredItems(safeItems);
      });
    } catch {
      frameId = window.requestAnimationFrame(() => {
        setStoredItems([]);
      });
    }

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const items = storedItems
    .filter((item) => item.id !== currentProductId)
    .slice(0, 4);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-14">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Recently Viewed
        </h2>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Pick up where you left off.
        </p>
      </div>

      <ProductGrid items={items} />
    </section>
  );
}
