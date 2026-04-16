"use client";

import Link from "next/link";
import { useState } from "react";

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

type RequestsTableProps = {
  items: RequestItem[];
};

const statusOptions = [
  "PENDING",
  "IN_REVIEW",
  "APPROVED",
  "COMPLETED",
  "REJECTED",
];

export default function RequestsTable({ items }: RequestsTableProps) {
  const [loadingId, setLoadingId] = useState("");

  async function updateStatus(id: string, status: string) {
    setLoadingId(id);

    try {
      await fetch(`/api/admin/requests/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      window.location.reload();
    } finally {
      setLoadingId("");
    }
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-sm">
      <div className="border-b border-[var(--border)] px-6 py-5">
        <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
          Portal Requests
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Request
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                User
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Organization
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Date
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-[var(--border)]">
                <td className="px-6 py-5 align-top">
                  <p className="font-bold text-[var(--foreground)]">{item.title}</p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    {item.type}
                  </p>
                </td>

                <td className="px-6 py-5 align-top">
                  <p className="font-semibold text-[var(--foreground)]">
                    {item.user.firstName} {item.user.lastName}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    {item.user.email}
                  </p>
                </td>

                <td className="px-6 py-5 align-top">
                  <p className="text-sm font-medium text-[var(--foreground)]">
                    {item.organization}
                  </p>
                </td>

                <td className="px-6 py-5 align-top">
                  <select
                    defaultValue={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value)}
                    disabled={loadingId === item.id}
                    className="h-10 rounded-xl border border-[var(--border)] bg-white px-3 text-sm font-medium text-[var(--foreground)] outline-none"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-6 py-5 align-top">
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </td>

                <td className="px-6 py-5 align-top">
                  <Link
                    href={`/admin/requests/${item.id}`}
                    className="text-sm font-semibold text-[var(--primary)]"
                  >
                    View details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
