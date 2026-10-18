// Single source of truth for name/address/phone/hours and every external link.
// Every page must import from here — never hardcode the address, phone, or
// hours inline, so the whole site (and every linked listing) stays in sync.

export const SITE = {
  name: "I-tal Garden",
  shortName: "I-tal Garden",
  domain: "italgardennola.com",
  tagline: "Plant-based soul food, New Orleans",
  description:
    "I-tal Garden is a family-owned, fully plant-based soul food kitchen in New Orleans' Treme/7th Ward, serving Chef Ra's organic, ital-inspired take on Creole and soul food classics.",
};

// CONFIRM: address conflict. The live italgardennola.com home page shows
// "2372 St. Claude Ave, Suite # 130, New Orleans, LA 70116" (matches below),
// but the client's Toast gift card link uses the slug
// `i-tal-garden-810-n-claiborne-ave`. Do not pick one until the client says
// which is current; the Toast order URL below depends on the answer.
export const CONTACT = {
  addressLine1: "2372 St. Claude Ave, Suite 130",
  addressLine2: "New Orleans, LA 70116",
  city: "New Orleans",
  state: "LA",
  zip: "70116",
  fullAddress: "2372 St. Claude Ave, Suite 130, New Orleans, LA 70116",
  phone: "(504) 515-7321",
  phoneHref: "tel:+15045157321",
  email: "italgardennola@gmail.com",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=2372+St.+Claude+Ave+Suite+130+New+Orleans+LA+70116",
  mapsEmbedSrc:
    "https://maps.google.com/maps?q=2372+St+Claude+Ave+Suite+130+New+Orleans+LA+70116&t=&z=15&ie=UTF8&iwloc=&output=embed",
};

// CONFIRM: hours came from public aggregator listings (Google/Yelp), not the
// client. The live site renders hours with JavaScript, so they could not be
// re-verified. Confirm with the client before launch.
export const HOURS: { day: string; hours: string }[] = [
  { day: "Monday", hours: "Closed" },
  { day: "Tuesday", hours: "Closed" },
  { day: "Wednesday", hours: "11:00 AM – 3:00 PM" },
  { day: "Thursday", hours: "11:00 AM – 3:00 PM" },
  { day: "Friday", hours: "11:00 AM – 3:00 PM" },
  { day: "Saturday", hours: "Closed" },
  { day: "Sunday", hours: "Closed" },
];

export const HOURS_SUMMARY = "Wed – Fri, 11:00 AM – 3:00 PM";

// Same hours, in schema.org's expected 24-hour HH:MM format, for JSON-LD.
export const HOURS_SCHEMA: { day: string; opens: string; closes: string }[] = [
  { day: "Wednesday", opens: "11:00", closes: "15:00" },
  { day: "Thursday", opens: "11:00", closes: "15:00" },
  { day: "Friday", opens: "11:00", closes: "15:00" },
];

export const SOCIAL = {
  instagram: "https://www.instagram.com/italgardennola/",
  instagramHandle: "@italgardennola",
  facebook: "https://www.facebook.com/ItalGardennola/",
};

export const LINKS = {
  // CONFIRM: the client's live site still sends "Order" to SpotHopper
  // (tmt.spotapps.co); only their gift cards use Toast. This URL is the Toast
  // online ordering slug inferred from the gift card link and could not be
  // opened (order.toasttab.com sits behind a Cloudflare bot challenge). Verify
  // it in a browser and against the address question above.
  order: "https://order.toasttab.com/online/i-tal-garden-810-n-claiborne-ave",
  // Existing Toast gift card page, taken verbatim from italgardennola.com.
  giftCards: "https://order.toasttab.com/egiftcards/i-tal-garden-810-n-claiborne-ave",
  // Meal prep is a separate site run by the client.
  mealPrep: "https://italmealprep.com/",
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/catering", label: "Catering" },
  { href: "/events", label: "Events" },
  { href: "/meal-prep", label: "Meal Prep" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
