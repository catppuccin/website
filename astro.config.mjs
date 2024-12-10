import { defineConfig } from "astro/config";
import yaml from "@rollup/plugin-yaml";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";

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
    mdx(),
  ],
  experimental: {
    svg: true,
  },
});
