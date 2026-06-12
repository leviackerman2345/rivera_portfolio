"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutContent } from "../data/aboutContent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Text slide-up fade-in animation
    gsap.fromTo(
      ".about-reveal",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".about-trigger", start: "top 75%" } }
    );

    // 2. Count-up animation for statistics numbers
    const numElements = gsap.utils.toArray<HTMLElement>(".stat-num");
    numElements.forEach((el) => {
      const targetVal = parseFloat(el.getAttribute("data-target") || "0");
      const countObj = { val: 0 };
      
      gsap.to(countObj, {
        val: targetVal,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          el.textContent = Math.floor(countObj.val).toString();
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section
      id="about"
      ref={containerRef}
      className="w-full bg-[#050505] relative overflow-hidden py-24 md:py-32"
    >
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 dev-grid-bg opacity-[0.02] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 about-trigger">
        
        {/* Master Architectural Grid Container */}
        <div className="relative border border-white/10 group">
          
          {/* Decorative Intersection Nodes (Corners) */}
          <div className="absolute top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>
          <div className="absolute top-0 right-0 w-2 h-2 translate-x-1/2 -translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>
          <div className="absolute bottom-0 left-0 w-2 h-2 -translate-x-1/2 translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>
          <div className="absolute bottom-0 right-0 w-2 h-2 translate-x-1/2 translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>

          <div className="flex flex-col">
            
            {/* Top Section: Shortened Narrative text */}
            <div className="border-b border-white/10 p-10 sm:p-16 lg:p-24 relative hover:bg-white/[0.02] transition-colors duration-500">
              <div className="flex flex-col justify-start max-w-3xl">
                <div className="about-reveal inline-block border border-white/10 px-4 py-2 hover:bg-white/[0.02] transition-colors mb-6 relative w-fit">
                  <span className="font-mono text-xs tracking-widest text-[#004d26] uppercase">
                    [SYS_MODULE: CORE_IDENTITY]
                  </span>
                  {/* Small Corners */}
                  <div className="absolute top-0 left-0 w-1 h-1 -translate-x-1/2 -translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
                  <div className="absolute top-0 right-0 w-1 h-1 translate-x-1/2 -translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
                  <div className="absolute bottom-0 left-0 w-1 h-1 -translate-x-1/2 translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
                  <div className="absolute bottom-0 right-0 w-1 h-1 translate-x-1/2 translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
                </div>

                <div className="about-reveal mb-8">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05]">
                    SYSTEMIC <span className="text-[#004d26]">THINKING</span>.
                    <br />
                    MODULAR <span className="text-[#ff3333]">LOGIC</span>.
                  </h2>
                </div>
                
                <div className="flex flex-col gap-6">
                  {aboutContent.narrativeParagraphs.map((para, index) => (
                    <p
                      key={index}
                      className="about-reveal text-neutral-300 text-lg sm:text-xl md:text-2xl leading-relaxed font-sans font-medium"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Section: Inline Statistics Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3">
              {aboutContent.stats.map((stat, index) => {
                const isGreen = index % 2 === 0;
                
                // Dynamic Hover Classes
                const hoverBgClass = isGreen ? "hover:bg-[#004d26]" : "hover:bg-[#ff3333]";
                const numColorClass = isGreen ? "text-[#004d26] group-hover/card:text-black" : "text-[#ff3333] group-hover/card:text-white";
                const labelColorClass = isGreen ? "text-neutral-400 group-hover/card:text-black/80" : "text-neutral-400 group-hover/card:text-white/80";
                const suffixColorClass = isGreen ? "text-neutral-400 group-hover/card:text-black" : "text-neutral-400 group-hover/card:text-white";
                const nodeColorClass = isGreen ? "text-white/30 group-hover/card:text-black/30" : "text-white/30 group-hover/card:text-white/40";
                
                const indexStr = `0${index + 1}`;
                
                // Handle inner grid borders
                const isLast = index === aboutContent.stats.length - 1;
                const borderRightClass = isLast ? "" : "md:border-r border-b md:border-b-0 border-white/10";
                
                return (
                  <div 
                    key={index} 
                    className={`about-reveal group/card p-10 sm:p-12 flex flex-col aspect-[4/3] sm:aspect-auto md:aspect-square relative transition-colors duration-500 ease-out ${hoverBgClass} ${borderRightClass}`}
                  >
                    {/* Inner Intersection Nodes */}
                    {!isLast && (
                      <>
                        <div className={`absolute top-0 right-0 w-2 h-2 translate-x-1/2 -translate-y-1/2 text-[10px] leading-none pointer-events-none hidden md:flex items-center justify-center z-20 transition-colors duration-500 ${nodeColorClass}`}>+</div>
                        <div className={`absolute bottom-0 right-0 w-2 h-2 translate-x-1/2 translate-y-1/2 text-[10px] leading-none pointer-events-none hidden md:flex items-center justify-center z-20 transition-colors duration-500 ${nodeColorClass}`}>+</div>
                      </>
                    )}
                    
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-xs sm:text-sm font-mono tracking-wide uppercase pr-4 transition-colors duration-500 ${labelColorClass}`}>
                        {stat.label}
                      </span>
                      <span className={`font-mono text-sm sm:text-base font-bold transition-colors duration-500 ${numColorClass}`}>
                        {indexStr}
                      </span>
                    </div>
                    
                    {/* Centered large statistic container */}
                    <div className="flex-grow flex items-center justify-center py-6">
                      <div className="flex flex-row items-baseline gap-1.5">
                        <span
                          className={`stat-num text-7xl sm:text-8xl md:text-9xl xl:text-10xl font-black font-mono tracking-tighter leading-none transition-colors duration-500 ${numColorClass}`}
                          data-target={stat.value}
                        >
                          0
                        </span>
                        <span className={`text-2xl sm:text-3xl xl:text-4xl font-black font-sans transition-colors duration-500 ${suffixColorClass}`}>
                          {stat.suffix}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
