/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        elevate:
          "box-shadow:  -20px 20px 36px #d9d9d9, 20px -20px 36px #ffffff;",
      },
    },
  },
  plugins: [],
};
