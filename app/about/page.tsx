import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow, Section } from "@/components/ui/Section";
import { Headline, Reveal } from "@/components/motion/motion";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: "I-tal Garden is a plant-based food company offering healthy alternatives to traditional New Orleans style soul cuisine. Family owned and operated.",
  alternates: { canonical: "/about" },
  openGraph: { title: `About — ${SITE.name}`, url: "/about" },
};

// Copy below is the client's own, from italgardennola.com (About).
// CONFIRM: any chef bio / founding story should come from the client directly.
export default function AboutPage() {
  return (
    <>
      <Section className="pb-10 pt-14 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>About</Eyebrow>
            <Headline as="h1" immediate text="Plant-based, *family owned.*" className="text-5xl font-bold leading-[1.02] text-espresso md:text-7xl" />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/85">
              I-Tal Garden is a plant-based food company that provides healthy alternatives to traditional New Orleans style soul cuisine. Family owned and operated, our mission is to provide flavorful but balanced organic offerings that appeal to a wide range of palates.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
            <Image src="/images/about/decor.jpg" alt="Decor inside I-tal Garden" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Section>

      <Section className="bg-sand">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>The philosophy</Eyebrow>
          <Headline text="Eating *I-tal*" className="text-4xl font-bold text-espresso md:text-6xl" />
          <Reveal>
            <p className="mt-6 text-lg leading-relaxed text-ink/85">
              Derived from a well known term used in the Caribbean for healthy vegetarian food, the root word &ldquo;vital&rdquo;, which means important, essential, absolutely necessary for life, highlights our goal to create satisfying dishes that incorporate carefully selected ingredients that heal.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/85">I-Tal debunks the myth that healthy vegetarian, vegan, gluten-free and other plant-based food cannot also be delicious.</p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem] shadow-lift">
            <Image src="/images/about/interior-3.jpg" alt="Inside I-tal Garden" fill loading="lazy" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <Eyebrow>Order ahead</Eyebrow>
            <Headline text="Come *hungry.*" className="text-4xl font-bold text-espresso md:text-5xl" />
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/menu">Order Online</Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
