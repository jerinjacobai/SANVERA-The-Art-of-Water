/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Deep Luxury Architectural Teal Noir System
        void: '#031a1e',        // Primary deepest sanctuary teal-black
        char: '#062429',        // Secondary architectural teal stone
        graphite: '#092f35',    // Tertiary dark lagoon teal
        stone: '#d2dfdf',       // Pale mineral marble
        limestone: '#e2ecec',   // Soft architectural limestone
        brass: {
          DEFAULT: '#d4af37',   // Rich brushed gold
          light: '#f5df9a',
          dark: '#9a7526',
          muted: '#bfa163',
        },
        chrome: '#D8DEE4',
        bronze: '#20393d',
        teal: {
          DEFAULT: '#00808c',   // Signature PANTONE 321 U
          deep: '#004d54',      // Deep jewel teal
          dark: '#003a3f',      // Dark teal shadow
          light: '#00a3b0',     // Bright Aegean teal
          cyan: '#00c2d3',      // Luminous cyan-teal accent
          glow: '#2ee6f4',      // Ultra-bright water shimmer
          surface: '#082a30',   // Card background
        },
        ink: '#f8fafc',         // Crisp pure white typography
        mist: '#c0dcdd',        // Mineral sage-mist for secondary text
        smoke: '#789fa2',       // Muted cyan-smoke
        hair: 'rgba(0, 194, 211, 0.22)',
        hairLight: 'rgba(0, 194, 211, 0.42)',
        hairGold: 'rgba(212, 175, 55, 0.28)',
      },
      fontFamily: {
        display: ['"Inter Tight"', 'Inter', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['Inter', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.28em',
        widest3: '0.38em',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'drift-slow': 'drift 45s linear infinite',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
    },
  },
  plugins: [],
}
