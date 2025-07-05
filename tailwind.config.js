/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'polaris-blue': '#00D0FF',
        'nebula-violet': '#4C00FF',
        'dark-bg': '#0A0A0F',
        'dark-card': '#1A1A2E',
        'dark-border': '#2A2A3E',
      },
      fontFamily: {
        'satoshi': ['Satoshi', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
      },
      backgroundImage: {
        'mesh-gradient': 'linear-gradient(135deg, #00D0FF 0%, #4C00FF 100%)',
        'dark-mesh': 'linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 50%, #2A2A3E 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 208, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 208, 255, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}