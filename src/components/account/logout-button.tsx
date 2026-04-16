"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      const response = await fetch("/api/shop-auth/logout", {
        method: "POST",
      });

      const data = await response.json();

      router.push(data.redirectTo || "/shop-auth/login");
      router.refresh();
    } catch {
      router.push("/shop-auth/login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
