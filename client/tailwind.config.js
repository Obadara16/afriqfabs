module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
    './src/**/*.vue',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        'custom': {
          'text-green': 'rgba(4, 161, 67, 0.6)',
          'btn-green': "#04A143",
          'brown': '#AA9580',
          'basic-color': '#FFFFFF'
          // 'basic-color': "#ECF1ED",
        },
      },
    },
    fontFamily: {
      sans: ['"Open Sans"', 'sans-serif'],
      oleo: ['Oleo Script', 'cursive'],
      poppins: ['Poppins', 'sans-serif'],

    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
}
