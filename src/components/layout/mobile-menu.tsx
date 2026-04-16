"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const shopLinks = [
  { label: "All Products", href: "/shop" },
  { label: "For Women", href: "/shop/women" },
  { label: "For Men", href: "/shop/men" },
  { label: "For Kids", href: "/shop/kids" },
];

const helpLinks = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/faqs" },
  { label: "Store Locations", href: "/store-locations" },
  { label: "Contact Us", href: "/contact" },
  { label: "Returns Policy", href: "/returns-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            key="drawer"
            className="fixed right-0 top-0 z-50 flex h-screen w-[88%] max-w-sm flex-col overflow-y-auto bg-white shadow-2xl md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between border-b border-(--border) px-5 py-4">
              <div>
                <p className="text-sm font-medium text-(--muted-foreground)">
                  Navigation
                </p>
                <h2 className="text-lg font-bold text-(--foreground)">
                  Menu
                </h2>
              </div>

              <button
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-full border border-(--border) p-2 text-(--foreground) transition hover:bg-gray-50"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-8 px-5 py-6">
              <div className="space-y-3">
                <h3 className="text-base font-bold text-(--foreground)">Shop</h3>
                <div className="space-y-2">
                  {shopLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={onClose}
                      className="block rounded-xl px-3 py-3 text-sm font-medium text-(--foreground) transition hover:bg-(--muted)"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-(--foreground)">Help</h3>
                <div className="space-y-2">
                  {helpLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={onClose}
                      className="block rounded-xl px-3 py-3 text-sm font-medium text-(--foreground) transition hover:bg-(--muted)"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-(--foreground)">Account</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/sign-in"
                    onClick={onClose}
                    className="rounded-full border border-(--border) px-4 py-3 text-center text-sm font-semibold text-(--foreground) transition hover:bg-gray-50"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    onClick={onClose}
                    className="rounded-full bg-(--primary) px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
