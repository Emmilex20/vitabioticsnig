"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  CreditCard,
  LockKeyhole,
  MapPinHouse,
  ShieldCheck,
  Truck,
  UserRound,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { DELIVERY_FEE_NAIRA, calculateOrderTotal } from "@/lib/checkout";
import CheckoutAddressPicker from "./checkout-address-picker";
import ButtonSpinner from "@/components/shared/button-spinner";

type Address = {
  id: string;
  fullName: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2?: string | null;
  isDefault: boolean;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

function SectionHeader({
  icon,
  eyebrow,
  title,
  description,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[var(--primary)] ring-1 ring-blue-100">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-700">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--muted-foreground)] sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function CheckoutForm() {
  const { items, subtotal } = useCart();
  const total = calculateOrderTotal(subtotal);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [notes, setNotes] = useState("");

  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  const [loadingAddress, setLoadingAddress] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  function applyAddress(address: Address) {
    setCustomerName(address.fullName || "");
    setCustomerPhone(address.phone || "");
    setCountry(address.country || "Nigeria");
    setState(address.state || "");
    setCity(address.city || "");
    setAddressLine1(address.addressLine1 || "");
    setAddressLine2(address.addressLine2 || "");
    setSelectedAddressId(address.id);
  }

  useEffect(() => {
    async function loadAddresses() {
      try {
        const response = await fetch("/api/account/addresses");
        const data = await response.json();

        if (response.ok && Array.isArray(data.addresses)) {
          const addresses = data.addresses as Address[];
          setSavedAddresses(addresses);

          const defaultAddress =
            addresses.find((address) => address.isDefault) || addresses[0];

          if (defaultAddress) {
            applyAddress(defaultAddress);
          }
        }
      } catch {
        // ignore autofill errors
      } finally {
        setLoadingAddress(false);
      }
    }

    loadAddresses();
  }, []);

  function handleSelectAddress(addressId: string) {
    const address = savedAddresses.find((item) => item.id === addressId);
    if (!address) return;
    applyAddress(address);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (items.length === 0) {
      setError("Your cart is empty.");
      toast.error("Your cart is empty.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    const loadingToast = toast.loading("Redirecting to secure payment...");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          country,
          state,
          city,
          addressLine1,
          addressLine2,
          notes,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            slug: item.slug,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to initialize payment");
        toast.dismiss(loadingToast);
        toast.error(data.error || "Unable to initialize payment");
        return;
      }

      window.location.href = data.authorizationUrl;
    } catch {
      setError("Something went wrong while starting payment.");
      toast.dismiss(loadingToast);
      toast.error("Something went wrong while starting payment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-10 grid gap-8 xl:mt-12 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-start">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error ? (
          <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-700 shadow-sm">
            {error}
          </div>
        ) : null}

        <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
          <SectionHeader
            icon={<UserRound size={20} />}
            eyebrow="Step 1"
            title="Contact information"
            description="Use an active email and phone number so payment confirmation and order updates reach you without delay."
          />

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                Full Name
              </label>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="h-[52px] w-full rounded-2xl border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] px-4 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                Email Address
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="h-[52px] w-full rounded-2xl border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] px-4 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                Phone Number
              </label>
              <input
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="h-[52px] w-full rounded-2xl border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] px-4 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                placeholder="0800 000 0000"
                required
              />
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
          <SectionHeader
            icon={<MapPinHouse size={20} />}
            eyebrow="Step 2"
            title="Delivery address"
            description="Choose a saved address or enter a new one. We'll use this information to prepare a smooth delivery and payment handoff."
          />

          {loadingAddress ? (
            <p className="mt-5 text-sm text-[var(--muted-foreground)]">
              Checking for saved addresses...
            </p>
          ) : null}

          {savedAddresses.length > 0 ? (
            <div className="mt-6">
              <CheckoutAddressPicker
                addresses={savedAddresses}
                selectedAddressId={selectedAddressId}
                onSelectAddress={handleSelectAddress}
              />
            </div>
          ) : (
            <div className="mt-6 rounded-[1.5rem] border border-dashed border-blue-200 bg-blue-50/60 px-4 py-4 text-sm text-[var(--muted-foreground)]">
              No saved addresses yet. Fill in the form below to continue.
            </div>
          )}

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                Country
              </label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="h-[52px] w-full rounded-2xl border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] px-4 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                State
              </label>
              <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="h-[52px] w-full rounded-2xl border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] px-4 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                placeholder="Lagos"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                City
              </label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-[52px] w-full rounded-2xl border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] px-4 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                placeholder="Ikeja"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                Address Line 1
              </label>
              <input
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                className="h-[52px] w-full rounded-2xl border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] px-4 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                placeholder="House number and street"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                Address Line 2
              </label>
              <input
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                className="h-[52px] w-full rounded-2xl border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] px-4 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                placeholder="Apartment, suite, landmark, or additional details"
              />
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
          <SectionHeader
            icon={<CreditCard size={20} />}
            eyebrow="Step 3"
            title="Payment and order notes"
            description="Paystack handles the secure payment step after you place the order. Add optional delivery notes if the rider should know anything important."
          />

          <div className="mt-8 grid gap-5">
            <div className="rounded-[1.5rem] border border-blue-100 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-700">
                    Payment method
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-[var(--foreground)]">
                    Debit card or bank transfer via Paystack
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--muted-foreground)]">
                    You&apos;ll be redirected to a secure Paystack page to complete
                    payment after your order is created.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  <LockKeyhole size={14} />
                  Secure payment
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[var(--border)] bg-slate-50/70 p-5">
              <div className="flex items-start gap-3">
                <Truck
                  size={18}
                  className="mt-1 shrink-0 text-[var(--primary)]"
                />
                <div>
                  <p className="font-semibold text-[var(--foreground)]">
                    Delivery setup
                  </p>
                  <p className="mt-1 text-sm leading-7 text-[var(--muted-foreground)]">
                    A flat delivery fee of {formatPrice(DELIVERY_FEE_NAIRA)} is
                    added to every order and included in the total below.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                Order Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] px-4 py-3 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                placeholder="Optional notes for delivery, gate access, or preferred contact instructions"
              />
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
                <ShieldCheck size={16} className="text-emerald-600" />
                Protected checkout experience
              </p>
              <p className="max-w-2xl text-sm leading-7 text-[var(--muted-foreground)]">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="font-semibold text-[var(--primary)]">
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-[var(--primary)]"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <ButtonSpinner label="Redirecting to Paystack..." />
              ) : (
                <>
                  Place Order
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      <aside className="space-y-5 xl:sticky xl:top-28">
        <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-700">
                Order summary
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[var(--foreground)]">
                {itemCount} item{itemCount === 1 ? "" : "s"} in your bag
              </h2>
            </div>
            <div className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
              {formatPrice(total)}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {items.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-[var(--border)] bg-slate-50/80 px-4 py-5 text-center text-sm text-[var(--muted-foreground)]">
                No items in cart.
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[1.6rem] border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#f9fbff_100%)] p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[1.25rem] bg-slate-50">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-contain p-2"
                        />
                      ) : (
                        <div className="text-center text-[10px] font-bold text-[var(--primary)]">
                          Product
                          <br />
                          Image
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue-700">
                        {item.category}
                      </p>
                      <h3 className="mt-1 text-base font-bold text-[var(--foreground)]">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                        Qty {item.quantity} x {formatPrice(item.price)}
                      </p>
                      <p className="mt-3 text-sm font-extrabold text-[var(--foreground)]">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 space-y-3 border-t border-[var(--border)] pt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--muted-foreground)]">Subtotal</span>
              <span className="font-bold text-[var(--foreground)]">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--muted-foreground)]">Delivery</span>
              <span className="font-bold text-[var(--foreground)]">
                {formatPrice(DELIVERY_FEE_NAIRA)}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
              <span className="text-base font-semibold text-[var(--foreground)]">
                Total due now
              </span>
              <span className="text-2xl font-extrabold text-[var(--foreground)]">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
