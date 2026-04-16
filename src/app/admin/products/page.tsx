import Link from "next/link";
import AdminShell from "@/components/admin/admin-shell";
import AdminHeader from "@/components/admin/admin-header";
import ProductsTable from "@/components/admin/products-table";
import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage() {
  const user = await requireRole("ADMIN");

  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AdminShell>
      <AdminHeader
        title="Products"
        description="Manage your product catalog, review stock status, and jump into edits from one place."
        firstName={user.firstName}
      />

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border border-[var(--border)] bg-white px-6 py-5 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-[var(--foreground)]">
            Product List
          </h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {products.length} product{products.length === 1 ? "" : "s"} in your
            catalog.
          </p>
        </div>

        <Link
          href="/admin/products/create"
          className="inline-flex rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Add Product
        </Link>
      </div>

      <ProductsTable items={products} />
    </AdminShell>
  );
}
