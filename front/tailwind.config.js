const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", // or 'media' or 'class
  plugins: [nextui(), require("@tailwindcss/forms")],
};
