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
        'laptop': { 'min': '1024px' },
        'tablet': { 'min': '768px', 'max': '1023px' },
        'mobile': { 'min': '350px', 'max': '767px' },
        'smallest': { 'max': '349px' },
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
      },
      ping: {
        '75%': {
          transform: 'scale(2)',
          opacity: 0
        },
        '100%': {
          transform: 'scale(2)',
          opacity: 0
        }
      },
      flowing: {
        '0%': {
          transform: 'translateX(200%)'
        },
        '100%': {
          transform: 'translateX(-200%)'
        },
      },
    },
    animation: {
      rotate: 'rotate 1.5s linear infinite',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      flowing: 'flowing 12s linear infinite',
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-3d'),
  ]
}
