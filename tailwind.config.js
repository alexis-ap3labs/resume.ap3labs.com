/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'dark': '#171717',
        'light': '#ccd6f6',
        'primary': '#64ffda',
        'electric': '#FF5F1F',  // Orange électrique
        cream: 'var(--color-cream)'
      },
      fontFamily: {
        'satoshi': ['Satoshi', 'sans-serif']
      },
      zIndex: {
        '99': '99',
      },
      animation: {
        'draw': 'draw 2s ease forwards',
      },
      keyframes: {
        draw: {
          'to': {
            'stroke-dashoffset': '0',
          },
        },
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
} 