import { ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="bg-ink text-white pt-24 pb-8 rounded-t-[3rem] md:rounded-t-[5rem] relative z-20 mt-[-2rem]">
      <div className="container-page flex flex-col lg:flex-row justify-between gap-16 mb-24">
        
        {/* Left Side: Huge Typography & Email */}
        <div className="flex-1">
          <h2 className="text-6xl md:text-8xl lg:text-[8rem] font-black leading-[0.9] tracking-tighter uppercase mb-12">
            Start A<br/>
            <span className="text-white/30">Project</span>
          </h2>
          <a href="mailto:info@bostonservicesgrp.co.uk" className="inline-flex items-center gap-4 text-xl md:text-3xl font-medium border-b border-white/20 pb-3 hover:border-primary transition-colors group">
            info@bostonservicesgrp.co.uk
            <ArrowRight className="h-6 w-6 md:h-8 md:w-8 group-hover:translate-x-2 transition-transform text-primary" />
          </a>
        </div>

        {/* Right Side: Red Block with Contact Details */}
        <div className="lg:w-[450px] bg-primary rounded-[2.5rem] p-10 md:p-12 text-white shadow-2xl flex flex-col justify-between transform lg:-translate-y-8">
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] mb-6 text-white/70">Headquarters</h3>
            <p className="text-xl md:text-2xl font-black leading-snug mb-12">
              Office 13309, 182-184<br/>
              High Street North<br/>
              London, United Kingdom<br/>
              E6 2JA
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70 mb-4">Direct Contact</h3>
            <p className="text-2xl md:text-3xl font-black tracking-tight">+44 7578 511022</p>
            <div className="flex flex-col gap-2 pt-2">
              <a href="mailto:services@bostonservicesgrp.co.uk" className="text-base font-medium opacity-90 hover:opacity-100 transition-opacity">services@bostonservicesgrp.co.uk</a>
              <a href="https://bostonservicesgrp.co.uk" target="_blank" rel="noreferrer" className="text-base font-medium opacity-90 hover:opacity-100 transition-opacity">bostonservicesgrp.co.uk</a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal/Copyright Bar */}
      <div className="container-page pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
           <img src={logo} alt="Boston Services Group Ltd" className="h-6 w-auto brightness-0 invert opacity-50" />
           <p className="text-[10px] uppercase tracking-widest text-white/40">© {year} Boston Services Group Ltd · Invoice Reference</p>
        </div>
        <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
