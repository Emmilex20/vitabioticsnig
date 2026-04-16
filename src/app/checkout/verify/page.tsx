"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import { useCart } from "@/context/cart-context";

function CheckoutVerifyStatus({
  title,
  message,
  error = false,
}: {
  title: string;
  message: string;
  error?: boolean;
}) {
  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-10 text-center shadow-sm">
      <h1
        className={`text-3xl font-extrabold tracking-tight ${error ? "text-rose-700" : "text-[var(--foreground)]"}`}
      >
        {title}
      </h1>
      <p className="mt-4 text-[var(--muted-foreground)]">{message}</p>
    </div>
  );
}

function CheckoutVerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();

  const [message, setMessage] = useState("Verifying your payment...");
  const [error, setError] = useState("");

  useEffect(() => {
    async function verify() {
      const reference = searchParams.get("reference");

      if (!reference) {
        setError("Missing payment reference.");
        return;
      }

      try {
        const response = await fetch("/api/orders/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reference }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Unable to verify payment");
          return;
        }

        clearCart();
        setMessage("Payment verified successfully. Redirecting...");

        router.push(`/checkout/success?orderId=${data.orderId}`);
        router.refresh();
      } catch {
        setError("Something went wrong while verifying payment.");
      }
    }

    verify();
  }, [searchParams, router, clearCart]);

  return (
    <CheckoutVerifyStatus
      title={error ? "Verification Failed" : "Payment Verification"}
      message={error || message}
      error={Boolean(error)}
    />
  );
}

export default function CheckoutVerifyPage() {
  return (
    <SiteShell>
      <section className="py-20">
        <Container className="max-w-2xl">
          <Suspense
            fallback={
              <CheckoutVerifyStatus
                title="Payment Verification"
                message="Verifying your payment..."
              />
            }
          >
            <CheckoutVerifyContent />
          </Suspense>
        </Container>
      </section>
    </SiteShell>
  );
}
