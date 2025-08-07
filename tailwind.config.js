// tailwind.config.js
export default {
  content: ['./index.html', './main.js'],
  theme: {
    extend: {
      colors: {
        gbonkYellow: '#ffd700',
        gbonkPink: '#ff3860',
        cosmicNavy: '#0d0d2b',
        starlight: '#ffffff',
      },
      fontFamily: {
        impact: ['Anton', 'Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
};