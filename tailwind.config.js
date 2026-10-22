/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'chaos-pink': '#ff00aa',
        'chaos-lime': '#00ff44',
        'chaos-yellow': '#ffff00',
        'chaos-purple': '#9d00ff',
        'chaos-cyan': '#00ffff',
        'chaos-orange': '#ff6600',
        'chaos-dark': '#0d0015',
      },
      fontFamily: {
        'comic': ['Comic Sans MS', 'Comic Sans', 'Chalkboard SE', 'cursive'],
        'impact': ['Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
