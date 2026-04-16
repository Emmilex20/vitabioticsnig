"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBasket,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/shared/container";
import { useCart } from "@/context/cart-context";
import MobileMenu from "./mobile-menu";

type NavbarUser = {
  id: string;
  firstName: string;
  role: "ADMIN" | "DOCTOR" | "PHARMACIST" | "CUSTOMER";
};

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const [user, setUser] = useState<NavbarUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const aboutMenuRef = useRef<HTMLDivElement | null>(null);

  const navLinks = [
    { label: "Women", href: "/shop/women" },
    { label: "Men", href: "/shop/men" },
    { label: "Kids", href: "/shop/kids" },
    { label: "All Products", href: "/shop" },
    ...(user ? [] : [{ label: "Sign In", href: "/sign-in" }]),
  ];
  const aboutLinks = [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "FAQs", href: "/faqs" },
    { label: "Store Locations", href: "/store-locations" },
    { label: "Contact Us", href: "/contact" },
  ];

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      try {
        const response = await fetch("/api/shop-auth/me");
        const data = await response.json();

        if (!response.ok) return;
        if (!isMounted) return;

        setUser(data.user || null);
      } catch {
        if (!isMounted) return;
        setUser(null);
      }
    }

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!menuRef.current) return;
      if (menuRef.current.contains(event.target as Node)) return;
      setMenuOpen(false);
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!aboutMenuRef.current) return;
      if (aboutMenuRef.current.contains(event.target as Node)) return;
      setAboutMenuOpen(false);
    }

    if (aboutMenuOpen) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [aboutMenuOpen]);

  async function handleLogout() {
    try {
      await fetch("/api/shop-auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      setMenuOpen(false);
      router.refresh();
    }
  }

  return (
      <>
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/95 backdrop-blur-md">
        <Container className="flex h-22 items-center justify-between gap-4 sm:h-24">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-[1.35rem] bg-white shadow-sm sm:h-16 sm:w-16 sm:rounded-[1.6rem]">
              <Image
                src="/logo.png"
                alt="Vitabiotics"
                width={64}
                height={64}
                className="h-12 w-auto object-contain sm:h-14"
                style={{ width: "auto" }}
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-xl font-extrabold tracking-tight text-[var(--foreground)] lg:text-2xl">
                VITABIOTICS
              </p>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
                Premium wellness store
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-[var(--foreground)] transition hover:text-[var(--primary)]"
              >
                {link.label}
              </Link>
            ))}

            <div
              className="relative"
              ref={aboutMenuRef}
              onMouseEnter={() => setAboutMenuOpen(true)}
              onMouseLeave={() => setAboutMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setAboutMenuOpen((prev) => !prev)}
                aria-expanded={aboutMenuOpen}
                aria-haspopup="menu"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--foreground)] transition hover:text-[var(--primary)]"
              >
                About
                <ChevronDown
                  size={16}
                  className={`transition-transform ${aboutMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`absolute right-0 top-full z-40 mt-4 w-64 rounded-[1.5rem] border border-[var(--border)] bg-white p-2 shadow-[0_24px_60px_rgba(15,23,42,0.14)] transition duration-200 ${
                  aboutMenuOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
              >
                {aboutLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block rounded-[1rem] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-slate-50 hover:text-[var(--primary)]"
                    onClick={() => setAboutMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              aria-label="Search"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--foreground)] shadow-sm outline-none transition hover:bg-slate-50 focus:outline-none focus-visible:outline-none focus-visible:ring-0"
            >
              <Search size={20} />
            </button>

            <div className="relative" ref={menuRef}>
              {user ? (
                <>
                  <button
                    type="button"
                    aria-label="Account menu"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--foreground)] shadow-sm outline-none transition hover:bg-slate-50 focus:outline-none focus-visible:outline-none focus-visible:ring-0"
                  >
                    <User size={20} />
                  </button>

                  {menuOpen ? (
                    <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-[var(--border)] bg-white p-2 shadow-lg">
                      <Link
                        href="/account"
                        className="block rounded-xl px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:bg-slate-50"
                        onClick={() => setMenuOpen(false)}
                      >
                        Account
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full rounded-xl px-4 py-2 text-left text-sm font-semibold text-[var(--foreground)] transition hover:bg-slate-50"
                      >
                        Logout
                      </button>
                    </div>
                  ) : null}
                </>
              ) : (
                <Link
                  href="/sign-in"
                  aria-label="Account"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--foreground)] shadow-sm outline-none transition hover:bg-slate-50 focus:outline-none focus-visible:outline-none focus-visible:ring-0"
                >
                  <User size={20} />
                </Link>
              )}
            </div>

            <Link
              href="/cart"
              aria-label="Cart"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--foreground)] shadow-sm outline-none transition hover:bg-slate-50 focus:outline-none focus-visible:outline-none focus-visible:ring-0"
            >
              <ShoppingBasket size={20} />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            </Link>

            <button
              aria-label="Open menu"
              onClick={() => setIsOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition hover:bg-gray-50 lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
