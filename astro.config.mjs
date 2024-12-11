import { defineConfig } from "astro/config";
import yaml from "@rollup/plugin-yaml";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";

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
  integrations: [
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
