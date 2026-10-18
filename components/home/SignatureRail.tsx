"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Headline } from "@/components/motion/motion";
import { findItem } from "@/lib/menu-data";
import { fromPrice, money } from "@/lib/pricing";

// Ra Pasta, Jackfruit Ribs, Crab-less Cakes, Cauliwings, Kale Salad. Prices come
// from lib/menu-data.ts. Crab-less cakes have no standalone price on the client's
// menu (only as part of the Cajun Pasta Meal), so none is shown.
const SIGNATURE = [
  { itemId: "ra-pasta", image: "/images/menu/ra-pasta.jpg", href: "/menu#mains", blurb: null as string | null },
  { itemId: "side-jackfruit-ribs", image: "/images/menu/jackfruit-ribs.jpg", href: "/menu#sides", blurb: null },
  { itemId: null, name: "Crab-less Cakes", image: "/images/menu/crabless-cakes.jpg", href: "/menu#mains", blurb: "Crab-less cake balls top the Cajun Pasta Meal." },
  { itemId: "side-cauliwangz", image: "/images/menu/cauliflower-wings.jpg", href: "/menu#sides", blurb: null },
  { itemId: "hell-yeah-kale-yeah", image: "/images/menu/kale-salad.jpg", href: "/menu#mains", blurb: null },
].map((s) => {
  const item = s.itemId ? findItem(s.itemId) : undefined;
  return { key: s.itemId ?? "crabless", name: item?.name ?? (s as { name?: string }).name ?? "", price: item ? (item.sizes ? fromPrice(item) : item.price) : null, desc: s.blurb ?? item?.description ?? "", image: s.image, href: s.href };
});

function Card({ it, i, className }: { it: (typeof SIGNATURE)[number]; i: number; className: string }) {
  return (
    <Link href={it.href} className={`group relative block shrink-0 overflow-hidden rounded-[2rem] bg-sand shadow-lift ${className}`}>
      <Image src={it.image} alt="" fill loading="lazy" sizes="(max-width: 768px) 17rem, 22rem" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/15 to-transparent" />
      <span className="absolute left-5 top-5 rounded-full bg-paper/90 px-3 py-1 text-xs font-bold text-espresso">{String(i + 1).padStart(2, "0")}</span>
      {it.price !== null && <span className="absolute right-5 top-5 rounded-full bg-sun px-3 py-1 text-sm font-bold text-espresso">{money(it.price)}</span>}
      <div className="absolute inset-x-0 bottom-0 p-6 text-paper">
        <h3 className="text-2xl font-bold leading-tight">{it.name}</h3>
        {it.desc && <p className="mt-2 line-clamp-2 text-sm text-paper/80">{it.desc}</p>}
        <span className="mt-3 inline-block text-sm font-bold text-sun">See on the menu →</span>
      </div>
    </Link>
  );
}

const SIZE = "h-[26rem] w-[17rem] md:h-[30rem] md:w-[22rem]";

export default function SignatureRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const [maxX, setMaxX] = useState(1800);

  useEffect(() => {
    const measure = () => track.current && setMaxX(Math.max(0, track.current.scrollWidth - window.innerWidth));
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 600);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const heading = (
    <>
      <p className="eyebrow">Signature dishes</p>
      <Headline text="The plates people come *back* for." className="mt-3 max-w-2xl text-[2.2rem] font-bold leading-[1.05] text-espresso md:text-6xl" />
    </>
  );

  return (
    <>
      {/* Mobile, and reduced motion at any width: plain horizontal scroll with snap. */}
      <section aria-label="Signature dishes" className={`bg-sand px-5 py-16 ${reduce ? "" : "md:hidden"}`}>
        <div className="mx-auto max-w-6xl">{heading}</div>
        <div className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4" data-lenis-prevent-wheel>
          {SIGNATURE.map((it, i) => (
            <div key={it.key} className="snap-center">
              <Card it={it} i={i} className={SIZE} />
            </div>
          ))}
        </div>
      </section>

      {/* Desktop: one pinned rail driven by page scroll. */}
      {!reduce && (
        <section ref={section} aria-label="Signature dishes" style={{ height: `calc(100svh + ${maxX}px)` }} className="relative hidden bg-sand md:block">
          <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
            <div className="mx-auto w-full max-w-6xl px-6">{heading}</div>
            <motion.div ref={track} style={{ x }} className="mt-10 flex w-max gap-7 pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pr-[20vw]">
              {SIGNATURE.map((it, i) => (
                <Card key={it.key} it={it} i={i} className={SIZE} />
              ))}
            </motion.div>
            <div className="mx-auto mt-8 w-full max-w-6xl px-6">
              <div className="h-1 w-full overflow-hidden rounded-full bg-espresso/10">
                <motion.div style={{ width: bar }} className="h-full rounded-full bg-leaf" />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
