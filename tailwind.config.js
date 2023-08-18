/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--theme-background) / <alpha-value>)',
        foreground: {
          50: 'hsl(var(--theme-foreground-50) / <alpha-value>)',
          100: 'hsl(var(--theme-foreground-100) / <alpha-value>)',
          200: 'hsl(var(--theme-foreground-200) / <alpha-value>)',
          300: 'hsl(var(--theme-foreground-300) / <alpha-value>)',
          400: 'hsl(var(--theme-foreground-400) / <alpha-value>)',
          500: 'hsl(var(--theme-foreground-500) / <alpha-value>)',
          600: 'hsl(var(--theme-foreground-600) / <alpha-value>)',
          700: 'hsl(var(--theme-foreground-700) / <alpha-value>)',
          800: 'hsl(var(--theme-foreground-800) / <alpha-value>)',
          900: 'hsl(var(--theme-foreground-900) / <alpha-value>)',
        }
      }
    },
  },
  plugins: [],
}
