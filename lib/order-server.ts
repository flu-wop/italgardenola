// Server-side order validation and pricing. Never trusts client prices: every
// line is re-priced from lib/menu-data.ts. Used by the demo /api/orders route
// and is the piece a real payment integration would keep (see ORDERING.md).
import { findItem } from "./menu-data";
import { priceLine } from "./pricing";
import { pickupSlots } from "./pickup";

export type PricedOrderLine = { itemId: string; name: string; detail: string; note: string; quantity: number; unitCents: number };
export type PricedOrder = { name: string; phone: string; pickup: string; lines: PricedOrderLine[]; totalCents: number };

export class OrderError extends Error {}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function priceOrder(body: unknown): PricedOrder {
  const b = (body ?? {}) as Record<string, unknown>;
  const name = str(b.name, 80);
  const phone = str(b.phone, 30);
  const day = str(b.day, 20);
  const time = str(b.time, 20);
  if (!name) throw new OrderError("Please enter your name.");
  if (phone.replace(/\D/g, "").length < 10) throw new OrderError("Please enter a valid phone number.");
  const slot = pickupSlots().find((d) => d.day === day);
  if (!slot || !slot.times.includes(time)) throw new OrderError("Please choose a pickup time.");
  if (!Array.isArray(b.lines) || b.lines.length === 0 || b.lines.length > 40) throw new OrderError("Your order is empty.");

  const lines = b.lines.map((raw): PricedOrderLine => {
    const l = (raw ?? {}) as Record<string, unknown>;
    const item = typeof l.itemId === "string" ? findItem(l.itemId) : undefined;
    if (!item) throw new OrderError("An item in your order is no longer on the menu.");
    const quantity = Number(l.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) throw new OrderError("Invalid quantity.");
    const optionIds = Array.isArray(l.optionIds) ? l.optionIds.filter((x): x is string => typeof x === "string") : [];
    const sel = { sizeId: typeof l.sizeId === "string" ? l.sizeId : undefined, optionIds, note: str(l.note, 200) };
    const priced = priceLine(item, sel);
    if (priced.problems.length) throw new OrderError(`${item.name}: ${priced.problems[0]}`);
    const detail = [item.sizes?.find((s) => s.id === sel.sizeId)?.name, ...item.modifierGroups.flatMap((g) => g.options).filter((o) => optionIds.includes(o.id)).map((o) => o.name)].filter(Boolean).join(", ");
    return { itemId: item.id, name: item.name, detail, note: sel.note ?? "", quantity, unitCents: Math.round(priced.unit * 100) };
  });

  return { name, phone, pickup: `${day} ${time}`, lines, totalCents: lines.reduce((n, l) => n + l.unitCents * l.quantity, 0) };
}
