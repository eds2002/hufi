/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary1":"#FEFAE0",
        "primary2":"#283618",
        "primary3":"#606C38",
        "secondary1":"#DDA15E",
        "secondary2":"#BC6C25",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}