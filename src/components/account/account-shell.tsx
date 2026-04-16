import SiteShell from "@/components/layout/site-shell";
import Container from "@/components/shared/container";
import Link from "next/link";
import LogoutButton from "./logout-button";

type AccountShellProps = {
  children: React.ReactNode;
};

const links = [
  { label: "Overview", href: "/account" },
  { label: "Orders", href: "/account/orders" },
  { label: "Wishlist", href: "/account/wishlist" },
  { label: "My Reviews", href: "/account/reviews" },
  { label: "Profile", href: "/account/profile" },
  { label: "Addresses", href: "/account/addresses" },
  { label: "Security", href: "/account/security" },
];

export default function AccountShell({ children }: AccountShellProps) {
  return (
    <SiteShell>
      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="h-fit rounded-[2rem] border border-[var(--border)] bg-white p-5 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                My Account
              </p>

              <nav className="mt-5 space-y-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-slate-50"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 border-t border-[var(--border)] pt-4">
                <LogoutButton />
              </div>
            </aside>

            <div className="space-y-8">{children}</div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
