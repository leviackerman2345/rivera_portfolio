"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsContent, ProjectItem } from "../data/projectsContent";
import { ArrowUpRight, Plus, Minus } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const xToRef = useRef<((val: number) => void) | null>(null);
  const yToRef = useRef<((val: number) => void) | null>(null);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Initialize GSAP quickTo tracking for cursor follower
  useGSAP(() => {
    if (!floatingRef.current) return;

    // Set initial scale and opacity to 0
    gsap.set(floatingRef.current, { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 });

    // Build quickTo positions (relative to viewport since layout is fixed)
    xToRef.current = gsap.quickTo(floatingRef.current, "x", { duration: 0.35, ease: "power3.out" });
    yToRef.current = gsap.quickTo(floatingRef.current, "y", { duration: 0.35, ease: "power3.out" });

    // Scroll reveal for project rows
    const rows = gsap.utils.toArray<HTMLElement>(".project-row-reveal");
    rows.forEach((row) => {
      gsap.fromTo(
        row,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, { scope: containerRef });

  // Handle Accordion heights on expand change
  useGSAP(() => {
    projectsContent.forEach((_, idx) => {
      if (idx === 5) return; // 6th is redirect
      const descEl = containerRef.current?.querySelector(`.desc-container-${idx}`);
      if (!descEl) return;
      const isExpanded = expandedIndex === idx;

      gsap.to(descEl, {
        height: isExpanded ? "auto" : 0,
        opacity: isExpanded ? 1 : 0,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, { dependencies: [expandedIndex], scope: containerRef });

  // Handle Image Crossfades on hoveredIndex change
  useGSAP(() => {
    projectsContent.forEach((_, idx) => {
      if (idx === 5) return; // 6th is redirect
      const imgEl = containerRef.current?.querySelector(`.img-preview-${idx}`);
      if (!imgEl) return;
      const isHovered = hoveredIndex === idx;

      gsap.to(imgEl, {
        opacity: isHovered ? 1 : 0,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, { dependencies: [hoveredIndex], scope: containerRef });

  // Mouse coordinate tracker
  const handleMouseMove = (e: React.MouseEvent) => {
    if (xToRef.current && yToRef.current) {
      xToRef.current(e.clientX);
      yToRef.current(e.clientY);
    }
  };

  // When mouse enters a project row
  const handleRowMouseEnter = (idx: number) => {
    const isRedirect = projectsContent[idx].isRedirect;
    if (isRedirect) {
      // Scale down image follower if it's the view all link
      handleListMouseLeave();
      return;
    }

    setHoveredIndex(idx);
    if (floatingRef.current) {
      gsap.to(floatingRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  // When mouse leaves the entire projects list container
  const handleListMouseLeave = () => {
    setHoveredIndex(null);
    if (floatingRef.current) {
      gsap.to(floatingRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }
  };

  const handleToggle = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  // Helper to resolve row-specific highlight borders and backgrounds
  const getAccentColor = (idx: number) => {
    switch (idx) {
      case 0: // Code Rift: Genesis
        return "red";
      case 1: // Sustainable Streets Simulator
        return "green";
      case 2: // Aether Grid: Breach
        return "green";
      case 3: // Echo-Nav
        return "green";
      case 4: // Synapse Sync
        return "red";
      default:
        return "green";
    }
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full bg-[#050505] relative overflow-hidden py-24 md:py-32"
    >
      {/* Decorative developer background grid */}
      <div className="absolute inset-0 dev-grid-bg opacity-[0.02] pointer-events-none" />

      {/* Floating Image Follower */}
      <div
        ref={floatingRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{ transform: "translate3d(0px, 0px, 0px)" }}
      >
        <div className="w-[300px] h-[190px] -translate-x-1/2 -translate-y-1/2 border border-white/20 bg-[#0c0c0c] overflow-hidden relative shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
          {projectsContent.map((project, idx) => {
            if (project.isRedirect) return null;
            return (
              <img
                key={idx}
                src={project.imageUrl}
                alt={project.title}
                className={`img-preview-${idx} absolute inset-0 w-full h-full object-cover opacity-0`}
              />
            );
          })}
          {/* Subtle grid accent inside floating container */}
          <div className="absolute inset-0 dev-grid-bg opacity-[0.05] pointer-events-none" />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* HUD Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col justify-start">
          <div className="inline-block border border-white/10 px-4 py-2 hover:bg-white/[0.02] transition-colors mb-6 relative w-fit">
            <span className="font-mono text-xs tracking-widest text-[#004d26] uppercase">
              [SYS_MODULE: WORK_INDEX]
            </span>
            {/* Small Corners */}
            <div className="absolute top-0 left-0 w-1 h-1 -translate-x-1/2 -translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
            <div className="absolute top-0 right-0 w-1 h-1 translate-x-1/2 -translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
            <div className="absolute bottom-0 left-0 w-1 h-1 -translate-x-1/2 translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
            <div className="absolute bottom-0 right-0 w-1 h-1 translate-x-1/2 translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none select-text">
            SELECTED <span className="text-[#004d26]">PROJECTS</span>
            <br />
            & <span className="text-[#ff3333]">PROTOTYPES</span>.
          </h2>
        </div>

        {/* Master FAQ-style list container */}
        <div 
          ref={listRef}
          onMouseLeave={handleListMouseLeave}
          className="relative border-t border-white/10 bg-[#050505]"
        >
          {/* Corner nodes */}
          <div className="absolute top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>
          <div className="absolute top-0 right-0 w-2 h-2 translate-x-1/2 -translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>

          {projectsContent.map((project, index) => {
            const isRedirect = project.isRedirect;
            const accent = getAccentColor(index);
            const isExpanded = expandedIndex === index;
            const isHovered = hoveredIndex === index;
            
            // Generate visual classes depending on index
            const indexStr = `0${index + 1}`;
            
            if (isRedirect) {
              return (
                <a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => handleRowMouseEnter(index)}
                  className="project-row-reveal block w-full py-8 md:py-10 border-b border-white/10 hover:bg-[#004d26]/5 transition-all duration-300 relative group/link"
                >
                  {/* Visual grid indicators */}
                  <div className="absolute bottom-0 left-0 w-2 h-2 -translate-x-1/2 translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 translate-x-1/2 translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>

                  <div className="flex flex-row justify-between items-center px-4 sm:px-8 md:px-12 select-text">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className="font-mono text-xs sm:text-sm text-[#004d26] tracking-widest font-bold">
                        [REDIRECT_OUT]
                      </span>
                      <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-[#004d26] group-hover/link:text-[#00aa55] transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-[#004d26] group-hover/link:text-[#00aa55] group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </div>
                </a>
              );
            }

            // Normal projects
            const accentHoverTextClass = accent === "green" ? "group-hover/row:text-[#00aa55]" : "group-hover/row:text-[#ff6666]";
            const accentTextClass = accent === "green" ? "text-[#004d26]" : "text-[#ff3333]";
            const accentBgClass = accent === "green" ? "bg-[#053b1b]/10" : "bg-[#4c0d0d]/10";
            const accentBorderClass = accent === "green" ? "group-hover/row:border-[#00aa55]" : "group-hover/row:border-[#ff6666]";
            
            return (
              <div
                key={index}
                className="project-row-reveal w-full border-b border-white/10 transition-colors duration-300 relative group/row"
              >
                {/* Visual grid indicators */}
                <div className="absolute bottom-0 left-0 w-2 h-2 -translate-x-1/2 translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>
                <div className="absolute bottom-0 right-0 w-2 h-2 translate-x-1/2 translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>

                {/* FAQ row header */}
                <div
                  onClick={() => handleToggle(index)}
                  onMouseEnter={() => handleRowMouseEnter(index)}
                  className={`w-full flex flex-col sm:flex-row justify-between sm:items-center py-8 md:py-10 px-4 sm:px-8 md:px-12 cursor-pointer transition-colors select-text ${
                    isHovered ? accentBgClass : ""
                  }`}
                >
                  <div className="flex flex-row items-baseline gap-4 sm:gap-6">
                    <span className="font-mono text-xs sm:text-sm text-neutral-500 font-bold">
                      [{indexStr}]
                    </span>
                    <h3 className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white transition-colors duration-300 ${accentHoverTextClass}`}>
                      {project.title}
                    </h3>
                  </div>

                  {/* Tech stack & icon panel */}
                  <div className="flex items-center gap-6 mt-4 sm:mt-0 justify-between sm:justify-end">
                    <div className="flex gap-2">
                      {project.techStack?.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-mono text-[10px] sm:text-xs text-neutral-400 bg-white/5 border border-white/10 px-2 py-0.5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="text-neutral-500 group-hover/row:text-white transition-colors shrink-0">
                      {isExpanded ? (
                        <Minus className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Accordion content */}
                <div
                  className={`desc-container-${index} overflow-hidden h-0 opacity-0 bg-[#0c0c0c]/40 border-t border-white/5`}
                >
                  <div className="px-6 sm:px-12 md:px-24 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 select-text">
                    
                    {/* Left & Middle: Description narrative */}
                    <div className="lg:col-span-2 flex flex-col justify-center">
                      <div className="mb-4">
                        <span className={`font-mono text-[10px] uppercase tracking-widest font-bold ${accentTextClass}`}>
                          [SYS_DESCRIPTION]
                        </span>
                      </div>
                      <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-sans max-w-3xl">
                        {project.description}
                      </p>
                    </div>

                    {/* Right: Architectural Hud Diagnostics */}
                    <div className="border border-white/10 p-6 bg-[#050505] relative">
                      {/* Small corners */}
                      <div className="absolute top-0 left-0 w-1 h-1 -translate-x-1/2 -translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
                      <div className="absolute top-0 right-0 w-1 h-1 translate-x-1/2 -translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
                      <div className="absolute bottom-0 left-0 w-1 h-1 -translate-x-1/2 translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
                      <div className="absolute bottom-0 right-0 w-1 h-1 translate-x-1/2 translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>

                      <div className="flex justify-between items-center font-mono text-[9px] text-neutral-500 border-b border-white/10 pb-2 mb-3">
                        <span>SYS_LOG: PRJ_0{index + 1}</span>
                        <span className={`animate-pulse ${accentTextClass}`}>ONLINE</span>
                      </div>

                      <div className="font-mono text-xs text-neutral-400 space-y-1.5 leading-relaxed">
                        {index === 0 && (
                          <>
                            <p className={`${accentTextClass}`}>// ASSEMBLY_GENESIS: LOADED</p>
                            <p>STATE_MACHINE: COMPILED</p>
                            <p>LOGIC_CHANNELS: 16-BIT_ANIM</p>
                            <p className="text-neutral-600">INDEX: RIFT_CORE_BUILD_402</p>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <p className={`${accentTextClass}`}>// SIM_MAPPING: SAN_PABLO_CITY</p>
                            <p>CO2_INDEX: ACTIVE</p>
                            <p>GEO_DATA: res://maps/spc.osm</p>
                            <p className="text-neutral-600">PHYSICS_ENGINE: GODOT_SERVER</p>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <p className={`${accentTextClass}`}>// INTRUSION_VECTOR: PROCEDURAL</p>
                            <p>GRID_ALGO: A_STAR_PATHFIND</p>
                            <p>THREADS: SPINLOCK_ACTIVE</p>
                            <p className="text-neutral-600">ASSEMBLY: AetherGrid.Breach.dll</p>
                          </>
                        )}
                        {index === 3 && (
                          <>
                            <p className={`${accentTextClass}`}>// AUDIO_ENGINE: WEB_AUDIO_API</p>
                            <p>COMPLIANCE: WCAG_AAA_READ</p>
                            <p>VOICE_MODEL: SPEECH_RECOG_STT</p>
                            <p className="text-neutral-600">SYS_ACCESSIBILITY: FULL_ACC</p>
                          </>
                        )}
                        {index === 4 && (
                          <>
                            <p className={`${accentTextClass}`}>// PIPELINE: ESTABLISHED</p>
                            <p>BUFFER_NODES: REDIS_CACHE</p>
                            <p>DUPLEX_PORT: TCP/GRPC_8082</p>
                            <p className="text-neutral-600">METRICS_LOG: DOCKER_CONTAINER</p>
                          </>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
