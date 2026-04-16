import Container from "@/components/shared/container";

export default function NewsletterCta() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="overflow-hidden rounded-[2rem] bg-[var(--primary)] px-6 py-10 text-white shadow-[0_30px_80px_rgba(30,79,174,0.25)] sm:px-10 sm:py-14">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-white">
              Stay connected
            </span>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Get wellness updates, product highlights, and premium offers
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              This area will later connect to newsletter subscription logic. For
              now, we are building the premium visual structure and
              conversion-ready layout.
            </p>

            <form className="mt-8 flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                className="h-14 w-full rounded-full border border-white/20 bg-white px-6 text-sm font-medium text-[var(--foreground)] outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                className="h-14 rounded-full bg-slate-950 px-7 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
