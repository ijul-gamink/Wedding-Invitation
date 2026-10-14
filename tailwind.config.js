/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFCF9',
          100: '#FAF8F2',
          200: '#F5F0E4',
          300: '#EBE2D0',
          400: '#DFD2B9',
          500: '#D0BF9E',
        },
        champagne: {
          50: '#FCF9F3',
          100: '#F7F0DF',
          200: '#EEDEB8',
          300: '#E2C78E',
          400: '#D4AF67',
          500: '#C49B49',
          600: '#A67F33',
          700: '#836125',
        },
        sage: {
          50: '#F5F7F4',
          100: '#E7ECE6',
          200: '#CFDACD',
          300: '#B0C2AE',
          400: '#8F9B8D',
          500: '#738C71',
          600: '#5A7059',
          700: '#465745',
          800: '#384638',
          900: '#2A352A',
        },
        gold: {
          50: '#FDFBF4',
          100: '#F9F4DF',
          200: '#F2E4B7',
          300: '#E8CF8A',
          400: '#DCB85E',
          500: '#C89D39',
          600: '#A67D25',
          700: '#7E5B19',
        },
        espresso: {
          50: '#F8F7F6',
          100: '#EEECE9',
          200: '#DDD8D3',
          300: '#C2B8B0',
          400: '#9E9186',
          500: '#7B6E64',
          600: '#5C5148',
          700: '#443B34',
          800: '#2F2823',
          900: '#1C1714',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
        arabic: ['"Amiri"', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(0.98)' },
        }
      }
    },
  },
  plugins: [],
}
