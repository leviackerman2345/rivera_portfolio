"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillsContent, Skill } from "../data/skillsContent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Sub-component for individual skill card content
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const IconComponent = skill.icon;
  
  return (
    <div 
      className={`w-full h-full p-8 sm:p-10 border transition-all duration-300 group/card flex flex-col justify-between relative
        ${skill.accentColor === "green" 
          ? "bg-[#0c0c0c]/40 border-white/5 hover:border-[#004d26] hover:bg-[#004d26]/[0.02] hover:shadow-[0_0_25px_rgba(0,102,51,0.08)]" 
          : "bg-[#0c0c0c]/40 border-white/5 hover:border-[#ff3333] hover:bg-[#ff3333]/[0.02] hover:shadow-[0_0_25px_rgba(255,51,51,0.08)]"}`}
    >
      {/* Node tag in the corner of the card */}
      <div className="absolute top-4 right-4 font-mono text-[9px] text-neutral-600 tracking-wider group-hover/card:text-neutral-300 transition-colors duration-300 select-text">
        [NODE_0{index + 1}]
      </div>

      <div>
        {/* Architectural Icon Box */}
        <div 
          className={`w-12 h-12 flex items-center justify-center border font-mono mb-6 relative transition-all duration-300
            ${skill.accentColor === "green" 
              ? "border-[#004d26] text-[#004d26] bg-[#053b1b]/20 group-hover/card:border-[#00aa55] group-hover/card:text-[#00aa55] group-hover/card:bg-[#053b1b]/40" 
              : "border-[#ff3333] text-[#ff3333] bg-[#4c0d0d]/20 group-hover/card:border-[#ff6666] group-hover/card:text-[#ff6666] group-hover/card:bg-[#4c0d0d]/40"}`}
        >
          <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover/card:scale-110" />
          
          {/* Corner crosshairs for icon container */}
          <div className="absolute top-0 left-0 w-1 h-1 -translate-x-1/2 -translate-y-1/2 text-white/50 text-[6px] flex items-center justify-center pointer-events-none">+</div>
          <div className="absolute top-0 right-0 w-1 h-1 translate-x-1/2 -translate-y-1/2 text-white/50 text-[6px] flex items-center justify-center pointer-events-none">+</div>
          <div className="absolute bottom-0 left-0 w-1 h-1 -translate-x-1/2 translate-y-1/2 text-white/50 text-[6px] flex items-center justify-center pointer-events-none">+</div>
          <div className="absolute bottom-0 right-0 w-1 h-1 translate-x-1/2 translate-y-1/2 text-white/50 text-[6px] flex items-center justify-center pointer-events-none">+</div>
        </div>

        {/* Skill Title */}
        <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3 select-text group-hover/card:text-white transition-colors">
          {skill.name}
        </h3>

        {/* Skill Description */}
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8 font-sans select-text group-hover/card:text-neutral-300 transition-colors duration-300">
          {skill.description}
        </p>
      </div>

      {/* Custom Progress Bar Wrapper */}
      <div className="w-full">
        <div className="flex justify-between items-baseline mb-2 font-mono text-[10px] tracking-widest select-text">
          <span className="text-neutral-500 uppercase">[CAPABILITY_INDEX]</span>
          <span className={`font-bold transition-colors duration-300
            ${skill.accentColor === "green" 
              ? "text-[#004d26] group-hover/card:text-[#00aa55]" 
              : "text-[#ff3333] group-hover/card:text-[#ff6666]"}`}>
            {skill.proficiency}%
          </span>
        </div>
        <div className="w-full h-2 bg-[#050505] border border-white/10 relative transition-colors duration-300 group-hover/card:border-white/20">
          <div 
            className={`h-full progress-bar-fill transition-all duration-300 group-hover/card:brightness-125
              ${skill.accentColor === "green" 
                ? "bg-[#004d26] group-hover/card:shadow-[0_0_8px_rgba(0,102,51,0.5)]" 
                : "bg-[#ff3333] group-hover/card:shadow-[0_0_8px_rgba(255,51,51,0.5)]"}`}
            data-proficiency={skill.proficiency}
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
}

