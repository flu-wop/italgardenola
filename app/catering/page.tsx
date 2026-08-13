import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CONTACT, LINKS, SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "I-tal Garden caters birthdays, holidays, corporate events, and weddings with fully plant-based New Orleans soul food. Groups of 50+ and space rental available.",
  alternates: { canonical: "/catering" },
  openGraph: { title: `Catering — ${SITE.name}`, url: "/catering" },
};

const OCCASIONS = [
  "Birthday Parties",
  "Holiday Parties",
  "Corporate Events",
  "Weddings",
  "Private Dining",
  "Community Gatherings",
];

const PACKAGES = [
  {
    name: "Pasta Tray",
    price: "$350",
    serves: "Feeds 10–12",
    includes: "Half pan pasta, half pan protein, half pan side, cornbread, 1 gallon of tea",
  },
  {
    name: "Full Feast Tray",
    price: "$475",
    serves: "Feeds 10–12",
    includes: "Full pan pasta, full pan protein, full pan side, full cornbread tray, 1 gallon of tea",
  },
  {
    name: "Salad Tray",
    price: "$400",
    serves: "Feeds 10–12",
    includes: "Full pan pasta, full pan protein, full pan chef salad (balsamic + ranch)",
  },
];

const ADD_ONS = [
  { name: "Wings", options: "OG, BBQ, Lemon Pepper, Coconut Maple, or Buffalo", price: "$70 half / $125 full" },
  { name: "Jackfruit-Seitan Ribs", options: "House-made, smoky BBQ sauce", price: "$85 half / $160 full" },
  { name: "Fried Oyster Mushrooms", options: "Seasoned, battered", price: "$85 half / $160 full" },
  { name: "Chef Salad", options: "Mixed greens, tomatoes, red onion, cucumber", price: "$45 half / $90 full" },
];

export default function CateringPage() {
  return (
    <>
      <Section className="pb-10 pt-16 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Catering</Eyebrow>
            <SectionHeading>
              Feed your people, <span className="italic text-gold">plant-powered</span>.
            </SectionHeading>
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-mist">
              Chef Ra brings the same ital soul food from St. Claude Ave to your event — trays built for
              sharing, seasoned like it&rsquo;s Sunday dinner.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={LINKS.cateringOrder} external>
                Start a Catering Order
              </Button>
            </div>
            <p className="mt-3 text-sm text-mist">
              No deposit to inquire — pricing depends on headcount and menu.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/catering-spread.jpg"
              alt="I-tal Garden catering spread"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section className="border-t border-border/60 bg-charcoal/60">
        <Eyebrow>Packages</Eyebrow>
        <SectionHeading className="mb-10">
          Real pricing, <span className="italic text-turmeric">no guessing</span>
        </SectionHeading>
        <div className="grid gap-6 md:grid-cols-3">
          {PACKAGES.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border p-6">
              <p className="font-display text-2xl text-cream">{p.price}</p>
              <p className="mt-1 text-sm uppercase tracking-widest text-gold">{p.name}</p>
              <p className="mt-1 text-xs text-mist">{p.serves}</p>
              <p className="mt-4 text-sm leading-relaxed text-mist">{p.includes}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <p className="mb-4 text-xs uppercase tracking-widest text-mist">Add-ons</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {ADD_ONS.map((a) => (
              <div key={a.name} className="flex items-baseline justify-between gap-4 border-b border-border/60 py-2">
                <div>
                  <p className="text-sm text-cream">{a.name}</p>
                  <p className="text-xs text-mist">{a.options}</p>
                </div>
                <p className="whitespace-nowrap text-sm text-gold">{a.price}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 text-xs text-mist">
          Chef salad ranch contains nuts — let us know about any allergies when you order.
        </p>
      </Section>

      <Section className="border-t border-border/60 bg-charcoal/60">
        <Eyebrow>Occasions We Cater</Eyebrow>
        <SectionHeading className="mb-10">
          Every table, <span className="italic text-turmeric">covered</span>
        </SectionHeading>
        <div className="flex flex-wrap gap-3">
          {OCCASIONS.map((o) => (
            <Badge key={o} className="px-4 py-2 text-[13px] normal-case tracking-normal">
              {o}
            </Badge>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Large Groups</Eyebrow>
            <SectionHeading>
              Parties of <span className="italic text-gold">50+</span>
            </SectionHeading>
            <p className="mt-6 font-body text-base leading-relaxed text-mist">
              For groups of 50 or more, or to inquire about renting the space for your event, email us
              directly and we&rsquo;ll work out a plan that fits your headcount and budget.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={`mailto:${CONTACT.email}`}>Email {CONTACT.email}</Button>
              <Button href={CONTACT.phoneHref} variant="outline">
                Call {CONTACT.phone}
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/assorted-topview.jpg"
              alt="An assortment of I-tal Garden dishes"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
