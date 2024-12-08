import { vitePreprocess } from "@astrojs/svelte";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  preprocess: vitePreprocess({
    style: {
      css: {
        preprocessorOptions: {
          scss: {
            importer: [
              (url) => {
                if (url.startsWith("@styles")) {
                  return {
                    file: url.replace(/^\@styles/, path.join(dirname, "src", "styles")),
                  };
                }
                return url;
              },
            ],
          },
        },
      },
    },
  }),
};
