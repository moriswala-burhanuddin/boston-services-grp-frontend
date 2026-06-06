import { HeroSlider } from "./HeroSlider";

export function Hero() {
  return (
    <section id="top" className="relative pt-28 md:pt-36 pb-4 md:pb-8 overflow-hidden bg-[#f8fafc] flex flex-col border-b-0 z-10">
      <div className="w-full px-4 md:px-10 max-w-[120rem] mx-auto flex flex-col flex-1 z-10 relative">
        
        {/* Slider takes all remaining space */}
        <div className="flex-1 w-full relative min-h-0">
          <HeroSlider />
        </div>
      </div>

      {/* Background soft glow effects */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
    </section>
  );
}
