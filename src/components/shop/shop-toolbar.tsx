type ShopToolbarProps = {
  total: number;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
};

const chips = ["All", "Women", "Men", "Kids", "Pregnancy"];

export default function ShopToolbar({
  total,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
}: ShopToolbarProps) {
  return (
    <div className="space-y-5 rounded-[2rem] border border-[var(--border)] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--muted-foreground)]">
            Showing{" "}
            <span className="font-bold text-[var(--foreground)]">{total}</span>{" "}
            products
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="h-11 min-w-[220px] rounded-full border border-[var(--border)] bg-white px-4 text-sm font-medium text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)]"
          />

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="h-11 rounded-full border border-[var(--border)] bg-white px-4 text-sm font-medium text-[var(--foreground)] outline-none"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {chips.map((chip) => {
          const active = selectedCategory === chip;

          return (
            <button
              key={chip}
              onClick={() => onCategoryChange(chip)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-[var(--primary)] text-white"
                  : "border border-[var(--border)] bg-white text-[var(--foreground)] hover:bg-gray-50"
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>
    </div>
  );
}
