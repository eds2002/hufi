/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary1":"#FCFCFC",
        "primary2":"#C1BEB6",
        "primary3":"#E9E9E9",
        "secondary1":"#91AFA0",
        "secondary2":"#628A76",
        "secondary3":"#2F4937",

        
        "primary":"#E9F5DB",
        "primaryVariant":"#CFE1B9",
        "secondary":"#dbe9f5",
        "secondaryVariant":"#b9cfe1",
        "background":"white",
        "surface":"white",
        "error":"#83555a",
        "onPrimary":"black",
        "onSecondary":"black",
        "onBackground":"black",
        "onSurface":"black",
        "onError":"white",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}