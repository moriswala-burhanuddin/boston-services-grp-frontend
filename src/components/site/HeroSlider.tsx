import React from "react";
import { fetchServices } from "@/data/services";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function HeroSlider({ className }: { className?: string }) {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices
  });

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* Gradient Fades for Slider edges */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#f8fafc] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#f8fafc] to-transparent z-20 pointer-events-none" />

      {isLoading ? (
        <div className="flex items-center h-full gap-8 md:gap-12 w-full overflow-hidden px-8 py-12">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-[280px] md:w-[380px] h-[400px] md:h-[500px] rounded-[2.5rem] bg-gray-100 shadow-xl"
            >
              <Skeleton className="w-full h-full rounded-[2.5rem] bg-gray-200" />
              <div className="absolute -bottom-6 -left-6 w-[85%] bg-white p-6 rounded-[2rem] shadow-2xl">
                <Skeleton className="w-2/3 h-8 bg-gray-200 mb-2" />
                <Skeleton className="w-full h-4 bg-gray-200 mb-6" />
                <Skeleton className="w-32 h-12 bg-gray-200 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full items-center w-max animate-scroll gap-8 md:gap-12 py-12 px-8 hover:[animation-play-state:paused]">
          {/* Double array for seamless infinite marquee scroll */}
          {[...services, ...services].map((service, index) => (
            <div
              key={`${service.id}-${index}`}
              className="relative flex-shrink-0 w-[280px] md:w-[380px] h-[400px] md:h-[500px] rounded-[2.5rem] group"
            >
              {/* Main Image Card */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] transition-transform duration-700 group-hover:scale-[1.03]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Subtle dark gradient to ensure image pops and feels rich */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-60" />
              </div>

              {/* Floating Overlap Card */}
              <div className="absolute -bottom-6 -left-6 md:-left-8 w-[90%] md:w-[85%] bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] z-10 transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-100">
                <h3 className="text-ink text-2xl md:text-3xl font-black tracking-tight mb-2 uppercase line-clamp-1">
                  {service.title}
                </h3>
                <p className="text-ink/60 text-sm font-medium line-clamp-2 mb-6 transition-colors duration-300 group-hover:text-ink/80">
                  {service.desc}
                </p>
                <Link
                  to="/services/$serviceId"
                  params={{ serviceId: service.id }}
                  className="inline-flex items-center gap-3 bg-ink text-white px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary transition-colors shadow-lg group-hover:shadow-primary/20"
                >
                  View Details <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
