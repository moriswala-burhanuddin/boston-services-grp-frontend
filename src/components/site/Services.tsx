import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { fetchServices } from "@/data/services";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

// Bento pattern: alternating tall and normal cards
const bentoPattern = [
  "lg:row-span-2", // 0 - tall
  "",               // 1
  "",               // 2
  "",               // 3
  "lg:row-span-2", // 4 - tall
  "",               // 5
  "",               // 6
  "",               // 7
];

export function Services() {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices
  });

  return (
    <section id="services" className="relative -mt-10 pt-20 pb-32 bg-primary rounded-t-[3rem] md:rounded-t-[5rem] lg:rounded-t-[8rem] text-white overflow-hidden shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.5)] z-20">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

      <div className="container-page relative z-10">
        <div className="mb-16 md:mb-20 flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter text-white mb-8 drop-shadow-xl">
            Our Services
          </h2>
          <div className="w-24 h-2 bg-white/30 rounded-full"></div>
        </div>

        {/* Bento Grid - White card style (contrasts with hero full-bleed photos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[220px] md:auto-rows-[240px]">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={`rounded-[2rem] bg-white overflow-hidden p-6 ${bentoPattern[i] || ""}`}>
                <Skeleton className="w-16 h-16 rounded-2xl bg-gray-200 mb-4" />
                <Skeleton className="h-6 w-2/3 bg-gray-200 mb-3" />
                <Skeleton className="h-4 w-full bg-gray-200 mb-2" />
                <Skeleton className="h-4 w-4/5 bg-gray-200" />
              </div>
            ))
          ) : (
            services.map((service, index) => {
              const isTall = (bentoPattern[index] || "").includes("row-span-2");

              return (
                <Link
                  key={service.id}
                  to="/services/$serviceId"
                  params={{ serviceId: service.id }}
                  className={`group relative rounded-[2rem] overflow-hidden bg-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col p-6 md:p-8 ${bentoPattern[index] || ""}`}
                >
                  {/* Icon-style image — small and contained, NOT full-bleed */}
                  <div className={`shrink-0 rounded-2xl overflow-hidden bg-[#fff5eb] flex items-center justify-center mb-4 ${isTall ? "w-20 h-20 md:w-24 md:h-24" : "w-14 h-14 md:w-16 md:h-16"}`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Text */}
                  <h3 className={`font-black text-ink tracking-tight uppercase leading-tight mb-2 ${isTall ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}>
                    {service.title}
                  </h3>
                  <p className={`text-ink/60 font-medium leading-relaxed flex-1 ${isTall ? "text-sm line-clamp-4" : "text-xs line-clamp-2"}`}>
                    {service.desc}
                  </p>

                  {/* CTA */}
                  <div className="mt-auto pt-4">
                    <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-primary group-hover:text-ink transition-colors">
                      Learn More <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Big Project CTA */}
        <article className="mt-8 flex flex-col justify-between rounded-[2.5rem] bg-ink p-10 shadow-2xl text-white transition-all duration-300 hover:-translate-y-2 lg:flex-row lg:items-center border border-white/10">
          <div className="max-w-2xl">
            <span className="text-[12px] font-black uppercase tracking-[0.2em] text-primary">Big project?</span>
            <p className="mt-4 text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Doing a renovation? Put all your jobs together for one easy price.
            </p>
          </div>
          <a href="#quote" className="mt-8 lg:mt-0 inline-flex h-16 items-center justify-center rounded-full bg-primary px-10 text-sm font-black uppercase tracking-widest text-white transition-transform hover:scale-105 shadow-xl shadow-primary/20">
            Talk to us <ArrowUpRight className="ml-3 h-5 w-5" />
          </a>
        </article>
      </div>
    </section>
  );
}
