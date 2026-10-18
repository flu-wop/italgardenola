"use client";

import Image from "next/image";
import type { MenuItem } from "@/lib/menu-data";
import { addToCart, openCart } from "@/lib/cart";
import { money, fromPrice } from "@/lib/pricing";
import { Modal } from "@/components/ui/Modal";
import { ItemConfigurator } from "./ItemConfigurator";

export function ItemModal({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  return (
    <Modal open={!!item} onClose={onClose} label={item ? `Customize ${item.name}` : "Customize item"} className="fixed inset-0 h-full w-full">
      {item && (
        <div className="flex h-full items-end justify-center md:items-center md:p-6">
          <div className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-paper shadow-lift md:max-w-xl md:rounded-[2rem]">
            <button type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-paper/95 text-xl text-espresso shadow-soft hover:bg-white">
              ✕
            </button>
            <div className="overflow-y-auto overscroll-contain" data-lenis-prevent>
              {item.image && (
                <div className="relative aspect-[16/10] w-full bg-sand">
                  <Image src={item.image} alt={item.name} fill sizes="(min-width: 768px) 36rem, 100vw" className="object-cover" />
                </div>
              )}
              <div className="px-5 pb-5 pt-6 md:px-8">
                <h2 className="pr-10 font-display text-3xl font-bold leading-tight text-espresso">{item.name}</h2>
                <p className="mt-1 text-sm font-bold text-leaf">{item.sizes ? `From ${money(fromPrice(item))}` : money(item.price)}</p>
                {item.description && <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{item.description}</p>}
                <div className="mt-6">
                  <ItemConfigurator
                    item={item}
                    onAdd={(sel, qty) => {
                      addToCart(item, sel, qty);
                      onClose();
                      openCart();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
