import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow, Section } from "@/components/ui/Section";
import { Headline } from "@/components/motion/motion";
import { Button } from "@/components/ui/Button";
import { CONTACT, SITE, SOCIAL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Events",
  description: "Host your holiday party, birthday or get-together at I-tal Garden in New Orleans. Call to inquire.",
  alternates: { canonical: "/events" },
  openGraph: { title: `Events — ${SITE.name}`, url: "/events" },
};

// Copy is from the client's home page ("Parties & Groups", "Holiday Parties").
// Their live /events page lists no calendar, so none is shown here.
export default function EventsPage() {
  return (
    <>
      <Section className="pb-10 pt-14 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Parties &amp; groups</Eyebrow>
            <Headline as="h1" immediate text="Book your next *party* with us." className="text-5xl font-bold leading-[1.02] text-espresso md:text-7xl" />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/85">Need a place to host your event? We have the perfect space to host your next event, and the perfect venue for your holiday party.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={CONTACT.phoneHref}>Call to inquire · {CONTACT.phone}</Button>
              <Button href="/catering" variant="outline">
                Catering menu
              </Button>
            </div>
            <p className="mt-4 max-w-md text-sm text-ink/75">
              For what&rsquo;s happening next, follow{" "}
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="font-bold text-leaf-deep underline-offset-4 hover:underline">
                {SOCIAL.instagramHandle}
              </a>{" "}
              on Instagram.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
            <Image src="/images/about/interior-2.jpg" alt="Diners at I-tal Garden" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Section>
    </>
  );
}
