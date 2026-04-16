"use client";

import { useState } from "react";

type OrderStatusEditorProps = {
  orderId: string;
  currentStatus: string;
};

const statusOptions = [
  "PENDING",
  "PAID",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function OrderStatusEditor({
  orderId,
  currentStatus,
}: OrderStatusEditorProps) {
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to update status");
        return;
      }

      setSuccess("Order status updated successfully.");
    } catch {
      setError("Something went wrong while updating order status.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm">
      <h2 className="text-xl font-extrabold tracking-tight text-[var(--foreground)]">
        Update Order Status
      </h2>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-12 rounded-2xl border border-[var(--border)] bg-white px-4 text-sm font-medium text-[var(--foreground)] outline-none"
        >
          {statusOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {saving ? "Saving..." : "Save Status"}
        </button>
      </div>

      {success ? (
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {success}
        </div>
      ) : null}

      {error ? (
        <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {error}
        </div>
      ) : null}
    </div>
  );
}
