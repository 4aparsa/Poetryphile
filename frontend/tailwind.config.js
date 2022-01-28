module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      'primary': {
        50: '#F9E8E3',
        100: '#F6DAD2',
        200: '#EFBEB1',
        300: '#E8A18F',
        400: '#E1856D',
        500: '#DA694B',
        600: '#C54928',
        700: '#96381F',
        800: '#672715',
        900: '#39150C',
      },
      'secondary': '#413043',
      'white': '#ffffff'
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
