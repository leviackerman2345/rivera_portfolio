"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { techStackData } from "../data/techStack";

export default function TechStackCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    const tracks = gsap.utils.toArray(".carousel-track");
    if (tracks.length === 0) return;

    // Create a continuous, linear looping tween on both tracks in parallel
    const tween = gsap.to(tracks, {
      xPercent: -100,
      duration: 25,
      ease: "none",
      repeat: -1,
    });

    timelineRef.current = tween;
  }, { scope: containerRef });

  // Smoothly slow down on hover
  const handleMouseEnter = () => {
    if (timelineRef.current) {
      gsap.to(timelineRef.current, { timeScale: 0.15, duration: 0.8, ease: "power2.out" });
    }
  };

  // Smoothly speed up back to normal on leave
  const handleMouseLeave = () => {
    if (timelineRef.current) {
      gsap.to(timelineRef.current, { timeScale: 1, duration: 0.8, ease: "power2.out" });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#050505] py-0 relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Infinite scrolling track container with increased height */}
      <div className="w-full overflow-hidden flex relative z-10 py-8 md:py-12 bg-[#0c0c0c] border-y border-white/5">
        
        {/* Track 1 */}
        <div 
          className="carousel-track flex whitespace-nowrap gap-16 sm:gap-24 pr-16 sm:pr-24 items-center shrink-0"
        >
          {techStackData.map((tech, index) => (
            <div key={`t1-${index}`} className="flex items-center gap-16 sm:gap-24">
              <span className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-widest text-neutral-300 hover:text-[#004d26] transition-colors duration-200 cursor-crosshair">
                {tech}
              </span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-cyber-red">
                {"///"}
              </span>
            </div>
          ))}
        </div>

        {/* Track 2 (Clone for seamless looping) */}
        <div 
          className="carousel-track flex whitespace-nowrap gap-16 sm:gap-24 pr-16 sm:pr-24 items-center shrink-0"
          aria-hidden="true"
        >
          {techStackData.map((tech, index) => (
            <div key={`t2-${index}`} className="flex items-center gap-16 sm:gap-24">
              <span className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-widest text-neutral-300 hover:text-[#004d26] transition-colors duration-200 cursor-crosshair">
                {tech}
              </span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-cyber-red">
                {"///"}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
