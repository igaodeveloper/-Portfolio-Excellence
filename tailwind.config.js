/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
      colors: {
        // Definições de cores principais
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
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
        modern: {
          dark: '#121214',
          darker: '#0A0A0C',
          light: '#f5f5f5',
          white: '#ffffff',
          accent: '#6C63FF',
          accent2: '#00D2DF',
          gray: '#8F8F8F',
        },
        'modern-dark': '#0F172A',
        'modern-dark-800': '#1E293B',
        'modern-gray-400': '#94A3B8',
        'modern-gray-700': '#334155',
        'modern-gray-800': '#1E293B',
        'modern-white': '#F8FAFC',
        'modern-accent': '#3B82F6',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
        // Adicionando animações mais complexas
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'scale-up': {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-up': 'scale-up 0.3s ease-out',
      },
      typography: {
        modern: {
          css: {
            '--tw-prose-body': '#F8FAFC',
            '--tw-prose-headings': '#F8FAFC',
            '--tw-prose-lead': '#94A3B8',
            '--tw-prose-links': '#3B82F6',
            '--tw-prose-bold': '#F8FAFC',
            '--tw-prose-counters': '#94A3B8',
            '--tw-prose-bullets': '#94A3B8',
            '--tw-prose-hr': '#334155',
            '--tw-prose-quotes': '#F8FAFC',
            '--tw-prose-quote-borders': '#3B82F6',
            '--tw-prose-captions': '#94A3B8',
            '--tw-prose-code': '#F8FAFC',
            '--tw-prose-pre-code': '#F8FAFC',
            '--tw-prose-pre-bg': '#1E293B',
            '--tw-prose-th-borders': '#334155',
            '--tw-prose-td-borders': '#334155',
          },
        },
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'hsl(var(--foreground))',
            hr: {
              borderColor: 'hsl(var(--border))',
              marginTop: '3em',
              marginBottom: '3em',
            },
            h1: {
              fontSize: '2.25em',
              marginTop: '0',
              marginBottom: '0.8em',
              lineHeight: '1.1111111',
              fontWeight: '800',
            },
            h2: {
              fontSize: '1.875em',
              marginTop: '2em',
              marginBottom: '1em',
              lineHeight: '1.3333333',
              fontWeight: '700',
            },
            h3: {
              fontSize: '1.5em',
              marginTop: '1.6em',
              marginBottom: '0.6em',
              lineHeight: '1.6',
              fontWeight: '600',
            },
            pre: {
              backgroundColor: 'hsl(var(--muted))',
              color: 'hsl(var(--foreground))',
              borderRadius: 'calc(var(--radius) - 2px)',
              padding: '1em',
            },
            code: {
              color: 'hsl(var(--foreground))',
              backgroundColor: 'hsl(var(--muted))',
              padding: '0.3em 0.5em',
              borderRadius: 'calc(var(--radius) - 4px)',
              fontWeight: '600',
            },
            a: {
              color: 'hsl(var(--primary))',
              textDecoration: 'underline',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            },
            'a:hover': {
              color: 'hsl(var(--primary))',
              textDecoration: 'none',
            },
            img: {
              borderRadius: 'calc(var(--radius) - 2px)',
              transition: 'transform 0.3s ease-in-out',
            },
            blockquote: {
              color: 'hsl(var(--muted-foreground))',
              borderLeftColor: 'hsl(var(--border))',
              borderLeftWidth: '4px',
              paddingLeft: '1em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    // Plugin para suportar customizações de animações
    require('@tailwindcss/forms'),
    require('tailwindcss-gradient'),
  ],
};
