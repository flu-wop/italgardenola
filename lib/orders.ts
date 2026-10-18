import type { CartLine } from "./cart-core";

export type OrderSubmission = {
  lines: CartLine[];
  name: string;
  phone: string;
  pickupNote?: string;
};

/**
 * Not wired. The on-site cart is a preview only; real orders go through Toast
 * (LINKS.order). See ORDERING.md for the two routes that would make this real.
 */
export async function submitOrder(cart: OrderSubmission): Promise<never> {
  void cart;
  throw new Error("submitOrder: not wired");
}
