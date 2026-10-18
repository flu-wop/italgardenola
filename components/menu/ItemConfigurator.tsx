"use client";

import { useId, useMemo, useState } from "react";
import type { MenuItem, ModifierGroup } from "@/lib/menu-data";
import { TAG_LABELS } from "@/lib/menu-data";
import { defaultSelection, money, priceLine, validateSelection, type Selection } from "@/lib/pricing";
import { cn } from "@/lib/cn";

/**
 * Size picker, modifier groups (min/max enforced), special instructions, live
 * price and an add button. Used inside ItemModal and inline on the home page.
 */
export function ItemConfigurator({
  item,
  onAdd,
  addLabel = "Add to order",
}: {
  item: MenuItem;
  onAdd: (sel: Selection, quantity: number) => void;
  addLabel?: string;
}) {
  const uid = useId();
  const [sel, setSel] = useState<Selection>(() => defaultSelection(item));
  const [qty, setQty] = useState(1);

  const { unit, problems } = useMemo(() => priceLine(item, sel), [item, sel]);
  const blockers = problems.length ? problems : validateSelection(item, sel);
  const hasPlaceholder = item.modifierGroups.some((g) => g.placeholder);

  function toggle(group: ModifierGroup, optionId: string) {
    setSel((cur) => {
      const inGroup = new Set(group.options.map((o) => o.id));
      const has = cur.optionIds.includes(optionId);
      const others = cur.optionIds.filter((id) => !inGroup.has(id));
      const mine = cur.optionIds.filter((id) => inGroup.has(id));
      let next: string[];
      if (has) next = group.required && group.max === 1 ? mine : mine.filter((id) => id !== optionId);
      else if (group.max === 1) next = [optionId];
      else next = mine.length >= group.max ? mine : [...mine, optionId];
      return { ...cur, optionIds: [...others, ...next] };
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (blockers.length === 0) onAdd(sel, qty);
      }}
      className="space-y-7"
    >
      {item.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Dietary notes">
          {item.tags.map((t) => (
            <li key={t} className="rounded-full bg-sand px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-bark">
              {TAG_LABELS[t]}
            </li>
          ))}
        </ul>
      )}

      {item.sizes && (
        <fieldset>
          <legend className="mb-3 text-sm font-bold uppercase tracking-widest text-espresso">
            Size <span className="font-normal normal-case tracking-normal text-ink/70">· required</span>
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {item.sizes.map((s) => (
              <label key={s.id} className={cn("flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-leaf-deep", sel.sizeId === s.id ? "border-leaf-deep bg-leaf-deep/5" : "border-espresso/15 hover:border-espresso/40")}>
                <span className="flex items-center gap-3">
                  <input type="radio" name={`${uid}-size`} className="h-4 w-4 accent-leaf-deep" checked={sel.sizeId === s.id} onChange={() => setSel((c) => ({ ...c, sizeId: s.id }))} />
                  {s.name}
                </span>
                <span className="font-bold">{money(s.price)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {item.modifierGroups.map((g) => {
        const picked = g.options.filter((o) => sel.optionIds.includes(o.id)).length;
        const single = g.max === 1;
        const rule = g.required ? (single ? "required · choose 1" : `required · choose ${Math.max(1, g.min)}–${g.max}`) : single ? "optional" : `optional · up to ${g.max}`;
        return (
          <fieldset key={g.id}>
            <legend className="mb-3 text-sm font-bold uppercase tracking-widest text-espresso">
              {g.name} <span className="font-normal normal-case tracking-normal text-ink/70">· {rule}</span>
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {g.options.map((o) => {
                const checked = sel.optionIds.includes(o.id);
                const atMax = !single && !checked && picked >= g.max;
                const disabled = o.soldOut || atMax;
                return (
                  <label key={o.id} className={cn("flex items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-leaf-deep", disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer", checked ? "border-leaf-deep bg-leaf-deep/5" : "border-espresso/15 hover:border-espresso/40")}>
                    <span className="flex items-center gap-3">
                      <input
                        type={single && g.required ? "radio" : "checkbox"}
                        name={`${uid}-${g.id}`}
                        className="h-4 w-4 accent-leaf-deep"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => toggle(g, o.id)}
                      />
                      {o.name}
                      {o.soldOut && <span className="text-xs text-danger">Sold out</span>}
                    </span>
                    {o.priceDelta !== 0 && <span className="font-bold">+{money(o.priceDelta)}</span>}
                  </label>
                );
              })}
            </div>
          </fieldset>
        );
      })}

      {hasPlaceholder && (
        <p className="rounded-xl bg-sun/25 px-4 py-3 text-xs leading-relaxed text-espresso">
          Demo: these options are listed from the public menu. The kitchen confirms the final choices and rules before this goes live.
        </p>
      )}

      <div>
        <label htmlFor={`${uid}-note`} className="mb-2 block text-sm font-bold uppercase tracking-widest text-espresso">
          Special instructions
        </label>
        <textarea
          id={`${uid}-note`}
          rows={2}
          maxLength={200}
          value={sel.note ?? ""}
          onChange={(e) => setSel((c) => ({ ...c, note: e.target.value }))}
          placeholder="Allergies, substitutions, anything the kitchen should know"
          className="w-full resize-none rounded-2xl border-2 border-espresso/15 bg-white px-4 py-3 text-sm placeholder:text-ink/50 focus:border-leaf-deep focus:outline-none"
        />
      </div>

      <div className="sticky bottom-0 -mx-1 border-t border-espresso/10 bg-paper px-1 pb-1 pt-4">
        {blockers.length > 0 && (
          <p role="status" className="mb-2 text-xs text-danger">
            {blockers[0]}
          </p>
        )}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border-2 border-espresso/15 bg-white">
            <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-11 w-11 text-lg">
              −
            </button>
            <span aria-live="polite" className="min-w-8 text-center text-sm font-bold">
              {qty}
            </span>
            <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(99, q + 1))} className="h-11 w-11 text-lg">
              +
            </button>
          </div>
          <button
            type="submit"
            disabled={blockers.length > 0}
            className="flex h-12 flex-1 items-center justify-between rounded-full bg-leaf-deep px-6 text-[15px] font-bold text-white transition-colors enabled:hover:bg-leaf disabled:cursor-not-allowed disabled:opacity-45"
          >
            <span>{addLabel}</span>
            <span aria-live="polite">{money(unit * qty)}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
