/** @type {import('sass').Importer} */
import { defineConfig } from "astro/config";
import path from "path";
import fs from "fs";

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
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = import.meta.dirname;

const remarkReadingTime = () => {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
};

// Workaround until astro importing sass bug is fixed: https://github.com/withastro/astro/issues/15897
const stylesImporter = {
  canonicalize(url) {
    if (!url.startsWith("@styles/")) return null;

    const importPath = url.slice(8);
    const basePath = path.resolve(__dirname, "src/styles", importPath);

    const candidates = [
      basePath + ".scss",
      basePath + ".sass",
      path.join(path.dirname(basePath), "_" + path.basename(basePath) + ".scss"),
      path.join(path.dirname(basePath), "_" + path.basename(basePath) + ".sass"),
    ];

    for (const filePath of candidates) {
      if (fs.existsSync(filePath)) {
        return pathToFileURL(filePath);
      }
    }

    return null;
  },

  load(canonicalUrl) {
    const filePath = fileURLToPath(canonicalUrl);
    try {
      const contents = fs.readFileSync(filePath, "utf-8");
      const syntax = filePath.endsWith(".sass") ? "sass" : "scss";
      return { contents, syntax }; // <- Add syntax field
    } catch {
      return null;
    }
  },
};

export default defineConfig({
  site: "https://catppuccin.com",
  vite: {
    plugins: [yaml()],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          silenceDeprecations: ["mixed-decls"],
          importers: [stylesImporter],
        },
      },
    },
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
      themes: ["catppuccin-latte", "catppuccin-mocha", "catppuccin-frappe", "catppuccin-macchiato"],
      themeCssSelector: (theme) => {
        const themeName = theme.name.split("-")[1];
        return `[data-theme='${themeName}']`;
      },
      useDarkModeMediaQuery: true,
      // Stop it from autocorrecting colour contrast
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
});
