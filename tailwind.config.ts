import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#0F172A',
        tertiary: '#DC2626',
        surface: '#F8FAFC',
        border: '#E2E8F0',
        muted: '#64748B'
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        xl: '1rem',
      }
    }
  },
  plugins: []
}
export default config
