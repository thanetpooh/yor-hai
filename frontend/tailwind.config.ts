import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        skin: '#f6f3ee',
        card: '#fdfbf7',
        ink: {
          DEFAULT: '#1a1814',
          soft: '#5a544a',
          muted: '#8a8378',
        },
        rule: {
          DEFAULT: '#e6e0d4',
          strong: '#d8d1c2',
        },
        accent: {
          DEFAULT: '#c07939',
          ink: '#7a4a24',
          tint: '#f8f0e8',
        },
        danger: '#a83030',
      },
      fontFamily: {
        sans: ['"Geist"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        snipscan: {
          primary: '#1a1814',
          'primary-content': '#f6f3ee',
          secondary: '#c07939',
          'secondary-content': '#f6f3ee',
          accent: '#7a4a24',
          neutral: '#8a8378',
          'base-100': '#f6f3ee',
          'base-200': '#fdfbf7',
          'base-300': '#e6e0d4',
          'base-content': '#1a1814',
          error: '#a83030',
        },
      },
    ],
    darkTheme: false,
  },
}

export default config
