"use client";

import { CartProvider } from "@/context/cart-context";
import ToastProvider from "./toast-provider";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      {children}
      <ToastProvider />
    </CartProvider>
  );
}
