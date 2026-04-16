import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { featuredCategories } from "@/data/home";

export default function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Shop by category"
          title="Support every stage of everyday wellness"
          description="Explore beautifully organized health categories designed to help users find what fits their lifestyle faster."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featuredCategories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href={category.href}
                className="group rounded-[2rem] border border-[var(--border)] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[var(--primary)]">
                  <Icon size={26} />
                </div>

                <h3 className="mt-6 text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  {category.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)] sm:text-base">
                  {category.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)]">
                  Explore category
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
