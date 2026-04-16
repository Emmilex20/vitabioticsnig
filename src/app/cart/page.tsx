"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import { useCart } from "@/context/cart-context";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CartPage() {
  const {
    items,
    subtotal,
    increaseItem,
    decreaseItem,
    removeItem,
    clearCart,
  } = useCart();

  return (
    <SiteShell>
      <section className="py-14 sm:py-16">
        <Container>
          <div className="mb-8">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700">
              Your cart
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-(--foreground)">
              Shopping Cart
            </h1>
            <p className="mt-3 text-base text-(--muted-foreground)">
              Review your selected products before proceeding to checkout.
            </p>
          </div>

          {items.length === 0 ? (
            <div className="rounded-4xl border border-(--border) bg-white p-10 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-(--primary)">
                <ShoppingBag size={28} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-(--foreground)">
                Your cart is empty
              </h2>
              <p className="mt-3 text-(--muted-foreground)">
                Start exploring premium products and add them to your cart.
              </p>

              <Link
                href="/shop"
                className="mt-6 inline-flex rounded-full bg-(--primary) px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="space-y-5">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-4xl border border-(--border) bg-white p-5 shadow-sm sm:p-6"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                      <div className="relative flex h-28 w-full items-center justify-center overflow-hidden rounded-3xl bg-linear-to-br from-blue-50 via-white to-slate-100 sm:w-28">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="112px"
                            className="object-contain p-3"
                          />
                        ) : (
                          <div className="text-center text-xs font-bold text-(--primary)">
                            Product
                            <br />
                            Image
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-blue-700">
                              {item.category}
                            </span>

                            <h2 className="mt-3 text-xl font-bold text-(--foreground)">
                              {item.name}
                            </h2>

                            <p className="mt-2 text-sm text-(--muted-foreground)">
                              {formatPrice(item.price)} each
                            </p>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="inline-flex items-center gap-2 rounded-full border border-(--border) px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>

                        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center rounded-full border border-(--border)">
                            <button
                              onClick={() => decreaseItem(item.id)}
                              disabled={item.quantity <= 1}
                              className="flex h-11 w-11 items-center justify-center text-(--foreground) disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              <Minus size={16} />
                            </button>

                            <span className="flex h-11 min-w-12 items-center justify-center text-sm font-bold text-(--foreground)">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => increaseItem(item.id)}
                              className="flex h-11 w-11 items-center justify-center text-(--foreground)"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <p className="text-lg font-extrabold text-(--foreground)">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="h-fit rounded-4xl border border-(--border) bg-white p-6 shadow-sm lg:sticky lg:top-28">
                <h2 className="text-2xl font-extrabold text-(--foreground)">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-(--muted-foreground)">Subtotal</span>
                    <span className="font-bold text-(--foreground)">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-(--muted-foreground)">Delivery</span>
                    <span className="font-bold text-(--foreground)">
                      Calculated at checkout
                    </span>
                  </div>

                  <div className="border-t border-(--border) pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-(--foreground)">
                        Total
                      </span>
                      <span className="text-2xl font-extrabold text-(--foreground)">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="mt-8 block w-full rounded-full bg-(--primary) px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Proceed to Checkout
                </Link>

                <button
                  onClick={clearCart}
                  className="mt-3 w-full rounded-full border border-(--border) bg-white px-5 py-3.5 text-sm font-semibold text-(--foreground) transition hover:bg-gray-50"
                >
                  Clear Cart
                </button>

                <Link
                  href="/shop"
                  className="mt-3 block text-center text-sm font-semibold text-(--primary)"
                >
                  Continue Shopping
                </Link>
              </aside>
            </div>
          )}
        </Container>
      </section>
    </SiteShell>
  );
}
