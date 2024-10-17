/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 2s infinite', // Using the defined keyframes
      },
      keyframes: {
        bounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-30px)' },
          '60%': { transform: 'translateY(-15px)' },
        },
      },
      boxShadow : {
        'custom-light': '0 2px 5px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 4px 10px rgba(0, 0, 0, 0.5)',
      },
    backgroundImage: {
      // 'customGradient': 'linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)',
      'arrow': "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yOTMuNzUxLDQ1NS44NjhjLTIwLjE4MSwyMC4xNzktNTMuMTY1LDE5LjkxMy03My42NzMtMC41OTVsMCwwYy0yMC41MDgtMjAuNTA4LTIwLjc3My01My40OTMtMC41OTQtNzMuNjcyICBsMTg5Ljk5OS0xOTBjMjAuMTc4LTIwLjE3OCw1My4xNjQtMTkuOTEzLDczLjY3MiwwLjU5NWwwLDBjMjAuNTA4LDIwLjUwOSwyMC43NzIsNTMuNDkyLDAuNTk1LDczLjY3MUwyOTMuNzUxLDQ1NS44Njh6Ii8+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMjIwLjI0OSw0NTUuODY4YzIwLjE4LDIwLjE3OSw1My4xNjQsMTkuOTEzLDczLjY3Mi0wLjU5NWwwLDBjMjAuNTA5LTIwLjUwOCwyMC43NzQtNTMuNDkzLDAuNTk2LTczLjY3MiAgbC0xOTAtMTkwYy0yMC4xNzgtMjAuMTc4LTUzLjE2NC0xOS45MTMtNzMuNjcxLDAuNTk1bDAsMGMtMjAuNTA4LDIwLjUwOS0yMC43NzIsNTMuNDkyLTAuNTk1LDczLjY3MUwyMjAuMjQ5LDQ1NS44Njh6Ii8+DQo8L3N2Zz4=)",
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
        'mona-sans': ['"Mona Sans"', 'sans-serif'], 
        custom: ['Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', 'Arial', 'sans-serif'],          // Sans-serif font
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

