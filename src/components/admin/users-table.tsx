"use client";

import { useState } from "react";

type UserItem = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string | Date;
};

type UsersTableProps = {
  items: UserItem[];
};

const roleOptions = ["ADMIN", "DOCTOR", "PHARMACIST"];

export default function UsersTable({ items }: UsersTableProps) {
  const [loadingId, setLoadingId] = useState("");

  async function updateRole(userId: string, role: string) {
    setLoadingId(userId);

    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
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
          Portal Users
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Name
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Email
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Role
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Joined
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((user) => (
              <tr key={user.id} className="border-t border-[var(--border)]">
                <td className="px-6 py-5 align-top">
                  <p className="font-bold text-[var(--foreground)]">
                    {user.firstName} {user.lastName}
                  </p>
                </td>

                <td className="px-6 py-5 align-top">
                  <p className="text-sm font-medium text-[var(--foreground)]">
                    {user.email}
                  </p>
                </td>

                <td className="px-6 py-5 align-top">
                  <select
                    defaultValue={user.role}
                    onChange={(e) => updateRole(user.id, e.target.value)}
                    disabled={loadingId === user.id}
                    className="h-10 rounded-xl border border-[var(--border)] bg-white px-3 text-sm font-medium text-[var(--foreground)] outline-none"
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-6 py-5 align-top">
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
