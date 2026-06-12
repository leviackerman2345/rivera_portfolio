# PSALM RIVERA // SYSTEMS & GAME DEV PORTFOLIO

> A high-performance, developer-centric creative portfolio built with **Next.js**, **Tailwind CSS**, and **GSAP**. Designed under a custom Cyber Neo-Minimalist aesthetic.

---

## 🖥️ System Architecture

This portfolio functions as a visual representation of systemic thinking, mirroring terminal debug interfaces and grid-based blueprints. It showcases **Psalm Rivera's** capabilities as a Game Developer, Systems Architect, and front-end engineer.

### Design Tokens (Cyber Neo-Minimalism)
- **High-contrast interface**: Deep matte black background (`#050505`) with bright accents.
- **Accents**: Cyber Developer Green (`#004d26` primary / `#053b1b` dim) and Sharp Debug Red (`#ff3333`).
- **Typography**: Clean monospace headings and structural sans-serif interfaces (JetBrains Mono & Space Grotesk).
- **No Gradients**: Employs solid flat colors with sharp borders (`#1c1c1c`) and active states (`#333333`).
- **Developer Accents**: Features micro-interactions, blinking command lines, layout coordinates, and console indicators.

---

## 🛠️ Stack & Technologies

- **Core Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (v4 configuration)
- **Animations:** GSAP (GreenSock Animation Platform) + `@gsap/react`
- **Icons:** Lucide React
- **Runtime:** Node.js

---

## 📂 Features & Structure

### 1. Hero HUD (`src/components/Hero.tsx`)
- Interactive, responsive portrait layout with a 40% darker brightness filter (`brightness(0.6)`) to improve typography readability.
- Multi-dimensional layout dividers (horizontal and vertical HUD gridlines) simulating software blueprint lines.
- Symmetrical navigation pill menu bridging **About**, **Skills**, **Projects**, and **Contact** anchors.
- Responsive mobile fullscreen overlay slide-out menu with bottom-aligned contents on mobile breakpoints.

### 2. Ticker Carousel (`src/components/TechStackCarousel.tsx`)
- Infinite horizontal scrolling marquee displaying core competencies (Godot, C#, TypeScript, WebSockets, etc.).
- Animated concurrently using looping GSAP tweens on track elements, eliminating React hydration ref race conditions.
- Interactive time-scale hover slowdown (`timeScale: 0.15`) that restores smoothly on mouse leave.

### 3. Core Identity & Stats (`src/components/About.tsx`)
- Architectural grid layouts mapping personal narrative sections.
- Large, centered statistic counters (`14+` Godot prototypes, `850+` C# scripts) that animate on viewport entry.
- Dynamic color highlight overlays on hover (matte red and green base selections).

### 4. System Capabilities (`src/components/Skills.tsx`)
- Structured competency grids displaying specific developer fields.
- Progress bars animated dynamically using GSAP ScrollTrigger based on target capability levels.

### 5. Selected Projects (`src/components/Projects.tsx`)
- Neo-minimalist list accordion layout with architectural row dividers.
- Seamless hover mouse-tracking image reveal effect showing project screenshots.

### 6. Compiler Terminal Contact (`src/components/Contact.tsx`)
- Simulated developer contact console featuring standard inputs styled like terminal configurations.
- Real-time compiler logging simulator for connection status diagnostics.

---

## 🚀 Getting Started

To spin up a local development build:

1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Next.js local development server:
   ```bash
   npm run dev
   ```
4. Access the server at [http://localhost:3000](http://localhost:3000) (or the port allocated in console).

### Build Verification & Linting
Ensure code passes production compile checks and linting runs cleanly:
```bash
# Run ESLint validation
npm run lint

# Build the optimized production bundle
npm run build
```

---

## ⚙️ Development Guidelines

- **Typography & Variables**: Utilize `--font-mono` and `--font-sans` configured via Space Grotesk and JetBrains Mono.
- **Scroll Animations**: Keep animations scoped properly within components using the `useGSAP` hook with parent refs as selectors scope.
- **Color Palettes**: Avoid hardcoding arbitrary values outside of the thematic green (`#004d26`), sharp red (`#ff3333`), and base dark colors.
