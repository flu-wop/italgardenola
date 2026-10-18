import type { Metadata } from "next";
import { Eyebrow, Section } from "@/components/ui/Section";
import { Headline } from "@/components/motion/motion";
import { Button } from "@/components/ui/Button";
import { LINKS, SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Meal Prep",
  description: "I-tal Meal Prep: 100% plant-based meals made with organic, responsibly sourced ingredients. No fried foods, no added sugars, no seed oils.",
  alternates: { canonical: "/meal-prep" },
  openGraph: { title: `Meal Prep — ${SITE.name}`, url: "/meal-prep" },
};

// Facts are from the client's home page. Meal prep has its own site and ordering.
const FACTS = ["100% plant-based meals", "Organic, responsibly sourced ingredients", "No fried foods", "No added sugars", "No seed oils", "Compostable packaging"];

export default function MealPrepPage() {
  return (
    <Section className="pb-24 pt-14 md:pt-20">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <Eyebrow>I-tal Meal Prep</Eyebrow>
          <Headline as="h1" immediate text="Don’t feel like *cooking?*" className="text-5xl font-bold leading-[1.02] text-espresso md:text-7xl" />
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/85">We got you covered. Pick up your favorite food, planned for the week.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={LINKS.mealPrep} external>
              Order on italmealprep.com
            </Button>
          </div>
          <p className="mt-3 text-sm text-ink/75">Meal Prep has its own menu and ordering. This page points you there.</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {FACTS.map((f) => (
            <li key={f} className="flex items-center gap-3 rounded-2xl bg-white p-5 text-base font-bold text-espresso shadow-soft">
              <span aria-hidden className="h-3 w-3 shrink-0 rounded-full bg-sun" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
