"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ITEMS, SECTIONS, TAG_LABELS, itemsFor, type MenuItem, type MenuTag } from "@/lib/menu-data";
import { SPECIAL_IDS } from "@/lib/specials";
import { fromPrice, money } from "@/lib/pricing";
import { scrollToId } from "@/components/motion/SmoothScroll";
import { cn } from "@/lib/cn";
import { ItemModal } from "./ItemModal";

function ItemCard({ item, onOpen }: { item: MenuItem; onOpen: (i: MenuItem) => void }) {
  const price = item.sizes ? `from ${money(fromPrice(item))}` : money(item.price);
  return (
    <button
      type="button"
      disabled={item.soldOut}
      onClick={() => onOpen(item)}
      aria-label={`${item.name}, ${price}${item.soldOut ? ", sold out" : ", customize and add"}`}
      className={cn("group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-espresso/10 bg-white text-left shadow-soft transition-all duration-300", item.soldOut ? "cursor-not-allowed opacity-60" : "hover:-translate-y-1 hover:shadow-lift")}
    >
      {item.image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
          <Image src={item.image} alt="" fill loading="lazy" sizes="(min-width: 1024px) 28rem, (min-width: 640px) 45vw, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          {item.soldOut && <span className="absolute left-3 top-3 rounded-full bg-espresso px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-paper">Sold out</span>}
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-bold leading-snug text-espresso">{item.name}</h3>
          <span className="shrink-0 pt-0.5 text-sm font-bold text-leaf">{price}</span>
        </div>
        {item.description && <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-ink/80">{item.description}</p>}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span key={t} className="rounded-full bg-sand px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-bark">
                {TAG_LABELS[t]}
              </span>
            ))}
            {item.soldOut && !item.image && <span className="rounded-full bg-espresso px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-paper">Sold out</span>}
          </div>
          {!item.soldOut && (
            <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-leaf-deep text-lg text-white transition-colors group-hover:bg-leaf">
              +
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export function MenuBrowser({ menu }: { menu: "daily" | "catering" }) {
  const all = useMemo(() => itemsFor(menu), [menu]);
  const sections = useMemo(() => SECTIONS.filter((s) => s.menu === menu), [menu]);
  const tagsPresent = useMemo(() => (["gf", "nuts", "spicy", "vegan"] as MenuTag[]).filter((t) => all.some((i) => i.tags.includes(t))), [all]);

  const [query, setQuery] = useState("");
  const [tags, setTags] = useState<MenuTag[]>([]);
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");
  const [open, setOpen] = useState<MenuItem | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((i) => (!q || `${i.name} ${i.description}`.toLowerCase().includes(q)) && tags.every((t) => i.tags.includes(t)));
  }, [all, query, tags]);

  const specials = useMemo(() => (menu === "daily" ? ITEMS.filter((i) => SPECIAL_IDS.includes(i.id) || i.tags.includes("special")) : []), [menu]);
  const bySection = sections.map((s) => ({ s, items: visible.filter((i) => i.sections.includes(s.id)) })).filter((x) => x.items.length > 0);

  // highlight the chip of the section nearest the top
  useEffect(() => {
    const els = bySection.map(({ s }) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-140px 0px -65% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [bySection.map((x) => x.s.id).join(",")]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="sticky top-[72px] z-30 border-b border-espresso/10 bg-paper/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-5 py-3 md:px-6">
          <nav aria-label="Menu categories" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-current={active === s.id ? "true" : undefined}
                onClick={() => {
                  setActive(s.id);
                  scrollToId(s.id, -150);
                }}
                className={cn("shrink-0 rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors", active === s.id ? "border-leaf-deep bg-leaf-deep text-white" : "border-espresso/15 text-espresso hover:border-espresso/40")}
              >
                {s.title}
              </button>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative flex-1">
              <span className="sr-only">Search the menu</span>
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the menu" className="h-11 w-full rounded-full border-2 border-espresso/15 bg-white px-5 text-sm placeholder:text-ink/60 focus:border-leaf-deep focus:outline-none" />
            </label>
            {tagsPresent.length > 0 && (
              <div className="no-scrollbar flex gap-2 overflow-x-auto" role="group" aria-label="Dietary filters">
                {tagsPresent.map((t) => {
                  const on = tags.includes(t);
                  return (
                    <button key={t} type="button" aria-pressed={on} onClick={() => setTags((cur) => (on ? cur.filter((x) => x !== t) : [...cur, t]))} className={cn("h-11 shrink-0 rounded-full border-2 px-4 text-sm font-bold transition-colors", on ? "border-sun bg-sun text-espresso" : "border-espresso/15 text-espresso hover:border-espresso/40")}>
                      {TAG_LABELS[t]}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 md:px-6">
        {menu === "daily" && (
          <section aria-labelledby="specials-h" className="mb-14 rounded-[2rem] bg-espresso p-6 text-paper md:p-10">
            <p className="eyebrow !text-sun">Specials today</p>
            <h2 id="specials-h" className="mt-2 font-display text-2xl font-bold md:text-3xl">
              {specials.length ? "What the kitchen is featuring" : "No special posted right now"}
            </h2>
            {specials.length > 0 && (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {specials.map((i) => (
                  <ItemCard key={i.id} item={i} onOpen={setOpen} />
                ))}
              </div>
            )}
          </section>
        )}

        {bySection.length === 0 && (
          <p role="status" className="py-16 text-center text-ink/80">
            Nothing matches that. Try a different search or clear a filter.
          </p>
        )}

        {bySection.map(({ s, items }) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="mb-16 scroll-mt-40">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4">
              <h2 id={`${s.id}-h`} className="font-display text-3xl font-bold text-espresso">
                {s.title}
              </h2>
              {s.note && <span className="eyebrow">{s.note}</span>}
            </div>
            <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((i) => (
                <ItemCard key={i.id} item={i} onOpen={setOpen} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <ItemModal item={open} onClose={() => setOpen(null)} />
    </>
  );
}
