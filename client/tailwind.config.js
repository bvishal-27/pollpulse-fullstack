/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Add this line
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#ffffff",
          dark: "#000000",
        },
        surface: {
          light: "rgba(0, 0, 0, 0.05)",
          dark: "rgba(255, 255, 255, 0.05)",
        },
        accent: "#0071e3",
      },
    },
  },
  plugins: [],
}