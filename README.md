# I-tal Garden — italgardennola.com

Next.js rebuild of I-tal Garden's website (replacing the old SpotHopper template). Lives as its own app inside the `in-flu-ential` repo — deploy it as its **own separate Vercel project**, not as part of the in-flu-ential agency site.

## Vercel setup (one-time)

1. Vercel → Add New → Project → Import `flu-wop/in-flu-ential`.
2. **Root Directory**: set to `ital-garden` (Project Settings → General → Root Directory). This is what makes it build/deploy independently from the root agency app in the same repo.
3. Framework preset: Next.js (auto-detected).
4. Add the domain `italgardennola.com` under Project Settings → Domains once DNS is ready to cut over from the old SpotHopper site.
5. Push to `main` (or whatever branch this project tracks) → Vercel builds only this subfolder.

## Ordering & checkout — how it's wired

- **"Order Online" / "Order Now" CTAs** (Navbar, Home, Menu, About) link out to I-tal Garden's real, live SpotHopper ordering page (`lib/site-config.ts` → `LINKS.order`) — this is where a real order actually gets placed today.
- **Cart → Checkout → Confirmation** (`/menu` → cart drawer → `/checkout`) is a separate, self-contained **mock/demo flow** — "Add to Cart," a pickup-day/time checkout form, a brief "placing your order" state, then an order-summary confirmation screen. It's local-storage only, clearly labeled "Preview Experience," and never touches payment or a real order — it exists purely to demo what a custom-built ordering experience could look like.

## Before launch — things James needs to finish

- **Photos**: every real shot James sent is now placed and every page/section uses a distinct image (audited so nothing repeats across the site). Two slots still show the "photo coming soon" placeholder because no matching shot exists yet — the About page's Chef Ra portrait, and the Meal Prep containers photo. Send those two and swap in the `<PhotoSlot label="..." />` components for `<Image src="..." />`.
- **Ordering links**: `lib/site-config.ts` → `LINKS.order` is now the real spot-specific URL. `reserve` and `jobs` are still placeholders pointing at the SpotHopper root (`tmt.spotapps.co`) — swap in the real spot-specific URLs for those when you have them.
- **Hours**: `lib/site-config.ts` → `HOURS` / `HOURS_SCHEMA` — currently Wed–Fri 11am–3pm, sourced from public aggregator listings (Google/Yelp), not the SpotHopper dashboard directly. Confirm against the real posted hours.
- **Menu + pricing**: `lib/menu-data.ts` — item names/descriptions are drawn from public listings, no prices shown (kitchen runs specials, and I couldn't confirm current pricing). Replace with Chef Ra's real, current, priced menu.
- **About/Chef Ra bio**: `app/about/page.tsx` has a `TODO` comment — the philosophy copy is solid, but Chef Ra's personal story should come from him directly.
- **Meal Prep**: `app/meal-prep/page.tsx` cross-promotes italmealprep.com — confirm that's still the live domain/ordering flow for the meal prep line.

## Local dev

```bash
cd ital-garden
npm install
npm run dev
# → http://localhost:3000
```
