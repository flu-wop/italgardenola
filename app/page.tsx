import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Eyebrow, Section } from "@/components/ui/Section";
import { Headline, Reveal } from "@/components/motion/motion";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import SignatureRail from "@/components/home/SignatureRail";
import OrderVignette from "@/components/home/OrderVignette";
import { CONTACT, HOURS_SUMMARY, LINKS, SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${SITE.name} — Plant-Based Soul Food in New Orleans`,
  description: "Chef-crafted I-tal cuisine inspired by the flavors of New Orleans. Fresh, 100% plant-based meals made with wholesome ingredients, bold seasonings, and soulful tradition.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} — Plant-Based Soul Food in New Orleans`,
    description: "Chef-crafted I-tal cuisine inspired by the flavors of New Orleans. 100% plant-based.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <SignatureRail />

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>What I-tal means</Eyebrow>
          <Headline text="Food that is *vital*." className="text-4xl font-bold leading-[1.05] text-espresso md:text-6xl" />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-ink/85">
              Derived from a well known term used in the Caribbean for healthy vegetarian food, the root word &ldquo;vital&rdquo; highlights our goal to create satisfying dishes that incorporate carefully selected ingredients that heal.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/85">I-tal debunks the myth that healthy plant-based food cannot also be delicious.</p>
          </Reveal>
        </div>
      </Section>

      <OrderVignette />

      <Section className="bg-sand">
        <div className="grid gap-6 md:grid-cols-3">
          <Reveal>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col p-8">
                <Badge variant="sun">Catering</Badge>
                <h3 className="mt-4 font-display text-2xl font-bold text-espresso">Let us cater your next event</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/80">Birthday parties, holiday parties, corporate events, wedding festivities and more. Packages and half or full trays.</p>
                <Button href="/catering" variant="outline" className="mt-6 self-start">
                  Catering menu
                </Button>
              </CardContent>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col p-8">
                <Badge variant="sun">Parties &amp; groups</Badge>
                <h3 className="mt-4 font-display text-2xl font-bold text-espresso">Book your next party with us</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/80">Need a place to host your event? We have the perfect space to host your next event. Call to inquire.</p>
                <Button href={CONTACT.phoneHref} variant="outline" className="mt-6 self-start">
                  Call {CONTACT.phone}
                </Button>
              </CardContent>
            </Card>
          </Reveal>
          <Reveal delay={0.16}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col p-8">
                <Badge variant="sun">I-tal Meal Prep</Badge>
                <h3 className="mt-4 font-display text-2xl font-bold text-espresso">100% plant-based meals</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/80">Organic, responsibly sourced ingredients. No fried foods, no added sugars, no seed oils. Compostable packaging.</p>
                <Button href="/meal-prep" variant="outline" className="mt-6 self-start">
                  About Meal Prep
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Visit us</Eyebrow>
            <Headline text="Find us on *St. Claude.*" className="text-4xl font-bold leading-[1.05] text-espresso md:text-6xl" />
            <address className="mt-6 text-lg not-italic leading-relaxed text-ink/90">
              {CONTACT.addressLine1}
              <br />
              {CONTACT.addressLine2}
            </address>
            <p className="mt-4 text-ink/85">{HOURS_SUMMARY}</p>
            <p className="mt-1 text-ink/85">{CONTACT.phone}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={CONTACT.mapsUrl} external>
                Get directions
              </Button>
              <Button href={LINKS.giftCards} external variant="outline">
                Gift cards
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
            <Image src="/images/about/interior-1.jpg" alt="Dining room at I-tal Garden" fill loading="lazy" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Section>
    </>
  );
}
