import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import vim from "highlight.js/lib/languages/vim";
import { inspectUrls } from "@jsdevtools/rehype-url-inspector";
import rehypeRaw from "rehype-raw";
import getAllowedURLS from "./url-allowlist";
import remarkGfm from "remark-gfm";

export default async function markdownToHtml(
  markdown: string,
  baseUrl: string,
  options: { allowHtml?: boolean } = {}
) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: options.allowHtml })
    .use(rehypeRaw)
    .use(inspectUrls, {
      // TODO: refactor this function
      inspectEach: async (domMatch) => {
        // we need to modify the output of the markdown if the url is a relative path to a file
        // in the repo
        if (
          domMatch.node.tagName === "img" &&
          !(
            domMatch.url.startsWith("https://") ||
            domMatch.url.startsWith("http://") ||
            domMatch.url.startsWith("#")
          )
        ) {
          // prepend the baseURL to relative URLs
          domMatch.node.properties = {
            ...domMatch.node.properties,
            src: `${baseUrl}/${domMatch.url}`,
          };
        }
        if (domMatch.node.tagName === "a" && domMatch.url.startsWith("http")) {
          const parsedURL = new URL(domMatch.url);
          const allowlist = await getAllowedURLS();
          const matched = allowlist.filter((url) =>
            parsedURL.hostname.includes(url)
          );
          if (matched.length === 0) {
            domMatch.node.properties = {
              ...domMatch.node.properties,
              href: null,
            };
            console.warn(
              `WARN: ${parsedURL.hostname} not found in allowlist, removing href (${baseUrl})`
            );
          }
        }
      },
      selectors: ["img[src]", "a[href]"],
    })
    .use(options.allowHtml ? () => {} : rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        code: [
          // @ts-ignore-next-line
          ...(defaultSchema.attributes.code || []),
          // List of all allowed languages:
          ["className", "language-js", "language-css", "language-md"],
        ],
      },
    })
    .use(rehypeHighlight, {
      languages: { vim },
      aliases: {
        bash: "sh",
        markdown: "md",
      },
      ignoreMissing: true,
    })
    .use(rehypeAutolinkHeadings)
    .use(rehypeExternalLinks, { rel: ["nofollow"] })
    .use(rehypeStringify, { allowDangerousHtml: options.allowHtml })
    .process(markdown);
  return result.toString();
}
