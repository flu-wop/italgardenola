// Pure cart reducers. cart.ts adds persistence on top; the check script tests
// these directly.
import type { MenuItem } from "./menu-data";
import { priceLine, round2, type Selection } from "./pricing";

export type CartLine = {
  key: string;
  itemId: string;
  sizeId?: string;
  optionIds: string[];
  note: string;
  quantity: number;
  // Snapshot at add time, so a later menu edit cannot silently re-price or
  // rename something already in the cart.
  name: string;
  sizeName?: string;
  optionNames: string[];
  image?: string;
  unitPrice: number;
};

const normNote = (note?: string) => (note ?? "").trim().replace(/\s+/g, " ");

/** itemId + sizeId + sorted option ids + note. */
export function lineKey(itemId: string, sel: Selection): string {
  return [itemId, sel.sizeId ?? "", [...sel.optionIds].sort().join(","), normNote(sel.note)].join("|");
}

export function addLine(lines: CartLine[], item: MenuItem, sel: Selection, quantity = 1): CartLine[] {
  const priced = priceLine(item, sel);
  if (priced.problems.length) throw new Error(priced.problems.join(" "));
  const key = lineKey(item.id, sel);
  const existing = lines.find((l) => l.key === key);
  if (existing) return lines.map((l) => (l.key === key ? { ...l, quantity: l.quantity + quantity } : l));
  const sorted = [...sel.optionIds].sort();
  const line: CartLine = {
    key,
    itemId: item.id,
    sizeId: sel.sizeId,
    optionIds: sorted,
    note: normNote(sel.note),
    quantity,
    name: item.name,
    sizeName: item.sizes?.find((s) => s.id === sel.sizeId)?.name,
    optionNames: item.modifierGroups.flatMap((g) => g.options).filter((o) => sorted.includes(o.id)).map((o) => o.name),
    image: item.image,
    unitPrice: priced.unit,
  };
  return [...lines, line];
}

export function setLineQuantity(lines: CartLine[], key: string, quantity: number): CartLine[] {
  return quantity <= 0 ? lines.filter((l) => l.key !== key) : lines.map((l) => (l.key === key ? { ...l, quantity } : l));
}

export const cartCount = (lines: CartLine[]) => lines.reduce((n, l) => n + l.quantity, 0);
export const lineTotal = (l: CartLine) => round2(l.unitPrice * l.quantity);
export const cartSubtotal = (lines: CartLine[]) => round2(lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0));
