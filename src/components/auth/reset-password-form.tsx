"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import PasswordInput from "./password-input";
import ButtonSpinner from "@/components/shared/button-spinner";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Missing or invalid reset token.");
      toast.error("Missing or invalid reset token.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to reset password");
        toast.error(data.error || "Unable to reset password");
        return;
      }

      setSuccess(data.message || "Password reset successful.");
      toast.success(data.message || "Password reset successful.");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 1200);
    } catch {
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!token) {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          This reset link is invalid or incomplete.
        </div>

        <p className="text-sm text-[var(--muted-foreground)]">
          Please request a new reset link.
        </p>

        <Link
          href="/forgot-password"
          className="inline-flex rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Request New Link
        </Link>
      </div>
    );
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

      <PasswordInput
        id="newPassword"
        name="password"
        label="New Password"
        placeholder="Enter your new password"
        value={password}
        onChange={setPassword}
      />

      <PasswordInput
        id="confirmNewPassword"
        name="confirmPassword"
        label="Confirm New Password"
        placeholder="Confirm your new password"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[var(--primary)] px-5 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <ButtonSpinner label="Resetting Password..." />
        ) : (
          "Reset Password"
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
