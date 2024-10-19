import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      /**
       * I found this solution not universal because the best
       * variant for adaptive elements is using container queries
       * with use case context knowledge. But this is a good example.
       */
      containers: {
        xxs: '10.625rem', // 170px
        xs: '12.5rem', // 200px
        sm: '14.375rem', // 230px
        md: '16.25rem', // 260px
        lg: '18.125rem', // 290px
        xl: '20rem', // 320px
        '2xl': '21.875rem', // 350px
        '3xl': '23.75rem', // 380px
        '4xl': '25.625rem', // 410px
        '5xl': '27.5rem', // 440px
        '6xl': '29.375rem', // 470px
        '7xl': '31.25rem', // 500px
      },
      size: {
        icon: '6.25rem', // 100px
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        wg: {
          50: 'hsl(var(--wg-50))',
          100: 'hsl(var(--wg-100))',
          200: 'hsl(var(--wg-200))',
          300: 'hsl(var(--wg-300))',
          400: 'hsl(var(--wg-400))',
          500: 'hsl(var(--wg-500))',
          600: 'hsl(var(--wg-600))',
          700: 'hsl(var(--wg-700))',
          800: 'hsl(var(--wg-800))',
          900: 'hsl(var(--wg-900))',
          950: 'hsl(var(--wg-950))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        rotateSun: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(90deg)' },
        },
        rotateMoon: {
          '0%': { transform: 'rotate(-45deg)' },
          '100%': {},
        },
        show: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        rotateSun: 'rotateSun 0.3s ease-out both',
        rotateMoon: 'rotateMoon 0.3s ease-out both',
        show: 'show 0.25s ease-out both',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/container-queries')],
};
export default config;
