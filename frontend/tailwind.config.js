/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1200px",
        xxl: "1400px",
      },
      colors: {
        black: "#000",
        white: "#fff",
        lightGray: "#818181",
        green: "#008000",
      },
    },
  },
  plugins: [],
};
