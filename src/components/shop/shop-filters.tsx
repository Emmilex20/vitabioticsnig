type ShopFiltersProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
};

const categories = ["All", "Women", "Men", "Kids", "Pregnancy"];

export default function ShopFilters({
  selectedCategory,
  onCategoryChange,
  onClearFilters,
}: ShopFiltersProps) {
  return (
    <aside className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm">
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-extrabold text-[var(--foreground)]">
            Filters
          </h2>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Narrow products by category and quickly reset selections.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.15em] text-[var(--foreground)]">
            Categories
          </h3>

          <div className="mt-4 space-y-3">
            {categories.map((category) => {
              const checked = selectedCategory === category;

              return (
                <label
                  key={category}
                  className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[var(--foreground)]"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={checked}
                    onChange={() => onCategoryChange(category)}
                    className="h-4 w-4 border-[var(--border)]"
                  />
                  <span>{category}</span>
                </label>
              );
            })}
          </div>
        </div>

        <button
          onClick={onClearFilters}
          className="w-full rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-gray-50"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
}
