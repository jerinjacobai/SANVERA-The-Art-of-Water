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
        void: '#14100c',
        char: '#1a1510',
        graphite: '#241c15',
        stone: '#d4c8b8',
        limestone: '#e4dacf',
        brass: {
          DEFAULT: '#d4af37',
          light: '#fae0a5',
          dark: '#9a7526',
          muted: '#bfa163',
        },
        chrome: '#D8DEE4',
        bronze: '#382c22',
        ink: '#fbf8f3',
        mist: '#c2b5a5',
        smoke: '#8a7c6c',
        hair: 'rgba(212, 175, 55, 0.18)',
        hairLight: 'rgba(212, 175, 55, 0.32)',
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
