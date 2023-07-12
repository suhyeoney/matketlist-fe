/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: { // min-width 기준
        'laptop': '1024px',
        'tablet': '768px',
        'mobile': '320px',
      },
      extend: {
        fontFamily:{
          // 'tenada': ['Tenada'],
          // 'nanumGothic': ['NanumGothic'],
        },
      },
    },
    keyframes: {
      rotate: {
        from: {
          transform: 'rotate3d(1, 1, -1, 0deg)'
        },
        '0%': {
          transform: 'rotate3d(1, 1.5, -1, 0deg)'
        },
        '100%': {
          transform: 'rotate3d(1, 1.5, -1, 360deg)'
        },
      }
    },
    animation: {
      rotate: 'rotate 1.5s linear infinite',
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-3d'),
  ]
}
