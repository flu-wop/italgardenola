import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { CONTACT, LINKS, SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Catering",
  description: "I-tal Garden catering: packages, half and full trays, desserts and add-ons. Birthday parties, holiday parties, corporate events, wedding festivities and more.",
  alternates: { canonical: "/catering" },
  openGraph: { title: `Catering — ${SITE.name}`, url: "/catering" },
};

export default function CateringPage() {
  return (
    <>
      <section className="px-5 pb-10 pt-14 md:px-6 md:pt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>Catering</Eyebrow>
            <h1 className="font-display text-5xl font-bold leading-[1.02] text-espresso md:text-7xl">
              Let us cater your <span className="script text-leaf">next event</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/85">
              I-tal Garden would be honored to provide our services for your next event. Each event is bespoke to your tastes and needs. Birthday parties, holiday parties, corporate events, wedding festivities and more.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={CONTACT.phoneHref}>Call {CONTACT.phone}</Button>
              <Button href={LINKS.cateringOrder} external variant="outline">
                Start a catering order
              </Button>
            </div>
            <p className="mt-4 max-w-md text-sm text-ink/75">Browse the catering menu below. Tap an item to see its options. To book, use the catering form above or call us.</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
            <Image src="/images/catering-spread.jpg" alt="I-tal Garden catering spread" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
      <MenuBrowser menu="catering" />
    </>
  );
}
