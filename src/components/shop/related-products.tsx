import type { StorefrontProduct } from "@/lib/storefront-products";
import ProductGrid from "./product-grid";

type RelatedProductsProps = {
  currentProductId: string;
  currentCategory: StorefrontProduct["category"];
  products: StorefrontProduct[];
};

export default function RelatedProducts({
  currentProductId,
  currentCategory,
  products,
}: RelatedProductsProps) {
  const related = products
    .filter(
      (product) =>
        product.category === currentCategory && product.id !== currentProductId
    )
    .slice(0, 3);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-14">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Related Products
        </h2>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Customers exploring this category may also like these options.
        </p>
      </div>

      <ProductGrid items={related} />
    </section>
  );
}
