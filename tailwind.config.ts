import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#000000',
          surface: '#081c2b',
          'surface-hover': '#0a2333',
          'surface-code': '#020b14',
          border: 'rgba(15, 50, 72, 1)',
          'border-subtle': 'rgba(15, 50, 72, 0.5)',
          text: '#e2e8f0',
          'text-muted': '#94a3b8',
          'text-dim': '#64748b',
          accent: '#22d3ee',
          'accent-light': '#67e8f9',
          'accent-dark': '#0891b2',
          'accent-glow': 'rgba(34, 211, 238, 0.08)',
          'accent-glow-bright': 'rgba(34, 211, 238, 0.15)',
          success: '#00e5cc',
          red: '#ef4444',
          green: '#22c55e',
          blue: '#93c5fd',
        },
        seaportal: {
          50: '#e6fbff',
          100: '#b3f1ff',
          200: '#80e6ff',
          300: '#4ddcff',
          400: '#1ad2ff',
          500: '#03122c',
          600: '#000000',
          700: '#041731',
          800: '#00375a',
          900: '#000000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
        lg: '16px',
      },
      spacing: {
        'header': '64px',
      },
      boxShadow: {
        glow: '0 0 40px rgba(34, 211, 238, 0.12)',
        'glow-lg': '0 0 60px rgba(34, 211, 238, 0.18)',
      },
      fontSize: {
        'code-sm': '0.82rem',
        'code-label': '0.72rem',
      },
      lineHeight: {
        'code': '1.8',
      },
      scale: {
        '98': '0.98',
      },
      transitionTimingFunction: {
        'snappy': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
