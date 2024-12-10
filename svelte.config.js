import { vitePreprocess } from "@astrojs/svelte";
// import path from "node:path";
// import { fileURLToPath } from "node:url";

// const _dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  preprocess: vitePreprocess({
    style: {
      css: {
        preprocessorOptions: {
          // For some reason, this is causing a "sass [undefined]" error so
          // until that's fixed, keep using relative paths in the Svelte style tags
          // scss: {
          //   importer: [
          //     (url) => {
          //       if (url.startsWith("@styles")) {
          //         return {
          //           file: url.replace(/^\@styles/, path.join(dirname, "src", "styles")),
          //         };
          //       }
          //       return url;
          //     },
          //   ],
          // },
        },
      },
    },
  }),
};
