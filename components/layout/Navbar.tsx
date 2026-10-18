"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site-config";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Magnetic } from "@/components/motion/motion";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname; // closes itself when the route changes
  const setOpen = (fn: (v: boolean) => boolean) => setOpenAt(fn(open) ? pathname : null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={cn("sticky top-0 z-50 transition-colors duration-300", scrolled || open ? "bg-paper/95 shadow-soft backdrop-blur-md" : "bg-paper/70 backdrop-blur-sm")}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="I-tal Garden home">
          <Image src="/images/logo.png" alt="" width={38} height={52} className="h-11 w-auto rounded-md" priority />
          <span className="hidden font-display text-xl font-bold tracking-wide text-espresso sm:inline">I-tal Garden</span>
        </Link>

        <nav className="hidden items-center gap-5 2xl:gap-7 xl:flex" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const active = !link.external && (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href));
            const cls = cn("relative py-1 text-[13px] font-bold uppercase tracking-wider transition-colors 2xl:text-sm", active ? "text-leaf" : "text-espresso/80 hover:text-leaf");
            if (link.external)
              return (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {link.label}
                </a>
              );
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cls}
              >
                {link.label}
                {active && <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded bg-sun" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden xl:block">
            <Magnetic strength={0.2}>
              <Link href="/menu" className="inline-flex rounded-full bg-leaf-deep px-6 py-2.5 text-sm font-bold tracking-wide text-white transition-colors hover:bg-leaf">
                Order Online
              </Link>
            </Magnetic>
          </div>
          <CartDrawer />
          <button aria-label="Toggle menu" aria-expanded={open} className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 xl:hidden" onClick={() => setOpen((v) => !v)}>
            <span className={cn("h-0.5 w-6 bg-espresso transition-transform", open && "translate-y-2 rotate-45")} />
            <span className={cn("h-0.5 w-6 bg-espresso transition-opacity", open && "opacity-0")} />
            <span className={cn("h-0.5 w-6 bg-espresso transition-transform", open && "-translate-y-2 -rotate-45")} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-espresso/10 px-5 pb-6 pt-2 xl:hidden" aria-label="Mobile">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="rounded-xl px-3 py-3 text-base font-bold text-espresso/90">
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className={cn("rounded-xl px-3 py-3 text-base font-bold", pathname === link.href ? "bg-leaf-deep/10 text-leaf-deep" : "text-espresso/90")}>
                {link.label}
              </Link>
            )
          )}
          <Link href="/menu" className="mt-2 rounded-full bg-leaf-deep px-5 py-3.5 text-center text-base font-bold text-white">
            Order Online
          </Link>
        </nav>
      )}
    </header>
  );
}
