"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PasswordInput from "@/components/auth/password-input";
import ButtonSpinner from "@/components/shared/button-spinner";

export default function CustomerLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/shop-auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to sign in");
        toast.error(data.error || "Unable to sign in");
        return;
      }

      toast.success("Signed in successfully");
      router.push(data.redirectTo);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {error}
        </div>
      ) : null}

      <div>
        <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
          required
        />
      </div>

      <PasswordInput
        id="customer-password"
        name="password"
        label="Password"
        value={password}
        onChange={setPassword}
        placeholder="Enter your password"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[var(--primary)] px-5 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
      >
        {isSubmitting ? <ButtonSpinner label="Signing In..." /> : "Sign In"}
      </button>

      <p className="text-center text-sm text-[var(--muted-foreground)]">
        Don&apos;t have an account?{" "}
        <Link
          href="/shop-auth/register"
          className="font-semibold text-[var(--primary)]"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}
