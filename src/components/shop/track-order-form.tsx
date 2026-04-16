"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import ButtonSpinner from "@/components/shared/button-spinner";
import OrderTrackingResult from "./order-tracking-result";

type TrackableOrder = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  country: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2?: string | null;
  notes?: string | null;
  status: string;
  paymentReference?: string | null;
  subtotal: number;
  total: number;
  createdAt: string;
  items: {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    totalPrice: number;
  }[];
};

export default function TrackOrderForm() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<TrackableOrder | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setOrder(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to find order");
        toast.error(data.error || "Unable to find order");
        return;
      }

      setOrder(data.order);
      toast.success("Order found");
    } catch {
      setError("Something went wrong while tracking your order.");
      toast.error("Something went wrong while tracking your order.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm"
      >
        <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
          Track Your Order
        </h2>

        <p className="mt-3 text-[var(--muted-foreground)]">
          Enter the order ID and email address used during checkout.
        </p>

        {error ? (
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : null}

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
              Order ID
            </label>
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
              placeholder="Enter order ID"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
              placeholder="Enter checkout email"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? <ButtonSpinner label="Checking..." /> : "Track Order"}
        </button>
      </form>

      {order ? <OrderTrackingResult order={order} /> : null}
    </div>
  );
}
