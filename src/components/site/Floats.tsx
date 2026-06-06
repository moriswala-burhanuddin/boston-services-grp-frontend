import { useEffect, useState } from "react";

export function WhatsApp() {
  const url = "https://wa.me/447578511022?text=Hi%20Boston%20Services%2C%20I%27d%20like%20a%20quote.";
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_-12px_rgba(37,211,102,0.65)] transition-transform hover:scale-105 active:scale-95"
    >
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
      </svg>
    </a>
  );
}

export function CookieNotice() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("bsg-cookie-ack")) {
      const t = setTimeout(() => setShow(true), 600);
      return () => clearTimeout(t);
    }
  }, []);
  if (!show) return null;
  const dismiss = () => { localStorage.setItem("bsg-cookie-ack", "1"); setShow(false); };
  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm rounded-sm border border-line bg-white p-5 shadow-2xl">
      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Cookies</p>
      <p className="mt-2 text-sm text-ink">
        We use essential cookies to make this site work and analytics cookies to improve it. Read our cookie notice for detail.
      </p>
      <div className="mt-4 flex gap-2">
        <button onClick={dismiss} className="flex-1 rounded-sm bg-ink px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-white">Accept all</button>
        <button onClick={dismiss} className="flex-1 rounded-sm border border-line px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-ink">Essential only</button>
      </div>
    </div>
  );
}
