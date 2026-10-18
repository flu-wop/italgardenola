import type { CartLine } from "./cart-core";

export type OrderSubmission = { lines: CartLine[]; name: string; phone: string; day: string; time: string };
export type OrderConfirmation = { demo: true; orderNumber: string; pickup: string; totalCents: number; itemCount: number };

/**
 * Sends the cart to /api/orders. Only ids, selections, notes and quantities go
 * over the wire; the server re-prices from lib/menu-data.ts. Currently a DEMO:
 * the server returns a mock confirmation and nothing is paid or sent to the kitchen.
 */
export async function submitOrder(order: OrderSubmission): Promise<OrderConfirmation> {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: order.name,
      phone: order.phone,
      day: order.day,
      time: order.time,
      lines: order.lines.map((l) => ({ itemId: l.itemId, sizeId: l.sizeId, optionIds: l.optionIds, note: l.note, quantity: l.quantity })),
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Could not place the order.");
  return data as OrderConfirmation;
}
