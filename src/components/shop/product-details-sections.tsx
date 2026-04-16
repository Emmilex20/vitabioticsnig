import type {
  StorefrontProduct,
  StorefrontProductElement,
} from "@/lib/storefront-products";

type ProductDetailsSectionsProps = {
  product: StorefrontProduct;
};

type SpotlightItem = StorefrontProductElement;

function getIngredientSupportText(ingredient: string, fallback: string) {
  const normalizedIngredient = ingredient.toLowerCase();
  const normalizedFallback = fallback.toLowerCase();

  if (normalizedIngredient.includes("vitamin d")) {
    return "Supports immune function and daily wellness support.";
  }

  if (
    normalizedIngredient.includes("b12") ||
    normalizedIngredient.includes("b6") ||
    normalizedFallback.includes("energy")
  ) {
    return "Helps support natural energy release and reduce tiredness.";
  }

  if (normalizedIngredient.includes("iron")) {
    return "Contributes to healthy blood formation and vitality.";
  }

  if (normalizedIngredient.includes("zinc")) {
    return "Supports normal immune function and everyday resilience.";
  }

  if (normalizedIngredient.includes("omega")) {
    return "Supports heart health and everyday wellbeing balance.";
  }

  if (normalizedIngredient.includes("folic")) {
    return "Chosen to support nutritional balance in key life stages.";
  }

  return fallback;
}

function getFallbackSpotlightItems(product: StorefrontProduct): SpotlightItem[] {
  return product.ingredients.slice(0, 5).map((ingredient, index) => ({
    title: ingredient,
    description: getIngredientSupportText(
      ingredient,
      product.benefits[index % Math.max(product.benefits.length, 1)] ||
        "Supports everyday wellness with a carefully selected nutrient blend."
    ),
  }));
}

function getElementBadgeText(title: string) {
  const normalizedTitle = title.toLowerCase();
  const matchedTokens = [
    normalizedTitle.includes("zinc") ? "Zn" : null,
    normalizedTitle.includes("magnesium") ? "Mg" : null,
    normalizedTitle.includes("iron") ? "Fe" : null,
    normalizedTitle.includes("niacin") ? "B3" : null,
    normalizedTitle.includes("vitamin d") ? "D" : null,
    normalizedTitle.includes("vitamin c") ? "C" : null,
    normalizedTitle.includes("vitamin b1") ? "B1" : null,
    normalizedTitle.includes("vitamin b2") ? "B2" : null,
    normalizedTitle.includes("vitamin b6") ? "B6" : null,
    normalizedTitle.includes("vitamin b12") ? "B12" : null,
    normalizedTitle.includes("selenium") ? "Se" : null,
    normalizedTitle.includes("omega") ? "O3" : null,
  ].filter((token): token is string => Boolean(token));

  if (matchedTokens.length > 0) {
    return [...new Set(matchedTokens)].slice(0, 3).join(" ");
  }

  const compactToken = title
    .split(/[^A-Za-z0-9]+/)
    .map((token) => token.trim())
    .filter(Boolean)
    .find((token) => token.length <= 3 || /\d/.test(token));

  if (compactToken) {
    return compactToken.toUpperCase();
  }

  if (title.length <= 4) {
    return title.toUpperCase();
  }

  return title.slice(0, 2).toUpperCase();
}

function getSpotlightGridClasses(count: number) {
  if (count <= 1) {
    return "mx-auto max-w-sm grid-cols-1";
  }

  if (count === 2) {
    return "mx-auto max-w-3xl sm:grid-cols-2";
  }

  if (count === 3) {
    return "mx-auto max-w-5xl md:grid-cols-3";
  }

  if (count === 4) {
    return "mx-auto max-w-6xl sm:grid-cols-2 xl:grid-cols-4";
  }

  return "mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
}

export default function ProductDetailsSections({
  product,
}: ProductDetailsSectionsProps) {
  const spotlightTitle =
    product.spotlightTitle ||
    "Key nutrients, clearer benefits, and a more premium story.";
  const bestForCopy =
    product.bestFor ||
    `${product.category} wellness support with an easy-to-scan formula story and stronger shopping confidence.`;
  const spotlightItems =
    product.elementItems.length > 0
      ? product.elementItems.slice(0, 5)
      : getFallbackSpotlightItems(product);

  return (
    <section className="mt-14 space-y-8">
      {spotlightItems.length > 0 ? (
        <div className="overflow-hidden rounded-[2.4rem] border border-[var(--border)] bg-white px-6 py-10 shadow-sm sm:px-8 sm:py-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-blue-700">
              Formula Spotlight
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
              {spotlightTitle}
            </h2>
          </div>

          <div
            className={`mt-10 grid gap-x-6 gap-y-10 ${getSpotlightGridClasses(spotlightItems.length)}`}
          >
            {spotlightItems.map((item) => (
              <div
                key={`${item.title}-${item.description}`}
                className="flex h-full flex-col items-center text-center"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f3f6fa_100%)] px-3 text-center shadow-sm sm:h-28 sm:w-28">
                  <span className="whitespace-pre-line text-lg font-semibold leading-tight text-slate-500">
                    {getElementBadgeText(item.title)}
                  </span>
                </div>
                <h3 className="mt-5 text-[1.375rem] font-bold leading-tight text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[20rem] text-base leading-7 text-[var(--muted-foreground)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.9fr)]">
        <div className="rounded-[2.2rem] border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-700">
              Product Information
            </span>
            <span className="rounded-full border border-[var(--border)] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
              Everyday support
            </span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-3xl">
                Product Description
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--muted-foreground)]">
                {product.description}
              </p>
            </div>

            <div className="rounded-[1.8rem] bg-slate-50 p-5">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                Best for
              </p>
              <p className="mt-4 text-lg font-bold text-[var(--foreground)]">
                {bestForCopy}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[1.8rem] border border-[var(--border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5">
            <h3 className="text-xl font-bold text-[var(--foreground)]">
              How to Use
            </h3>
            <p className="mt-3 text-base leading-8 text-[var(--muted-foreground)]">
              {product.usage}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
              Key Benefits
            </h2>

            {product.benefits.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {product.benefits.map((benefit, index) => (
                  <li
                    key={benefit}
                    className="rounded-[1.3rem] bg-slate-50 px-4 py-4 text-sm font-medium leading-7 text-[var(--foreground)]"
                  >
                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[11px] font-extrabold text-blue-700 shadow-sm">
                      {index + 1}
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
                Benefits will be expanded in the next product enrichment batch.
              </p>
            )}
          </div>

          <div className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
              Ingredients
            </h2>

            {product.ingredients.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {product.ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
                Ingredient-level data will be expanded in the next product
                enrichment batch.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
