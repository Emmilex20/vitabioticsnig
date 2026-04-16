"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Overview", href: "/admin" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Requests", href: "/admin/requests" },
  { label: "Resources", href: "/admin/resources" },
  { label: "Users", href: "/admin/users" },
  { label: "Products", href: "/admin/products" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-[2rem] border border-[var(--border)] bg-white p-5 shadow-sm">
      <div className="mb-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
          Admin Panel
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
          Vitabiotics
        </h2>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--foreground)] hover:bg-slate-50"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
