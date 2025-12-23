import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './index.tsx',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Source Serif 4"', 'serif'],
        display: ['Rajdhani', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          light: 'hsl(var(--primary-light))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        /* ====================================================================
           Dynamic Studio Colors
           Estas cores usam CSS variables que são definidas automaticamente
           quando cada Studio é ativado no App.tsx.
           ==================================================================== */

        'studio-primary': 'hsl(var(--primary-color))',
        'studio-primary-dark': 'hsl(var(--primary-dark))',
        'studio-primary-light': 'hsl(var(--primary-light))',
        'studio-primary-lighter': 'hsl(var(--primary-lighter))',

        'studio-secondary': 'hsl(var(--secondary-color))',
        'studio-secondary-dark': 'hsl(var(--secondary-dark))',
        'studio-secondary-light': 'hsl(var(--secondary-light))',

        'studio-accent': 'hsl(var(--accent-color))',
        'studio-accent-dark': 'hsl(var(--accent-dark))',

        'studio-bg': 'hsl(var(--studio-bg))',
        'studio-card-bg': 'hsl(var(--studio-card-bg))',
        'studio-border': 'hsl(var(--studio-border))',

        'studio-text': 'hsl(var(--text-primary))',
        'studio-text-secondary': 'hsl(var(--text-secondary))',
        'studio-text-muted': 'hsl(var(--text-muted))',

        'status-success': 'hsl(var(--status-success))',
        'status-warning': 'hsl(var(--status-warning))',
        'status-error': 'hsl(var(--status-error))',
        'status-info': 'hsl(var(--status-info))',

        /* Brand Palette - Guide (Static) */
        'brand-gold': {
          DEFAULT: '#C9B298',
          dark: '#C9B298',
        },
        'brand-red': { DEFAULT: '#FF3B30', dark: '#FF453A' },
        'brand-orange': { DEFAULT: '#FF9500', dark: '#FF9F0A' },
        'brand-yellow': { DEFAULT: '#FFCC00', dark: '#FFD60A' },
        'brand-green': { DEFAULT: '#34C759', dark: '#30D158' },
        'brand-mint': { DEFAULT: '#00C7BE', dark: '#63E6E2' },
        'brand-teal': { DEFAULT: '#30B0C7', dark: '#40C8E0' },
        'brand-cyan': { DEFAULT: '#32ADE6', dark: '#64D2FF' },
        'brand-blue': { DEFAULT: '#007AFF', dark: '#0A84FF' },
        'brand-indigo': { DEFAULT: '#5856D6', dark: '#5E5CE6' },
        'brand-pink': { DEFAULT: '#FF2D55', dark: '#FF375F' },
        'brand-brown': { DEFAULT: '#A2845E', dark: '#AC8E68' },
      },
      backgroundImage: {
        'gold-gradient':
          'linear-gradient(135deg, #E4D8CA 0%, #C9B298 50%, #8D7556 100%)',
        'gold-shimmer':
          'linear-gradient(45deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 60%)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'button-shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.2s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s infinite',
        float: 'float 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'button-shimmer': 'button-shimmer 4s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
