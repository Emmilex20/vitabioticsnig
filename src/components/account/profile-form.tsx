"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import ButtonSpinner from "@/components/shared/button-spinner";

type ProfileFormProps = {
  initialFirstName: string;
  initialLastName: string;
  initialEmail: string;
};

export default function ProfileForm({
  initialFirstName,
  initialLastName,
  initialEmail,
}: ProfileFormProps) {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [email, setEmail] = useState(initialEmail);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("");
    setError("");
    setIsSaving(true);

    try {
      const response = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to update profile");
        toast.error(data.error || "Unable to update profile");
        return;
      }

      setSuccess("Profile updated successfully.");
      toast.success("Profile updated successfully.");
    } catch {
      setError("Something went wrong while updating your profile.");
      toast.error("Something went wrong while updating your profile.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
        Edit Profile
      </h2>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        {success ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {success}
          </div>
        ) : null}

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

        <button
          type="submit"
          disabled={isSaving}
          className="rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
        >
          {isSaving ? <ButtonSpinner label="Saving..." /> : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
