/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    letterSpacing: {
      widest: '.3em'
    },
    extend: {
      colors: {
        'primary': '#FFE6CC',
        'secondary': '#6AC2FF',
        'green-base': '#74A563',
        'header-box-shadow': '#FFDAB2'
      },
      height: {
        '128': '32rem',
        '164': '42rem',
        '220': '50rem'
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '0.5rem',
        sm: '1rem',
        md: '2rem',
        xl: '8rem'
      },
      margin: {
        md: '10rem',
        lg: '20rem',
        xl: '30rem'
      }
    }
  },
  plugins: [],
}
