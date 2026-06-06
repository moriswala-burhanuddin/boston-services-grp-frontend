import React from "react";

export function MotionGraphic() {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-sky-50 to-orange-50/50 overflow-hidden flex items-end">
      {/* Background Cityscape / Silhouette */}
      <div className="absolute bottom-16 left-0 w-full h-40 opacity-5 flex items-end gap-2 px-8">
        <div className="w-16 h-full bg-ink rounded-t-sm" />
        <div className="w-20 h-32 bg-ink rounded-t-sm" />
        <div className="w-24 h-24 bg-ink rounded-t-sm" />
        <div className="w-12 h-36 bg-ink rounded-t-sm ml-auto" />
        <div className="w-20 h-28 bg-ink rounded-t-sm" />
      </div>

      {/* The Ground */}
      <div className="absolute bottom-0 w-full h-16 bg-ink border-t-4 border-primary z-10">
        {/* Striped construction tape effect */}
        <div className="w-full h-2 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#ea580c_10px,#ea580c_20px)] opacity-50" />
      </div>

      {/* The Brick Wall Building Up */}
      <div className="absolute bottom-16 right-4 sm:right-16 flex flex-col-reverse gap-1 z-0 pb-1">
        {Array.from({ length: 7 }).map((_, row) => (
          <div key={row} className="flex gap-1" style={{ marginLeft: row % 2 === 0 ? '0' : '24px' }}>
            {Array.from({ length: 4 }).map((_, col) => (
              <div
                key={col}
                className="w-12 h-5 bg-primary rounded-sm border border-orange-800/20 shadow-sm animate-brick-build"
                style={{
                  opacity: 0,
                  animationFillMode: "forwards",
                  animationDelay: `${(row * 4 + col) * 0.12 + 1.5}s`,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* The JCB Excavator */}
      <div className="absolute bottom-16 z-20 animate-jcb-drive left-0">
        
        {/* Arm (Boom) */}
        <div
          className="absolute bottom-10 left-[110px] w-40 h-6 bg-primary rounded-full origin-left animate-boom border-2 border-orange-700 shadow-xl"
          style={{ transform: "rotate(-45deg)" }}
        >
          {/* Dipper */}
          <div
            className="absolute top-0 right-0 w-32 h-5 bg-orange-600 rounded-full origin-left animate-dipper border-2 border-orange-800"
            style={{ transform: "rotate(90deg)" }}
          >
            {/* Bucket */}
            <div
              className="absolute top-0 right-0 w-14 h-16 bg-ink rounded-b-xl origin-top-left animate-bucket border-2 border-slate-700 flex items-end justify-center pb-2"
              style={{ transform: "rotate(-45deg)" }}
            >
              {/* Bucket Teeth */}
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-slate-400 rounded-b-full" />
                <div className="w-1 h-3 bg-slate-400 rounded-b-full" />
                <div className="w-1 h-3 bg-slate-400 rounded-b-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Cabin */}
        <div className="absolute bottom-14 left-10 w-24 h-24 bg-ink rounded-t-2xl border-4 border-slate-900 border-b-0 flex justify-end p-2 shadow-2xl">
          <div className="w-16 h-12 bg-sky-200/40 rounded-tr-lg border border-sky-100/20" />
        </div>

        {/* Body */}
        <div className="absolute bottom-6 left-0 w-[140px] h-16 bg-primary rounded-xl shadow-lg border-b-4 border-orange-700 z-10" />

        {/* Tracks */}
        <div className="absolute bottom-0 left-[-10px] w-[160px] h-10 bg-ink rounded-full border-4 border-slate-900 flex items-center justify-around px-2 z-10 shadow-xl">
          <div className="w-5 h-5 rounded-full bg-slate-600 border-2 border-slate-400 animate-spin-fast" />
          <div className="w-5 h-5 rounded-full bg-slate-600 border-2 border-slate-400 animate-spin-fast" />
          <div className="w-5 h-5 rounded-full bg-slate-600 border-2 border-slate-400 animate-spin-fast" />
          <div className="w-5 h-5 rounded-full bg-slate-600 border-2 border-slate-400 animate-spin-fast" />
        </div>
      </div>

      {/* Falling Rock (Animated) */}
      <div 
        className="absolute w-6 h-6 bg-slate-600 rounded-md animate-rock-fall z-10" 
        style={{ opacity: 0 }} 
      />

    </div>
  );
}
