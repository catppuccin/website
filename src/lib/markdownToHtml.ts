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

export default async function markdownToHtml(
  markdown: string,
  baseUrl: string,
  options: { allowHtml?: boolean } = {}
) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: options.allowHtml })
    .use(rehypeRaw)
    .use(inspectUrls, {
      inspectEach: (domMatch) => {
        console.log("URL:", domMatch.url);
        // we need to modify the output of the markdown if the url is a relative path to a file
        // in the repo
        if (
          !domMatch.url.startsWith("https://") &&
          !domMatch.url.startsWith("http://") &&
          !domMatch.url.startsWith("#")
        ) {
          console.log(`${domMatch.url} is a relative path`);
          console.log("domMatch", domMatch);
          domMatch.node.properties = {
            ...domMatch.node.properties,
            src: `${baseUrl}/${domMatch.url}`,
          };
        }
      },
      selectors: ["img[src]"],
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
      subset: false,
    })
    .use(rehypeAutolinkHeadings)
    .use(rehypeExternalLinks, { rel: ["nofollow"] })
    .use(rehypeStringify, { allowDangerousHtml: options.allowHtml })
    .process(markdown);
  return result.toString();
}
