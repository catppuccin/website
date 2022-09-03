import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import vim from "highlight.js/lib/languages/vim";

export default async function markdownToHtml(
  markdown: string,
  options: { allowHtml?: boolean } = {}
) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: options.allowHtml })
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
