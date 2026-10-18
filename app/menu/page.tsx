import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { LINKS, SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Menu",
  description: "I-tal Garden's daily menu: main courses, sides, soup and drinks. 100% plant-based, chef-crafted I-tal cuisine inspired by New Orleans.",
  alternates: { canonical: "/menu" },
  openGraph: { title: `Menu — ${SITE.name}`, url: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <section className="px-5 pb-10 pt-14 md:px-6 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Daily menu</Eyebrow>
          <h1 className="font-display text-5xl font-bold leading-[1.02] text-espresso md:text-7xl">
            The <span className="script text-leaf">menu</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/85">
            Chef-crafted I-tal cuisine inspired by the flavors of New Orleans. Fresh, 100% plant-based meals made with wholesome ingredients, bold seasonings, and soulful tradition.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={LINKS.order} external>
              Order on Toast
            </Button>
            <Button href="/catering" variant="outline">
              Feeding a group? Catering
            </Button>
          </div>
          <p className="mt-4 max-w-xl text-sm text-ink/75">
            Tap a dish to see its options. The on-site order is a preview only: nothing is sent and no payment is taken. Allergen details are not listed on the daily menu, so please ask the kitchen.
          </p>
        </div>
      </section>
      <MenuBrowser menu="daily" />
    </>
  );
}
