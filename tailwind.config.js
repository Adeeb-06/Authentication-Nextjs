/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    extend: {
      colors:{
        bg: "#151c2c",
        bgSoft:"#182237",
        textSoft: "#b7bac1",
        text : "#fff",
        hoverColor: "rgba(100,255,218,0.1)"
      },
    },
  },

  plugins: []
};
