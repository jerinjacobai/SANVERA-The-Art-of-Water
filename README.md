# SANVERA — The Art of Water

> *"Sanvera is a contemporary sanitaryware brand focused on the relationship between form, function and the ritual of water. Each piece begins as a drawing of movement — the arc of a stream, the pause before a tap is turned — and is resolved in solid brass, stone and glass."*

Official digital brand experience for **SANVERA**, designed as an editorial, high-end digital exhibition inspired by international luxury design, architecture, and automotive houses.

---

## 🌟 Key Features

- **Immersive Pinned 3D WebGL Hero**:
  - Procedurally modeled luxury sanitary fitting with curved cylindrical body, seamless arc neck, diamond knurling, and an architectural honed stone base.
  - Real-time PBR shaders (Brushed Brass, Polished Chrome, Dark Bronze, Honed Stone).
  - Continuous crystalline water flow simulation with optical refraction (IOR 1.333), transmission, surface impact ripples, and cascading water droplets.
- **Scroll Choreography**:
  - Controlled 4-stage narrative progression (`01 Form`, `02 Material`, `03 Water`, `04 Ritual`) tied to smooth scroll scrub.
  - Left-aligned vertical progress tracking line with active stage indicators (responsive to bottom pill on mobile).
- **Signature "Drawing → Geometry → Model → Object" Metamorphosis**:
  - Interactive slider allowing users to scrub between hand-drawn gestural ink stroke, parametric CAD blueprint vectors, 3D wireframe mesh topology, and the resolved solid brass fitting.
- **Tactile Materiality Explorer**:
  - Interactive deep-dive into the four core materials: Solid Brass, Honed Stone, Smoked Float Glass, and Living Water.
- **Editorial Collection & Cursor Previews**:
  - Six architectural families with hover title transitions and floating desktop cursor-following image previews.
- **Interactive 3D Product Detail Inspector**:
  - Dedicated 3D viewport with OrbitControls, live finish switcher, technical dimensions, specifications, and direct project enquiry actions.
- **Architectural Context & Film Section**:
  - Monolithic bathroom environments photographed in St. Moritz, Kyoto, Capri, and Copenhagen.
  - Interactive cinematic player and continuous slow-drifting typography marquee.
- **Architectural Studio Project Enquiry**:
  - Tailored consultation form for architects and developers with real-time feedback and pre-filling capabilities.
- **Micro-Interactions**:
  - Smooth inertia scrolling via **Lenis**.
  - Custom trailing cursor with contextual states (`VIEW`, `DRAG`, `EXPLORE`).

---

## 🛠️ Tech Stack

- **Framework**: React 18, TypeScript, Vite
- **3D & WebGL**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Animation & Scroll**: GSAP, Lenis Smooth Scroll
- **Styling**: Tailwind CSS, PostCSS, Custom luxury CSS variables
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/jerinjacobai/SANVERA-The-Art-of-Water.git
cd SANVERA-The-Art-of-Water

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Build for Production
```bash
npm run build
```
Generates an optimized static production bundle in the `/dist` directory.

---

## 📄 License
Private & Confidential — © 2026 SANVERA DESIGN HOUSE. All rights reserved.
