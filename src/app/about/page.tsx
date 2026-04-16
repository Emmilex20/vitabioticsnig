import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Beaker,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";
import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import { mapCategory } from "@/lib/storefront-products";

export const metadata: Metadata = buildMetadata({
  title: "About Vitabiotics Nigeria",
  description:
    "Discover the story behind Vitabiotics Nigeria, our science-led wellness philosophy, trusted formulations, and premium customer experience.",
  path: "/about",
});

const trustPillars = [
  {
    icon: ShieldCheck,
    title: "Health-first product thinking",
    description:
      "We focus on wellness support that feels clear, targeted, and easier to trust in everyday life.",
  },
  {
    icon: Beaker,
    title: "Science-led formulation mindset",
    description:
      "Our product story is rooted in evidence, careful development, and a belief that nutrition should feel both premium and dependable.",
  },
  {
    icon: Award,
    title: "Confidence through consistency",
    description:
      "Quality is not just about ingredients. It is also about clarity, presentation, and how confidently people can choose what suits them.",
  },
  {
    icon: HeartHandshake,
    title: "Closer customer connection",
    description:
      "We care about how products are explained, discovered, and experienced across the full wellness journey.",
  },
];

const storyBlocks = [
  {
    eyebrow: "Our purpose",
    title: "Helping people make stronger everyday wellness choices",
    description:
      "Vitabiotics Nigeria is built around the idea that premium nutritional support should feel practical, supportive, and relevant to real life. From pregnancy and family health to beauty and vitality, our goal is to make that decision-making experience clearer and more reassuring.",
  },
  {
    eyebrow: "Our approach",
    title: "A premium experience shaped by trust, clarity, and formulation discipline",
    description:
      "We want customers to feel the difference not only in the product line-up, but in the way the brand communicates. Better storytelling, cleaner presentation, and stronger educational context all help people choose products with more confidence.",
  },
];

const brandSignals = [
  {
    value: "50+",
    label: "years of global product heritage",
  },
  {
    value: "4",
    label: "wellness moments reflected in this visual story",
  },
  {
    value: "100%",
    label: "focus on a more trusted customer experience",
  },
];

