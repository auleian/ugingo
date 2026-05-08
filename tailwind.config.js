/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        baloo: ['"Baloo Chettan 2"', 'system-ui', 'sans-serif'],
        inter: ['"Inter"', 'system-ui', 'sans-serif'],
        opensans: ['"Open Sans"', 'system-ui', 'sans-serif'],
        poppins: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        mobile: '374px',
      },
      colors: {
        brand: {
          DEFAULT: '#F16522',
          50: '#FEF1EA',
          500: '#F16522',
          600: '#D8531A',
        },
        accent: {
          DEFAULT: '#F7AE2B',
          500: '#F7AE2B',
        },
      },
    },
  },
  plugins: [],
}
