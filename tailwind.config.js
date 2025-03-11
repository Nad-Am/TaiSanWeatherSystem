/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E293B',
        'secondary': '#6B7280',
        'tertiary': '#4B5563',
        'quaternary': '#E5E7EB',
        'quinary': '#F9FAFB',
        'senary': '#F3F4F6',
        'septenary': '#D1D5DB',
        'octonary': '#9CA3AF',
        'nonary': '#6B7280',
        'denary': '#4B5563',
      },
      backgroundImage:{
        cardBg:"linear-gradient(145deg,rgb(242, 244, 245),rgba(72, 160, 207,0.7))",
        cardBg2:"linear-gradient(145deg,rgba(72, 160, 207,0.1),rgb(242, 244, 245,0.6))",
        cardBg3:"linear-gradient(145deg,rgba(72, 160, 207,0.3),rgb(242, 244, 245,0.1))",
      }
    },
  },
  plugins: [],
}

