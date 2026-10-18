// Menu data. Source of truth: the client's public menu page,
// https://italgardennola.com/new-orleans-i-tal-garden-food-menu, captured
// 2026-10-18 (see data/raw/public-menu-page.txt). Prices, names and
// descriptions are copied from it; nothing is estimated.
//
// CONFIRM: the Toast ordering page sits behind a Cloudflare bot challenge, so
// the real modifier rules could not be read. Every modifier group below
// carries `placeholder: true`: the option NAMES come from the public menu text
// (e.g. "OG, BBQ, Lemon Pepper, Coconut Maple, or Buffalo"), but required /
// min / max and any price deltas are assumptions until checked against Toast.
//
// Tags come only from the source text ("GF", "Contains nuts"). The daily menu
// lists no allergen info, so daily items carry no tags. Never infer them.

export type ModifierOption = {
  id: string;
  name: string;
  priceDelta: number;
  defaultSelected?: boolean;
  soldOut?: boolean;
};

export type ModifierGroup = {
  id: string;
  name: string;
  required: boolean;
  min: number;
  max: number;
  options: ModifierOption[];
  /** Rules (required/min/max/deltas) not yet confirmed against Toast. */
  placeholder?: boolean;
};

export type MenuTag = "vegan" | "gf" | "nuts" | "spicy" | "special";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  image?: string;
  /** Base price. For sized items this is the smallest size ("from" price). */
  price: number;
  /** cup/bowl, half/full tray. When present, a size must be picked. */
  sizes?: { id: string; name: string; price: number }[];
  modifierGroups: ModifierGroup[];
  tags: MenuTag[];
  soldOut?: boolean;
  /** Section ids from SECTIONS. */
  sections: string[];
};

export type MenuSection = {
  id: string;
  menu: "daily" | "catering";
  title: string;
  note?: string;
};

export const SECTIONS: MenuSection[] = [
  { id: "mains", menu: "daily", title: "Main Courses" },
  { id: "sides", menu: "daily", title: "Sides" },
  { id: "soup", menu: "daily", title: "Soup" },
  { id: "drinks", menu: "daily", title: "Drinks" },

  { id: "cat-packages", menu: "catering", title: "Packages", note: "Feeds 10–12" },
  { id: "cat-protein", menu: "catering", title: "Veggie Protein", note: "Half pan feeds 6–8 · Full pan feeds 10–12" },
  { id: "cat-salads", menu: "catering", title: "Salads", note: "Feed 6–12" },
  { id: "cat-entrees", menu: "catering", title: "Entrées", note: "Half pan feeds 6–8 · Full pan feeds 10–12" },
  { id: "cat-sides", menu: "catering", title: "Sides", note: "Half pan feeds 6–8 · Full pan feeds 10–12" },
  { id: "cat-wraps", menu: "catering", title: "Wraps", note: "Wrap tray feeds 10–12" },
  { id: "cat-desserts", menu: "catering", title: "Desserts", note: "Feed 10–20" },
  { id: "cat-drinks", menu: "catering", title: "Drinks", note: "Gallon" },
  { id: "cat-addons", menu: "catering", title: "Utensils & Add-Ons" },
];

const none: ModifierGroup[] = [];

const half = (price: number, full: number) => [
  { id: "half", name: "Half", price },
  { id: "full", name: "Full", price: full },
];

const sauceGroup = (name: string, options: string[]): ModifierGroup => ({
  id: "sauce",
  name,
  required: true,
  min: 1,
  max: 1,
  placeholder: true,
  options: options.map((o) => ({ id: o.toLowerCase().replace(/[^a-z0-9]+/g, "-"), name: o, priceDelta: 0 })),
});

const friedOrGrilled: ModifierGroup = {
  id: "mushroom-prep",
  name: "Mushrooms",
  required: true,
  min: 1,
  max: 1,
  placeholder: true,
  options: [
    { id: "fried", name: "Fried", priceDelta: 0 },
    { id: "grilled", name: "Grilled", priceDelta: 0 },
  ],
};

