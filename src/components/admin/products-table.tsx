import Link from "next/link";

type ProductItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  sku: string;
  inStock: boolean;
  createdAt: string | Date;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductsTable({ items }: { items: ProductItem[] }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-sm">
      <div className="border-b border-[var(--border)] px-6 py-5">
        <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
          Products
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
                Category
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Price
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                SKU
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Stock
              </th>
              <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((product) => (
              <tr key={product.id} className="border-t border-[var(--border)]">
                <td className="px-6 py-5 font-bold text-[var(--foreground)]">
                  {product.name}
                </td>
                <td className="px-6 py-5 text-sm font-medium text-[var(--foreground)]">
                  {product.category}
                </td>
                <td className="px-6 py-5 text-sm font-medium text-[var(--foreground)]">
                  {formatPrice(product.price)}
                </td>
                <td className="px-6 py-5 text-sm text-[var(--muted-foreground)]">
                  {product.sku}
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] ${
                      product.inStock
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-sm font-semibold text-[var(--primary)]"
                  >
                    Edit product
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
