import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";

const locations = [
  {
    city: "Lagos",
    details: "Flagship retail support and distribution coverage for major city orders.",
  },
  {
    city: "Abuja",
    details: "Wellness access point for central-region customers and faster support coordination.",
  },
  {
    city: "Port Harcourt",
    details: "Regional fulfillment support for shoppers across the south-south area.",
  },
];

export default function StoreLocationsPage() {
  return (
    <SiteShell>
      <section className="py-14 sm:py-16">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700">
              Store Locations
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
              Find our store coverage
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--muted-foreground)]">
              Explore the cities where we currently highlight retail and
              distribution presence. This page can be expanded later with exact
              addresses, maps, and opening times.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {locations.map((location) => (
              <article
                key={location.city}
                className="rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm"
              >
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-700">
                  City
                </p>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
                  {location.city}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                  {location.details}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
