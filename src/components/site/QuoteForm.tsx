import { useState } from "react";
import { Upload, X, Check } from "lucide-react";

const SERVICES = [
  "Electrician", "Plumbering", "Carpenter", "Painting",
  "Gardens decorating and cleaning", "Remover", "Cleaning", "kitchen fittings"
];

export function QuoteForm({ defaultService }: { defaultService?: string }) {
  const [selected, setSelected] = useState<string[]>(defaultService ? [defaultService] : ["Plumbering"]);
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (s: string) =>
    setSelected((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles((p) => [...p, ...Array.from(e.target.files!)].slice(0, 8));
  };

  const removeFile = (i: number) => setFiles((p) => p.filter((_, idx) => idx !== i));

  const SLUG_MAP: Record<string, string> = {
    "Electrician": "electrician",
    "Plumbering": "plumber",
    "Carpenter": "carpenter",
    "Painting": "painting",
    "Gardens decorating and cleaning": "gardens",
    "Remover": "remover",
    "Cleaning": "cleaning",
    "kitchen fittings": "kitchen-fittings"
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const address = formData.get("address");
    const postcode = formData.get("postcode");
    const length = formData.get("length");
    const width = formData.get("width");
    const height = formData.get("height");
    const description = formData.get("description");

    const message = `
Address: ${address}, ${postcode}
Measurements: ${length}x${width}x${height}
Services Requested: ${selected.join(", ")}

Description:
${description}
    `.trim();

    const serviceSlug = selected.length > 0 ? SLUG_MAP[selected[0]] : null;

    const payload = new FormData();
    payload.append("name", formData.get("name") as string);
    payload.append("email", formData.get("email") as string);
    payload.append("phone", formData.get("phone") as string);
    payload.append("message", message);
    if (serviceSlug) {
      payload.append("service", serviceSlug);
    }
    
    files.forEach((file) => {
      payload.append("photos", file);
    });

    try {
      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_BASE}/api/leads/`, {
        method: "POST",
        body: payload,
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
        setSelected([]);
        setFiles([]);
        setTimeout(() => setSubmitted(false), 10000);
      } else {
        alert("There was an error submitting your request. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit request.");
    }
  };

  return (
    <section id="quote" className="w-full border-y border-line bg-white ">
      <div className="flex flex-col xl:flex-row w-full mb-20">
        {/* Left Side: Title */}
        <div className="bg-ink p-10 md:p-20 text-white xl:w-[40%] border-b xl:border-b-0 xl:border-r border-line flex flex-col justify-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Request a quotation</span>
          <h2 className="mt-6 text-4xl md:text-5xl font-black leading-tight tracking-tighter">
            Start your project with us.
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-white/70 max-w-xl">
            Free, no obligation. Most quotations replied to within one working day.
          </p>

          <ul className="mt-12 flex flex-col gap-6">
            {["Licensed & fully insured", "Clear, itemised pricing", "UK regulation compliant"].map((t) => (
              <li key={t} className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white/80">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </span>
                <span dangerouslySetInnerHTML={{ __html: t }} />
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Form */}
        <div className="xl:w-[60%] w-full bg-white flex flex-col items-center justify-center p-8 pb-16 md:p-20 md:pb-28 ">
          <div className="w-full max-w-5xl mb-8">
            <h3 className="text-3xl font-black tracking-tight text-ink">Get Your Quote</h3>
            <p className="text-muted-foreground mt-2 font-medium">Please fill in your details below and we will get right back to you.</p>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-5xl space-y-10">
            <div>
              <span className="label">Services required</span>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => toggle(s)}
                    className={`chip ${selected.includes(s) ? "chip-active" : ""}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
              <div><label className="label">Full name</label><input required name="name" className="input" placeholder="Jane Smith" /></div>
              <div><label className="label">Phone</label><input required name="phone" type="tel" className="input" placeholder="07123 456789" /></div>
              <div><label className="label">Email</label><input required name="email" type="email" className="input" placeholder="jane@example.co.uk" /></div>
              <div><label className="label">Postcode</label><input required name="postcode" className="input" placeholder="SW1A 1AA" /></div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="label">Address</label>
                <input required name="address" className="input" placeholder="House number, street, town" />
              </div>

              <div>
                <label className="label">Measurements (metres)</label>
                <div className="grid grid-cols-3 gap-3">
                  <input name="length" type="number" step="0.01" className="input" placeholder="Length" />
                  <input name="width" type="number" step="0.01" className="input" placeholder="Width" />
                  <input name="height" type="number" step="0.01" className="input" placeholder="Height" />
                </div>
              </div>
            </div>

            <div>
              <label className="label">Describe the work</label>
              <textarea required name="description" rows={4} className="input resize-none" placeholder="Tell us what needs doing, access notes, preferred dates…" />
            </div>

            <div>
              <label className="label">Upload photos · up to 8</label>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[2rem] border border-dashed border-line bg-subtle px-6 py-12 text-center transition-all hover:border-primary hover:bg-primary/5">
                <Upload className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm font-semibold text-ink">Drop images here or browse</span>
                <span className="text-xs text-muted-foreground">JPG, PNG or HEIC · 10 MB each</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={onFiles} />
              </label>
              {files.length > 0 && (
                <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {files.map((f, i) => (
                    <li key={i} className="relative overflow-hidden rounded-xl border border-line shadow-sm">
                      <img src={URL.createObjectURL(f)} alt="" className="aspect-square w-full object-cover" />
                      <button type="button" onClick={() => removeFile(i)} className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/95 shadow">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input required type="checkbox" className="mt-1 h-4 w-4 accent-[color:var(--primary)]" />
              <span>I agree to the privacy policy and consent to being contacted about this quotation.</span>
            </label>

            <button type="submit" className="btn-primary w-full sm:w-auto" disabled={submitted}>
              {submitted ? "Request sent · thank you" : "Send quote request"}
            </button>

            {submitted && (
              <div className="mt-6 p-5 bg-green-50 border border-green-200 rounded-2xl text-green-800 text-sm font-medium flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-green-100 p-1.5 rounded-full shrink-0">
                  <Check className="h-4 w-4 text-green-600" strokeWidth={3} />
                </div>
                <div>
                  <p className="font-bold text-base mb-1">Thank you! We've received your request.</p>
                  <p className="text-green-700 leading-relaxed">We will review your details and contact you shortly. Please keep an eye on your email inbox <strong className="font-bold">(and check your spam folder just in case)</strong> for our response.</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
