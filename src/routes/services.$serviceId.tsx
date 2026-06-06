import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, ChevronLeft } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { QuoteForm } from "@/components/site/QuoteForm";
import { fetchService } from "@/data/services";
import { WhatsApp } from "@/components/site/Floats";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/services/$serviceId")({
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { serviceId } = Route.useParams();
  
  const { data: service, isLoading, error } = useQuery({
    queryKey: ['service', serviceId],
    queryFn: () => fetchService(serviceId)
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-black text-primary mb-4 animate-pulse">Loading Service...</h1>
      </div>
    );
  }


  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-black text-ink mb-4">Service not found</h1>
        <Link to="/" className="text-primary font-bold hover:underline">Return to home</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Nav />
      
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-gray-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
        
        <div className="container-page relative z-10">
          <Link to="/#services" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary mb-8 hover:-translate-x-1 transition-transform">
            <ChevronLeft className="w-5 h-5" /> Back to Services
          </Link>
          
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="w-64 h-64 sm:w-96 sm:h-96 shrink-0 bg-white shadow-2xl shadow-black/5 rounded-[3rem] p-8 flex items-center justify-center border border-gray-100 animate-in zoom-in-95 duration-700">
                <img src={service.image} alt={service.title} className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-ink mb-6">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {service.fullDesc}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#quote" className="bg-primary text-white h-16 px-10 rounded-2xl flex items-center justify-center font-black uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform shadow-xl shadow-primary/30">
                  Get a Free Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Details */}
      <section className="py-24 bg-white relative z-20 rounded-t-[3rem] md:rounded-t-[5rem] -mt-12 shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.05)]">
        <div className="container-page max-w-5xl">
          
          <div className="bg-gray-50 rounded-[3rem] p-8 md:p-14 mb-10 border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-black text-ink mb-8">{service.whyChooseUs ? "Our Services Include" : "What's included"}</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-4 text-lg font-bold text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <span className="leading-tight pt-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {service.whyChooseUs && (
            <div className="bg-ink text-white rounded-[3rem] p-8 md:p-14 mb-10 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-black mb-8">Why Choose Us?</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.whyChooseUs.map((reason, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg font-bold">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-primary/30">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="leading-tight pt-1">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {service.conclusion && (
            <div className="text-center py-10">
              <p className="text-2xl md:text-3xl font-black text-gray-800 leading-tight">
                "{service.conclusion}"
              </p>
            </div>
          )}
          
        </div>
      </section>

      {/* Quote Form Section */}
      <QuoteForm defaultService={service.title} />
      
      <Footer />
      <WhatsApp />
    </main>
  );
}
