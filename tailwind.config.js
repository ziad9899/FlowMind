/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
        display: ['IBM Plex Sans Arabic', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#0B0F19',
          900: '#0E1424',
          800: '#111827',
          700: '#1A2233',
          600: '#232D44',
        },
        line: '#1F2A3D',
        text: {
          DEFAULT: '#F9FAFB',
          dim: '#9CA3AF',
          mute: '#6B7585',
        },
        brand: {
          DEFAULT: '#38BDF8',
          soft: '#0EA5E9',
          deep: '#0284C7',
        },
        ok: '#10B981',
        warn: '#F59E0B',
        bad: '#EF4444',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -8px rgba(0,0,0,0.5)',
        ring: '0 0 0 1px rgba(56,189,248,0.18), 0 12px 40px -12px rgba(56,189,248,0.25)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        flowDash: {
          to: { strokeDashoffset: '-24' },
        },
      },
      animation: {
        pulseDot: 'pulseDot 2.4s ease-in-out infinite',
        flowDash: 'flowDash 6s linear infinite',
      },
    },
  },
  plugins: [],
}
