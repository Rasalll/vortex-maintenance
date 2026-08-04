/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vortex: {
          green: '#76F500',
          'green-glow': 'rgba(118,245,0,0.25)',
          black: '#0B0B0B',
          charcoal: '#151515',
          gray: '#EAEAEA',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in': 'fadeIn 0.8s ease forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'spin-slow': 'spin 24s linear infinite',
        'spin-slower': 'spin 40s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gradient-x': 'gradientX 8s ease infinite',
        'marquee': 'marquee 30s linear infinite',
        'orbit': 'orbit 16s linear infinite',
        'blink': 'blink 1.4s steps(2) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.06)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientX: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
      },
      boxShadow: {
        'glow': '0 0 30px rgba(118,245,0,0.35)',
        'glow-lg': '0 0 60px rgba(118,245,0,0.45)',
        'glow-sm': '0 0 15px rgba(118,245,0,0.3)',
      },
    },
  },
  plugins: [],
};
