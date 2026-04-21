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
          main: '#F7F3EC',
          surface: '#FFFDF9',
          elevated: '#FFFFFF',
          border: '#E8DFD2',
          primary: '#1F1C18',
          secondary: '#6B6359',
          tertiary: '#9B9389',
          accent: '#E04E2B',
          'accent-dark': '#C13E20',
          'accent-soft': '#FDE8E0',
          orange: '#F4883C',
          'orange-soft': '#FEF1E4',
          success: '#166534',
          'success-soft': '#E8F3EC',
          warning: '#B8770C',
        },
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '3px',
        DEFAULT: '5px',
        md: '5px',
        lg: '8px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(31, 28, 24, 0.04)',
        DEFAULT: '0 4px 12px rgba(31, 28, 24, 0.08)',
        md: '0 4px 12px rgba(31, 28, 24, 0.08)',
        lg: '0 12px 32px rgba(31, 28, 24, 0.12)',
      },
      maxWidth: {
        content: '1200px',
        text: '680px',
      },
    },
  },
  plugins: [],
}
