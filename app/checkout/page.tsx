"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/useCart";
import { cartSubtotal, clearCart, lineTotal, setQuantity, type CartLine } from "@/lib/cart";
import { money } from "@/lib/pricing";
import { HOURS, LINKS, SITE } from "@/lib/site-config";

// Pickup days/times are derived from HOURS in site-config (itself marked CONFIRM).
function slots() {
  const days = HOURS.filter((h) => /\d/.test(h.hours));
  const parse = (t: string) => {
    const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!m) return 0;
    return ((Number(m[1]) % 12) + (m[3].toUpperCase() === "PM" ? 12 : 0)) * 60 + Number(m[2]);
  };
  const fmt = (min: number) => `${((Math.floor(min / 60) + 11) % 12) + 1}:${String(min % 60).padStart(2, "0")} ${min >= 720 ? "PM" : "AM"}`;
  return days.map((d) => {
    const [open, close] = d.hours.split(/[–-]/).map(parse);
    const times: string[] = [];
    for (let t = open; t < close; t += 30) times.push(fmt(t));
    return { day: d.day, times };
  });
}

const field = "w-full rounded-xl border-2 border-espresso/15 bg-white px-4 py-3 text-sm focus:border-leaf-deep focus:outline-none";
const label = "mb-1.5 block text-xs font-bold uppercase tracking-widest text-bark";

export default function CheckoutPage() {
  const { cart, ready } = useCart();
  const pickup = useMemo(() => slots(), []);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [day, setDay] = useState(pickup[0]?.day ?? "");
  const [time, setTime] = useState(pickup[0]?.times[0] ?? "");
  const [done, setDone] = useState<{ lines: CartLine[]; name: string; day: string; time: string } | null>(null);

  const times = pickup.find((p) => p.day === day)?.times ?? [];
  const canSubmit = name.trim() && phone.trim() && cart.length > 0;

  if (done) {
    return (
      <Section className="flex min-h-[70vh] flex-col items-center justify-center pt-16 text-center md:pt-20">
        <Eyebrow>Preview confirmation</Eyebrow>
        <SectionHeading>
          This was a <span className="script text-leaf">preview</span>
        </SectionHeading>
        <p role="status" className="mx-auto mt-6 max-w-md rounded-2xl bg-sun/30 px-5 py-4 text-base font-bold leading-relaxed text-espresso">
          No order was sent and no payment was taken. The kitchen has not received anything.
        </p>
        <p className="mx-auto mt-5 max-w-md text-ink/85">
          Thanks, {done.name.split(" ")[0]}. Here is what you built: {done.lines.reduce((n, l) => n + l.quantity, 0)} item(s), {money(cartSubtotal(done.lines))}, for {done.day} at {done.time}. To place a real order, continue on Toast.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href={LINKS.order} external>
            Order on Toast
          </Button>
          <Button href="/menu" variant="outline">
            Back to menu
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section className="pt-14 md:pt-20">
      <Eyebrow>Preview experience</Eyebrow>
      <SectionHeading>
        Your <span className="script text-leaf">order</span>
      </SectionHeading>
      <p className="mt-4 max-w-xl rounded-2xl bg-sun/30 px-5 py-3 text-sm leading-relaxed text-espresso">
        This page previews the ordering flow for {SITE.name}. Nothing here is sent to the kitchen and no payment is collected. Real orders are placed on Toast.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          {!ready ? null : cart.length === 0 ? (
            <p className="text-ink/85">
              Your preview order is empty.{" "}
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
              <span>Subtotal (preview)</span>
              <span className="text-2xl font-bold text-espresso">{money(cartSubtotal(cart))}</span>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <form
            className="h-fit rounded-3xl bg-white p-6 shadow-soft"
            onSubmit={(e) => {
              e.preventDefault();
              if (!canSubmit) return;
              setDone({ lines: cart, name, day, time });
              clearCart();
            }}
          >
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
            <button type="submit" disabled={!canSubmit} className="mt-6 w-full rounded-full bg-sand px-6 py-3.5 text-[15px] font-bold text-espresso transition-colors enabled:hover:bg-sage disabled:cursor-not-allowed disabled:opacity-50">
              See preview confirmation
            </button>
            <a href={LINKS.order} target="_blank" rel="noopener noreferrer" className="mt-3 block w-full rounded-full bg-leaf-deep px-6 py-3.5 text-center text-[15px] font-bold text-white transition-colors hover:bg-leaf">
              Place your real order on Toast
            </a>
            <p className="mt-3 text-center text-xs text-ink/75">Preview only: nothing is sent and no payment is collected here.</p>
          </form>
        )}
      </div>
    </Section>
  );
}
