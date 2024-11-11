/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        amazonEmberBold: ['Amazon-Ember-Bold', 'Arial', 'sans-serif'],
        amazonEmberMedium : ['Amazon-Ember-Medium', 'Arial', 'sans-serif'],
        amazonEmberLight : ['Amazon-Ember-Light', 'Arial', 'sans-serif'],
        amazonEmberLight2 : ['Amazon-Ember-Light2', 'Arial', 'sans-serif'],
      },

      colors: {
        'header-color': '#131921',
        'footer-color': '#232f3e'
      },
    },
  },
  plugins: [],
}
