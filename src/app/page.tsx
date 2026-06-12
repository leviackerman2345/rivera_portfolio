"use client";

import React, { useState } from "react";
import Preloader from "../components/Preloader";
import Hero from "../components/Hero";
import TechStackCarousel from "../components/TechStackCarousel";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  const handleComplete = () => {
    setIsLoaded(true);
    setShowPreloader(false);
    
    // Retain the section they were last on (check url hash)
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  };

  return (
    <div className="relative w-full">
      {showPreloader && (
        <Preloader 
          onComplete={handleComplete} 
        />
      )}
      <Hero isLoaded={isLoaded} />
      <TechStackCarousel />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
