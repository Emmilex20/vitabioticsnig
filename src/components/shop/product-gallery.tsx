import Image from "next/image";
import WishlistButton from "./wishlist-button";

type ProductGalleryProps = {
  productId: string;
  productName: string;
  imageUrl?: string;
};

export default function ProductGallery({
  productId,
  productName,
  imageUrl,
}: ProductGalleryProps) {
  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-4 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-700">
          Product Gallery
        </span>
        <span className="inline-flex rounded-full border border-[var(--border)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
          Detailed product view
        </span>
      </div>

      <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[linear-gradient(180deg,#f9fbff_0%,#eef4ff_100%)] px-6 py-8 sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute inset-x-8 bottom-6 h-10 rounded-full bg-slate-900/8 blur-2xl" />
        <div className="pointer-events-none absolute left-1/2 top-8 h-32 w-32 -translate-x-1/2 rounded-full bg-blue-200/35 blur-3xl" />
        <div className="absolute right-4 top-4 z-10 sm:right-5 sm:top-5">
          <WishlistButton productId={productId} />
        </div>

        <div className="relative flex min-h-[260px] items-center justify-center sm:min-h-[360px] lg:min-h-[460px]">
          {imageUrl ? (
            <div className="relative h-[240px] w-full max-w-[280px] sm:h-[340px] sm:max-w-[360px] lg:h-[460px] lg:max-w-[460px]">
              <Image
                src={imageUrl}
                alt={productName}
                fill
                sizes="(min-width: 1280px) 42vw, (min-width: 768px) 50vw, 100vw"
                className="object-contain drop-shadow-[0_26px_32px_rgba(15,23,42,0.18)]"
                priority
              />
            </div>
          ) : (
            <div className="flex h-64 w-52 items-center justify-center rounded-[2rem] border border-blue-100 bg-white text-center text-base font-bold text-[var(--primary)] shadow-sm">
              {productName}
              <br />
              Product Image
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
