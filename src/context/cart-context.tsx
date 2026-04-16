"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import type { StorefrontProduct } from "@/lib/storefront-products";

export type CartItem = StorefrontProduct & {
  quantity: number;
};

type AddItemOptions = {
  silent?: boolean;
};

type CartContextType = {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  addItem: (
    product: StorefrontProduct,
    quantity?: number,
    options?: AddItemOptions
  ) => void;
  removeItem: (productId: string) => void;
  increaseItem: (productId: string) => void;
  decreaseItem: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "vitabiotics_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        setItems(parsed);
      }
    } catch {
      // ignore malformed storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items, hydrated]);

  function addItem(
    product: StorefrontProduct,
    quantity = 1,
    options?: AddItemOptions
  ) {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { ...product, quantity }];
    });

    if (!options?.silent) {
      toast.success(
        quantity > 1
          ? `${quantity} ${product.name} added to cart`
          : `${product.name} added to cart`
      );
    }
  }

  function removeItem(productId: string) {
    setItems((prev) => {
      const removedItem = prev.find((item) => item.id === productId);

      if (removedItem) {
        toast.success(`${removedItem.name} removed from cart`);
      }

      return prev.filter((item) => item.id !== productId);
    });
  }

  function increaseItem(productId: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseItem(productId: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  }

  const clearCart = useCallback(() => {
    setItems((prev) => {
      if (prev.length > 0) {
        toast.success("Cart cleared");
      }

      return [];
    });
  }, []);

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      cartCount,
      subtotal,
      addItem,
      removeItem,
      increaseItem,
      decreaseItem,
      clearCart,
    }),
    [items, cartCount, subtotal, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
