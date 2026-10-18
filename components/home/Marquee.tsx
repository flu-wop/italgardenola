// Short phrases, all from the client's own site copy.
const PHRASES = [
  "100% plant-based",
  "Family owned and operated",
  "Chef-crafted I-tal cuisine",
  "Inspired by the flavors of New Orleans",
  "Wholesome ingredients",
  "Bold seasonings",
  "Soulful tradition",
  "Flavorful but balanced",
];

export default function Marquee() {
  const row = [...PHRASES, ...PHRASES];
  return (
    <div className="relative z-10 overflow-hidden bg-espresso py-4 text-paper md:py-5" aria-label="I-tal Garden, in a few phrases">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap motion-reduce:animate-none hover:[animation-play-state:paused]" aria-hidden>
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-8 text-lg font-bold tracking-wide md:text-2xl">
            {w}
            <span className="h-2 w-2 rounded-full bg-sun" />
          </span>
        ))}
      </div>
    </div>
  );
}
