/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#123B63',
          navyDark: '#0E2E4E',
          blue: '#174A78',
          blueLight: '#205C91',
          info: '#2867A5',
          orange: '#E58A16',
          green: '#218653',
          red: '#C62828',
          bg: '#F4F7FA',
          border: '#D8E1EA',
          card: '#FFFFFF',
          text: '#1E293B',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', '-apple-system', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
