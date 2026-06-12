"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { loaderLogs } from "../data/loaderContent";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  useGSAP(() => {
    const obj = { val: 0 };
    const numLogs = loaderLogs.length;

    const tl = gsap.timeline({
      onComplete: () => {
        // Run exit animation: slide overlay screen up
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.0,
          ease: "power4.inOut",
          onComplete: onComplete,
        });
      },
    });

    // 1. Progress count-up tween
    tl.to(obj, {
      val: 100,
      duration: 2.8,
      ease: "power1.inOut",
      onUpdate: () => {
        const rounded = Math.floor(obj.val);
        
        // Update percentage text
        if (percentRef.current) {
          percentRef.current.textContent = `${rounded}%`;
        }

        // Update progress bar width
        if (barRef.current) {
          barRef.current.style.width = `${rounded}%`;
        }

        // Reveal logs incrementally based on progress ratio
        const logsToShowCount = Math.min(
          Math.floor((rounded / 100) * numLogs) + 1,
          numLogs
        );
        setVisibleLogs(loaderLogs.slice(0, logsToShowCount));
      },
    });

    // Add a small pause at 100% for readability before sliding away
    tl.to({}, { duration: 0.5 });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen bg-[#050505] z-50 flex flex-col justify-between p-6 md:p-12 lg:p-16 border-b border-white/10 select-none cursor-wait"
    >
      {/* 1. Header HUD */}
      <div className="flex justify-between items-center font-mono text-[10px] text-neutral-500 uppercase tracking-widest border-b border-white/5 pb-4">
        <span>[SYS_LOADER: BOOT_STREAM_v2.8]</span>
        <span className="text-[#004d26] animate-pulse">// SYSTEM_INTEGRITY: SECURE</span>
      </div>

      {/* 2. Main Terminal Content Area */}
      <div className="flex-grow flex flex-col justify-center items-start max-w-2xl mx-auto w-full font-mono py-12">
        <div className="w-full border border-white/10 bg-[#0c0c0c] p-6 md:p-8 rounded-xs relative group min-h-[300px] flex flex-col justify-between">
          
          {/* Small corner decorative accents */}
          <div className="absolute top-0 left-0 w-1 h-1 -translate-x-1/2 -translate-y-1/2 text-white/30 text-[6px] flex items-center justify-center pointer-events-none">+</div>
          <div className="absolute top-0 right-0 w-1 h-1 translate-x-1/2 -translate-y-1/2 text-white/30 text-[6px] flex items-center justify-center pointer-events-none">+</div>
          <div className="absolute bottom-0 left-0 w-1 h-1 -translate-x-1/2 translate-y-1/2 text-white/30 text-[6px] flex items-center justify-center pointer-events-none">+</div>
          <div className="absolute bottom-0 right-0 w-1 h-1 translate-x-1/2 translate-y-1/2 text-white/30 text-[6px] flex items-center justify-center pointer-events-none">+</div>

          {/* Diagnostics Console Logs */}
          <div className="flex flex-col gap-2.5 text-xs text-neutral-400 text-left overflow-hidden">
            {visibleLogs.map((log, index) => {
              const isLast = index === visibleLogs.length - 1;
              const isOk = log.includes("OK") || log.includes("VERIFIED") || log.includes("COMPLETE");
              const textClass = isOk ? "text-[#004d26] font-bold" : "text-neutral-400";
              
              return (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-neutral-600">{"$"}</span>
                  <span className={`${textClass} ${isLast ? "dev-cursor" : ""}`}>
                    {log}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Percentage Counter and Progress Bar */}
          <div className="mt-8 pt-6 border-t border-white/5 w-full flex flex-col gap-4">
            <div className="flex justify-between items-baseline font-bold">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">COMPILING_SYSTEM_MODULES</span>
              <span ref={percentRef} className="text-3xl font-black text-white font-mono leading-none">
                0%
              </span>
            </div>

            {/* Flat Progress Bar (No gradients, matching design rules) */}
            <div className="w-full h-2 bg-[#141414] border border-white/5 relative overflow-hidden">
              <div 
                ref={barRef}
                className="h-full bg-[#004d26] transition-all duration-75 ease-out"
                style={{ width: "0%" }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* 3. Footer HUD */}
      <div className="flex justify-between items-center font-mono text-[9px] text-neutral-600 border-t border-white/5 pt-4">
        <span>INITIALIZING: PR_SYS.EXE</span>
        <span>ENVIRONMENT: PRODUCTIVE_BUILD</span>
      </div>
    </div>
  );
}
