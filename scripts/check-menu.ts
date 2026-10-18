// npm run check:menu — validates lib/menu-data.ts and the price/cart maths.
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ITEMS, SECTIONS, type MenuItem } from "../lib/menu-data";
import { priceLine, defaultSelection, validateSelection } from "../lib/pricing";
import { addLine, cartCount, cartSubtotal, lineKey, setLineQuantity, type CartLine } from "../lib/cart-core";

let failures = 0;
const fail = (msg: string) => {
  failures++;
  console.error(`  FAIL  ${msg}`);
};
const eq = (label: string, got: unknown, want: unknown) => {
  if (got !== want) fail(`${label}: got ${got}, want ${want}`);
};
const dupes = (ids: string[]) => ids.filter((id, i) => ids.indexOf(id) !== i);

console.log(`Checking ${ITEMS.length} items`);

// ── data shape ──
for (const id of dupes(ITEMS.map((i) => i.id))) fail(`duplicate item id "${id}"`);
for (const id of dupes(SECTIONS.map((s) => s.id))) fail(`duplicate section id "${id}"`);
const sectionIds = new Set(SECTIONS.map((s) => s.id));

for (const item of ITEMS) {
  const at = `item "${item.id}"`;
  if (!item.name.trim()) fail(`${at}: empty name`);
  if (typeof item.price !== "number" || !Number.isFinite(item.price) || item.price <= 0) fail(`${at}: price must be a positive number`);
  if (item.sections.length === 0 || item.sections.some((s) => !sectionIds.has(s))) fail(`${at}: bad sections ${item.sections}`);
  if (/\bTBD\b/i.test(item.name + item.description)) fail(`${at}: contains TBD`);
  if (item.image && !existsSync(join(process.cwd(), "public", item.image))) fail(`${at}: image missing ${item.image}`);

  if (item.sizes) {
    for (const id of dupes(item.sizes.map((s) => s.id))) fail(`${at}: duplicate size id "${id}"`);
    for (const s of item.sizes) if (typeof s.price !== "number" || !Number.isFinite(s.price)) fail(`${at}: size "${s.id}" price not a number`);
    eq(`${at}: base price equals cheapest size`, item.price, Math.min(...item.sizes.map((s) => s.price)));
  }

  for (const id of dupes(item.modifierGroups.map((g) => g.id))) fail(`${at}: duplicate group id "${id}"`);
  for (const id of dupes(item.modifierGroups.flatMap((g) => g.options.map((o) => o.id)))) fail(`${at}: duplicate option id "${id}"`);
  for (const g of item.modifierGroups) {
    const gat = `${at} group "${g.id}"`;
    if (g.required && g.min < 1) fail(`${gat}: required group must have min >= 1`);
    if (g.max < g.min) fail(`${gat}: max < min`);
    if (g.max > g.options.length) fail(`${gat}: max exceeds option count`);
    if (g.options.length === 0) fail(`${gat}: no options`);
    for (const o of g.options) if (typeof o.priceDelta !== "number" || !Number.isFinite(o.priceDelta)) fail(`${gat}: option "${o.id}" priceDelta not a number`);
    const defaults = g.options.filter((o) => o.defaultSelected).length;
    if (defaults > g.max) fail(`${gat}: more defaults than max`);
  }

  // every item must be addable with its default selection once required groups are satisfied
  const sel = defaultSelection(item);
  for (const g of item.modifierGroups) {
    const have = g.options.filter((o) => sel.optionIds.includes(o.id)).length;
    for (const o of g.options) if (have < Math.max(g.required ? 1 : 0, g.min) && !o.soldOut && !sel.optionIds.includes(o.id)) { sel.optionIds.push(o.id); break; }
  }
  const problems = validateSelection(item, sel);
  if (problems.length) fail(`${at}: default selection invalid: ${problems.join(" ")}`);
}

// ── hand-computed price + cart cases ──
const get = (id: string): MenuItem => {
  const it = ITEMS.find((i) => i.id === id);
  if (!it) throw new Error(`check fixture needs item "${id}"`);
  return it;
};

