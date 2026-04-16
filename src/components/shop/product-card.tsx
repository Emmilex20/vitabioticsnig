"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBasket } from "lucide-react";
import { useCart } from "@/context/cart-context";
import type { StorefrontProduct } from "@/lib/storefront-products";
import StarRating from "./star-rating";

type ProductCardProps = {
  product: StorefrontProduct;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative flex h-72 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-100 p-6">
        {product.badge ? (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[var(--primary)] shadow-sm">
            {product.badge}
          </span>
        ) : null}

        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 100vw"
            className="object-contain p-6 transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-40 w-32 items-center justify-center rounded-[1.75rem] border border-blue-100 bg-white text-center text-sm font-bold text-[var(--primary)] shadow-sm">
            Product Image
          </div>
        )}
      </div>

      <div className="p-5">
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-blue-700">
          {product.category}
        </span>

        <h3 className="mt-4 text-xl font-bold tracking-tight text-[var(--foreground)]">
          {product.name}
        </h3>

        {(product.reviewCount ?? 0) > 0 ? (
          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={product.averageRating ?? 0} />
            <span className="text-sm text-[var(--muted-foreground)]">
              {product.averageRating?.toFixed(1)} ({product.reviewCount})
            </span>
          </div>
        ) : (
          <p className="mt-3 text-sm text-[var(--muted-foreground)]">
            No reviews yet
          </p>
        )}

        <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
          {product.shortDescription}
        </p>

        <div className="mt-5 flex items-end gap-3">
          <p className="text-xl font-extrabold text-[var(--foreground)]">
            {formatPrice(product.price)}
          </p>

          {product.oldPrice ? (
            <p className="text-sm font-medium text-[var(--muted-foreground)] line-through">
              {formatPrice(product.oldPrice)}
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 rounded-full border border-[var(--border)] bg-white px-4 py-3 text-center text-sm font-semibold text-[var(--foreground)] transition hover:bg-gray-50"
          >
            View Details
          </Link>

          <button
            aria-label={`Add ${product.name} to cart`}
            onClick={() => addItem(product, 1)}
            className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-4 py-3 text-white transition hover:opacity-90"
          >
            <ShoppingBasket size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
