module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr'
    },
  },
},
  plugins: [require('@tailwindcss/forms'),
  require('@tailwindcss/aspect-ratio'),
  
],
}

