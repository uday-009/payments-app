/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {700:"#146EB4"},
        secondary: {700:"#1E2640"}
      }
    },
  },
  plugins: [],
}

