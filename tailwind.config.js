/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vortex: {
          /* Primary site-wide theme — electric purple adapted for light mode */
          purple: '#7C3AED',
          'purple-glow': 'rgba(124,58,237,0.15)',
          /* Kept for InstitutePage (AI Institute) only */
          green: '#9ECB3B',
          'green-glow': 'rgba(158,203,59,0.15)',
          /* Neutrals for Light Theme */
          black: '#F8FAFC',
          charcoal: '#FFFFFF',
          gray: '#0F172A',
          white: '#020617',
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
        /* Purple glow — updated for light mode */
        'glow': '0 10px 30px -5px rgba(124,58,237,0.25)',
        'glow-lg': '0 20px 50px -10px rgba(124,58,237,0.3)',
        'glow-sm': '0 4px 20px -2px rgba(124,58,237,0.2)',
        /* Green glow — updated for light mode */
        'glow-green': '0 10px 30px -5px rgba(158,203,59,0.25)',
        'glow-green-lg': '0 20px 50px -10px rgba(158,203,59,0.3)',
        'glow-green-sm': '0 4px 20px -2px rgba(158,203,59,0.2)',
      },
    },
  },
  plugins: [],
};
