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
        void: '#050505',
        char: '#0B0C0D',
        graphite: '#151719',
        stone: '#B8AEA0',
        limestone: '#D8D0C5',
        brass: {
          DEFAULT: '#A8875A',
          light: '#C5A059',
          dark: '#856A44',
          muted: '#8A7558',
        },
        chrome: '#D8DEE4',
        bronze: '#2E2721',
        ink: '#F2F0EA',
        mist: '#A9ADB0',
        smoke: '#6E7276',
        hair: 'rgba(255, 255, 255, 0.08)',
        hairLight: 'rgba(255, 255, 255, 0.16)',
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
