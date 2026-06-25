import { FileText, Clock, MapPin, Calendar } from "lucide-react";

const items = [
  { icon: FileText, t: "UK standards", d: "Work delivered to current UK building and trade regulations." },
  { icon: Clock, t: "Quotes within 24h", d: "Clear itemised pricing with no hidden surprises." },
  { icon: MapPin, t: "Local vetted crews", d: "Reference-checked tradespeople operating across the UK." },
  { icon: Calendar, t: "Monthly Service", d: "Need regular maintenance? Choose a monthly service plan and book a meeting with our team to discuss your requirements." },
];

export function Why() {
  return (
    <section id="about" className="border-t border-line py-24 md:py-32">
      <div className="container-page grid items-start gap-16 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <span className="eyebrow">Why BSG</span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Built to UK standards.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            From the smallest socket change to a full renovation — one trusted team, one clear quotation, one tidy finish.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="group rounded-[2rem] bg-white p-10 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
              <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-ink">{t}</h3>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
