# Walkthrough — The Sanvera Flagship Showroom & Category 3D Models

The **Sanvera Showroom** has been completely reimagined as the primary flagship destination of the brand platform. The previous issue where every product defaulted to a generic faucet pipe has been eliminated by creating dedicated, high-fidelity 3D procedural models for each product category, and populating the 68-meter architectural pavilion with 7 interactive 3D product exhibition stations.

---

## 1. Flagship Transformation & Default Experience

- **Primary Destination**: Visitors landing on `http://localhost:5173/` or [`https://sanvera.vercel.app`](https://sanvera.vercel.app) now land directly inside **The Sanvera Showroom** (`Experience 02`).
- **Smooth Navigation**: Experiences 01 (The Art of Water) and 03 (Motion) remain accessible via the luxury switcher dock, URL query parameters, and keyboard shortcuts (`1`, `2`, `3`).

---

## 2. Dedicated 3D Category Models (No More Single Pipe Model)

In [`src/components/three/ProductModel.tsx`](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/three/ProductModel.tsx), a category-aware dispatcher now routes each product to its dedicated 3D component:

| Product Category | Component | 3D Interactive Features |
| :--- | :--- | :--- |
| **Bathtubs** | [`BathtubModel.tsx`](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/three/BathtubModel.tsx) | Sculptural double-ended oval soaking tub in honed mineral composite stone, water level, pop-up floor drain, and floor-mounted curved brass spout with handheld stick shower and active water stream. |
| **Showers** | [`ShowerModel.tsx`](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/three/ShowerModel.tsx) | Concealed 5061 wall system with recessed dual-dial thermostatic plate (diamond-knurled knobs), 300mm ultra-slim overhead rain shower canopy, and multi-drop falling rainfall water curtain. |
| **Basins & Sinks** | [`BasinModel.tsx`](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/three/BasinModel.tsx) | Honed ceramic vessel countertop basin with water pool, monolithic stone vanity column, and tall architectural basin mixer in matching alloy finish. |
| **Sanitaryware & Toilets** | [`ToiletModel.tsx`](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/three/ToiletModel.tsx) | Cantilevered wall-hung rimless architectural toilet with slim soft-close ergonomic seat and rear concealed wall module with dual-flush brass plate. |
| **Smart Mirrors** | [`MirrorModel.tsx`](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/three/MirrorModel.tsx) | Floating ambient LED backlit smart mirror with warm radial glow halo, touch sensor indicator, and polished brass perimeter trim. |
| **Accessories & Hardware** | [`AccessoryModel.tsx`](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/three/AccessoryModel.tsx) | Series 73 architectural brass towel bar, Series 87 minimalist robe hook duo, and stone mounting plate. |
| **Drainage Systems** | [`DrainageModel.tsx`](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/three/DrainageModel.tsx) | Precision linear tile-in floor drain with brushed grate insert and perimeter drainage slot. |
| **Faucets & Series Mixers** | [`ProceduralFaucet.tsx`](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/three/ProceduralFaucet.tsx) | Flagship 664 series precision mixer with joystick control, diamond-knurling band, and Swiss laminar flow stream. |

---

## 3. The 7 Exhibition Stations in the 3D Showroom Pavilion

The 68-meter architectural pavilion in [`ShowroomCanvas.tsx`](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/experiences/ShowroomCanvas.tsx) now features 7 interactive stations:

1. **Station 00 — Approach & Forecourt (`z = 18`, `x = -4.5`)**:
   - Monolithic basalt plinth in front of the reflecting pool showcasing the `Public Area Touchless Sensor Faucet` (`#34`).
   - Clickable 3D Hotspot: `34 · Public Sensor Faucet`.
2. **Station 01 — Central Signature Faucet Altar (`z = 4`, `x = 0`)**:
   - Central cylindrical plinth featuring the flagship `664 Series Signature Precision Mixer` (`#04`) with active laminar water flow.
   - Clickable 3D Hotspot: `04 · 664 Signature Mixer`.
3. **Station 02 — Basins & Pedestals Gallery (`z = -8`, `x = -5.0`)**:
   - Architectural vanity featuring the `Monolithic Pedestal Sink` (`#20`) and `Ceramic Countertop Basin` (`#19`).
   - Clickable 3D Hotspot: `20 · Monolithic Pedestal Sink`.
4. **Station 03 — Concealed Shower Wellness Suite (`z = -18`, `x = 5.0`)**:
   - Private stone alcove with the `Concealed Shower System 5061` (`#12`), overhead 300mm rain disk, and falling rainfall.
   - Clickable 3D Hotspot: `12 · Shower System 5061`.
5. **Station 04 — Ceramic & Sanitary Wing (`z = -28`, `x = -5.0`)**:
   - Cantilevered wall module showcasing the `Wall-Hung Rimless Architectural Toilet` (`#22`) with dual flush plate.
   - Clickable 3D Hotspot: `22 · Wall-Hung Rimless Toilet`.
6. **Station 05 — Optics & Hardware Suite (`z = -28`, `x = 5.0`)**:
   - Floating `Ambient LED Backlit Smart Mirror` (`#23`) with radiant light halo and brass towel hardware.
   - Clickable 3D Hotspot: `23 · Ambient Smart Mirror`.
7. **Station 06 — Freestanding Bath Sanctuary (`z = -38`, `x = 0`)**:
   - The grand climax at the northern panoramic glass curtain wall: `Freestanding Oval Bathtub` (`#21`) with floor mixer spout and linear drain.
   - Clickable 3D Hotspot: `21 · Freestanding Oval Bathtub`.

---

## 4. In-Showroom Interactive Product Tray

[`ExperienceSpatialShowroom.tsx`](file:///c:/Users/jacob/OneDrive/Documents/Sanvera/src/components/experiences/ExperienceSpatialShowroom.tsx) now includes a floating **Fittings Exhibited in this Wing** drawer:
- Displays thumbnails of the authentic products present in the active zone.
- Clicking any card or clicking any 3D pin in the scene immediately launches the `ProductViewerModal` preloaded with that product's dedicated 3D model.
- Switching to the **Studio Archive** tab in the modal shows the high-resolution authentic photograph directly from the `SANVERA CATALOGUE`.

---

## 5. Live Status & Verification

- **GitHub Repository**: [`https://github.com/jerinjacobai/SANVERA-The-Art-of-Water.git`](https://github.com/jerinjacobai/SANVERA-The-Art-of-Water.git)
- **Latest Commit**: [`441fa88`](https://github.com/jerinjacobai/SANVERA-The-Art-of-Water/commit/441fa88) (`feat(showroom): elevate Showroom to flagship experience with 7 interactive 3D product stations, category-specific 3D procedural models, and zone product tray`)
- **TypeScript & Vite Build**: Passed with **0 errors** in 25.61s.
- **Local Dev Server**: Live at [http://localhost:5173/](http://localhost:5173/)
