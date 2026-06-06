const steps = [
  { n: "01", t: "Tell us the job", d: "Pick your services, share measurements, add a few photos and your address." },
  { n: "02", t: "Receive a fixed quote", d: "We review the detail and email you a clear, itemised quotation within one working day." },
  { n: "03", t: "Book and relax", d: "Choose a date that suits you. Our team arrives on time and leaves the site tidy." },
];

export function Process() {
  return (
    <section id="process" className="border-t border-line bg-subtle py-24 md:py-32">
      <div className="container-page">
        <div className="mb-20 max-w-2xl">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Three steps. No surprises.
          </h2>
        </div>

        <div className="mx-auto max-w-4xl space-y-8 relative pb-20">
          {steps.map((s, i) => (
            <div 
              key={s.n} 
              className="sticky flex flex-col sm:flex-row items-start sm:items-center gap-8 rounded-[2rem] bg-white p-10 lg:p-14 shadow-xl ring-1 ring-black/5 transition-transform"
              style={{ top: `calc(100px + ${i * 40}px)`, zIndex: i }}
            >
              <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.5rem] bg-ink text-4xl font-extrabold tracking-tight text-white shadow-lg">
                {s.n}
              </span>
              <div>
                <h3 className="text-3xl font-extrabold text-ink">{s.t}</h3>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
