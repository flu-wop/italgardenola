# I-tal Garden — italgardennola.com

Next.js 16 (App Router, TypeScript, Tailwind 3, framer-motion) site for I-tal Garden.
This is its **own repo**, `flu-wop/italgardenola`, deployed as its **own Vercel project**
(root directory = repo root).

> Demo build: every page is `noindex` until the client signs off.

## Local

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm run lint
npm run check:menu   # validates lib/menu-data.ts and the cart/price maths
```

## Where things live

| What | File |
| --- | --- |
| Address, phone, hours, every external link | `lib/site-config.ts` |
| Menu + modifiers (daily and catering) | `lib/menu-data.ts` |
| Kitchen "Specials today" | `lib/specials.ts` |
| Price and cart maths (pure) | `lib/pricing.ts`, `lib/cart-core.ts` |
| Palette and where each color came from | `PALETTE.md` |
| Ordering routes for later | `ORDERING.md` |

## Open items for the client

Search the code for `CONFIRM` — address (St. Claude vs. N Claiborne), hours, the Toast
order URL, and modifier rules (the public menu does not list them; Toast does).

## Vercel (one-time)

1. Vercel → Add New → Project → import `flu-wop/italgardenola`.
2. Framework preset: Next.js. No root directory override.
3. Add `italgardennola.com` under Domains only after sign-off and DNS cutover.
4. Remove `robots: { index: false }` in `app/layout.tsx` and fix `app/robots.ts` at launch.
