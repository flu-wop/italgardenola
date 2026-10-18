# Ordering

**Today (prospect demo):** the whole flow is built in. Menu → item modal (size, modifiers, notes) → cart →
`/checkout` → `POST /api/orders` → confirmation screen.

- `/api/orders` validates the payload and **re-prices every line on the server** from `lib/menu-data.ts`
  (`lib/order-server.ts`), then returns a **mock** confirmation with an order number.
- **No payment is taken, nothing is stored, no email or kitchen ticket is sent.** The checkout button reads
  "Pay $X (demo)", collects no card details, and the confirmation says so.
- "Order Online" everywhere points at the on-site `/menu`.
- `LINKS.order` (a Toast URL inferred from the gift card link, unverified) and `LINKS.giftCards` stay in
  `lib/site-config.ts`. Gift cards link out to the client's Toast gift card page.
- Reserve, Jobs and the catering request form keep the client's current SpotHopper links, as on their live site.

Open items before this can take real orders: modifier rules in `lib/menu-data.ts` are placeholders
(Toast was unreachable), pickup slots derive from hours that are still marked `CONFIRM`, and sales tax is not handled.

## Making it real (when the deal closes)

Keep `priceOrder()` and `/api/orders`; replace the mock response.

**A. Toast partner API.** Needs Toast integration approval or credentials from the restaurant, then Menus API to
sync real modifiers/prices, Orders API to create the order, and a Toast-approved payment path. Orders land in the
kitchen's existing flow.

**B. Stripe Checkout + kitchen ticket.** Needs the client's Stripe account. In `/api/orders` create a Checkout
Session from the server-priced lines and return its URL; on the `checkout.session.completed` webhook, email the
kitchen a ticket (items, options, notes, pickup time). Needs decisions on tax, fees and who watches the ticket inbox.
The kitchen would then have two systems to watch.
