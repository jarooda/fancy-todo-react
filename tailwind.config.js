module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
       'notes': "url('assets/img/notes.jpg')",
       'wave': "url('assets/img/wave.svg')"
      }),
      minHeight: theme => ({
        ...theme('height'),
        '10': '10vh',
        '20': '20vh',
        '25': '25vh',
        '35': '35vh',
        '55': '55vh',
        '65': '65vh',
      }),
      fontFamily: {
        'dancing': ['Dancing Script', 'cursive']
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
