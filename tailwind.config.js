/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        marcellus: ['Marcellus', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
      },
      colors: {
        gold: {
          50: '#fff9e6',
          100: '#fef0c7',
          200: '#fbe09a',
          300: '#f5cd6e',
          400: '#e8b54a',
          500: '#d4982e',
          600: '#a8761f',
          700: '#7a5418',
          800: '#4d3410',
          900: '#2a1d09',
        },
        aegean: {
          50: '#eaf7f8',
          100: '#cdeef0',
          200: '#9bdee2',
          300: '#62c6cd',
          400: '#34a3ac',
          500: '#1e7d86',
          600: '#155f68',
          700: '#11484f',
          800: '#0d3439',
          900: '#082227',
        },
        marble: {
          50: '#faf9f6',
          100: '#f4f1ea',
          200: '#e8e2d6',
          300: '#d4cab8',
          400: '#b8a98f',
          500: '#9a8a6e',
          600: '#7a6c54',
          700: '#5c503e',
          800: '#3e3528',
          900: '#221d14',
        },
        wine: {
          400: '#a8324a',
          500: '#8a1e36',
          600: '#6e1530',
          700: '#531026',
        },
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'drift': 'drift 30s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        drift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100vh)' },
        },
      },
    },
  },
  plugins: [],
};
