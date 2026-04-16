import Container from "@/components/shared/container";

export default function ShopHero() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(30,79,174,0.10),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(30,79,174,0.08),_transparent_30%)]" />

      <Container className="relative">
        <div className="rounded-[2rem] border border-white/60 bg-white p-8 shadow-[0_20px_60px_rgba(16,24,40,0.06)] sm:p-10 lg:p-12">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700">
            Shop wellness
          </span>

          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl">
            Premium health products with a clean, trusted shopping experience
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
            Browse beautifully presented wellness products with clearer
            structure, better product discovery, and a more responsive
            ecommerce layout.
          </p>
        </div>
      </Container>
    </section>
  );
}
