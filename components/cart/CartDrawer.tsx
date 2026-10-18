"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/useCart";
import { OPEN_CART_EVENT, cartCount, cartSubtotal, lineTotal, removeFromCart, setQuantity } from "@/lib/cart";
import { money } from "@/lib/pricing";
import { LINKS } from "@/lib/site-config";
import { Modal } from "@/components/ui/Modal";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const count = cartCount(cart);

  useEffect(() => {
    const on = () => setOpen(true);
    window.addEventListener(OPEN_CART_EVENT, on);
    return () => window.removeEventListener(OPEN_CART_EVENT, on);
  }, []);

  return (
    <>
      <button aria-label={`Open preview order${count ? `, ${count} items` : ""}`} onClick={() => setOpen(true)} className="relative flex h-11 w-11 items-center justify-center rounded-full text-espresso transition-colors hover:text-leaf">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <circle cx="9" cy="20" r="1.4" />
          <circle cx="18" cy="20" r="1.4" />
          <path d="M2.5 3h2.2l2.1 12.2a1.8 1.8 0 0 0 1.8 1.5h8.8a1.8 1.8 0 0 0 1.77-1.47l1.33-7.53H6.1" />
        </svg>
        {count > 0 && <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-sun px-1 text-[11px] font-bold text-espresso">{count}</span>}
      </button>

      <Modal open={open} onClose={() => setOpen(false)} label="Your preview order" className="fixed inset-0 h-full w-full">
        <div className="flex h-full justify-end">
          <div className="flex h-full w-full max-w-md flex-col bg-paper shadow-lift">
            <div className="flex items-center justify-between border-b border-espresso/10 px-6 py-5">
              <p className="font-display text-2xl font-bold text-espresso">Preview order</p>
              <button onClick={() => setOpen(false)} aria-label="Close" className="flex h-11 w-11 items-center justify-center rounded-full text-xl hover:bg-sand">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5" data-lenis-prevent>
              <p className="mb-5 rounded-xl bg-sun/25 px-4 py-3 text-xs leading-relaxed text-espresso">
                This cart is a preview of the ordering flow. Nothing here is sent to the kitchen and no payment is taken. Place your real order on Toast.
              </p>
              {cart.length === 0 ? (
                <p className="mt-10 text-center text-sm text-ink/75">Your preview order is empty.</p>
              ) : (
                <ul className="space-y-6">
                  {cart.map((line) => (
                    <li key={line.key} className="flex gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-sand">{line.image && <Image src={line.image} alt="" fill sizes="64px" className="object-cover" />}</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-bold text-espresso">{line.name}</p>
                          <p className="text-sm font-bold">{money(lineTotal(line))}</p>
                        </div>
                        {(line.sizeName || line.optionNames.length > 0) && <p className="mt-0.5 text-xs text-ink/75">{[line.sizeName, ...line.optionNames].filter(Boolean).join(" · ")}</p>}
                        {line.note && <p className="mt-0.5 text-xs italic text-ink/75">“{line.note}”</p>}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex w-fit items-center rounded-full border-2 border-espresso/15 bg-white">
                            <button aria-label={`Decrease ${line.name}`} onClick={() => setQuantity(line.key, line.quantity - 1)} className="h-9 w-9">
                              −
                            </button>
                            <span className="min-w-6 text-center text-sm font-bold">{line.quantity}</span>
                            <button aria-label={`Increase ${line.name}`} onClick={() => setQuantity(line.key, line.quantity + 1)} className="h-9 w-9">
                              +
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(line.key)} className="text-xs font-bold text-danger underline-offset-4 hover:underline">
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="space-y-3 border-t border-espresso/10 px-6 py-5">
                <div className="flex items-baseline justify-between text-sm">
                  <span>Subtotal (preview)</span>
                  <span className="text-lg font-bold text-espresso">{money(cartSubtotal(cart))}</span>
                </div>
                <a href={LINKS.order} target="_blank" rel="noopener noreferrer" className="block rounded-full bg-leaf-deep px-6 py-3.5 text-center text-[15px] font-bold text-white transition-colors hover:bg-leaf">
                  Order on Toast
                </a>
                <Link href="/checkout" onClick={() => setOpen(false)} className="block text-center text-sm font-bold text-leaf-deep underline-offset-4 hover:underline">
                  See the on-site preview
                </Link>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
