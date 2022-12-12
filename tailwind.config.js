/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateX(25%)"},
          "50%": { transform: "translateX(0)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateX(25%)"},
          "50%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
