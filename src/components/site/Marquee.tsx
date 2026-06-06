const items = [
  "Electrician",
  "Plumbing",
  "Carpenter",
  "Painting",
  "Garden & Cleaning",
  "Removals",
  "Cleaning",
];

export function Marquee() {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden border-b-2 border-ink bg-ink py-4 text-cream">
      <div className="marquee">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-6 font-display text-2xl uppercase">
            {t}
            <span className="h-3 w-3 rotate-45 bg-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}
