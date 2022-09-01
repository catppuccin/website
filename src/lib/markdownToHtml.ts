import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkRehype from 'remark-rehype'
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from 'rehype-highlight'

export default async function markdownToHtml(markdown: string, options: {allowHtml?: boolean} = {}) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, {allowDangerousHtml: options.allowHtml})
    .use(options.allowHtml ? ()=>{} : rehypeSanitize)
    .use(rehypeExternalLinks, {rel: ['nofollow']})
    .use(rehypeHighlight)
    .use(rehypeStringify, {allowDangerousHtml: options.allowHtml})
    .process(markdown);
  return result.toString()
}