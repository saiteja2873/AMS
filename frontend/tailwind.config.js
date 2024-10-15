/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#012E40',
        customWhite: '#F2E3D5',
        customLightBlue: '#024959',
        customLightLightBlue: '#026773',
        customFourBlue: '#3CA6A6'
      },
    },
  },
  plugins: [],
}

