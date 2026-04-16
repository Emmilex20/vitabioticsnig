import Link from "next/link";
import AdminShell from "@/components/admin/admin-shell";
import AdminHeader from "@/components/admin/admin-header";
import CreateProductForm from "@/components/admin/create-product-form";
import { requireRole } from "@/lib/session";

export default async function AdminCreateProductPage() {
  const user = await requireRole("ADMIN");

  return (
    <AdminShell>
      <AdminHeader
        title="Create Product"
        description="Add a new product to the catalog with its pricing, product story, image, and nutrient spotlight details."
        firstName={user.firstName}
      />

      <Link
        href="/admin/products"
        className="inline-flex text-sm font-semibold text-[var(--primary)]"
      >
        &larr; Back to products
      </Link>

      <CreateProductForm />
    </AdminShell>
  );
}
