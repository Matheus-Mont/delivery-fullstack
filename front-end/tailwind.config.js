module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        sans: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(28 25 23 / 0.05), 0 1px 3px 0 rgb(28 25 23 / 0.06)',
        raised: '0 4px 12px -2px rgb(28 25 23 / 0.10)',
      },
    },
  },
  plugins: [],
};
