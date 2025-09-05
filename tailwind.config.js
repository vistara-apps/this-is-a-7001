/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220, 15%, 98%)',
        text: 'hsl(220, 15%, 20%)',
        muted: 'hsl(220, 15%, 50%)',
        accent: 'hsl(160, 80%, 50%)',
        primary: 'hsl(215, 80%, 50%)',
        surface: 'hsl(0, 0%, 100%)',
        'dark-bg': 'hsl(230, 35%, 7%)',
        'dark-surface': 'hsl(230, 30%, 12%)',
        'dark-text': 'hsl(220, 15%, 95%)',
        'dark-muted': 'hsl(220, 15%, 60%)',
        'gradient-start': 'hsl(240, 80%, 20%)',
        'gradient-end': 'hsl(210, 80%, 40%)',
      },
      maxWidth: {
        '7xl': '80rem',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        'xxl': '24px',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(0, 0%, 0%, 0.08)',
        'focus': '0 0 0 3px hsla(215, 80%, 50%, 0.5)',
        'dark-card': '0 4px 12px hsla(0, 0%, 0%, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.22,1,0.36,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}