# Ordering: what is real and what is not

**Today:** "Order Online", the cart's "Order on Toast" button and the checkout page's final button all open
`LINKS.order` (`lib/site-config.ts`) in a new tab. The on-site cart and `/checkout` are a labeled
**preview** of the modifier flow. Nothing is sent, no payment is taken, and `submitOrder()` in `lib/orders.ts`
throws `"submitOrder: not wired"`.

Open items: the Toast URL itself is unverified (see `CONFIRM` in `site-config.ts`), and the modifier rules in
`lib/menu-data.ts` are placeholders until read from Toast.

## Route A: Toast partner API

Toast's ordering APIs are partner-gated. Needs: an approved Toast integration partnership (or the restaurant
granting API credentials through Toast), the restaurant GUID, then Menus API → sync `lib/menu-data.ts` (real
modifier groups and prices), Orders API → create the order, and a payment path that Toast allows for
third-party front ends. Replace `submitOrder` with a server route that calls the Orders API. Benefit: orders land
in the kitchen's existing Toast flow. Cost: partner approval and review.

## Route B: Stripe Checkout + kitchen ticket by email

Needs: the client's Stripe account, a server route that re-prices the cart **on the server** from
`lib/menu-data.ts` with `priceLine()` (never trust client prices), creates a Stripe Checkout Session, and on the
`checkout.session.completed` webhook emails the kitchen a ticket (items, options, notes, pickup time) and
the customer a receipt. Needs a decision on tax, fees, sold-out handling and who watches the ticket inbox. Orders would
bypass Toast, so the kitchen has two systems to watch.

Neither route is implemented here.
