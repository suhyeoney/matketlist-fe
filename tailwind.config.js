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
        'mobile': { 'min': '330px', 'max': '767px' },
        'smallest': { 'max': '329px' },
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
          transform: 'translateX(100%)',
          right: '0'
        },
        '100%': {
          transform: 'translateX(-100%)',
          left: '0'
        },
      },
      show: {
        '0%': {
          opacity: '0',
        },
        '100%': {
          opacity: '1',
        },
      },
      close: {
        '0%': {
          opacity: '1',
        },
        '100%': {
          opacity: '0',
        },
      },
      hide: {
        '0%': {
          opacity: '1',
        },
        '100%': {
          opacity: '0',
        },
      },
      slideFromRight: {
        '0%': {
          opacity: '0',
          transform: 'translateX(200%)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateX(0%)',
        },
      },
      slideToRight: {
        '0%': {
          opacity: '1',
          transform: 'translateX(0%)',
        },
        '100%': {
          opacity: '0',
          transform: 'translateX(200%)',
        },
      },
      bounceHide: {
        '0%': {
          opacity: '1',
          visibility: 'hidden',
          transform: 'translateY(-10%)'
        },
        '100%': {
          opacity: '0',
          visibility: 'visible',
          transform: 'translateY(20%)'
        }
      },
      bounceDefault: {
        '0%': {
          transform: 'translateY(-5%)'
        },
        '50%': {
          transform: 'translateY(5%)'
        },
        '100%': {
          transform: 'translateY(-5%)'
        }
      },
      hideFloatBtn: {
        '0%': {
          opacity: 1,
        },
        '100%': {
          opacity: 0,
        }
      },
      slideUp: {
        '0%': {
          transform: 'translateY(50%)'
        },
        '100%': {
          transform: 'translateY(0%)'
        }
      },
      slideDown: {
        '0%': {
          transform: 'translateY(0%)'
        },
        '100%': {
          transform: 'translateY(100%)'
        }
      },
      rotate360: {
        '0%': {
          transform: 'rotate(0deg)'
        },
        '100%': {
          transform: 'rotate(360deg)'
        }
      },
    },
    animation: {
      rotate: 'rotate 1.5s linear infinite',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      flowing: 'flowing 30s linear infinite',
      showPage: 'show 2s linear',
      closePage: 'close 1s linear',
      showModal: 'show 0.5s linear',
      hideModal: 'hide 0.5s linear',
      openFromRight: 'slideFromRight 1s linear',
      closeToRight: 'slideToRight 1s linear',
      bounceHide: 'bounceHide 1s linear infinite',
      hideFloatBtn: 'hideFloatBtn 1s linear',
      bounceDefault: 'bounceDefault 1.5s linear infinite',
      slideUp: 'slideUp 0.5s linear',
      slideDown: 'slideDown 0.5s linear',
      rotate360: 'rotate360 1s linear',
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-3d'),
  ]
}
