"use client";

import { useEffect } from "react";

type RecentlyViewedTrackerProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    category: "Women" | "Men" | "Kids" | "Pregnancy";
    price: number;
    oldPrice?: number;
    shortDescription: string;
    badge?: string;
    inStock: boolean;
    description: string;
    usage: string;
    imageUrl?: string;
    benefits: string[];
    ingredients: string[];
  };
};

const STORAGE_KEY = "vitabiotics_recently_viewed";

export default function RecentlyViewedTracker({
  product,
}: RecentlyViewedTrackerProps) {
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const existing = raw ? JSON.parse(raw) : [];

      const filtered = Array.isArray(existing)
        ? existing.filter((item: { id: string }) => item.id !== product.id)
        : [];

      const updated = [product, ...filtered].slice(0, 8);

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage issues
    }
  }, [product]);

  return null;
}
