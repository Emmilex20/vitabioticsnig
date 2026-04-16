import Link from "next/link";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { bestSellers } from "@/data/home";

export default function BestSellersPreview() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Best sellers"
            title="Popular wellness picks customers will love"
            description="A clean product preview section that will later connect to real product data from the database."
          />

          <Link
            href="/shop"
            className="w-fit rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-gray-50"
          >
            View all products
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {bestSellers.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-64 items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-100 p-6">
                <div className="flex h-32 w-28 items-center justify-center rounded-[1.5rem] border border-blue-100 bg-white text-center text-sm font-bold text-[var(--primary)] shadow-sm">
                  Product Image
                </div>
              </div>

              <div className="p-5">
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-blue-700">
                  {product.category}
                </span>

                <h3 className="mt-4 text-xl font-bold tracking-tight text-[var(--foreground)]">
                  {product.name}
                </h3>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-lg font-extrabold text-[var(--foreground)]">
                    {product.price}
                  </p>

                  <Link
                    href={product.href}
                    className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
