"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import ButtonSpinner from "@/components/shared/button-spinner";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setResetUrl("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to prepare reset link");
        toast.error(data.error || "Unable to prepare reset link");
        return;
      }

      setSuccess(
        data.message ||
          "If an account exists with that email, a reset link has been prepared."
      );

      if (data.resetUrl) {
        setResetUrl(data.resetUrl);
      }

      toast.success("Reset instructions prepared");
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

      {success ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {success}
        </div>
      ) : null}

      <div>
        <label
          htmlFor="forgotEmail"
          className="mb-2 block text-sm font-semibold text-[var(--foreground)]"
        >
          Professional Email Address
        </label>
        <input
          id="forgotEmail"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your professional email address"
          className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]"
          required
        />
      </div>

      {resetUrl ? (
        <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <p className="font-semibold">Development reset link:</p>
          <a
            href={resetUrl}
            className="mt-2 block break-all font-medium underline"
          >
            {resetUrl}
          </a>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[var(--primary)] px-5 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <ButtonSpinner label="Preparing Link..." />
        ) : (
          "Send Reset Link"
        )}
      </button>

      <p className="text-center text-sm text-[var(--muted-foreground)]">
        Remember your password?{" "}
        <Link href="/login" className="font-semibold text-[var(--primary)]">
          Back to login
        </Link>
      </p>
    </form>
  );
}
