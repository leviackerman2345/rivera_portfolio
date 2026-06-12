import React from "react";
import Hero from "../components/Hero";
import TechStackCarousel from "../components/TechStackCarousel";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="relative w-full">
      <Hero />
      <TechStackCarousel />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
