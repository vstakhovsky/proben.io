import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom green for CTAs (from screenshots)
        brand: {
          green: '#10B981',
          greenHover: '#059669',
        },
        // Editorial colors
        editorial: {
          background: '#FAFAFA',
          grid: '#E5E5E5',
          text: '#1A1A1A',
          muted: '#666666',
        }
      },
      fontFamily: {
        // Serif for headlines (premium editorial feel)
        serif: ['Georgia', 'serif'],
        sans: ['system-ui', 'sans-serif'],
      },
      backgroundImage: {
        // Light grid background pattern
        'grid-pattern': 'linear-gradient(to right, #E5E5E5 1px, transparent 1px), linear-gradient(to bottom, #E5E5E5 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
};

export default config;
