const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /(bg|text|fill|hover:shadow|shadow)-.+/,
    },
    "mocha", "macchiato", "frappe", "latte"
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
      serif: defaultTheme.fontFamily.serif,
      mono: ["Fira Code", ...defaultTheme.fontFamily.mono],
    },
    extend: {
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
            },
            pre: {
              background: theme('colors.base')
            }
          },
        },
      }),
    },
  },
  plugins: [
    require("@catppuccin/tailwindcss")({defaultFlavour: "macchiato"}),
    require("@tailwindcss/typography")
  ],
};
