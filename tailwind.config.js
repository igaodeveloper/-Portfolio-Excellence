/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        modern: {
          dark: "#121214",
          darker: "#0A0A0C",
          light: "#f5f5f5",
          white: "#ffffff",
          accent: "#6C63FF",
          accent2: "#00D2DF",
          gray: "#8F8F8F",
        },
        "modern-dark": "#0F172A",
        "modern-dark-800": "#1E293B",
        "modern-gray-400": "#94A3B8",
        "modern-gray-700": "#334155",
        "modern-gray-800": "#1E293B",
        "modern-white": "#F8FAFC",
        "modern-accent": "#3B82F6",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
            maxWidth: "none",
            color: "hsl(var(--foreground))",
            hr: {
              borderColor: "hsl(var(--border))",
              marginTop: "3em",
              marginBottom: "3em",
            },
            "h1, h2, h3, h4": {
              color: "hsl(var(--foreground))",
              fontWeight: "700",
            },
            h1: {
              fontSize: "2.25em",
              marginTop: "0",
              marginBottom: "0.8em",
              lineHeight: "1.1111111",
            },
            h2: {
              fontSize: "1.875em",
              marginTop: "2em",
              marginBottom: "1em",
              lineHeight: "1.3333333",
            },
            h3: {
              fontSize: "1.5em",
              marginTop: "1.6em",
              marginBottom: "0.6em",
              lineHeight: "1.6",
            },
            h4: {
              marginTop: "1.5em",
              marginBottom: "0.5em",
              lineHeight: "1.5",
            },
            pre: {
              backgroundColor: "hsl(var(--muted))",
              color: "hsl(var(--foreground))",
              borderRadius: "calc(var(--radius) - 2px)",
            },
            code: {
              color: "hsl(var(--foreground))",
              backgroundColor: "hsl(var(--muted))",
              padding: "0.2em 0.4em",
              borderRadius: "calc(var(--radius) - 4px)",
              fontWeight: "500",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            a: {
              color: "hsl(var(--primary))",
              textDecoration: "underline",
              fontWeight: "500",
            },
            "a:hover": {
              color: "hsl(var(--primary))",
              textDecoration: "none",
            },
            strong: {
              color: "hsl(var(--foreground))",
              fontWeight: "600",
            },
            img: {
              borderRadius: "calc(var(--radius) - 2px)",
            },
            blockquote: {
              color: "hsl(var(--muted-foreground))",
              borderLeftColor: "hsl(var(--border))",
            },
            "ul > li::marker": {
              color: "hsl(var(--muted-foreground))",
            },
            "ol > li::marker": {
              color: "hsl(var(--muted-foreground))",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};
