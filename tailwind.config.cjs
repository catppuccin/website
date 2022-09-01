/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /(bg|text|fill|hover:shadow|shadow)-.+/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        "work-sans": ["Work Sans", "sans-serif"],
        "epilogue": ["Epilogue", "sans-serif"],
        "inter": ["Inter", "sans-serif"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text'),
            a: {
              color: theme('colors.sky'),
              '&:hover': {
                color: theme('colors.blue')
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.text'),
            },
            '*': {
              color: theme('colors.text'),
            },
            code: {
              color: theme('colors.rosewater'),
            }
          },
        },
      }),
    },
  },
  plugins: [require("@catppuccin/tailwindcss"), require("@tailwindcss/typography")],
};
