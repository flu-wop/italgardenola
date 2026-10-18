import { NextResponse } from "next/server";
import { OrderError, priceOrder } from "@/lib/order-server";

export const runtime = "nodejs";

// DEMO ONLY. Validates and re-prices the cart on the server, then returns a
// mock confirmation. No payment is taken, nothing is stored, no email or
// kitchen ticket is sent. See ORDERING.md for the real routes.
export async function POST(req: Request) {
  try {
    const order = priceOrder(await req.json());
    const orderNumber = `IG-${Math.floor(1000 + Math.random() * 9000)}`;
    return NextResponse.json({ demo: true, orderNumber, pickup: order.pickup, totalCents: order.totalCents, itemCount: order.lines.reduce((n, l) => n + l.quantity, 0) });
  } catch (e) {
    if (e instanceof OrderError) return NextResponse.json({ error: e.message }, { status: 400 });
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
