import type { Metadata } from "next";
import { Eyebrow, Section } from "@/components/ui/Section";
import { Headline } from "@/components/motion/motion";
import { Button } from "@/components/ui/Button";
import { HotlinkImage } from "@/components/ui/HotlinkImage";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Fundraiser",
  description: "Check out our fundraiser events at I-tal Garden in New Orleans.",
  alternates: { canonical: "/fundraiser" },
  openGraph: { title: `Fundraiser — ${SITE.name}`, url: "/fundraiser" },
};

// Wording and structure follow the client's live page: heading, flyer,
// "Check out our fundraiser events!", and an Events button.
// CONFIRM: the flyer is hotlinked from the client's own site host (their live
// page labels it "August Newsletter Flyer", so it may be out of date). It could
// not be downloaded from the build environment. To self-host, save it as
// public/images/fundraiser-flyer.jpg and point FLYER at it.
const FLYER = "https://static.spotapps.co/web/italgardennola--com/custom/fundraiser_flyer.jpg";

export default function FundraiserPage() {
  return (
    <Section className="pb-24 pt-14 md:pt-20">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Community</Eyebrow>
        <Headline as="h1" immediate text="*Fundraiser*" className="text-5xl font-bold leading-[1.02] text-espresso md:text-7xl" />
        <HotlinkImage src={FLYER} alt="I-tal Garden fundraiser flyer" className="mx-auto mt-10 w-full rounded-[2rem] shadow-lift" />
        <p className="mt-8 text-xl text-ink/90">Check out our fundraiser events!</p>
        <div className="mt-6">
          <Button href="/events">Events</Button>
        </div>
      </div>
    </Section>
  );
}
