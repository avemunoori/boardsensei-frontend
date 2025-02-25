/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: "var(--primary-color)",
            hover: "var(--primary-color-hover)",
          },
          secondary: "var(--secondary-color)",
          text: "var(--text-color)",
          error: "var(--error-color)",
        },
        spacing: {
          'small': 'var(--spacing-small)',
          'medium': 'var(--spacing-medium)',
          'large': 'var(--spacing-large)',
        },
        fontSize: {
          'base': 'var(--font-size-base)',
          'large': 'var(--font-size-large)',
        },
        borderRadius: {
          DEFAULT: 'var(--border-radius)',
        },
      },
    },
    plugins: [],
  }