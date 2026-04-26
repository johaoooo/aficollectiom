/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        afi: {
          green:  "#008753",
          yellow: "#FCD116",
          red:    "#E8112D",
          black:  "#1A1A1A",
          cream:  "#FAF6F0",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
