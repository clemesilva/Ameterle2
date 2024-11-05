const { nextui } = require("@nextui-org/react");
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",

    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Agregar configuración personalizada para el carrusel
      fontFamily: {
        slick: ["slick"],
      },
      colors: {
        slick: {
          // Personaliza los colores del carrusel según sea necesario
          bg: "white",
          text: "black",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
