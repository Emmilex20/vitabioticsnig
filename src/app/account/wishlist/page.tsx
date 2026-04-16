import AccountShell from "@/components/account/account-shell";
import AccountHeader from "@/components/account/account-header";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/session";
import { mapDbProductToStorefront } from "@/lib/storefront-products";
import ProductGrid from "@/components/shop/product-grid";

type WishlistItemRef = {
  productId: string;
};

export default async function AccountWishlistPage() {
  const user = await requireCustomer();

  const wishlistItems: WishlistItemRef[] = await prisma.wishlistItem.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const productIds = wishlistItems.map(
    (item: WishlistItemRef) => item.productId
  );

  const products = productIds.length
    ? await prisma.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      })
    : [];

  const mappedProducts = products.map(mapDbProductToStorefront);

  return (
    <AccountShell>
      <AccountHeader
        title="Wishlist"
        description="Products you’ve saved for later."
        firstName={user.firstName}
      />

      {mappedProducts.length > 0 ? (
        <ProductGrid items={mappedProducts} />
      ) : (
        <div className="rounded-[2rem] border border-[var(--border)] bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            Your wishlist is empty
          </h2>
          <p className="mt-3 text-[var(--muted-foreground)]">
            Save products you want to come back to later.
          </p>
        </div>
      )}
    </AccountShell>
  );
}
