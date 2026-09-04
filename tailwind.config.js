/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      opacity: Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i / 100}`])),
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--void))',
        foreground: 'hsl(var(--bone))',
        bone: 'hsl(var(--bone))',
        steel: 'hsl(var(--steel))',
        void: 'hsl(var(--void))',
        blood: 'hsl(var(--blood))',
        gold: 'hsl(var(--gold))',
        'shadow-1': 'hsl(var(--shadow-1))',
        'shadow-2': 'hsl(var(--shadow-2))',
        'shadow-3': 'hsl(var(--shadow-3))',
        card: {
          DEFAULT: 'hsl(var(--shadow-1))',
          foreground: 'hsl(var(--bone))'
        },
        popover: {
          DEFAULT: 'hsl(var(--shadow-1))',
          foreground: 'hsl(var(--bone))'
        },
        primary: {
          DEFAULT: 'hsl(var(--bone))',
          foreground: 'hsl(var(--void))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--shadow-2))',
          foreground: 'hsl(var(--bone))'
        },
        muted: {
          DEFAULT: 'hsl(var(--shadow-2))',
          foreground: 'hsl(var(--steel))'
        },
        accent: {
          DEFAULT: 'hsl(var(--shadow-3))',
          foreground: 'hsl(var(--bone))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--blood))',
          foreground: 'hsl(var(--bone))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--bone))',
        chart: {
          '1': 'hsl(var(--blood))',
          '2': 'hsl(var(--gold))',
          '3': 'hsl(var(--steel))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--shadow-1))',
          foreground: 'hsl(var(--bone))',
          primary: 'hsl(var(--bone))',
          'primary-foreground': 'hsl(var(--void))',
          accent: 'hsl(var(--shadow-3))',
          'accent-foreground': 'hsl(var(--bone))',
          border: 'hsl(var(--border))',
          ring: 'hsl(var(--bone))'
        }
      },
      fontFamily: {
        heading: ['Inter Tight', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter Tight', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter Tight', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'mega': '-0.06em'
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
