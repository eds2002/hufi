/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{        
        "primary":"#E9F5DB",
        "primaryVariant":"#CFE1B9",
        "primaryVariant2":"#93bb5f",
        "secondary":"#212121",
        "secondaryVariant":"black",
        "tertiary":"#e5a2a4",
        "tertiaryVariant":"#dd8387",
        "background":"white",
        "surface":"#F3F4FB",
        "error":"#83555a",
        "onPrimary":"black",
        "onSecondary":"white",
        "onBackground":"black",
        "onSurface":"black",
        "onError":"white",
      },
      maxWidth:{
        '7xl':'1920px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}