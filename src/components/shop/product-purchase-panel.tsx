"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Minus, Plus, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import type { StorefrontProduct } from "@/lib/storefront-products";

type ProductPurchasePanelProps = {
  product: StorefrontProduct;
  relatedProducts?: StorefrontProduct[];
};

export default function ProductPurchasePanel({
  product,
  relatedProducts = [],
}: ProductPurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);
  const [showUpsell, setShowUpsell] = useState(false);
  const { addItem } = useCart();
  const recommendedProducts = relatedProducts
    .filter((relatedProduct) => relatedProduct.inStock)
    .slice(0, 3);

  useEffect(() => {
    if (!showUpsell) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowUpsell(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [showUpsell]);

  function formatPrice(price: number) {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  }

  function decreaseQty() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }

  function increaseQty() {
    setQuantity((prev) => prev + 1);
  }

  function handleAddToCart() {
    addItem(product, quantity);

    if (recommendedProducts.length > 0) {
      setShowUpsell(true);
    }
  }

  function handleAddRelatedProduct(relatedProduct: StorefrontProduct) {
    addItem(relatedProduct, 1);
  }

  return (
    <>
      <div className="rounded-[1.75rem] border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
          <div className="flex items-center justify-between rounded-full border border-[var(--border)] bg-white px-2 sm:px-0">
            <button
              onClick={decreaseQty}
              className="flex h-11 w-11 items-center justify-center text-[var(--foreground)]"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>

            <span className="flex h-11 min-w-12 items-center justify-center text-sm font-bold text-[var(--foreground)]">
              {quantity}
            </span>

            <button
              onClick={increaseQty}
              className="flex h-11 w-11 items-center justify-center text-[var(--foreground)]"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="group w-full rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="inline-flex items-center gap-2">
              {product.inStock ? `Add ${quantity} to Cart` : "Out of Stock"}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </button>
        </div>
      </div>

      {showUpsell ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
          onClick={() => setShowUpsell(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-upsell-title"
            className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/60 bg-white p-6 shadow-[0_32px_90px_rgba(15,23,42,0.24)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowUpsell(false)}
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--foreground)] transition hover:bg-slate-50"
              aria-label="Close recommendations"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                  <CheckCircle2 size={14} />
                  Added to cart
                </p>
                <h3
                  id="cart-upsell-title"
                  className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--foreground)]"
                >
                  Complete the routine with related picks
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted-foreground)]">
                  These products are from the same category and pair naturally
                  with {product.name}.
                </p>
              </div>

              <Link
                href="/cart"
                className="inline-flex rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                View Cart
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {recommendedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="rounded-[1.7rem] border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-[1.4rem] bg-slate-50 p-5">
                    {relatedProduct.imageUrl ? (
                      <Image
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        fill
                        sizes="(min-width: 1280px) 18vw, (min-width: 768px) 30vw, 100vw"
                        className="object-contain p-5"
                      />
                    ) : (
                      <div className="text-center text-sm font-bold text-[var(--primary)]">
                        Product Image
                      </div>
                    )}
                  </div>

                  <div className="mt-5">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue-700">
                      {relatedProduct.category}
                    </p>
                    <h4 className="mt-2 text-xl font-bold tracking-tight text-[var(--foreground)]">
                      {relatedProduct.name}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                      {relatedProduct.shortDescription}
                    </p>
                    <p className="mt-2 text-lg font-extrabold text-[var(--foreground)]">
                      {formatPrice(relatedProduct.price)}
                    </p>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleAddRelatedProduct(relatedProduct)}
                      className="flex-1 rounded-full bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Add to cart
                    </button>
                    <Link
                      href={`/products/${relatedProduct.slug}`}
                      className="rounded-full border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-slate-50"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setShowUpsell(false)}
                className="text-sm font-semibold text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
              >
                No thanks
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
