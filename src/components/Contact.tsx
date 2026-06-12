"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactContent } from "../data/contactContent";
import { Terminal, Send, CheckCircle2, AlertTriangle, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Form states
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State for transmission process
  // Statuses: "idle" | "validating" | "transmitting" | "success" | "error"
  const [transStatus, setTransStatus] = useState<
    "idle" | "validating" | "transmitting" | "success" | "error"
  >("idle");

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "SYS_PORT: STATUS_READY",
    "AWAITING_CONNECTION_STREAM...",
  ]);

  const [systemTime, setSystemTime] = useState("");

  // Live system clock logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setSystemTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll terminal logs to bottom
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  // Entrance scroll triggered animations
  useGSAP(
    () => {
      // Stagger elements inside the contact container
      gsap.fromTo(
        ".contact-reveal",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-trigger",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    // Clear error on type
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form entries
  const validateForm = () => {
    let isValid = true;
    const errors = { name: "", email: "", message: "" };

    if (!formValues.name.trim()) {
      errors.name = "SENDER IDENTIFICATION REQUIREMENT FAILED.";
      isValid = false;
    }

    if (!formValues.email.trim()) {
      errors.email = "ROUTING TARGET SPECIFICATION MISSING.";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formValues.email)) {
        errors.email = "UNSUPPORTED CORRESPONDENCE PROTOCOL SCHEMA.";
        isValid = false;
      }
    }

    if (!formValues.message.trim()) {
      errors.message = "EMPTY TRANSMISSION PAYLOAD DECLINED.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transStatus === "transmitting") return;

    // Set validating status log
    setTransStatus("validating");
    setTerminalLogs((prev) => [
      ...prev,
      `[${systemTime}] >> INITIATING STREAM SCAN...`,
    ]);

    setTimeout(() => {
      const isValid = validateForm();

      if (!isValid) {
        setTransStatus("error");
        setTerminalLogs((prev) => [
          ...prev,
          `[${systemTime}] >> SCAN FAILED: VALIDATION_ERROR`,
          `[${systemTime}] >> SYSTEM_INTEGRITY: REJECTED`,
        ]);
        return;
      }

      // Start simulated transmission stream
      setTransStatus("transmitting");
      setTerminalLogs((prev) => [
        ...prev,
        `[${systemTime}] >> SCAN COMPLETED: VALIDATION_OK`,
        `[${systemTime}] >> ESTABLISHING DATA TUNNEL...`,
      ]);

      // Step 1: Resolving Host DNS/Email endpoint
      setTimeout(() => {
        setTerminalLogs((prev) => [
          ...prev,
          `[${systemTime}] >> RESOLVED TARGET: ${contactContent.email}`,
          `[${systemTime}] >> SHIFTING PACKETS TO SERIALIZED FORMAT...`,
        ]);
      }, 600);

      // Step 2: Encrypting payload
      setTimeout(() => {
        const payloadSize = JSON.stringify(formValues).length;
        setTerminalLogs((prev) => [
          ...prev,
          `[${systemTime}] >> SECURITY PROTOCOL: TLS_1.3_ACTIVE`,
          `[${systemTime}] >> PACKET STACK CREATED [SIZE: ${payloadSize} BYTES]`,
          `[${systemTime}] >> DISPATCHING ROUTE PACKETS...`,
        ]);
      }, 1300);

      // Step 3: Server acknowledgment
      setTimeout(() => {
        setTerminalLogs((prev) => [
          ...prev,
          `[${systemTime}] >> ROUTE RESPONDED [ACK: 202 ACCEPTED]`,
          `[${systemTime}] >> DATA STREAM SYNCHRONIZATION COMPLETE`,
        ]);
        setTransStatus("success");
        setFormValues({ name: "", email: "", message: "" });
      }, 2100);

    }, 500);
  };

  // Dynamically resolve connection status label
  const getConnectionStatus = () => {
    if (transStatus === "transmitting") return "TRANSMISSION_ACTIVE";
    if (transStatus === "validating") return "VALIDATION_RUNNING";
    if (transStatus === "success") return "SUCCESS_RESOLVED";
    if (transStatus === "error") return "INTEGRITY_COMPROMISED";
    
    // Check if user has started typing
    const isTyping = formValues.name || formValues.email || formValues.message;
    return isTyping ? "INPUT_STREAM_DETECTED" : "AWAITING_SENDER";
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="w-full bg-[#050505] relative overflow-hidden py-24 md:py-32"
    >
      {/* Decorative developer background grid */}
      <div className="absolute inset-0 dev-grid-bg opacity-[0.02] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 contact-trigger">
        
        {/* HUD Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col justify-start">
          <div className="inline-block border border-white/10 px-4 py-2 hover:bg-white/[0.02] transition-colors mb-6 relative w-fit contact-reveal">
            <span className="font-mono text-xs tracking-widest text-[#004d26] uppercase select-text">
              [{contactContent.systemModule}]
            </span>
            {/* Small Corners */}
            <div className="absolute top-0 left-0 w-1 h-1 -translate-x-1/2 -translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
            <div className="absolute top-0 right-0 w-1 h-1 translate-x-1/2 -translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
            <div className="absolute bottom-0 left-0 w-1 h-1 -translate-x-1/2 translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
            <div className="absolute bottom-0 right-0 w-1 h-1 translate-x-1/2 translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none select-text contact-reveal">
            {contactContent.headingLine1}{" "}
            <span className="text-[#004d26]">{contactContent.headingAccent1}</span>
            <br />
            & <span className="text-[#ff3333]">{contactContent.headingAccent2}</span>.
          </h2>
        </div>

        {/* Master Architectural Grid Container */}
        <div className="relative border border-white/10 group bg-[#050505] contact-reveal">
          
          {/* Decorative Outer Intersection Nodes (Corners) */}
          <div className="absolute top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>
          <div className="absolute top-0 right-0 w-2 h-2 translate-x-1/2 -translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>
          <div className="absolute bottom-0 left-0 w-2 h-2 -translate-x-1/2 translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>
          <div className="absolute bottom-0 right-0 w-2 h-2 translate-x-1/2 translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none flex items-center justify-center z-20">+</div>

          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Left Column: Diagnostics, Clock, System Info, Socials */}
            <div className="md:col-span-5 p-8 sm:p-10 md:p-12 md:border-r border-b md:border-b-0 border-white/10 flex flex-col justify-between relative bg-[#0c0c0c]/10">
              
              {/* Vertical line top-bottom junction node marker */}
              <div className="absolute bottom-0 right-0 w-2 h-2 translate-x-1/2 translate-y-1/2 text-white/30 text-[10px] leading-none pointer-events-none hidden md:flex items-center justify-center z-20">+</div>
              
              <div>
                {/* HUD Details */}
                <div className="border border-white/10 p-6 bg-[#050505] relative mb-8">
                  {/* Small corners */}
                  <div className="absolute top-0 left-0 w-1 h-1 -translate-x-1/2 -translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
                  <div className="absolute top-0 right-0 w-1 h-1 translate-x-1/2 -translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
                  <div className="absolute bottom-0 left-0 w-1 h-1 -translate-x-1/2 translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>
                  <div className="absolute bottom-0 right-0 w-1 h-1 translate-x-1/2 translate-y-1/2 text-white/40 text-[6px] flex items-center justify-center pointer-events-none">+</div>

                  <div className="flex justify-between items-center font-mono text-[9px] text-neutral-500 border-b border-white/10 pb-2 mb-4">
                    <span>SYS_DIAGNOSTIC: COMMS</span>
                    <span className="text-white/40 select-text">NODE_06</span>
                  </div>

                  <div className="font-mono text-xs text-neutral-400 space-y-3 leading-relaxed select-text">
                    <div>
                      <span className="text-neutral-600 block text-[9px] tracking-wider">[{contactContent.locationLabel}]</span>
                      <span className="font-bold text-neutral-300">{contactContent.coordinates}</span>
                    </div>
                    <div>
                      <span className="text-neutral-600 block text-[9px] tracking-wider">[TIMEZONE]</span>
                      <span className="font-bold text-neutral-300">{contactContent.timezone}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="text-neutral-600 block text-[9px] tracking-wider">[SYS_TIME]</span>
                        <span className="font-bold text-[#004d26]">{systemTime || "00:00:00"}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-neutral-600 block text-[9px] tracking-wider">[{contactContent.statusLabel}]</span>
                        <span
                          className={`font-bold transition-colors duration-300 ${
                            transStatus === "success"
                              ? "text-[#00aa55]"
                              : transStatus === "error"
                              ? "text-[#ff3333]"
                              : transStatus === "transmitting"
                              ? "text-[#ffaa00] animate-pulse"
                              : "text-neutral-400"
                          }`}
                        >
                          {getConnectionStatus()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8 select-text">
                  {contactContent.subtext}
                </p>
              </div>

              {/* Social and Direct Links */}
              <div className="mt-8 border-t border-white/10 pt-8 flex flex-col gap-4">
                <div className="font-mono text-[9px] tracking-widest text-neutral-600 uppercase">
                  [NETWORK_ROUTING_TABLE]
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={`mailto:${contactContent.email}`}
                    className="flex items-center justify-between font-mono text-xs sm:text-sm text-neutral-300 hover:text-white border-b border-white/5 pb-2 transition-colors group/mail select-text"
                  >
                    <span>/Email: <span className="text-[#004d26] select-text">{contactContent.email}</span></span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover/mail:text-white group-hover/mail:translate-x-0.5 group-hover/mail:-translate-y-0.5 transition-all" />
                  </a>

                  {contactContent.socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between font-mono text-xs sm:text-sm text-neutral-300 hover:text-white border-b border-white/5 pb-2 transition-colors group/soc select-text"
                    >
                      <span className="select-text">{link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover/soc:text-white group-hover/soc:translate-x-0.5 group-hover/soc:-translate-y-0.5 transition-all" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Architectural Ledger Form */}
            <div className="md:col-span-7 p-8 sm:p-10 md:p-12 flex flex-col gap-10 relative">
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-10 w-full" noValidate>
                
                {/* Inputs Stack */}
                <div className="flex flex-col gap-8">
                  {contactContent.formFields.map((field) => {
                    const isTextArea = field.type === "textarea";
                    const hasError = !!formErrors[field.id as keyof typeof formErrors];
                    
                    return (
                      <div
                        key={field.id}
                        className="flex flex-col gap-2 relative group/ledger contact-reveal"
                      >
                        {/* Field Index Tag and Label */}
                        <div className="flex justify-between items-baseline font-mono text-[10px] tracking-widest text-neutral-500">
                          <span className="select-text">[{field.label}]</span>
                          {field.required && (
                            <span className="text-neutral-700 text-[8px] font-bold">
                              [SYS_REQR]
                            </span>
                          )}
                        </div>

                        {/* Flat Ledger Input with Transitioning Bottom Border */}
                        {isTextArea ? (
                          <textarea
                            id={field.id}
                            name={field.id}
                            value={formValues[field.id as keyof typeof formValues]}
                            onChange={handleInputChange}
                            placeholder={field.placeholder}
                            maxLength={field.maxLength}
                            disabled={transStatus === "transmitting"}
                            className={`w-full bg-transparent border-b px-2 py-3.5 font-mono text-sm sm:text-base text-neutral-200 placeholder:text-neutral-700 
                              focus:outline-none focus:ring-0 resize-none h-32 transition-colors duration-300 select-text
                              ${
                                hasError
                                  ? "border-[#ff3333] focus:border-[#ff3333]"
                                  : "border-white/10 focus:border-[#004d26]"
                              }`}
                          />
                        ) : (
                          <input
                            id={field.id}
                            name={field.id}
                            type={field.type}
                            value={formValues[field.id as keyof typeof formValues]}
                            onChange={handleInputChange}
                            placeholder={field.placeholder}
                            maxLength={field.maxLength}
                            disabled={transStatus === "transmitting"}
                            className={`w-full bg-transparent border-b px-2 py-3.5 font-mono text-sm sm:text-base text-neutral-200 placeholder:text-neutral-700 
                              focus:outline-none focus:ring-0 transition-colors duration-300 select-text
                              ${
                                hasError
                                  ? "border-[#ff3333] focus:border-[#ff3333]"
                                  : "border-white/10 focus:border-[#004d26]"
                              }`}
                          />
                        )}

                        {/* Validation Feedback Line */}
                        {hasError && (
                          <div className="flex items-center gap-1.5 text-[#ff3333] font-mono text-[10px] tracking-wide mt-1 select-text">
                            <AlertTriangle className="w-3 h-3 shrink-0" />
                            <span>ERR: {formErrors[field.id as keyof typeof formErrors]}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Submit trigger actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 pt-4 border-t border-white/5 contact-reveal">
                  {/* Status Banner */}
                  <div className="flex items-center gap-3 min-h-[44px]">
                    {transStatus === "success" && (
                      <div className="flex items-center gap-2 text-[#00aa55] font-mono text-xs select-text">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{contactContent.successLabel}</span>
                      </div>
                    )}
                    {transStatus === "transmitting" && (
                      <div className="flex items-center gap-2 text-[#ffaa00] font-mono text-xs select-text">
                        <span className="w-2 h-2 rounded-full bg-[#ffaa00] animate-ping" />
                        <span>{contactContent.submittingLabel}</span>
                      </div>
                    )}
                    {transStatus === "idle" && (
                      <div className="text-neutral-500 font-mono text-[10px] uppercase select-text">
                        // PROTOCOL_STATUS: CONNECT_AWAIT
                      </div>
                    )}
                    {transStatus === "error" && (
                      <div className="flex items-center gap-2 text-[#ff3333] font-mono text-xs select-text">
                        <AlertTriangle className="w-4 h-4" />
                        <span>SYS_REJECTED // RE-EVALUATE INPUTS</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={transStatus === "transmitting"}
                    className="btn-cyber-green w-full sm:w-auto relative select-text"
                  >
                    <span className="flex items-center gap-2 justify-center">
                      <Send className="w-4 h-4" />
                      {contactContent.submitLabel}
                    </span>
                  </button>
                </div>
              </form>

              {/* Dynamic Console Log Terminal Stream */}
              <div className="border border-white/10 bg-[#050505] rounded overflow-hidden contact-reveal mt-auto select-text">
                
                {/* Terminal top header HUD */}
                <div className="bg-[#0c0c0c] border-b border-white/10 px-4 py-2 flex items-center justify-between font-mono text-[9px] text-neutral-500 select-text">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[#004d26]" />
                    <span>SYS_TRANSMISSION_LOGGER</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#004d26]" />
                    <span>LIVE_STREAM</span>
                  </div>
                </div>

                {/* Console logs output */}
                <div className="p-4 font-mono text-xs text-neutral-400 space-y-1.5 max-h-[140px] overflow-y-auto select-text bg-[#0c0c0c]/10">
                  {terminalLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={
                        log.includes("VALIDATION_ERROR") || log.includes("REJECTED")
                          ? "text-[#ff3333]"
                          : log.includes("VALIDATION_OK") || log.includes("RESOLVED TARGET") || log.includes("COMPLETE")
                          ? "text-[#00aa55]"
                          : log.includes("INITIATING") || log.includes("ESTABLISHING") || log.includes("DISPATCHING")
                          ? "text-[#ffaa00]"
                          : "text-neutral-400"
                      }
                    >
                      {log}
                    </div>
                  ))}
                  <div ref={logEndRef} />
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
