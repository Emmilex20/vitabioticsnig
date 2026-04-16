"use client";

import { useMemo, useState } from "react";
import RequestsTable from "./requests-table";

type RequestItem = {
  id: string;
  title: string;
  type: string;
  organization: string;
  status: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

type RequestFiltersProps = {
  items: RequestItem[];
};

const statusOptions = [
  "ALL",
  "PENDING",
  "IN_REVIEW",
  "APPROVED",
  "COMPLETED",
  "REJECTED",
];

const typeOptions = [
  "ALL",
  "PHARMACY_TRAINING",
  "SAMPLE_DAY",
  "DOCTOR_CME_CPD",
  "DOCTOR_SAMPLE_REQUEST",
];

export default function RequestFilters({ items }: RequestFiltersProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [type, setType] = useState("ALL");

  const filteredItems = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        !normalized ||
        item.title.toLowerCase().includes(normalized) ||
        item.organization.toLowerCase().includes(normalized) ||
        item.user.firstName.toLowerCase().includes(normalized) ||
        item.user.lastName.toLowerCase().includes(normalized) ||
        item.user.email.toLowerCase().includes(normalized);

      const matchesStatus = status === "ALL" || item.status === status;
      const matchesType = type === "ALL" || item.type === type;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [items, search, status, type]);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-[var(--border)] bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_260px]">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
              Search Requests
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, organization, or user"
              className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4 text-sm outline-none transition focus:border-[var(--primary)]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4 text-sm outline-none transition focus:border-[var(--primary)]"
            >
              {statusOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
              Request Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4 text-sm outline-none transition focus:border-[var(--primary)]"
            >
              {typeOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-4 text-sm text-[var(--muted-foreground)]">
          Showing{" "}
          <span className="font-bold text-[var(--foreground)]">
            {filteredItems.length}
          </span>{" "}
          request(s)
        </p>
      </div>

      <RequestsTable items={filteredItems} />
    </div>
  );
}
