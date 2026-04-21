/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        z: {
          main: '#EDEFEE',
          surface: '#F4F3F1',
          elevated: '#FFFFFF',
          dark: '#41403C',
          red: '#AA210F',
          border: '#D4D5D2',
          primary: '#41403C',
          secondary: '#6B6A67',
          tertiary: '#9B9A97',
          accent: '#AA210F',
          'accent-dark': '#8A1A0B',
          'accent-soft': '#F5E8E6',
          warm: '#D08856',
          'warm-hover': '#B8703E',
          'warm-soft': '#FAF0E8',
          success: '#166534',
          'success-soft': '#E8F3EC',
          warning: '#B8770C',
        },
      },
      fontFamily: {
        serif: ['Montserrat', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '3px',
        DEFAULT: '5px',
        md: '5px',
        lg: '8px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(65, 64, 60, 0.06)',
        DEFAULT: '0 4px 12px rgba(65, 64, 60, 0.1)',
        md: '0 4px 12px rgba(65, 64, 60, 0.1)',
        lg: '0 12px 32px rgba(65, 64, 60, 0.15)',
      },
      maxWidth: {
        content: '1200px',
        text: '680px',
      },
    },
  },
  plugins: [],
}
