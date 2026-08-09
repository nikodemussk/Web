/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Quicksand"', 'sans-serif'],
        body: ['"Nunito"', 'sans-serif'],
        terminal: ['"VT323"', 'monospace'],
        pixel: ['"Press Start 2P"', 'monospace'],
        handwritten: ['"Caveat"', 'cursive'],
      },
      colors: {
        ghibli: {
          sky: '#bfe3f2',
          dusk: '#f4a988',
          night: '#1c2541',
          leaf: '#5b8c5a',
          bark: '#6b4a3a',
          cream: '#fdf6e9',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(3deg)' },
        },
        drift: {
          '0%': { transform: 'translateX(-10vw)' },
          '100%': { transform: 'translateX(110vw)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-6deg)' },
          '50%': { transform: 'rotate(6deg)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' },
          '50%': { filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.9))' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'float 10s ease-in-out infinite',
        drift: 'drift 18s linear infinite',
        sway: 'sway 4s ease-in-out infinite',
        wiggle: 'wiggle 0.6s ease-in-out infinite',
        blink: 'blink 1s steps(1) infinite',
        marquee: 'marquee 12s linear infinite',
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
