"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Terminal, Menu, X } from "lucide-react";
import { heroContent } from "../data/heroContent";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Subtle zoom out background image
    tl.fromTo(
      ".hero-bg-img",
      { scale: 1.05 },
      { scale: 1, duration: 2.0 }
    );

    // 2. Expand grid lines (staggered scale animations)
    tl.fromTo(
      ".hud-line-h",
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.4, stagger: 0.1, delay: -1.6 }
    );
    tl.fromTo(
      ".hud-line-v",
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 1.4, stagger: 0.1, delay: -1.4 }
    );

    // 3. Stagger slide-in for header items
    tl.fromTo(
      ".nav-item",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.08, delay: -1.8 }
    );

    // 4. Stagger reveal occupational details
    tl.fromTo(
      ".anim-slide-up",
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.08, delay: -1.4 }
    );

    // 5. Stagger reveal giant name characters (PSALM and RIVERA)
    tl.fromTo(
      ".char-psalm",
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 0.95, duration: 1.5, stagger: 0.06, delay: -1.2 }
    );
    tl.fromTo(
      ".char-rivera",
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 0.95, duration: 1.5, stagger: 0.06, delay: -1.5 }
    );

    // 6. Reveal bottom stats
    tl.fromTo(
      ".details-bottom-right",
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, delay: -0.8 }
    );

  }, { scope: containerRef });

  // Handle Full-Screen Mobile Menu Open/Close Animations
  const handleToggleMenu = (open: boolean) => {
    if (open) {
      // Slide in from right and stagger animate options
      gsap.to(menuRef.current, { x: 0, duration: 0.8, ease: "power4.out" });
      gsap.fromTo(
        ".menu-anim",
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.15 }
      );
    } else {
      // Slide out to right
      gsap.to(menuRef.current, { x: "100%", duration: 0.6, ease: "power3.inOut" });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full bg-[#050505] text-white relative overflow-hidden flex flex-col justify-between font-sans selection:bg-[#004d26] selection:text-white cursor-crosshair"
    >
      {/* Background Section (Raw Portrait Image with 30% Dark Overlay and responsive centering) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={heroContent.imagePath} 
          alt="Psalm Rivera Background Portrait" 
          className="hero-bg-img w-full h-full object-cover object-[70%_center] lg:object-center select-none pointer-events-none"
          style={{ transformOrigin: "center center", filter: "brightness(0.6)" }}
        />
        
        {/* Subtle developer grid overlays */}
        <div className="absolute inset-0 dev-grid-bg opacity-[0.05] z-[2]" />
      </div>

      {/* Decorative HUD Gridlines */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Horizontal HUD dividers */}
        <div className="hud-line-h absolute left-0 top-[18%] w-full h-[1px] bg-white/10" style={{ transformOrigin: "left center" }} />
        <div className="hud-line-h absolute left-0 bottom-[16%] w-full h-[1px] bg-white/10" style={{ transformOrigin: "left center" }} />
        
        {/* Vertical HUD dividers */}
        <div className="hud-line-v absolute left-[28%] top-0 h-full w-[1px] bg-white/10" style={{ transformOrigin: "top center" }} />
        <div className="hud-line-v absolute right-[28%] top-0 h-full w-[1px] bg-white/10" style={{ transformOrigin: "top center" }} />
      </div>

      {/* ==================== 1. Header Navigation HUD (Pinned & Centered) ==================== */}
      <header className="absolute top-0 left-0 w-full z-30 flex flex-row justify-center items-center px-6 py-5 md:px-12 lg:px-16 bg-transparent border-b border-white/5 min-h-[72px]">
        {/* Left Side: Brand Logo */}
        <div className="nav-item absolute left-6 md:left-12 lg:left-16 flex items-center font-bold tracking-tight text-white">
          Psalm<span className="text-[#004d26] mx-0.5 animate-pulse">•</span>Rivera
        </div>

        {/* Center: Navigation capsule pill */}
        <div className="nav-item hidden sm:flex items-center gap-1 bg-white/5 border border-white/10 backdrop-blur-md p-1 rounded-full">
          <a href="#about" className="font-mono text-[10px] text-neutral-300 hover:text-white transition-all px-3.5 py-1.5 hover:bg-white/10 rounded-full">
            About
          </a>
          <a href="#skills" className="font-mono text-[10px] text-neutral-300 hover:text-white transition-all px-3.5 py-1.5 hover:bg-white/10 rounded-full">
            Skills
          </a>
          <div className="w-5 h-5 bg-white text-black font-mono text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.15)]">
            PR
          </div>
          <a href="#projects" className="font-mono text-[10px] text-neutral-300 hover:text-white transition-all px-3.5 py-1.5 hover:bg-white/10 rounded-full">
            Projects
          </a>
          <a href="#contact" className="font-mono text-[10px] text-neutral-300 hover:text-white transition-all px-3.5 py-1.5 hover:bg-white/10 rounded-full">
            Contact
          </a>
        </div>

        {/* Right Side: Social links / Hamburger Trigger */}
        <div className="nav-item absolute right-6 md:right-12 lg:right-16 flex items-center">
          {/* Large screens menu */}
          <div className="hidden sm:flex items-center gap-6 font-mono text-[10px]">
            {heroContent.socialLinks.map((link, idx) => (
              <a 
                key={idx}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-neutral-300 hover:text-white transition-colors"
              >
                {link.label.replace("/", "")}
              </a>
            ))}
          </div>

          {/* Mobile hamburger button */}
          <button 
            onClick={() => handleToggleMenu(true)}
            className="sm:hidden flex items-center justify-center text-white hover:text-[#004d26] transition-colors p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* ==================== 2. Full-Screen Mobile Menu Overlay ==================== */}
      <div 
        ref={menuRef}
        className="fixed inset-0 w-screen h-screen bg-[#050505] z-50 flex flex-col justify-between p-6 md:p-12 lg:p-16 transform translate-x-full"
      >
        {/* Mobile menu header */}
        <div className="flex flex-row justify-between items-center w-full border-b border-white/5 pb-5">
          <div className="menu-anim flex items-center font-bold tracking-tight text-white">
            Psalm<span className="text-[#004d26] mx-0.5">•</span>Rivera
          </div>
          
          <button 
            onClick={() => handleToggleMenu(false)}
            className="menu-anim flex items-center justify-center text-white hover:text-cyber-red transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile menu links */}
        <div className="flex flex-col gap-6 items-start my-auto">
          <div className="menu-anim overflow-hidden">
            <a 
              href="#about" 
              onClick={() => handleToggleMenu(false)}
              className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white hover:text-[#004d26] transition-colors"
            >
              [ About ]
            </a>
          </div>
          <div className="menu-anim overflow-hidden">
            <a 
              href="#skills" 
              onClick={() => handleToggleMenu(false)}
              className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white hover:text-[#004d26] transition-colors"
            >
              [ Skills ]
            </a>
          </div>
          <div className="menu-anim overflow-hidden">
            <a 
              href="#projects" 
              onClick={() => handleToggleMenu(false)}
              className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white hover:text-[#004d26] transition-colors"
            >
              [ Projects ]
            </a>
          </div>
          <div className="menu-anim overflow-hidden">
            <a 
              href="#contact" 
              onClick={() => handleToggleMenu(false)}
              className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white hover:text-[#004d26] transition-colors"
            >
              [ Contact ]
            </a>
          </div>
        </div>

        {/* Mobile menu footer */}
        <div className="flex flex-col gap-4 border-t border-white/5 pt-5 w-full">
          <div className="menu-anim flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-neutral-400">
            {heroContent.socialLinks.map((link, idx) => (
              <a 
                key={idx}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="menu-anim flex justify-between items-center font-mono text-[9px] text-neutral-500">
            <span>{heroContent.systemVersion}</span>
            <span className="text-[#004d26]">{"// SYS_SECURE"}</span>
          </div>
        </div>
      </div>

      {/* ==================== 3. Middle Left Area (Occupation Subtitle & Hierarchy) ==================== */}
      <main className="relative z-20 flex-grow flex flex-col justify-end md:justify-center items-start px-6 md:px-12 lg:px-16 max-w-[1440px] w-full mx-auto pt-20 pb-10 sm:pb-14 md:pb-0">
        <div className="flex flex-col gap-4 sm:gap-5 max-w-xl w-full relative z-20">
          
          {/* Grouped Header Text (Mobile Swap: Name -> Subtitle Title -> Tagline with short gaps) */}
          <div className="flex flex-col gap-1.5 lg:gap-3 w-full">
            
            {/* Mobile-only Name (Swapped to the very top on mobile, in normal flow with full opacity) */}
            <div className="lg:hidden block w-full z-10 pb-2">
              <div className="flex flex-row justify-between items-end w-full relative min-h-[10vw] gap-y-1">
                {/* Giant Firstname Left */}
                <div className="overflow-hidden w-auto text-left z-10 flex justify-start">
                  <h1 className="text-[12vw] font-black tracking-tighter leading-none text-white uppercase flex">
                    {"PSALM".split("").map((char, index) => (
                      <span key={index} className="char-psalm inline-block">
                        {char}
                      </span>
                    ))}
                  </h1>
                </div>

                {/* Giant Lastname Right */}
                <div className="overflow-hidden w-auto text-right z-10 flex justify-end">
                  <h1 className="text-[12vw] font-black tracking-tighter leading-none text-white uppercase flex justify-end">
                    {"RIVERA".split("").map((char, index) => (
                      <span key={index} className="char-rivera inline-block">
                        {char}
                      </span>
                    ))}
                  </h1>
                </div>
              </div>
            </div>

            {/* Subtitle Left Title */}
            <div className="anim-slide-up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight uppercase">
                GAME & <span className="text-[#004d26]">SYSTEMS</span>
                <br />
                LOGIC <span className="text-cyber-red">DEVELOPER</span>
              </h2>
            </div>

            {/* Tagline */}
            <div className="anim-slide-up font-mono text-[10px] sm:text-xs font-bold tracking-wider text-neutral-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#004d26]" />
              {"// SYSTEM ARCHITECT & DESIGNER"}
            </div>
          </div>

          {/* Brief Bio narrative */}
          <div className="anim-slide-up">
            <p className="text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed">
              IT Student at LSPU San Pablo. Designing modular mechanisms, lightweight interactive gameplay systems, and high-performance logic using Godot Engine and C#.
            </p>
          </div>

          {/* Action buttons */}
          <div className="anim-slide-up flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
            <button 
              onClick={() => alert("Diagnostic scan loaded successfully. Status code: 0")}
              className="font-mono text-xs border border-white text-white bg-black/45 hover:bg-[#004d26] hover:border-[#004d26] px-6 py-3.5 rounded-xs tracking-wider transition-all duration-300 font-bold uppercase flex items-center justify-center gap-2.5 w-full sm:w-auto"
            >
              <Terminal className="w-4 h-4" />
              <span>COMPILE_SYS.EXE</span>
            </button>
            
            <a 
              href="mailto:psalm.rivera@example.com"
              className="font-mono text-xs border border-neutral-700 text-neutral-300 bg-black/30 hover:bg-white hover:text-black hover:border-white px-6 py-3.5 rounded-xs tracking-wider transition-all duration-300 font-bold uppercase flex items-center justify-center gap-1.5 w-full sm:w-auto"
            >
              <span>CONNECT.EXE</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </main>

      {/* ==================== 4. Giant bottom typography (Desktop Only - Full Opacity Foreground) ==================== */}
      <section className="relative z-20 w-full px-6 md:px-12 lg:px-16 pb-6 md:pb-10 max-w-[1440px] mx-auto hidden lg:flex flex-col justify-end items-stretch">
        
        {/* Name characters container */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end w-full relative min-h-[10vw] border-t border-white/5 pt-5 gap-y-1">
          
          {/* Giant Firstname Left */}
          <div className="overflow-hidden w-full sm:w-auto text-center sm:text-left flex justify-center sm:justify-start">
            <h1 className="text-[12vw] font-black tracking-tighter leading-none text-white uppercase flex">
              {"PSALM".split("").map((char, index) => (
                <span key={index} className="char-psalm inline-block">
                  {char}
                </span>
              ))}
            </h1>
          </div>

          {/* Giant Lastname Right */}
          <div className="overflow-hidden w-full sm:w-auto text-center sm:text-right flex justify-center sm:justify-end">
            <h1 className="text-[12vw] font-black tracking-tighter leading-none text-white uppercase flex justify-end">
              {"RIVERA".split("").map((char, index) => (
                <span key={index} className="char-rivera inline-block">
                  {char}
                </span>
              ))}
            </h1>
          </div>

        </div>

        {/* Bottom Details Footer Info */}
        <div className="details-bottom-right flex justify-between items-center mt-5 font-mono text-[9px] text-neutral-400">
          <div className="hidden md:block">
            <span>DEVELOPMENT FRAMEWORK: <span className="text-[#004d26] font-bold">GODOT ENGINE v4</span></span>
          </div>
          <div className="w-full md:w-auto text-right tracking-widest text-neutral-200">
            {heroContent.subtitleRight.toUpperCase()}
          </div>
        </div>

      </section>
    </div>
  );
}