const communityMoments = [
  {
    title: "Family wellness support",
    body: "We care about products that feel relevant to households, daily routines, and practical long-term wellbeing.",
  },
  {
    title: "Research-driven credibility",
    body: "The brand experience is strongest when science, communication, and confidence all work together.",
  },
  {
    title: "Modern premium presentation",
    body: "A more refined visual system helps customers browse, compare, and understand products more naturally.",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

type FeaturedProduct = {
  id: string;
  name: string;
  slug: string;
  category: "WOMEN" | "MEN" | "KIDS" | "PREGNANCY";
  price: number;
  imageUrl: string | null;
};

export default async function AboutPage() {
  const featuredProducts: FeaturedProduct[] = await prisma.product.findMany({
    where: {
      inStock: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
      category: true,
      price: true,
      imageUrl: true,
    },
  });

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_44%,#f7fbff_100%)]">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl" />

        <Container className="relative py-14 sm:py-18 lg:py-22">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-blue-200 bg-white/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700 shadow-sm">
                About Vitabiotics Nigeria
              </span>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-(--foreground) sm:text-5xl lg:text-6xl">
                A more modern story for trusted wellness support
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-(--muted-foreground) sm:text-lg">
                We believe premium health products should be backed by science,
                communicated with clarity, and presented in a way that helps
                people choose with confidence. That is the spirit behind how we
                want Vitabiotics Nigeria to feel.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full bg-(--primary) px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Shop All Products
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex rounded-full border border-(--border) bg-white px-6 py-3.5 text-sm font-semibold text-(--foreground) transition hover:bg-slate-50"
                >
                  Contact Us
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {brandSignals.map((signal) => (
                  <div
                    key={signal.label}
                    className="rounded-[1.6rem] border border-(--border) bg-white/90 p-5 shadow-sm backdrop-blur-sm"
                  >
                    <p className="text-3xl font-extrabold tracking-tight text-(--foreground)">
                      {signal.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-(--muted-foreground)">
                      {signal.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:translate-y-8">
                <div className="relative h-80 sm:h-96">
                  <Image
                    src="/about1.png"
                    alt="Vitabiotics Nigeria hero"
                    fill
                    sizes="(min-width: 1024px) 24vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="grid gap-4">
                <div className="relative overflow-hidden rounded-4xl border border-white/70 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.10)]">
                  <div className="relative h-48 sm:h-56">
                    <Image
                      src="/about2.png"
                      alt="Wellness and family"
                      fill
                      sizes="(min-width: 1024px) 18vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="rounded-4xl border border-(--border) bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] p-6 shadow-sm">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-700">
                    Brand direction
                  </p>
                  <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-(--foreground)">
                    Science, confidence, and everyday relevance
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-(--muted-foreground)">
                    The strongest wellness brands do more than sell products.
                    They help people feel guided, reassured, and better informed
                    at every step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="space-y-6">
              {storyBlocks.map((block) => (
                <article
                  key={block.title}
                  className="rounded-4xl border border-(--border) bg-white p-6 shadow-sm sm:p-8"
                >
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-700">
                    {block.eyebrow}
                  </p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-(--foreground)">
                    {block.title}
                  </h2>
                  <p className="mt-4 text-sm leading-8 text-(--muted-foreground) sm:text-base">
                    {block.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {trustPillars.map((pillar) => {
                const Icon = pillar.icon;

                return (
                  <article
                    key={pillar.title}
                    className="rounded-4xl border border-(--border) bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-(--primary) ring-1 ring-blue-100">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-5 text-xl font-extrabold tracking-tight text-(--foreground)">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-(--muted-foreground)">
                      {pillar.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_100%)] py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="grid gap-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="relative overflow-hidden rounded-4xl border border-(--border) bg-white shadow-sm sm:translate-y-10">
                <div className="relative h-64 sm:h-80">
                  <Image
                    src="/about3.png"
                    alt="Vitabiotics story visual"
                    fill
                    sizes="(min-width: 1024px) 22vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-4xl border border-(--border) bg-white shadow-sm">
                <div className="relative h-80 sm:h-96">
                  <Image
                    src="/about4.png"
                    alt="Vitabiotics supplements and wellness"
                    fill
                    sizes="(min-width: 1024px) 28vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-700">
                How we want the brand to feel
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-(--foreground) sm:text-4xl">
                Clean, confident, and easier to trust at a glance
              </h2>
              <p className="mt-5 text-sm leading-8 text-(--muted-foreground) sm:text-base">
                The visual experience matters. From imagery and copy to product
                education and category navigation, we want every part of the
                journey to feel more intentional and more useful.
              </p>

              <div className="mt-8 space-y-4">
                {communityMoments.map((moment, index) => (
                  <div
                    key={moment.title}
                    className="flex gap-4 rounded-3xl border border-(--border) bg-white p-5 shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-extrabold text-blue-700">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-(--foreground)">
                        {moment.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-(--muted-foreground)">
                        {moment.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#0f172a_0%,#13213f_100%)] py-16 text-white sm:py-20">
        <div className="pointer-events-none absolute left-0 top-0 h-60 w-60 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />

        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-200">
                Why it matters
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                A stronger about page should feel human, not generic
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-blue-50/85 sm:text-base">
                The brand story works best when it feels close to people, rooted
                in credibility, and visually memorable. That is the kind of
                experience this refreshed page is aiming to create.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                <Award size={18} className="text-blue-200" />
                <p className="mt-4 text-lg font-bold">Trusted</p>
                <p className="mt-2 text-sm leading-7 text-blue-50/80">
                  Better storytelling builds stronger first impressions.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                <Sparkles size={18} className="text-blue-200" />
                <p className="mt-4 text-lg font-bold">Premium</p>
                <p className="mt-2 text-sm leading-7 text-blue-50/80">
                  Cleaner layouts make the brand feel more established.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                <HeartHandshake size={18} className="text-blue-200" />
                <p className="mt-4 text-lg font-bold">Human</p>
                <p className="mt-2 text-sm leading-7 text-blue-50/80">
                  Real warmth helps wellness content feel more approachable.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,#f4f8ff_0%,#ffffff_100%)] py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-700">
              Featured products
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-(--foreground) sm:text-4xl">
              Explore a few current highlights
            </h2>
            <p className="mt-4 text-sm leading-8 text-(--muted-foreground) sm:text-base">
              A small selection of in-stock products currently featured in the
              store.
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((product: FeaturedProduct) => (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-4xl border border-(--border) bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#f4f8ff_0%,#ffffff_100%)] p-6">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={420}
                        height={420}
                        sizes="(min-width: 1280px) 18vw, (min-width: 768px) 36vw, 100vw"
                        className="max-h-full w-auto object-contain"
                      />
                    ) : (
                        <div className="flex h-36 w-28 items-center justify-center rounded-3xl border border-blue-100 bg-white text-center text-sm font-bold text-(--primary)">
                        Product Image
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue-700">
                      {mapCategory(product.category)}
                    </p>
                    <h3 className="mt-3 text-xl font-bold tracking-tight text-(--foreground)">
                      {product.name}
                    </h3>
                    <p className="mt-3 text-lg font-extrabold text-(--foreground)">
                      {formatPrice(product.price)}
                    </p>

                    <Link
                      href={`/products/${product.slug}`}
                      className="mt-5 inline-flex rounded-full bg-(--primary) px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      View Product
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-4xl border border-(--border) bg-white p-8 text-center shadow-sm">
              <Store size={22} className="mx-auto text-(--primary)" />
              <p className="mt-4 text-sm font-medium text-(--muted-foreground)">
                Add a few in-stock products to highlight featured favourites
                here.
              </p>
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-white px-6 py-3 text-sm font-semibold text-(--foreground) transition hover:bg-slate-50"
            >
              Shop All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
