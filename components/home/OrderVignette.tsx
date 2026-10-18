"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Headline, Magnetic, Reveal } from "@/components/motion/motion";
import { ItemConfigurator } from "@/components/menu/ItemConfigurator";
import { Button } from "@/components/ui/Button";
import { addToCart, openCart } from "@/lib/cart";
import { findItem } from "@/lib/menu-data";
import Link from "next/link";

const SAMPLE = findItem("lemon-pepper-wrap-meal")!;

/** Home-page demo of the item modal, live on a real dish. */
export default function OrderVignette() {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-6 md:py-32">
      <div>
        <p className="eyebrow">Order ahead</p>
        <Headline text="Make it *yours*, then order." className="mt-3 text-[2.4rem] font-bold leading-[1.05] text-espresso md:text-6xl" />
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/85">
            Pick a size, choose your options, add a note for the kitchen. Try it on the dish at right, then check out in a few taps.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link href="/menu" className="inline-flex rounded-full bg-leaf-deep px-8 py-4 text-[15px] font-bold tracking-wide text-white shadow-lift transition-colors hover:bg-leaf">
                Order Online
              </Link>
            </Magnetic>
            <Button href="/menu" variant="outline">
              Browse the menu
            </Button>
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto w-full max-w-md">
        <div aria-hidden className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-sun/40" />
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: reduce ? 0 : -1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          className="overflow-hidden rounded-[2rem] bg-paper shadow-lift"
        >
          <p className="bg-espresso px-6 py-2 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-sun">Demo · nothing is sent</p>
          <div className="p-6">
            <div className="flex items-start gap-4">
              {SAMPLE.image ? <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl"><Image src={SAMPLE.image} alt="" fill sizes="80px" className="object-cover" /></div> : null}
              <div>
                <h3 className="font-display text-2xl font-bold leading-tight text-espresso">{SAMPLE.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/80">{SAMPLE.description}</p>
              </div>
            </div>
            <div className="mt-6">
              <ItemConfigurator
                item={SAMPLE}
                addLabel="Add to order"
                onAdd={(sel, qty) => {
                  addToCart(SAMPLE, sel, qty);
                  openCart();
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
