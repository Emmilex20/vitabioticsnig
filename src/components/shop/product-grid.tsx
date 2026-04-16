import ProductCard from "./product-card";
import type { StorefrontProduct } from "@/lib/storefront-products";

type ProductGridProps = {
  items: StorefrontProduct[];
};

export default function ProductGrid({ items }: ProductGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
