"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { footerContent } from "../data/footerContent";
import { Download, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // clip-path reveal animation when scrolling to the bottom of the page
      gsap.fromTo(
        ".cv-reveal-text",
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          y: 60,
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          y: 0,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".footer-trigger",
            start: "top bottom-=50",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <footer
      id="footer"
      ref={containerRef}
      className="w-full bg-[#050505] relative overflow-hidden py-16 md:py-24 border-t border-white/10 footer-trigger"
    >
      {/* Decorative developer background grid */}
      <div className="absolute inset-0 dev-grid-bg opacity-[0.01] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* CV Action Area (Top Half) */}
        <a
          href={footerContent.resumeUrl}
          download
          className="group block relative w-full border border-white/10 bg-[#0c0c0c]/40 hover:bg-white hover:border-white transition-all duration-200 select-text py-16 px-8 sm:px-12 md:py-24"
        >
          {/* Corner nodes */}
          <div className="absolute top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 text-white/30 group-hover:text-black/30 text-[10px] flex items-center justify-center transition-colors pointer-events-none">+</div>
          <div className="absolute top-0 right-0 w-2 h-2 translate-x-1/2 -translate-y-1/2 text-white/30 group-hover:text-black/30 text-[10px] flex items-center justify-center transition-colors pointer-events-none">+</div>
          <div className="absolute bottom-0 left-0 w-2 h-2 -translate-x-1/2 translate-y-1/2 text-white/30 group-hover:text-black/30 text-[10px] flex items-center justify-center transition-colors pointer-events-none">+</div>
          <div className="absolute bottom-0 right-0 w-2 h-2 translate-x-1/2 translate-y-1/2 text-white/30 group-hover:text-black/30 text-[10px] flex items-center justify-center transition-colors pointer-events-none">+</div>

          <div className="flex flex-col items-start md:items-center">
            {/* Header / Info Line */}
            <div className="flex justify-between w-full max-w-5xl items-center font-mono text-[9px] sm:text-[10px] text-neutral-500 group-hover:text-black/60 transition-colors mb-6 pb-2 border-b border-white/10 group-hover:border-black/10 select-text">
              <span className="tracking-widest">SYS_RESOURCE_EXPORT // AWAITING_PULL</span>
              <div className="flex items-center gap-1.5 font-bold">
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span>GET_RESUME.PDF</span>
              </div>
            </div>

            {/* Massive Oversized Typography */}
            <div className="cv-reveal-text w-full max-w-5xl select-text overflow-hidden md:text-center">
              <span className="font-mono tracking-tighter text-[clamp(1.5rem,7vw,6rem)] font-black uppercase text-neutral-200 group-hover:text-black transition-colors duration-200 block select-text leading-none">
                {footerContent.resumeDownloadText}
              </span>
            </div>
          </div>
        </a>

        {/* Architectural Base (Bottom Half) */}
        <div className="relative border border-white/10 p-8 sm:p-10 md:p-12 mt-12 md:mt-16 bg-[#0c0c0c]/10">
          {/* Corner nodes */}
          <div className="absolute top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 text-white/30 text-[10px] flex items-center justify-center pointer-events-none">+</div>
          <div className="absolute top-0 right-0 w-2 h-2 translate-x-1/2 -translate-y-1/2 text-white/30 text-[10px] flex items-center justify-center pointer-events-none">+</div>
          <div className="absolute bottom-0 left-0 w-2 h-2 -translate-x-1/2 translate-y-1/2 text-white/30 text-[10px] flex items-center justify-center pointer-events-none">+</div>
          <div className="absolute bottom-0 right-0 w-2 h-2 translate-x-1/2 translate-y-1/2 text-white/30 text-[10px] flex items-center justify-center pointer-events-none">+</div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0">
            
            {/* Left side: System module & copyright details */}
            <div className="md:col-span-6 flex flex-col justify-between pb-8 md:pb-0 md:pr-12 md:border-r border-white/10 relative">
              {/* Intersection node marker */}
              <div className="absolute bottom-0 right-0 w-2 h-2 translate-x-1/2 translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none hidden md:flex items-center justify-center z-20">+</div>

              <div className="space-y-3 select-text">
                <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#004d26] uppercase">
                  [{footerContent.systemModule}]
                </div>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-md select-text">
                  {footerContent.copyrightText}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 md:border-t-0 md:pt-0 font-mono text-[10px] text-neutral-500 flex justify-between select-text items-center">
                <span>© {new Date().getFullYear()} {footerContent.copyrightHolder}</span>
                <span className="text-neutral-600 font-bold tracking-wider">{footerContent.systemVersion}</span>
              </div>
            </div>

            {/* Middle: Navigation Links */}
            <div className="md:col-span-3 flex flex-col gap-4 pb-8 md:pb-0 md:px-12 md:border-r border-white/10 relative">
              {/* Intersection node marker */}
              <div className="absolute bottom-0 right-0 w-2 h-2 translate-x-1/2 translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none hidden md:flex items-center justify-center z-20">+</div>

              <div className="font-mono text-[9px] tracking-widest text-neutral-600 uppercase">
                [DIRECTORY_ROUTING]
              </div>
              <nav className="flex flex-col gap-2">
                {footerContent.navLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="font-mono text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors py-1 w-fit select-text focus-ring"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Right: Network Sockets / Social Links */}
            <div className="md:col-span-3 flex flex-col gap-4 md:pl-12">
              <div className="font-mono text-[9px] tracking-widest text-neutral-600 uppercase">
                [NETWORK_SOCKETS]
              </div>
              <div className="flex flex-col gap-2">
                {footerContent.socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between font-mono text-xs sm:text-sm text-neutral-400 hover:text-[#004d26] transition-colors py-1 group select-text focus-ring"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-[#004d26] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
