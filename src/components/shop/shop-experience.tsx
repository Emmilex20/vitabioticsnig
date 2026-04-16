"use client";

import { useMemo, useState } from "react";
import Container from "@/components/shared/container";
import ShopFilters from "./shop-filters";
import ShopToolbar from "./shop-toolbar";
import ProductGrid from "./product-grid";
import type { StorefrontProduct } from "@/lib/storefront-products";

export default function ShopExperience({
  products,
}: {
  products: StorefrontProduct[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const normalized = searchTerm.toLowerCase();

      result = result.filter((product) => {
        return (
          product.name.toLowerCase().includes(normalized) ||
          product.category.toLowerCase().includes(normalized) ||
          product.shortDescription.toLowerCase().includes(normalized)
        );
      });
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, selectedCategory, searchTerm, sortBy]);

  function handleClearFilters() {
    setSelectedCategory("All");
    setSearchTerm("");
    setSortBy("featured");
  }

  return (
    <section className="pb-16 sm:pb-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ShopFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onClearFilters={handleClearFilters}
            />
          </div>

          <div className="space-y-6">
            <ShopToolbar
              total={filteredProducts.length}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {filteredProducts.length > 0 ? (
              <ProductGrid items={filteredProducts} />
            ) : (
              <div className="rounded-[2rem] border border-[var(--border)] bg-white p-10 text-center shadow-sm">
                <h2 className="text-2xl font-bold text-[var(--foreground)]">
                  No products found
                </h2>
                <p className="mt-3 text-[var(--muted-foreground)]">
                  Try a different search term or reset your filters.
                </p>

                <button
                  onClick={handleClearFilters}
                  className="mt-6 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
