"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PasswordInput from "@/components/auth/password-input";
import ButtonSpinner from "@/components/shared/button-spinner";

export default function CustomerRegisterForm() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/shop-auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to create account");
        toast.error(data.error || "Unable to create account");
        return;
      }

      toast.success("Account created successfully");
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
            First Name
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
            Last Name
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
            required
          />
        </div>
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
          required
        />
      </div>

      <PasswordInput
        id="customer-register-password"
        name="password"
        label="Password"
        value={password}
        onChange={setPassword}
        placeholder="Create a password"
      />

      <PasswordInput
        id="customer-confirm-password"
        name="confirmPassword"
        label="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="Confirm your password"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[var(--primary)] px-5 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
      >
        {isSubmitting ? (
          <ButtonSpinner label="Creating Account..." />
        ) : (
          "Create Account"
        )}
      </button>

      <p className="text-center text-sm text-[var(--muted-foreground)]">
        Already have an account?{" "}
        <Link
          href="/shop-auth/login"
          className="font-semibold text-[var(--primary)]"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
