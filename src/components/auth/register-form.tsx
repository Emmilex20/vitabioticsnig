"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PasswordInput from "./password-input";
import ButtonSpinner from "@/components/shared/button-spinner";

type ProfessionalRole = "DOCTOR" | "PHARMACIST";

export default function RegisterForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<ProfessionalRole>("DOCTOR");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const passwordChecks = {
    minLength: password.length >= 6,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const strengthScore = [
    passwordChecks.minLength,
    passwordChecks.lowercase,
    passwordChecks.uppercase,
    passwordChecks.number,
    passwordChecks.special,
  ].filter(Boolean).length;

  const strength = password.length === 0
    ? { label: "Not set", tone: "bg-slate-200", text: "text-[var(--muted-foreground)]" }
    : strengthScore <= 2
      ? { label: "Weak", tone: "bg-rose-500", text: "text-rose-700" }
      : strengthScore <= 4
        ? { label: "Medium", tone: "bg-amber-500", text: "text-amber-700" }
        : { label: "Strong", tone: "bg-emerald-500", text: "text-emerald-700" };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!agree) {
      setError("You must agree to the Terms & Conditions and Privacy Policy");
      toast.error("You must agree to the Terms & Conditions and Privacy Policy");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
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
          role,
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
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-semibold text-[var(--foreground)]"
          >
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="First name"
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]"
            required
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-semibold text-[var(--foreground)]"
          >
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Last name"
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]"
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="professionalRole"
          className="mb-2 block text-sm font-semibold text-[var(--foreground)]"
        >
          Professional Role
        </label>

        <select
          id="professionalRole"
          value={role}
          onChange={(event) => setRole(event.target.value as ProfessionalRole)}
          className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]"
        >
          <option value="DOCTOR">Doctor</option>
          <option value="PHARMACIST">Pharmacist</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="registerEmail"
          className="mb-2 block text-sm font-semibold text-[var(--foreground)]"
        >
          Professional Email Address
        </label>
        <input
          id="registerEmail"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your professional email address"
          className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]"
          required
        />
      </div>

      <PasswordInput
        id="registerPassword"
        name="password"
        label="Password"
        placeholder="Create a password"
        value={password}
        onChange={setPassword}
      />

      <div className="rounded-[1.5rem] border border-[var(--border)] bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-[var(--foreground)]">
            Password strength
          </p>
          <span className={`text-sm font-bold ${strength.text}`}>
            {strength.label}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className={`h-2 rounded-full ${
                strengthScore >= item
                  ? strength.tone
                  : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <p className="font-semibold text-[var(--foreground)]">
            Required
          </p>
          <p
            className={
              passwordChecks.minLength
                ? "font-medium text-emerald-700"
                : "font-medium text-[var(--muted-foreground)]"
            }
          >
            At least 6 characters
          </p>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <p className="font-semibold text-[var(--foreground)]">
            Recommended for stronger security
          </p>
          <ul className="space-y-2 text-[var(--muted-foreground)]">
            <li className={passwordChecks.lowercase ? "text-emerald-700" : undefined}>
              Include a lowercase letter
            </li>
            <li className={passwordChecks.uppercase ? "text-emerald-700" : undefined}>
              Include an uppercase letter
            </li>
            <li className={passwordChecks.number ? "text-emerald-700" : undefined}>
              Include a number
            </li>
            <li className={passwordChecks.special ? "text-emerald-700" : undefined}>
              Include a special character
            </li>
          </ul>
        </div>
      </div>

      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />

      <label className="flex items-start gap-3 text-sm text-[var(--muted-foreground)]">
        <input
          type="checkbox"
          checked={agree}
          onChange={(event) => setAgree(event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-[var(--border)]"
        />
        <span>I agree to the Terms & Conditions and Privacy Policy.</span>
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[var(--primary)] px-5 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <ButtonSpinner label="Creating Account..." />
        ) : (
          "Create Professional Portal Access"
        )}
      </button>

      <p className="text-center text-sm text-[var(--muted-foreground)]">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-[var(--primary)]">
          Sign in
        </Link>
      </p>
    </form>
  );
}
