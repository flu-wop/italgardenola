// Pure price + selection logic. No browser APIs, so scripts/check-menu.ts can
// import it directly.
import type { MenuItem } from "./menu-data";

export type Selection = {
  sizeId?: string;
  /** Option ids across all modifier groups (ids are unique per item). */
  optionIds: string[];
  note?: string;
};

export type PricedLine = { unit: number; problems: string[] };

export const round2 = (n: number) => Math.round(n * 100) / 100;

export function money(n: number): string {
  return `$${n.toFixed(2)}`;
}

/** Cheapest size, or the base price. Used for "from" labels. */
export function fromPrice(item: MenuItem): number {
  return item.sizes ? Math.min(...item.sizes.map((s) => s.price)) : item.price;
}

/** The selection a fresh modal opens with: first size, default options. */
export function defaultSelection(item: MenuItem): Selection {
  return {
    sizeId: item.sizes?.[0]?.id,
    optionIds: item.modifierGroups.flatMap((g) => g.options.filter((o) => o.defaultSelected && !o.soldOut).map((o) => o.id)),
    note: "",
  };
}

/** Everything wrong with a selection; empty array means it can be added. */
export function validateSelection(item: MenuItem, sel: Selection): string[] {
  const problems: string[] = [];
  if (item.soldOut) problems.push(`${item.name} is sold out.`);
  if (item.sizes) {
    if (!sel.sizeId || !item.sizes.some((s) => s.id === sel.sizeId)) problems.push("Choose a size.");
  } else if (sel.sizeId) {
    problems.push("This item has no sizes.");
  }
  const known = new Set(item.modifierGroups.flatMap((g) => g.options.map((o) => o.id)));
  for (const id of sel.optionIds) if (!known.has(id)) problems.push(`Unknown option "${id}".`);
  for (const g of item.modifierGroups) {
    const picked = g.options.filter((o) => sel.optionIds.includes(o.id));
    if (picked.some((o) => o.soldOut)) problems.push(`${g.name}: a chosen option is sold out.`);
    const min = g.required ? Math.max(1, g.min) : g.min;
    if (picked.length < min) problems.push(min === 1 ? `${g.name}: choose one option.` : `${g.name}: choose at least ${min}.`);
    if (picked.length > g.max) problems.push(`${g.name}: choose at most ${g.max}.`);
  }
  return problems;
}

/** Unit price for one configured item (size price or base, plus option deltas). */
export function priceLine(item: MenuItem, sel: Selection): PricedLine {
  const size = item.sizes?.find((s) => s.id === sel.sizeId);
  const base = size ? size.price : item.price;
  const deltas = item.modifierGroups
    .flatMap((g) => g.options)
    .filter((o) => sel.optionIds.includes(o.id))
    .reduce((sum, o) => sum + o.priceDelta, 0);
  return { unit: round2(base + deltas), problems: validateSelection(item, sel) };
}
