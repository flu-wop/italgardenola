import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow, Section } from "@/components/ui/Section";
import { Headline, Reveal } from "@/components/motion/motion";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Fundraiser",
  description: "Check out our fundraiser events. I-tal Garden is building toward a permanent location; see how you can support us.",
  alternates: { canonical: "/fundraiser" },
  openGraph: { title: `Fundraiser — ${SITE.name}`, url: "/fundraiser" },
};

// Structure follows the client's live page: heading, flyer, "Check out our
// fundraiser events!" and an Events button. The text under the flyer is the
// flyer's own wording, transcribed verbatim so it is readable and searchable.
// CONFIRM: the client's flyer is the "August Newsletter Flyer" (no year); ask
// whether it is still current.
export default function FundraiserPage() {
  return (
    <Section className="pb-24 pt-14 md:pt-20">
      <div className="text-center">
        <Eyebrow>Community</Eyebrow>
        <Headline as="h1" immediate text="*Fundraiser*" className="text-5xl font-bold leading-[1.02] text-espresso md:text-7xl" />
      </div>

      <div className="mt-12 grid items-start gap-10 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-14">
        <Reveal>
          <Image
            src="/images/fundraiser-flyer.jpg"
            alt="I-tal Garden August newsletter flyer: fundraiser goals and how to support us"
            width={1200}
            height={1554}
            sizes="(min-width: 768px) 26rem, 100vw"
            className="mx-auto h-auto w-full max-w-md rounded-[2rem] shadow-lift"
          />
        </Reveal>

        <div className="space-y-10">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-espresso">Fundraiser Goals</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/85">
              We are embarking on a long term business plan to build up financial resources to enhance our business overall. This transformation involves substantial resources for operational and expansion expenses to bring us to a greater of stability by securing a permanent location either through leasing or purchase.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-bold text-espresso">How can you all support us?</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/85">
              You can help us achieve this dream in a variety of ways: 1) by coming to our upcoming events, 2) by sharing our upcoming events with others and 3) donating to our expansion efforts if the spirit moves you!
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl font-bold text-espresso">Check out our fundraiser events!</p>
            <div className="mt-5">
              <Button href="/events">Events</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