export const ITEMS: MenuItem[] = [
  // ───────────── Daily menu: main courses ─────────────
  {
    id: "ra-chos",
    name: "Ra-chos",
    description:
      "Crispy tortilla chips layered with house-made cashew nacho cheese, seasoned walnut taco ground, black beans, quinoa, crisp romaine, pico de gallo, and a drizzle of cashew ranch.",
    price: 17,
    modifierGroups: none,
    tags: [],
    sections: ["mains"],
  },
  {
    id: "cajun-smoky-red-beans",
    name: "Cajun Smoky Red Beans",
    description:
      "Slow-simmered Cajun red beans served over fluffy quinoa with Creole greens, crispy Cauli-Wangz, and buttered cornbread.",
    price: 22,
    modifierGroups: none,
    tags: [],
    sections: ["mains"],
  },
  {
    id: "pineapple-quinoa-stir-fry",
    name: "Pineapple Quinoa Stir-Fry",
    description:
      "Savory-sweet stir-fried quinoa with fresh pineapple, broccoli, carrots, zucchini, squash, onion & garlic, tossed in house seasonings and topped with crispy sweet chili oyster mushrooms. Finished with scallions & hempseeds.",
    price: 19,
    modifierGroups: none,
    tags: [],
    sections: ["mains"],
  },
  {
    id: "ra-pasta",
    name: "Ra Pasta",
    description:
      "Creamy penne tossed in our house-made coconut Alfredo sauce with grilled broccoli, zucchini, and squash, topped with crispy fried crimini mushrooms.",
    image: "/images/menu/ra-pasta.jpg",
    price: 20,
    modifierGroups: none,
    tags: [],
    sections: ["mains"],
  },
  {
    id: "smoky-black-bean-burger-meal",
    name: "I-tal Smoky Black Bean Burger Meal",
    description:
      "House-made smoky black bean patty, dressed on a bun with chipotle mayo, lettuce, tomato, red onions, and BBQ sauce, with chef salad and roasted herb potatoes.",
    price: 19,
    modifierGroups: none,
    tags: [],
    sections: ["mains"],
  },
  {
    id: "hell-yeah-kale-yeah",
    name: "Hell Yeah Kale Yeah",
    description:
      "Lemon-massaged kale with tomato, cucumber, quinoa, red onion, sprouts, taco ground and fresh avocado, topped with crispy lemon pepper fried or grilled mushrooms. Served with a side of house-made cashew ranch.",
    image: "/images/menu/kale-salad.jpg",
    price: 18,
    modifierGroups: [friedOrGrilled],
    tags: [],
    sections: ["mains"],
  },
  {
    id: "ital-jackrib-plate",
    name: "I-tal Jackrib Plate",
    description: "Mac n cheese, BBQ jackfruit rib, Creole greens, and Creole potato salad.",
    image: "/images/menu/jackfruit-ribs.jpg",
    price: 22,
    modifierGroups: [
      {
        id: "cornbread-add",
        name: "Add cornbread",
        required: false,
        min: 0,
        max: 1,
        placeholder: true, // source line reads "$3+ cornbread"; exact meaning unconfirmed
        options: [{ id: "cornbread", name: "Cornbread", priceDelta: 3 }],
      },
    ],
    tags: [],
    sections: ["mains"],
  },
  {
    id: "lemon-pepper-wrap-meal",
    name: "Lemon Pepper Wrap Meal",
    description:
      "Crispy lemon pepper mushroom wrap in a flour tortilla with lettuce, tomato, vegan cheese, and cashew ranch with a side of fries.",
    price: 18,
    modifierGroups: [friedOrGrilled],
    tags: [],
    sections: ["mains"],
  },
  {
    id: "pancake-platter",
    name: "Pancake Platter",
    description: "Wild blueberry spelt pancakes, chickpea scramble, apple sage sausage.",
    image: "/images/menu/pancakes.jpg",
    price: 19,
    modifierGroups: none,
    tags: [],
    sections: ["mains"],
  },
  {
    id: "cajun-pasta-meal",
    name: "Cajun Pasta Meal",
    description:
      "Creamy Cajun pasta sauce tossed with linguine noodles, topped with grilled veggies, crab-less cake balls and chipotle seitan sauce, with chef side salad.",
    price: 23,
    modifierGroups: none,
    tags: [],
    sections: ["mains"],
  },

  // ───────────── Daily menu: sides ─────────────
  { id: "side-jackfruit-ribs", name: "Jackfruit Ribs", description: "", image: "/images/menu/jackfruit-ribs.jpg", price: 12, modifierGroups: none, tags: [], sections: ["sides"] },
  { id: "side-mac-n-cheese", name: "Mac n Cheese", description: "", price: 10, modifierGroups: none, tags: [], sections: ["sides"] },
  { id: "side-creole-greens", name: "Creole Greens", description: "", price: 6, modifierGroups: none, tags: [], sections: ["sides"] },
  { id: "side-fries", name: "Fries", description: "", price: 5, modifierGroups: none, tags: [], sections: ["sides"] },
  { id: "side-crispy-oyster-mushrooms", name: "Crispy Oyster Mushrooms", description: "", price: 12, modifierGroups: none, tags: [], sections: ["sides"] },
  { id: "side-cauliwangz", name: "Cauliwangz", description: "10 pc", image: "/images/menu/cauliflower-wings.jpg", price: 9, modifierGroups: none, tags: [], sections: ["sides"] },
  { id: "side-cornbread", name: "Cornbread", description: "", price: 3, modifierGroups: none, tags: [], sections: ["sides"] },
  { id: "side-potato-salad", name: "Potato Salad", description: "", price: 5, modifierGroups: none, tags: [], sections: ["sides"] },
  { id: "side-salad", name: "Side Salad", description: "", price: 6, modifierGroups: none, tags: [], sections: ["sides"] },
  { id: "side-chickpea-scramble", name: "Chickpea Scramble", description: "", price: 5, modifierGroups: none, tags: [], sections: ["sides"] },
  { id: "side-apple-sage-sausage", name: "Apple Sage Seitan Sausage", description: "", price: 2.5, modifierGroups: none, tags: [], sections: ["sides"] },
  { id: "side-grits", name: "Yellow Buttered Grits", description: "", price: 5, modifierGroups: none, tags: [], sections: ["sides"] },
  { id: "side-chips-n-cheese", name: "Chips n Cheese", description: "", price: 9, modifierGroups: none, tags: [], sections: ["sides"] },

  // ───────────── Daily menu: soup + drinks ─────────────
  {
    id: "creole-okra-gumbo",
    name: "Creole Okra Gumbo",
    description:
      "A hearty Louisiana-inspired gumbo simmered with tender okra, lentils, zucchini, oyster mushrooms, onions, bell peppers and garlic, finished with bold Creole seasonings.",
    price: 6,
    sizes: [
      { id: "cup", name: "Cup", price: 6 },
      { id: "bowl", name: "Bowl", price: 12 },
    ],
    modifierGroups: none,
    tags: [],
    sections: ["soup"],
  },
  { id: "hibiscus-tea", name: "Hibiscus Tea", description: "", price: 4, modifierGroups: none, tags: [], sections: ["drinks"] },
  { id: "lemon-ginger-tea", name: "Lemon Ginger", description: "", price: 3.5, modifierGroups: none, tags: [], sections: ["drinks"] },
  { id: "ra-mix-tea", name: "Ra Mix", description: "", price: 4.5, modifierGroups: none, tags: [], sections: ["drinks"] },

  // ───────────── Catering: packages ─────────────
  {
    id: "cat-office-lunch",
    name: "Office Lunch Package",
    description: "Feeds 10–12. 1 half pan pasta, 1 half pan protein, 1 half pan side, cornbread, and 1 gallon of tea.",
    image: "/images/catering-spread.jpg",
    price: 350,
    modifierGroups: none,
    tags: [],
    sections: ["cat-packages"],
  },
  {
    id: "cat-vegan-soul-food",
    name: "Vegan Soul Food Package",
    description: "Feeds 10–12. 1 full pan pasta, 1 full pan protein, 1 full pan side, full cornbread tray, 1 gallon of tea.",
    price: 475,
    modifierGroups: none,
    tags: [],
    sections: ["cat-packages"],
  },
  {
    id: "cat-signature-trio",
    name: "Corporate Signature Trio",
    description: "Feeds 10–12. 1 full pan pasta, 1 full pan protein, 1 full pan chef salad (balsamic + ranch).",
    price: 400,
    modifierGroups: none,
    tags: [],
    sections: ["cat-packages"],
  },

  // ───────────── Catering: veggie protein ─────────────
  // Crab-less Cakes appear under Veggie Protein on the public page with no
  // price, so they are left out until the client supplies one.
  {
    id: "cat-cauliwings",
    name: "Crispy Cauliwings",
    description: "OG, BBQ, Lemon Pepper, Coconut Maple, or Buffalo.",
    image: "/images/menu/cauliflower-wings.jpg",
    price: 70,
    sizes: half(70, 125),
    modifierGroups: [sauceGroup("Sauce", ["OG", "BBQ", "Lemon Pepper", "Coconut Maple", "Buffalo"])],
    tags: [],
    sections: ["cat-protein"],
  },
  {
    id: "cat-jackfruit-ribs",
    name: "BBQ Jackfruit Ribs",
    description: "House-made jackfruit-seitan ribs in smoky BBQ sauce.",
    image: "/images/menu/jackfruit-ribs.jpg",
    price: 85,
    sizes: half(85, 160),
    modifierGroups: none,
    tags: [],
    sections: ["cat-protein"],
  },
  {
    id: "cat-oyster-mushrooms",
    name: "Crispy Oyster Mushrooms",
    description: "Seasoned, battered, fried oyster mushrooms.",
    price: 85,
    sizes: half(85, 160),
    modifierGroups: none,
    tags: [],
    sections: ["cat-protein"],
  },

  // ───────────── Catering: salads ─────────────
  {
    id: "cat-chef-salad",
    name: "Chef Salad",
    description: "Mixed greens, tomatoes, red onion, cucumber, balsamic + ranch (ranch contains nuts).",
    price: 45,
    sizes: half(45, 90),
    modifierGroups: none,
    tags: ["gf", "nuts"],
    sections: ["cat-salads"],
  },
  {
    id: "cat-kale-salad",
    name: "Hell Yea Kale Yeah Salad",
    description:
      "Massaged lemon kale, tomatoes, cucumbers, quinoa, walnut taco ground, lemon-pepper crispy mushrooms, cashew ranch.",
    image: "/images/menu/kale-salad.jpg",
    price: 55,
    sizes: half(55, 100),
    modifierGroups: none,
    tags: ["gf", "nuts"],
    sections: ["cat-salads"],
  },

  // ───────────── Catering: entrées ─────────────
  {
    id: "cat-ra-pasta",
    name: "Ra Pasta Tray",
    description: "Coconut-creole cream sauce.",
    image: "/images/menu/ra-pasta.jpg",
    price: 85,
    sizes: half(85, 160),
    modifierGroups: none,
    tags: ["nuts"],
    sections: ["cat-entrees"],
  },
  {
    id: "cat-cajun-veggie-pasta",
    name: "Cajun Veggie Pasta Tray",
    description: "Cajun-style coconut cream pasta with vegetables + vegan sausage.",
    price: 110,
    sizes: half(110, 200),
    modifierGroups: none,
    tags: ["nuts"],
    sections: ["cat-entrees"],
  },

  // ───────────── Catering: sides ─────────────
  { id: "cat-red-beans", name: "Creole Red Beans", description: "", price: 45, sizes: half(45, 80), modifierGroups: none, tags: ["gf"], sections: ["cat-sides"] },
  { id: "cat-greens", name: "Creole Greens", description: "", price: 45, sizes: half(45, 80), modifierGroups: none, tags: ["gf"], sections: ["cat-sides"] },
  { id: "cat-mac", name: "Mac n’ Triple Cheese", description: "", price: 55, sizes: half(55, 100), modifierGroups: none, tags: ["nuts"], sections: ["cat-sides"] },
  { id: "cat-potato-salad", name: "Creole Potato Salad", description: "", price: 45, sizes: half(45, 80), modifierGroups: none, tags: ["gf"], sections: ["cat-sides"] },
  { id: "cat-chickpea-curry", name: "Chickpea Curry", description: "", price: 50, sizes: half(50, 95), modifierGroups: none, tags: ["gf"], sections: ["cat-sides"] },
  { id: "cat-black-eye-peas", name: "Black-Eye Peas", description: "", price: 40, sizes: half(40, 75), modifierGroups: none, tags: ["gf"], sections: ["cat-sides"] },
  { id: "cat-sweet-potatoes", name: "Grilled Sweet Potatoes", description: "", price: 45, sizes: half(45, 80), modifierGroups: none, tags: ["gf"], sections: ["cat-sides"] },
  {
    id: "cat-cornbread",
    name: "Cornbread Tray",
    description: "",
    price: 30,
    sizes: [
      { id: "half", name: "Half (15 pcs)", price: 30 },
      { id: "full", name: "Full (30 pcs)", price: 50 },
    ],
    modifierGroups: none,
    tags: [],
    sections: ["cat-sides"],
  },

  // ───────────── Catering: wraps, desserts, drinks, add-ons ─────────────
  {
    id: "cat-wrap-tray",
    name: "Lemon Pepper Crispy Mushroom Wrap Tray",
    description: "10 wraps (cut to 20 wraps). Includes cashew ranch.",
    price: 100,
    modifierGroups: none,
    tags: ["nuts"],
    sections: ["cat-wraps"],
  },
  {
    id: "cat-cookies",
    name: "Vegan Chocolate Chip Cookie Platter",
    description: "Nut-free (NF).",
    price: 50,
    sizes: [
      { id: "20", name: "20 cookies", price: 50 },
      { id: "40", name: "40 cookies", price: 80 },
    ],
    modifierGroups: none,
    tags: [],
    sections: ["cat-desserts"],
  },
  { id: "cat-bundt-vanilla", name: "Vanilla Drizzle Bundt Cake", description: "", price: 60, modifierGroups: none, tags: [], sections: ["cat-desserts"] },
  { id: "cat-bundt-berry", name: "Mixed Berry Bundt Cake", description: "", price: 60, modifierGroups: none, tags: [], sections: ["cat-desserts"] },
  { id: "cat-bundt-lemon", name: "Lemon Bundt Cake", description: "", price: 60, modifierGroups: none, tags: [], sections: ["cat-desserts"] },
  { id: "cat-hibiscus", name: "Hibiscus Tea (gallon)", description: "", price: 35, modifierGroups: none, tags: [], sections: ["cat-drinks"] },
  { id: "cat-lemon-ginger", name: "Lemon Ginger Tea (gallon)", description: "", price: 35, modifierGroups: none, tags: [], sections: ["cat-drinks"] },
  { id: "cat-ra-mix", name: "RA Mix Tea (gallon)", description: "", price: 40, modifierGroups: none, tags: [], sections: ["cat-drinks"] },
  { id: "cat-eco-plates", name: "Eco Plate & Utensil Set", description: "Per person.", price: 1.5, modifierGroups: none, tags: [], sections: ["cat-addons"] },
  { id: "cat-serving-kit", name: "Serving Utensil Kit", description: "", price: 6, modifierGroups: none, tags: [], sections: ["cat-addons"] },
  { id: "cat-chafing-rack", name: "Chafing Rack", description: "", price: 15, modifierGroups: none, tags: [], sections: ["cat-addons"] },
  { id: "cat-fuel", name: "Fuel (2 cans)", description: "", price: 6, modifierGroups: none, tags: [], sections: ["cat-addons"] },
  { id: "cat-cups-ice", name: "Cups & Ice", description: "", price: 8, modifierGroups: none, tags: [], sections: ["cat-addons"] },
  {
    id: "cat-extra-sauce",
    name: "Extra Sauce",
    description: "",
    price: 5,
    modifierGroups: [sauceGroup("Sauce", ["Ranch", "Balsamic"])],
    tags: [],
    sections: ["cat-addons"],
  },
];

export const DAILY_SECTIONS = SECTIONS.filter((s) => s.menu === "daily");
export const CATERING_SECTIONS = SECTIONS.filter((s) => s.menu === "catering");

export function itemsFor(menu: "daily" | "catering"): MenuItem[] {
  const ids = new Set(SECTIONS.filter((s) => s.menu === menu).map((s) => s.id));
  return ITEMS.filter((i) => i.sections.some((s) => ids.has(s)));
}

export function findItem(id: string): MenuItem | undefined {
  return ITEMS.find((i) => i.id === id);
}

export const TAG_LABELS: Record<MenuTag, string> = {
  vegan: "Vegan",
  gf: "GF",
  nuts: "Contains nuts",
  spicy: "Spicy",
  special: "Special",
};
