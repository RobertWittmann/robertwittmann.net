module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        '600': '600px',
      },
      height: {
        halfscreen: '50vh', 
        twoscreen: '200vh', 
        twohalfscreen: '250vh',
        threescreen: '300vh', 
      },
      minWidth: {
        '800': '800px',
      },
      width:{
        '9/10': '90%',
      },
      inset: {
        '18': '4.5rem',
      },
      lineHeight: {
        'full': '100%',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      red: {
        light: '#FBDCDD',
        DEFAULT: '#EA5257',
      },
      blue: {
        DEFAULT: '#3C448E',
      },
      green: {
        DEFAULT: '#63D9B1',
      },
      yellow: {
        lightest: '#FDF2DF',
        light: '#FFE8C4',
        DEFAULT: '#FFFFA2',
        dark: '#E2A137',
      },
      white: {
        DEFAULT: '#FFFFFF',
      },
      black: {
        DEFAULT: '#000000',
      }
    },
    fontFamily: {
      'sans': ['Josefin Sans'],
      'serif': ['SimSun'],
      'mono': ['IBM Plex Mono'],
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      'profile': '-39px 32px 0px 0px rgba(253, 242, 223, 1), 39px 32px 0px 0px rgba(253, 242, 223, 1)',
      'etc': '-39px 0px 0px 0px rgba(255, 255, 255, 1)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
