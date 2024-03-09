// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  printWidth: 120,
  bracketSameLine: true,
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
