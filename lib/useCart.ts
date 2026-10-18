"use client";

import { useMemo, useSyncExternalStore } from "react";
import { CART_EVENT, CART_STORAGE_KEY, type CartLine } from "@/lib/cart";

function subscribe(cb: () => void) {
  window.addEventListener(CART_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CART_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

// The raw string is a stable snapshot; parsing happens in useMemo below.
const snapshot = () => {
  try {
    return window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
};

/** Reactive read of the cart, in sync across components and tabs. `ready` is false during SSR/hydration. */
export function useCart() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const cart = useMemo<CartLine[]>(() => {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [raw]);
  return { cart, ready };
}
