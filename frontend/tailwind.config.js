/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    backgroundImage: {
      // 'customGradient': 'linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)',
    },
      colors: {
        customBlue: '#012E40',
        customWhite: '#F2E3D5',
        customLightBlue: '#024959',
        customLightLightBlue: '#026773',
        customFourBlue: '#3CA6A6',
        customExBlue: '#589A8D',
        customBgColor: '',
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
      
      },
      fontFamily: {
        'mona-sans': ['"Mona Sans"', 'sans-serif'],           // Sans-serif font
      },
    //   fontFamily: {
    //     'body': [
    //   'Slabo 27px', 
    //   'ui-sans-serif', 
    //   'system-ui', 
    //   '-apple-system', 
    //   'system-ui', 
    //   'Segoe UI', 
    //   'Roboto', 
    //   'Helvetica Neue', 
    //   'Arial', 
    //   'Noto Sans', 
    //   'sans-serif', 
    //   'Apple Color Emoji', 
    //   'Segoe UI Emoji', 
    //   'Segoe UI Symbol', 
    //   'Noto Color Emoji'
    // ],
    //     'sans': [
    //   'Slabo 27px', 
    //   'ui-sans-serif', 
    //   'system-ui', 
    //   '-apple-system', 
    //   'system-ui', 
    //   'Segoe UI', 
    //   'Roboto', 
    //   'Helvetica Neue', 
    //   'Arial', 
    //   'Noto Sans', 
    //   'sans-serif', 
    //   'Apple Color Emoji', 
    //   'Segoe UI Emoji', 
    //   'Segoe UI Symbol', 
    //   'Noto Color Emoji'
    // ]
    //   }
    // },
  },
  plugins: [],
}
}

