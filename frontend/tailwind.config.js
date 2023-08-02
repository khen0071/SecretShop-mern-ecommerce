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
        gray: "#616161",
        lightGray: "#818181",
        lighterGray: "#ddd",
        white: "#fff",
        lightWhite: "#f5f5f5",
        green: "#008000",
        emeraldGreen: "#50C878",
        orange: "#FFC300",
        blue: "#00BBFF",
        red: "#DC143C",
        yellow: "#FDDA0D",
      },
    },
  },
  plugins: [],
};
