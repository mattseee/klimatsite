/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          accent: "#FF8A3D",
        },
      },
      maxWidth: {
        container: "1440px",
      },
      borderRadius: {
        lgsoft: "12px",
      },
    },
  },
  plugins: [],
};
