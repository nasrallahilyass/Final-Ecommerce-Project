/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'heading-pic': "url('./src/assets/images/heading.jpg')"
      }
    },
  },
  plugins: [],
}

