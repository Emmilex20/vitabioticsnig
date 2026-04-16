import Link from "next/link";
import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/admin-shell";
import AdminHeader from "@/components/admin/admin-header";
import EditProductForm from "@/components/admin/edit-product-form";
import { requireRole } from "@/lib/session";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminProductDetailPage({ params }: PageProps) {
  const user = await requireRole("ADMIN");
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  return (
    <AdminShell>
      <AdminHeader
        title="Edit Product"
        description="Update the product content, stock state, image, benefits, ingredients, and storefront presentation."
        firstName={user.firstName}
      />

      <Link
        href="/admin/products"
        className="inline-flex text-sm font-semibold text-[var(--primary)]"
      >
        &larr; Back to products
      </Link>

      <EditProductForm product={product} />
    </AdminShell>
  );
}
