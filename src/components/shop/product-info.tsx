"use client";

import { ShieldCheck, Truck } from "lucide-react";
import type { StorefrontProduct } from "@/lib/storefront-products";
import StarRating from "./star-rating";

type ProductInfoProps = {
  product: StorefrontProduct;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatPercentOff(price: number, oldPrice?: number) {
  if (!oldPrice || oldPrice <= price) {
    return null;
  }

  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const discount = formatPercentOff(product.price, product.oldPrice);
  const reviewLabel =
    (product.reviewCount ?? 0) > 0
      ? `${product.reviewCount} review${product.reviewCount === 1 ? "" : "s"}`
      : "Fresh product listing";

  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.15em] text-blue-700">
          {product.category}
        </span>

        {product.badge ? (
          <span className="inline-flex rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-[0.15em] text-[var(--foreground)]">
            {product.badge}
          </span>
        ) : null}

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.15em] ${
            product.inStock
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>

        {discount ? (
          <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.15em] text-white">
            Save {discount}%
          </span>
        ) : null}
      </div>

      <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl">
        {product.name}
      </h1>

      {(product.reviewCount ?? 0) > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <StarRating rating={product.averageRating ?? 0} showValue />
          <span className="text-sm text-[var(--muted-foreground)]">
            {reviewLabel}
          </span>
        </div>
      ) : (
        <p className="mt-4 text-sm text-[var(--muted-foreground)]">{reviewLabel}</p>
      )}

      <p className="mt-5 text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
        {product.shortDescription}
      </p>

      <div className="mt-7 flex flex-wrap items-end gap-3">
        <p className="text-3xl font-extrabold text-[var(--foreground)] sm:text-4xl">
          {formatPrice(product.price)}
        </p>

        {product.oldPrice ? (
          <p className="text-base font-medium text-[var(--muted-foreground)] line-through">
            {formatPrice(product.oldPrice)}
          </p>
        ) : null}
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.4rem] bg-slate-50 p-4">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
            Active ingredients
          </p>
          <p className="mt-3 text-2xl font-extrabold text-[var(--foreground)]">
            {product.ingredients.length}
          </p>
        </div>

        <div className="rounded-[1.4rem] bg-slate-50 p-4">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
            Key benefits
          </p>
          <p className="mt-3 text-2xl font-extrabold text-[var(--foreground)]">
            {product.benefits.length}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <div className="rounded-[1.5rem] border border-[var(--border)] bg-white p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <Truck className="mt-0.5 h-5 w-5 text-[var(--primary)]" />
            <div>
              <p className="text-sm font-bold text-[var(--foreground)]">
                Fast delivery ready
              </p>
              <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">
                Set up for a smoother add-to-cart and checkout experience across
                desktop and mobile.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[var(--border)] bg-white p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-[var(--primary)]" />
            <div>
              <p className="text-sm font-bold text-[var(--foreground)]">
                Trusted formula presentation
              </p>
              <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">
                Cleaner structure, stronger trust signals, and easier scanning for
                shoppers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 rounded-[1.5rem] border border-[var(--border)] bg-slate-50 p-5">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="font-medium text-[var(--muted-foreground)]">Category</span>
          <span className="font-bold text-[var(--foreground)]">
            {product.category}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="font-medium text-[var(--muted-foreground)]">
            Availability
          </span>
          <span className="font-bold text-[var(--foreground)]">
            {product.inStock ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>
    </div>
  );
}
