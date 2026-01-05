export const globalsCss = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* === BACKGROUNDS === */
    --background: 0 0% 100%;           /* #FFFFFF */
    --foreground: 0 0% 9%;             /* #161616 */

    /* === CARDS & SURFACES === */
    --card: 0 0% 100%;                 /* #FFFFFF */
    --card-foreground: 0 0% 9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 9%;

    /* === PRIMARY/ACCENT - Gold #C9B298 === */
    --primary: 32 27% 69%;
    --primary-light: 32 27% 85%;       /* Lighter variant for gradients */
    --primary-foreground: 30 20% 11%;  /* #1F1B16 */
    --accent: 32 27% 69%;
    --accent-foreground: 30 20% 11%;
    --ring: 32 27% 69%;

    /* === SECONDARY === */
    --secondary: 0 0% 96%;             /* #F5F5F5 */
    --secondary-foreground: 0 0% 9%;

    /* === MUTED === */
    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 45%;      /* #737373 */

    /* === SEMANTIC COLORS === */
    --destructive: 4 100% 59%;         /* #FF3B30 */
    --destructive-foreground: 0 0% 100%;
    --success: 142 69% 49%;            /* #34C759 */
    --success-foreground: 0 0% 100%;
    --warning: 35 100% 50%;            /* #FF9500 */
    --warning-foreground: 30 20% 11%;
    --info: 211 100% 50%;              /* #007AFF */
    --info-foreground: 0 0% 100%;

    /* === UTILITIES === */
    --border: 0 0% 90%;                /* #E5E5E5 */
    --input: 0 0% 90%;

    /* === RADIUS - ROUNDED === */
    --radius: 0.75rem; /* Increased slightly to 12px for softer look */
  }

  .dark {
    /* === BACKGROUNDS === */
    --background: 240 5% 4%;             /* #0A0A0B - Richer Black */
    --foreground: 0 0% 98%;            /* #FAFAFA */

    /* === CARDS & SURFACES === */
    --card: 240 4% 8%;                   /* #141415 */
    --card-foreground: 0 0% 98%;
    --popover: 240 4% 8%;
    --popover-foreground: 0 0% 98%;

    /* === PRIMARY/ACCENT - Gold (mantém) === */
    --primary: 32 27% 69%;
    --primary-light: 32 27% 85%;
    --primary-foreground: 30 20% 11%;
    --accent: 32 27% 69%;
    --accent-foreground: 30 20% 11%;
    --ring: 32 27% 69%;

    /* === SECONDARY === */
    --secondary: 0 0% 15%;             /* #262626 */
    --secondary-foreground: 0 0% 98%;

    /* === MUTED === */
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 64%;      /* #A3A3A3 */

    /* === SEMANTIC COLORS (Dark variants) === */
    --destructive: 4 100% 62%;         /* #FF453A */
    --destructive-foreground: 0 0% 100%;
    --success: 142 76% 51%;            /* #30D158 */
    --success-foreground: 0 0% 100%;
    --warning: 37 100% 52%;            /* #FF9F0A */
    --warning-foreground: 30 20% 11%;
    --info: 211 100% 52%;              /* #0A84FF */
    --info-foreground: 0 0% 100%;

    /* === UTILITIES === */
    --border: 0 0% 16%;
    --input: 0 0% 20%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-serif antialiased;
  }
  h1, h2, h3, h4, h5, h6, button, input, select, label {
    @apply font-sans;
  }
}`;

export const tailwindConfig = `import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Source Serif 4"', 'serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderColor: {
        DEFAULT: "hsl(var(--border))",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        // Brand Palette - Guide
        "brand-gold": {
          50: "#F2EBE4", 100: "#E4D8CA", 200: "#D7C5B1", 300: "#C9B298",
          400: "#BAA080", 500: "#AC8E68", 600: "#8D7556", 700: "#6F5D45",
          800: "#534635", 900: "#383025", 950: "#1F1B16", DEFAULT: "#C9B298",
        },
        "brand-red": { DEFAULT: "#FF3B30", dark: "#FF453A" },
        "brand-orange": { DEFAULT: "#FF9500", dark: "#FF9F0A" },
        "brand-yellow": { DEFAULT: "#FFCC00", dark: "#FFD60A" },
        "brand-green": { DEFAULT: "#34C759", dark: "#30D158" },
        "brand-mint": { DEFAULT: "#00C7BE", dark: "#63E6E2" },
        "brand-teal": { DEFAULT: "#30B0C7", dark: "#40C8E0" },
        "brand-cyan": { DEFAULT: "#32ADE6", dark: "#64D2FF" },
        "brand-blue": { DEFAULT: "#007AFF", dark: "#0A84FF" },
        "brand-indigo": { DEFAULT: "#5856D6", dark: "#5E5CE6" },
        "brand-pink": { DEFAULT: "#FF2D55", dark: "#FF375F" },
        "brand-brown": { DEFAULT: "#A2845E", dark: "#AC8E68" },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E4D8CA 0%, #C9B298 50%, #8D7556 100%)',
        'gold-shimmer': 'linear-gradient(45deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 60%)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "shimmer": {
          "100%": { transform: "translateX(100%)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "button-shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        },
        "spin-slow": {
          "from": { transform: "rotate(0deg)" },
          "to": { transform: "rotate(360deg)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.2s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "pulse-slow": "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s infinite",
        "float": "float 3s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "button-shimmer": "button-shimmer 4s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config`;

export const utilsCode = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

export const dependenciesCommand = 'npm install tailwindcss-animate class-variance-authority clsx tailwind-merge date-fns';