// Fixture with real deltas, since the live data has no priced options yet.
const fixture: MenuItem = {
  id: "fx",
  name: "Fixture",
  description: "",
  price: 10,
  sizes: [
    { id: "s", name: "Small", price: 10 },
    { id: "l", name: "Large", price: 15 },
  ],
  modifierGroups: [
    { id: "g1", name: "Protein", required: true, min: 1, max: 1, options: [{ id: "a", name: "A", priceDelta: 0 }, { id: "b", name: "B", priceDelta: 2.5 }] },
    { id: "g2", name: "Extras", required: false, min: 0, max: 2, options: [{ id: "x", name: "X", priceDelta: 1 }, { id: "y", name: "Y", priceDelta: 0.75 }, { id: "z", name: "Z", priceDelta: 3 }] },
  ],
  tags: [],
  sections: ["mains"],
};

eq("Ra Pasta unit", priceLine(get("ra-pasta"), { optionIds: [] }).unit, 20);
eq("gumbo cup", priceLine(get("creole-okra-gumbo"), { sizeId: "cup", optionIds: [] }).unit, 6);
eq("gumbo bowl", priceLine(get("creole-okra-gumbo"), { sizeId: "bowl", optionIds: [] }).unit, 12);
eq("cauliwings full + sauce", priceLine(get("cat-cauliwings"), { sizeId: "full", optionIds: ["buffalo"] }).unit, 125);
eq("jackrib plate + cornbread", priceLine(get("ital-jackrib-plate"), { optionIds: ["cornbread"] }).unit, 25);
eq("fixture small A", priceLine(fixture, { sizeId: "s", optionIds: ["a"] }).unit, 10);
eq("fixture large B + X + Y", priceLine(fixture, { sizeId: "l", optionIds: ["b", "x", "y"] }).unit, 15 + 2.5 + 1 + 0.75);
eq("fixture total 3 x (small B Z)", cartSubtotal(addLine([], fixture, { sizeId: "s", optionIds: ["b", "z"] }, 3)), 3 * (10 + 2.5 + 3));

// validation
eq("required group missing", validateSelection(fixture, { sizeId: "s", optionIds: [] }).length, 1);
eq("max exceeded", validateSelection(fixture, { sizeId: "s", optionIds: ["a", "x", "y", "z"] }).length, 1);
eq("size required", validateSelection(fixture, { optionIds: ["a"] }).length, 1);
eq("sold-out item blocks", validateSelection({ ...get("ra-pasta"), soldOut: true }, { optionIds: [] }).length, 1);

// cart merge rules
let cart: CartLine[] = [];
cart = addLine(cart, get("ra-pasta"), { optionIds: [] });
cart = addLine(cart, get("ra-pasta"), { optionIds: [] });
eq("same config merges", cart.length, 1);
eq("merged quantity", cart[0].quantity, 2);
cart = addLine(cart, get("ra-pasta"), { optionIds: [], note: "no mushrooms" });
eq("different note is new line", cart.length, 2);
cart = addLine(cart, get("ra-pasta"), { optionIds: [], note: "  no   mushrooms " });
eq("note whitespace normalised, merges", cart.length, 2);
cart = addLine(cart, get("creole-okra-gumbo"), { sizeId: "cup", optionIds: [] });
cart = addLine(cart, get("creole-okra-gumbo"), { sizeId: "bowl", optionIds: [] });
eq("different size is new line", cart.length, 4);
eq("count", cartCount(cart), 2 + 2 + 1 + 1);
eq("subtotal", cartSubtotal(cart), 20 * 4 + 6 + 12);

// option order must not matter
eq("option order independent", lineKey("fx", { sizeId: "s", optionIds: ["b", "a"] }), lineKey("fx", { sizeId: "s", optionIds: ["a", "b"] }));
let c2 = addLine([], fixture, { sizeId: "l", optionIds: ["b", "x"] });
c2 = addLine(c2, fixture, { sizeId: "l", optionIds: ["x", "b"] });
eq("option order merges", c2.length, 1);

// price snapshot survives a later price change
const snap = addLine([], { ...get("ra-pasta") }, { optionIds: [] });
get("ra-pasta").price = 99;
eq("snapshot unaffected by menu edit", cartSubtotal(snap), 20);
get("ra-pasta").price = 20;

// remove
eq("quantity 0 removes", setLineQuantity(cart, cart[0].key, 0).length, 3);

if (failures) {
  console.error(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log("All menu and cart checks passed");
