module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      'primary-50': '#F9E8E3',
      'primary-100': '#F6DAD2',
      'primary-200': '#EFBEB1',
      'primary-300': '#E8A18F',
      'primary-400': '#E1856D',
      'primary-500': '#DA694B',
      'primary-600': '#C54928',
      'primary-700': '#96381F',
      'primary-800': '#672715',
      'primary-900': '#39150C',
      'secondary': '#413043',
      'tertiary': '#D1CEBE'
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
