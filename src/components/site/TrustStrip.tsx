const items = ["Checkatrade", "TrustATrader", "Gas Safe Register", "NICEIC Approved", "Which? Trusted Trader"];

export function TrustStrip() {
  return (
    <div className="border-y border-line bg-primary py-8 overflow-hidden flex">
      <div className="flex w-[200%] animate-scroll items-center gap-16 md:gap-32 px-10">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} className="whitespace-nowrap text-xl md:text-2xl font-black uppercase tracking-[0.2em] text-white drop-shadow-md">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
