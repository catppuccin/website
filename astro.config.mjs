import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import yaml from "@rollup/plugin-yaml";
import astroExpressiveCode from "astro-expressive-code";
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

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
  },
  markdown: {
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
  },
  integrations: [
    astroExpressiveCode({
      themes: ["catppuccin-mocha", "catppuccin-latte"],
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
    mdx({
      remarkPlugins: [remarkReadingTime],
    }),
  ],
  experimental: {
    svg: true,
  },
});
