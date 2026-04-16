"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import PasswordInput from "@/components/auth/password-input";
import ButtonSpinner from "@/components/shared/button-spinner";

export default function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("");
    setError("");
    setIsSaving(true);

    try {
      const response = await fetch("/api/account/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to change password");
        toast.error(data.error || "Unable to change password");
        return;
      }

      setSuccess(data.message || "Password updated successfully");
      toast.success(data.message || "Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Something went wrong while changing your password.");
      toast.error("Something went wrong while changing your password.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
        Change Password
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

        <PasswordInput
          id="current-password"
          name="currentPassword"
          label="Current Password"
          value={currentPassword}
          onChange={setCurrentPassword}
          placeholder="Enter current password"
        />

        <PasswordInput
          id="new-password"
          name="newPassword"
          label="New Password"
          value={newPassword}
          onChange={setNewPassword}
          placeholder="Enter new password"
        />

        <PasswordInput
          id="confirm-new-password"
          name="confirmPassword"
          label="Confirm New Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm new password"
        />

        <button
          type="submit"
          disabled={isSaving}
          className="rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
        >
          {isSaving ? (
            <ButtonSpinner label="Updating..." />
          ) : (
            "Update Password"
          )}
        </button>
      </form>
    </div>
  );
}
