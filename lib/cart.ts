// Preview cart persisted in localStorage. It never submits anywhere; the real
// handoff is LINKS.order (Toast). Pure logic lives in cart-core.ts.
import type { MenuItem } from "./menu-data";
import type { Selection } from "./pricing";
import { addLine, setLineQuantity, type CartLine } from "./cart-core";

export * from "./cart-core";

export const CART_STORAGE_KEY = "ital_garden_cart_v2";
const LEGACY_CART_KEY = "ital_garden_cart"; // flat id/price lines; incompatible, so it is dropped
export const CART_EVENT = "ital-garden-cart-updated";

function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    window.localStorage.removeItem(LEGACY_CART_KEY);
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as CartLine[]) : [];
  } catch {
    return [];
  }
}

function writeCart(lines: CartLine[]) {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  } catch {
    /* storage blocked: the cart simply won't persist */
  }
  window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: lines }));
}

export const getCart = readCart;
export const addToCart = (item: MenuItem, sel: Selection, quantity = 1) => writeCart(addLine(readCart(), item, sel, quantity));
export const setQuantity = (key: string, quantity: number) => writeCart(setLineQuantity(readCart(), key, quantity));
export const removeFromCart = (key: string) => writeCart(setLineQuantity(readCart(), key, 0));
export const clearCart = () => writeCart([]);
