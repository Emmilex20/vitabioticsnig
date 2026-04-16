"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddressForm from "./address-form";

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

export default function AddressesManager() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAddresses() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/account/addresses");
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to load addresses");
        toast.error(data.error || "Unable to load addresses");
        return;
      }

      setAddresses(data.addresses || []);
    } catch {
      setError("Something went wrong while loading addresses.");
      toast.error("Something went wrong while loading addresses.");
    } finally {
      setLoading(false);
    }
  }

  async function setDefault(id: string) {
    try {
      const response = await fetch(`/api/account/addresses/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDefault: true }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Unable to set default address.");
        toast.error(data.error || "Unable to set default address.");
        return;
      }

      await loadAddresses();
      toast.success("Default address updated");
    } catch {
      setError("Unable to set default address.");
      toast.error("Unable to set default address.");
    }
  }

  async function removeAddress(id: string) {
    const confirmed = window.confirm("Delete this address?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/account/addresses/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Unable to delete address.");
        toast.error(data.error || "Unable to delete address.");
        return;
      }

      await loadAddresses();
      toast.success("Address deleted");
    } catch {
      setError("Unable to delete address.");
      toast.error("Unable to delete address.");
    }
  }

  useEffect(() => {
    loadAddresses();
  }, []);

  return (
    <div className="space-y-8">
      <AddressForm onCreated={loadAddresses} />

      <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
          Saved Addresses
        </h2>

        {error ? (
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : null}

        {loading ? (
          <p className="mt-5 text-[var(--muted-foreground)]">
            Loading addresses...
          </p>
        ) : addresses.length === 0 ? (
          <p className="mt-5 text-[var(--muted-foreground)]">
            No saved addresses yet.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="rounded-[1.5rem] border border-[var(--border)] bg-slate-50 p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-bold text-[var(--foreground)]">
                        {address.fullName}
                      </p>
                      {address.isDefault ? (
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-blue-700">
                          Default
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
                      {address.addressLine1}
                      {address.addressLine2 ? `, ${address.addressLine2}` : ""}
                      <br />
                      {address.city}, {address.state}, {address.country}
                      <br />
                      {address.phone}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {!address.isDefault ? (
                      <button
                        onClick={() => setDefault(address.id)}
                        className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:bg-gray-50"
                      >
                        Set Default
                      </button>
                    ) : null}

                    <button
                      onClick={() => removeAddress(address.id)}
                      className="rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
