# Walkthrough — SANVERA: The Art of Water
## Complete 3-Experience Brand Platform & 38-Product Catalogue Integration

The official digital brand platform for **SANVERA** has been successfully upgraded, extended, and productionized. The existing Experience 01 has been fully preserved and elevated, while Experience 02 and Experience 03 have been brought into alignment with the real Sanvera product catalogue, featuring seamless transitions and isolated 3D WebGL scenes.

---

## 1. Executive Summary & Live Status

- **Remote Git Repository**: [GitHub Repository](https://github.com/jerinjacobai/SANVERA-The-Art-of-Water.git) (Synced and pushed on branch `main` at commit `0d60cbd`).
- **Production Build**: Verified clean with TypeScript (`tsc`) and Vite (`vite build`) with **0 errors**.
- **Live Development Server**: Active and running at `http://localhost:5173/` (Network: `http://192.168.29.116:5173/`).
- **WebGL Lifecycle Isolation**: Only the active experience's `<Canvas>` is mounted. When switching experiences, the departing scene unmounts and disposes Three.js geometries, materials, and textures cleanly during an 1150ms luxury transition veil.

---

## 2. The Three Brand Experiences

```
                               ┌──────────────────────────────────────────────┐
                               │       SANVERA SHARED INFRASTRUCTURE          │
                               │  - 38-PRODUCT CATALOGUE (9 FAMILIES)         │
                               │  - PBR MATERIAL DEFINITIONS                  │
                               │  - LENIS SMOOTH SCROLL                       │
                               │  - GLOBAL LUXURY CURSOR & LIVE SEARCH        │
                               └──────────────────────┬───────────────────────┘
                                                      │
         ┌────────────────────────────────────────────┼────────────────────────────────────────────┐
         │                                            │                                            │
         ▼                                            ▼                                            ▼
┌─────────────────────────────────┐   ┌─────────────────────────────────┐   ┌─────────────────────────────────┐
│         EXPERIENCE 01           │   │         EXPERIENCE 02           │   │         EXPERIENCE 03           │
│       THE ART OF WATER          │   │      THE SANVERA SHOWROOM       │   │        SANVERA / MOTION         │
│   (Editorial Brand Monograph)   │   │  (Interactive 3D Pavilion)      │   │  (9-Chapter Digital Film)       │
│ ─────────────────────────────── │   │ ─────────────────────────────── │   │ ─────────────────────────────── │
│ • 4-Stage Hero Scroll Canvas    │   │ • 3D Architectural Pavilion     │   │ • 9-Chapter Narrative Arc       │
│ • Drawing-to-Brass Morphing     │   │ • CatmullRom Spline Tour (6-Stops)│ • Spline Vector to Resolved Mesh│
│ • Water Ribbon Particle Flow    │   │ • Real-Time Telemetry HUD       │   │ • Auto-Play Film & Scrub Bar    │
│ • Real 34-Item Filtered Grid    │   │ • Clickable Product Pedestals   │   │ • Interactive Finish Switcher   │
│ • Cursor Hover Floating Preview │   │ • Blueprint CAD Elevation Panel │   │ • Climax 3D Product Inspector   │
└─────────────────────────────────┘   └─────────────────────────────────┘   └─────────────────────────────────┘
```

---

## 3. Key Upgrades Delivered

### A. Authentic Sanvera Product Catalogue (`src/data/sanveraCatalog.ts`)
Normalized 34 authentic products across all 9 official Sanvera families:
1. **Faucets & Mixers**:
   - `661 Series Basin Mixer`
   - `662 Series Basin Mixer`
   - `663 Series Basin Mixer`
   - `664 Series Signature Precision Mixer`
   - `665 Series Tall Basin Mixer`
   - `666 Series Waterfall Mixer`
   - `Basin Faucet (Single-Hole)`
   - `2/3-Hole Deck-Mounted Basin Mixer`
   - `Concealed Wall-Mounted Basin Mixer`
   - `Bathtub Faucet & Hand Shower Set`
   - `Concealed Kitchen Mixer with Pull-Out Spray`
2. **Showers**:
   - `Concealed Shower System 5061 (Dual-Dial Thermostatic)`
   - `Concealed Shower System 5148 (Push-Button Diverter)`
   - `Concealed Square Shower Set`
   - `5-Function Hydro-Massage Shower Panel`
   - `Exposed Architectural Shower Column`
   - `Ultra-Slim Stainless Steel Rain Shower Head`
   - `Concealed Shower Set 1`
3. **Basins & Sanitary Ceramic**:
   - `Ceramic Countertop Vessel Basin`
   - `Monolithic Freestanding Pedestal Sink`
4. **Bathtubs**:
   - `Freestanding Acrylic & Stone Oval Bathtub`
5. **Toilets & Bidets**:
   - `Wall-Hung Rimless Architectural Toilet`
6. **Smart Mirrors**:
   - `Ambient LED Backlit Smart Mirror`
   - `Articulated Dual-Arm Cosmetic Makeup Mirror`
7. **Accessories & Hardware**:
   - `Series 73 Brass Towel Bar & Ring`
   - `Series 87 Minimal Robe Hook`
   - `Series 88 Heavy Brass Glass Shelf`
   - `Series 89 Corner Shower Basket`
   - `Series 893 Liquid Soap Dispenser`
   - `Series 98 Modern Toilet Brush Holder`
   - `Wall-Mounted Storage Rack & Paper Holder`
8. **Drainage & Plumbing**:
   - `Architectural Linear Tile-In Floor Drain`
   - `Pop-Up Click-Clack Basin Drain Assembly`
9. **Commercial & Public Area**:
   - `Touchless Infrared Public Sensor Faucet`

### B. Experience 01: The Art of Water
- Preserved the full 4-stage hero scroll choreography, procedural fluid simulation, and drawing-to-brass morphing.
- Replaced placeholder items in [CollectionSection.tsx](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/sections/CollectionSection.tsx) with genuine Sanvera items.
- Added 9 category filter pills, real-time query search, live counts, smooth pagination, and cursor-following floating preview card.

### C. Experience 02: The Sanvera Showroom
- Updated [ShowroomCanvas.tsx](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/experiences/ShowroomCanvas.tsx) and [ExperienceSpatialShowroom.tsx](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/experiences/ExperienceSpatialShowroom.tsx) with authentic Sanvera products assigned to their respective spatial zones.
- Interactive pedestals for the `664 Series Signature Precision Mixer`, `Concealed Shower System 5061`, `Freestanding Oval Bathtub`, and `Touchless Infrared Sensor Faucet`.
- Integrated CatmullRom spline tour, real-time spatial telemetry HUD ($X/Y/Z$), free 360° orbit control, and architectural blueprint elevations.

### D. Experience 03: Sanvera / Motion
- Built [ExperienceMotion.tsx](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/experiences/ExperienceMotion.tsx) and [MotionCanvas.tsx](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/experiences/MotionCanvas.tsx).
- 450vh scroll-pinned timeline unfolding across 9 distinct chapters:
  - **01 / LINE**: The gestural ink stroke recording water's parabolic arc.
  - **02 / CURVE**: Mathematical fluid streamlines and internal bore tangents.
  - **03 / FORM**: Polygonal CAD wireframe topology and structural balance.
  - **04 / MATERIAL**: Cold-forged brass billets and tactile knurled finishes.
  - **05 / WATER**: Swiss laminar flow release without micro-turbulence.
  - **06 / PRODUCT**: The physical 664 Series mixer resolved in space.
  - **07 / SPACE**: Installed within brutalist honed limestone architecture.
  - **08 / RITUAL**: The physical turn, acoustic silence, and tactile interaction.
  - **09 / SANVERA**: Monograph climax uniting all thirty-four catalogue pieces.
- Features film auto-play toggle, interactive timeline scrubber, chapter navigation buttons, finish preview switcher, and one-click 3D product inspection.

### E. Transition Choreography & Experience Switcher
- Built [ExperienceTransitionOverlay.tsx](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/layout/ExperienceTransitionOverlay.tsx): 1150ms choreographed veil with an animated water-line horizon beam, deep backdrop blur, and Sanvera logo reveal.
- Updated [ExperienceSwitcher.tsx](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/layout/ExperienceSwitcher.tsx): floating dock, mobile touch-friendly drawer, and keyboard shortcuts (`1`, `2`, `3`).
- Bidirectional URL routing with browser history support (`?exp=1|2|3` and `#art-of-water`, `#showroom`, `#motion`).

---

## 4. How to View & Test

1. Open your browser and navigate to:
   - **Experience 01**: [`http://localhost:5173/?exp=1#art-of-water`](http://localhost:5173/?exp=1#art-of-water)
   - **Experience 02**: [`http://localhost:5173/?exp=2#showroom`](http://localhost:5173/?exp=2#showroom)
   - **Experience 03**: [`http://localhost:5173/?exp=3#motion`](http://localhost:5173/?exp=3#motion)
2. Use the floating switcher at the bottom center to trigger the luxury transition veil.
3. Press keys `1`, `2`, or `3` on your keyboard for instant switching.
4. On Experience 01, test the category filter pills (`All`, `Faucets & Mixers`, `Showers`, `Basins`, `Bathtubs`, etc.) and the search bar.
5. On Experience 02, click **Start Guided Spline Tour** or click individual pedestals to inspect items.
6. On Experience 03, click **Play Film** to watch the automated 9-chapter cinematic scrub, or drag the scrub bar.
