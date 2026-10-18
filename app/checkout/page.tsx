"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/useCart";
import { cartSubtotal, clearCart, lineTotal, setQuantity } from "@/lib/cart";
import { money } from "@/lib/pricing";
import { pickupSlots } from "@/lib/pickup";
import { submitOrder, type OrderConfirmation } from "@/lib/orders";
import { CONTACT } from "@/lib/site-config";

const field = "w-full rounded-xl border-2 border-espresso/15 bg-white px-4 py-3 text-sm focus:border-leaf-deep focus:outline-none";
const label = "mb-1.5 block text-xs font-bold uppercase tracking-widest text-bark";

export default function CheckoutPage() {
  const { cart, ready } = useCart();
  const pickup = useMemo(() => pickupSlots(), []);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [day, setDay] = useState(pickup[0]?.day ?? "");
  const [time, setTime] = useState(pickup[0]?.times[0] ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<(OrderConfirmation & { name: string }) | null>(null);

  const times = pickup.find((p) => p.day === day)?.times ?? [];
  const canSubmit = name.trim() && phone.trim() && cart.length > 0 && !busy;

  async function place(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setBusy(true);
    setError("");
    try {
      // Server validates + re-prices; a short pause stands in for payment processing.
      const [confirmation] = await Promise.all([submitOrder({ lines: cart, name, phone, day, time }), new Promise((r) => setTimeout(r, 1100))]);
      setDone({ ...confirmation, name });
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <Section className="flex min-h-[70vh] flex-col items-center justify-center pt-16 text-center md:pt-20">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-leaf-deep text-white">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <Eyebrow>Demo confirmation</Eyebrow>
        <SectionHeading>
          Thanks, <span className="script text-leaf">{done.name.split(" ")[0]}</span>
        </SectionHeading>
        <p className="mt-4 text-lg font-bold text-leaf-deep">Order #{done.orderNumber}</p>
        <p className="mx-auto mt-3 max-w-md text-ink/85">
          {done.itemCount} item{done.itemCount === 1 ? "" : "s"} · {money(done.totalCents / 100)} · pickup {done.pickup} at {CONTACT.addressLine1}.
        </p>
        <p role="status" className="mx-auto mt-6 max-w-md rounded-2xl bg-sun/30 px-5 py-4 text-sm font-bold leading-relaxed text-espresso">
          This is a demo of the ordering flow. No payment was taken and no order was sent to the kitchen.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/menu">Order something else</Button>
          <Button href="/" variant="outline">
            Home
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section className="pt-14 md:pt-20">
      <Eyebrow>Checkout</Eyebrow>
      <SectionHeading>
        Your <span className="script text-leaf">order</span>
      </SectionHeading>

      <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          {!ready ? null : cart.length === 0 ? (
            <p className="text-ink/85">
              Your order is empty.{" "}
              <Link href="/menu" className="font-bold text-leaf-deep underline-offset-4 hover:underline">
                Browse the menu
              </Link>
              .
            </p>
          ) : (
            <ul className="space-y-6">
              {cart.map((line) => (
                <li key={line.key} className="flex items-start gap-4 border-b border-espresso/10 pb-6">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-sand">{line.image && <Image src={line.image} alt="" fill sizes="80px" className="object-cover" />}</div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-espresso">{line.name}</p>
                    {(line.sizeName || line.optionNames.length > 0) && <p className="mt-0.5 text-sm text-ink/75">{[line.sizeName, ...line.optionNames].filter(Boolean).join(" · ")}</p>}
                    {line.note && <p className="mt-0.5 text-sm italic text-ink/75">“{line.note}”</p>}
                    <div className="mt-2 flex w-fit items-center rounded-full border-2 border-espresso/15 bg-white">
                      <button aria-label={`Decrease ${line.name}`} onClick={() => setQuantity(line.key, line.quantity - 1)} className="h-9 w-9">
                        −
                      </button>
                      <span className="min-w-6 text-center text-sm font-bold">{line.quantity}</span>
                      <button aria-label={`Increase ${line.name}`} onClick={() => setQuantity(line.key, line.quantity + 1)} className="h-9 w-9">
                        +
                      </button>
                    </div>
                  </div>
                  <p className="font-bold">{money(lineTotal(line))}</p>
                </li>
              ))}
            </ul>
          )}
          {cart.length > 0 && (
            <div className="mt-6 flex items-baseline justify-between text-base">
              <span>Subtotal</span>
              <span className="text-2xl font-bold text-espresso">{money(cartSubtotal(cart))}</span>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <form className="h-fit rounded-3xl bg-white p-6 shadow-soft" onSubmit={place}>
            <p className="mb-5 font-display text-xl font-bold text-espresso">Pickup details</p>
            <div className="space-y-4">
              <label className="block">
                <span className={label}>Name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} className={field} autoComplete="name" required />
              </label>
              <label className="block">
                <span className={label}>Phone</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className={field} autoComplete="tel" inputMode="tel" required />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className={label}>Day</span>
                  <select
                    value={day}
                    onChange={(e) => {
                      setDay(e.target.value);
                      setTime(pickup.find((p) => p.day === e.target.value)?.times[0] ?? "");
                    }}
                    className={field}
                  >
                    {pickup.map((p) => (
                      <option key={p.day}>{p.day}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className={label}>Time</span>
                  <select value={time} onChange={(e) => setTime(e.target.value)} className={field}>
                    {times.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-4 text-sm font-bold text-danger">
                {error}
              </p>
            )}
            <button type="submit" disabled={!canSubmit} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-leaf-deep px-6 py-3.5 text-[15px] font-bold text-white transition-colors enabled:hover:bg-leaf disabled:cursor-not-allowed disabled:opacity-60">
              {busy ? "Processing…" : `Pay ${money(cartSubtotal(cart))} (demo)`}
            </button>
            <p className="mt-3 text-center text-xs text-ink/75">Demo checkout: no card is collected, no payment is taken, and nothing is sent to the kitchen.</p>
          </form>
        )}
      </div>
    </Section>
  );
}
