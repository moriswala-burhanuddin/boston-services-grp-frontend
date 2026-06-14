import { useState, useEffect } from "react";
import logo from "@/assets/final-logo-Photoroom.png";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "@tanstack/react-router";

const links = [
  ["Services", "#services"],
  ["How it works", "#process"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // init
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);

    const isHash = href.startsWith('#');
    const targetId = isHash ? href.substring(1) : href;

    if (targetId === 'top') {
      if (location.pathname !== '/') {
        navigate({ to: '/' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (location.pathname !== '/') {
      navigate({ to: '/', hash: targetId });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        const headerOffset = 96; // Adjust based on your header height
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out bg-white shadow-sm border-b border-gray-200/60 ${
          scrolled 
            ? "h-20 md:h-24" 
            : "h-24 md:h-32"
        }`}
      >
        <div className="max-w-[120rem] mx-auto h-full px-4 md:px-10 flex items-center justify-between relative">
          
          {/* Logo - Smooth linear motion from Hero space to Nav space */}
          <div className="flex items-center z-10 origin-left">
            <a href="#top" onClick={(e) => handleNavClick(e, '#top')} className="flex items-center justify-start group">
              <img 
                src={logo} 
                alt="BSG Logo" 
                className={`w-auto object-contain transition-all duration-500 ease-in-out ${
                  scrolled 
                    ? "h-12 md:h-14 lg:h-16" 
                    : "h-20 md:h-28 lg:h-32"
                }`} 
              />
            </a>
          </div>

          {/* Right: Toggle Mobile & Desktop */}
          <div className={`flex items-center gap-4 z-20 transition-all duration-500 ${scrolled ? "" : "md:-translate-y-2"}`}>
            {/* Get Quote CTA Button - Hidden on mobile, visible on tablet/desktop */}
            <a 
              href="#quote" 
              onClick={(e) => handleNavClick(e, '#quote')}
              className={`hidden sm:flex bg-[#f97316] text-white px-5 py-2.5 md:px-7 md:py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 ${scrolled ? 'opacity-100' : 'opacity-90'}`}
            >
              Get Quote
            </a>

            {/* Toggle icon container - right aligned, always visible */}
            <button 
              onClick={() => setOpen(true)} 
              aria-label="Open menu" 
              className="p-3 text-black hover:text-white hover:bg-black transition-all duration-300 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center"
            >
              <Menu className="h-7 w-7 md:h-8 md:w-8" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile & Desktop Menu Drawer (Slide-out from Right) */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-[85vw] max-w-sm bg-black text-white shadow-2xl transform transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-24 items-center justify-between px-8 border-b border-white/10">
          <span className="text-sm font-black uppercase tracking-widest text-[#f97316]">Menu</span>
          <button 
            onClick={() => setOpen(false)} 
            aria-label="Close menu" 
            className="p-3 text-white hover:text-[#f97316] transition-colors bg-white/5 rounded-xl hover:bg-white/10"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col p-8 gap-8">
          {links.map(([l, h]) => (
            <a 
              key={h} 
              href={h} 
              onClick={(e) => handleNavClick(e, h)} 
              className="text-lg md:text-xl font-bold uppercase tracking-widest text-white hover:text-[#f97316] transition-colors border-b border-white/10 pb-4"
            >
              {l}
            </a>
          ))}
          <a 
            href="#quote" 
            onClick={(e) => handleNavClick(e, '#quote')} 
            className="mt-8 bg-[#f97316] text-white text-center py-4 md:py-5 rounded-xl text-sm md:text-base font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl hover:-translate-y-1"
          >
            Get a Quote
          </a>
        </nav>
      </div>

      {/* Backdrop Overlay for menu drawer */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
