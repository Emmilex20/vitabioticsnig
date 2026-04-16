import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/container";

const shopLinks = [
  { label: "All Products", href: "/shop" },
  { label: "For Women", href: "/shop/women" },
  { label: "For Men", href: "/shop/men" },
  { label: "For Kids", href: "/shop/kids" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const helpLinks = [
  { label: "Returns Policy", href: "/returns-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-(--border) bg-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Vitabiotics"
                  width={44}
                  height={44}
                  className="h-11 w-auto object-contain"
                  style={{ width: "auto" }}
                />
              </div>
              <div>
                <p className="text-lg font-extrabold tracking-tight text-(--foreground)">
                  VITABIOTICS
                </p>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-(--muted-foreground)">
                  Premium wellness
                </p>
              </div>
            </div>

            <p className="max-w-xs text-sm leading-6 text-(--muted-foreground)">
              A premium ecommerce experience for trusted health and wellness products,
              built with speed, elegance, and mobile-first usability.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-[0.15em] text-(--foreground)">
              Shop
            </h3>
            <div className="space-y-3">
              {shopLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm font-medium text-(--muted-foreground) transition hover:text-(--primary)"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-[0.15em] text-(--foreground)">
              Company
            </h3>
            <div className="space-y-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm font-medium text-(--muted-foreground) transition hover:text-(--primary)"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-[0.15em] text-(--foreground)">
              Help
            </h3>
            <div className="space-y-3">
              {helpLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm font-medium text-(--muted-foreground) transition hover:text-(--primary)"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-(--border) pt-6 text-sm text-(--muted-foreground) sm:flex-row sm:items-center sm:justify-between">
          <p>(c) {year} Vitabiotics Rebuild. All rights reserved.</p>
          <p>Built for premium responsiveness, modern UX, and long-term scalability.</p>
        </div>
      </Container>
    </footer>
  );
}