// Sub-component for Empty/Diagnostic cells on larger viewports
function DiagnosticCell({ index, accentColor }: { index: number; accentColor: "green" | "red" }) {
  const isGreen = accentColor === "green";
  const labelColor = isGreen ? "text-[#004d26]" : "text-[#ff3333]";
  const cursorClass = isGreen ? "dev-cursor" : "dev-cursor-red";
  
  return (
    <div className="flex flex-col h-full justify-between">
      {/* Top HUD */}
      <div className="flex justify-between items-center font-mono text-[9px] text-neutral-600 uppercase tracking-wider mb-6 select-text">
        <span>SYS_NODE_0{index + 1}</span>
        <span>STATUS: READY</span>
      </div>

      {/* Mock Console System Logs */}
      <div className="font-mono text-xs text-neutral-500 leading-relaxed space-y-2 select-text py-2">
        {index === 0 && (
          <>
            <p className={`${labelColor}/80 font-semibold`}>// GODOT DIAGNOSTICS</p>
            <p>LOAD_STAGE: res://src/game.tscn - OK</p>
            <p>RENDER_PIPELINE: FORWARD_PLUS</p>
            <p>PHYSICS_FPS: 60 | ACTIVE_COLLIDERS: 14</p>
            <p className={`${labelColor} font-bold ${cursorClass}`}>ALLOCATING_NODES</p>
          </>
        )}
        {index === 1 && (
          <>
            <p className={`${labelColor}/80 font-semibold`}>// C# COMPILER STREAM</p>
            <p>mcs -target:library -out:Assembly-CSharp.dll</p>
            <p>Compilation successful: 0 errors, 2 warnings</p>
            <p>GC_ALLOCATION: 0.12ms | HEAP: 4.2MB</p>
            <p className={`${labelColor} font-bold ${cursorClass}`}>RUNNING_ASSEMBLY</p>
          </>
        )}
        {index === 2 && (
          <>
            <p className={`${labelColor}/80 font-semibold`}>// FRONTEND LAYOUT RENDER</p>
            <p>DOM_ROOT: index.html - Parsed successfully</p>
            <p>CSS_ENGINE: Tailwind CSS v4.0.0</p>
            <p>RENDER_BOX: viewport_width=100% margin=auto</p>
            <p className={`${labelColor} font-bold ${cursorClass}`}>DRAWING_LAYOUT_RECT</p>
          </>
        )}
        {index === 3 && (
          <>
            <p className={`${labelColor}/80 font-semibold`}>// TS COMPILATION CHECK</p>
            <p>tsc --watch --noEmit</p>
            <p>Found 0 errors. Watching for file changes...</p>
            <p>{"TYPECHECK: src/components/Skills.tsx -> Resolved"}</p>
            <p className={`${labelColor} font-bold ${cursorClass}`}>TS_SERVER_OK</p>
          </>
        )}
        {index === 4 && (
          <>
            <p className={`${labelColor}/80 font-semibold`}>// GIT VERSION STREAM</p>
            <p>git status -s</p>
            <p> M src/components/Skills.tsx</p>
            <p>?? src/data/skillsContent.ts</p>
            <p className={`${labelColor} font-bold ${cursorClass}`}>AWAITING_STAGE_COMMIT</p>
          </>
        )}
        {index === 5 && (
          <>
            <p className={`${labelColor}/80 font-semibold`}>// SOCKET STREAM LISTENER</p>
            <p>ws_server.js - Listening on port 8080</p>
            <p>CLIENT_CONNECTED: 127.0.0.1 - handshake_ok</p>
            <p>PING: 14ms | STATUS: ESTABLISHED</p>
            <p className={`${labelColor} font-bold ${cursorClass}`}>STREAMING_REALTIME_PACKETS</p>
          </>
        )}
      </div>

      {/* Bottom Coordinates & Ref */}
      <div className="mt-6 flex justify-between items-center font-mono text-[8px] text-neutral-600 select-text">
        <span>LOC_COORD: [X: 0.{(index * 17) % 10}, Y: 0.{(index * 31) % 10}]</span>
        <span>SYS_REF_ID: 0x{((index + 1) * 231).toString(16).toUpperCase()}</span>
      </div>
    </div>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Entrance animation for the skill cards and diagnostic cells
    const cards = gsap.utils.toArray<HTMLElement>(".skill-card-reveal");
    cards.forEach((card, i) => {
      const isEven = i % 2 === 0;
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: isEven ? -40 : 40,
          y: 20,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // 2. Smoothly animate progress bars when they enter viewport
    const bars = gsap.utils.toArray<HTMLElement>(".progress-bar-fill");
    bars.forEach((bar) => {
      const targetWidth = bar.getAttribute("data-proficiency") + "%";
      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width: targetWidth,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      id="skills"
      ref={containerRef}
      className="w-full bg-[#050505] relative overflow-hidden py-24 md:py-32"
    >
      {/* Decorative developer accent grid background */}
      <div className="absolute inset-0 dev-grid-bg opacity-[0.02] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* HUD Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col justify-start">
          <div className="inline-block border border-white/10 px-4 py-2 hover:bg-white/[0.02] transition-colors mb-6 relative w-fit">
            <span className="font-mono text-xs tracking-widest text-[#004d26] uppercase">
              [SYS_MODULE: SKILLS_SET]
            </span>
            {/* Small Corners */}
            <div className="absolute top-0 left-0 w-1 h-1 -translate-x-1/2 -translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
            <div className="absolute top-0 right-0 w-1 h-1 translate-x-1/2 -translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
            <div className="absolute bottom-0 left-0 w-1 h-1 -translate-x-1/2 translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
            <div className="absolute bottom-0 right-0 w-1 h-1 translate-x-1/2 translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none select-text">
            SYSTEMIC <span className="text-[#004d26]">CAPABILITIES</span>
            <br />
            & <span className="text-[#ff3333]">COMPETENCIES</span>.
          </h2>
        </div>

        {/* Master Architectural Grid Container */}
        <div className="relative border border-white/10 group bg-[#050505]">
          
          {/* Decorative Outer Intersection Nodes (Corners) */}
          <div className="absolute top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>
          <div className="absolute top-0 right-0 w-2 h-2 translate-x-1/2 -translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>
          <div className="absolute bottom-0 left-0 w-2 h-2 -translate-x-1/2 translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>
          <div className="absolute bottom-0 right-0 w-2 h-2 translate-x-1/2 translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>

          <div className="flex flex-col">
            {skillsContent.map((skill, index) => {
              const isEven = index % 2 === 0;
              const isLast = index === skillsContent.length - 1;
              const borderBottomClass = isLast ? "" : "border-b border-white/10";
              
              return (
                <div 
                  key={index} 
                  className={`grid grid-cols-1 md:grid-cols-2 relative ${borderBottomClass}`}
                >
                  {/* Center line dividing '+' nodes */}
                  {!isLast && (
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 -translate-x-1/2 translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none hidden md:flex items-center justify-center z-20">
                      +
                    </div>
                  )}

                  {isEven ? (
                    <>
                      {/* Left: Skill Card Cell */}
                      <div className="p-4 sm:p-6 md:p-8 md:border-r border-white/10 relative skill-card-reveal">
                        <SkillCard skill={skill} index={index} />
                      </div>
                      
                      {/* Right: Empty / Diagnostic Cell */}
                      <div className="hidden md:flex p-4 sm:p-6 md:p-8 bg-[#0c0c0c]/10 relative overflow-hidden">
                        <div className="w-full h-full p-8 sm:p-10 md:p-12 border border-white/5 bg-[#0c0c0c]/20 relative flex flex-col justify-between">
                          {/* Diagonal structural line watermark inside the empty cell */}
                          <div className="absolute inset-0 dev-grid-bg opacity-[0.02] pointer-events-none" />
                          <DiagnosticCell index={index} accentColor={skill.accentColor} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Left: Empty / Diagnostic Cell */}
                      <div className="hidden md:flex p-4 sm:p-6 md:p-8 md:border-r border-white/10 bg-[#0c0c0c]/10 relative overflow-hidden">
                        <div className="w-full h-full p-8 sm:p-10 md:p-12 border border-white/5 bg-[#0c0c0c]/20 relative flex flex-col justify-between">
                          {/* Diagonal structural line watermark inside the empty cell */}
                          <div className="absolute inset-0 dev-grid-bg opacity-[0.02] pointer-events-none" />
                          <DiagnosticCell index={index} accentColor={skill.accentColor} />
                        </div>
                      </div>

                      {/* Right: Skill Card Cell */}
                      <div className="p-4 sm:p-6 md:p-8 relative skill-card-reveal">
                        <SkillCard skill={skill} index={index} />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
