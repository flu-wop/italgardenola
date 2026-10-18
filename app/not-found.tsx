import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="eyebrow text-bark">404</p>
      <h1 className="mt-4 font-display text-4xl text-espresso">This plate isn&rsquo;t on the menu.</h1>
      <p className="mt-4 max-w-sm font-body text-ink/75">
        The page you&rsquo;re looking for doesn&rsquo;t exist. Let&rsquo;s get you back to something good.
      </p>
      <div className="mt-8 flex gap-4">
        <Button href="/">Back Home</Button>
        <Button href="/menu" variant="outline">
          View Menu
        </Button>
      </div>
    </Section>
  );
}
