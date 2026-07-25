import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import yaml from "@rollup/plugin-yaml";
import astroExpressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { fileURLToPath } from "url";

const remarkReadingTime = () => {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
};

// https://astro.build/config
export default defineConfig({
  site: "https://catppuccin.com",
  vite: {
    plugins: [yaml()],
    resolve: {
      alias: {
        "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
      },
    },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [
        rehypeHeadingIds,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
            headingProperties: {
              className: ["rehype-heading"],
            },
            properties: {
              className: ["rehype-heading-link"],
            },
          },
        ],
      ],
    }),
  },
  integrations: [
    astroExpressiveCode({
      themes: ["catppuccin-latte", "catppuccin-mocha", "catppuccin-frappe", "catppuccin-macchiato"],
      themeCssSelector: (theme) => {
        const themeName = theme.name.split("-")[1];
        const selector = `[data-theme='${themeName}']`;
        return selector;
      },
      useDarkModeMediaQuery: true,
      // Stop it from auto-correcting colour contrast
      minSyntaxHighlightingColorContrast: 0,
      styleOverrides: {
        frames: {
          tooltipSuccessBackground: "var(--green)",
          tooltipSuccessForeground: "var(--base)",
        },
        textMarkers: {
          insBackground: "color-mix(in oklab, var(--green) 25%, var(--mantle));",
          insBorderColor: "var(--surface0)",
          delBackground: "color-mix(in oklab, var(--red) 25%, var(--mantle));",
          delBorderColor: "var(--surface0)",
        },
        codePaddingInline: "var(--space-md)",
        uiFontSize: "1.5rem",
        codeFontSize: "1.4rem",
        codeBackground: "var(--mantle)",
      },
    }),
    sitemap(),
    icon({
      iconDir: "src/data/icons",
    }),
    svelte(),
    mdx(),
  ],
});
