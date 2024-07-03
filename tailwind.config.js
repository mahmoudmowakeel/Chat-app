/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        coiny: ["Coiny", "sans-serif"],
      },
    },
    colors: {
      primary: "#7f36c8",
      white: "#ffffff",
      red: "#fa0000",
      green: "#00FF00",
      black: "#000",
      smart: "#196CBD",
    },
  },
  plugins: [],
};
