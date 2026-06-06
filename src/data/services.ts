import electricianImg from "@/assets/SERVICES/Electrician.png";
import plumbingImg from "@/assets/SERVICES/Plumbing.png";
import cleaningImg from "@/assets/SERVICES/cleaning.png";
import carpenterImg from "@/assets/SERVICES/carpenter.png";
import paintingImg from "@/assets/SERVICES/painting.png";
import gardenImg from "@/assets/SERVICES/Garden-decoration-cleaning.png";
import removerImg from "@/assets/SERVICES/Removal.png";
import kitchenImg from "@/assets/SERVICES/kitchen-fittings.png";

export type ServiceDetail = {
  id: string;
  image: string;
  title: string;
  desc: string;
  fullDesc: string;
  features: string[];
  whyChooseUs?: string[];
  conclusion?: string;
};

export const serviceImageMap: Record<string, string> = {
  electrician: electricianImg,
  plumber: plumbingImg,
  carpenter: carpenterImg,
  painting: paintingImg,
  gardens: gardenImg,
  remover: removerImg,
  cleaning: cleaningImg,
  "kitchen-fittings": kitchenImg,
};

export async function fetchServices(): Promise<ServiceDetail[]> {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const res = await fetch(`${API_BASE}/api/services/`);
  if (!res.ok) throw new Error("Failed to fetch services");
  const data = await res.json();
  
  return data.map((s: any) => ({
    id: s.slug,
    image: s.image || serviceImageMap[s.slug],
    title: s.title,
    desc: s.desc,
    fullDesc: s.full_desc,
    features: s.features,
    whyChooseUs: s.why_choose_us,
    conclusion: s.conclusion,
  }));
}

export async function fetchService(slug: string): Promise<ServiceDetail> {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const res = await fetch(`${API_BASE}/api/services/${slug}/`);
  if (!res.ok) throw new Error("Failed to fetch service");
  const s = await res.json();
  
  return {
    id: s.slug,
    image: s.image || serviceImageMap[s.slug],
    title: s.title,
    desc: s.desc,
    fullDesc: s.full_desc,
    features: s.features,
    whyChooseUs: s.why_choose_us,
    conclusion: s.conclusion,
  };
}
