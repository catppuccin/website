import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import { title } from "./blog/index.astro";
import { description } from "./blog/index.astro";

export async function GET(context) {
  const blog = await getCollection("blog");
  return rss({
    title,
    description,
    site: `${context.site}blog`,
    xmlns: {
      media: "http://search.yahoo.com/mrss/",
      atom: "http://www.w3.org/2005/Atom",
      dc: "http://purl.org/dc/elements/1.1/",
    },
    customData: `<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`,
    items: blog
      .filter((post) => !post.data.draft)
      .map((post) => ({
        title: post.data.title,
        description: post.data.summary,
        pubDate: post.data.datePosted,
        link: `/blog/${post.id}/`,
        customData: `<media:content
          type="image/${post.data.hero.image.format}"
          width="${post.data.hero.image.width}"
          height="${post.data.hero.image.height}"
          medium="image"
          url="${context.site.origin}${post.data.hero.image.src}" />
          ${post.data.authors.map((author) => `<dc:creator>${author.name}</dc:creator>`).join("\n")}
      `,
      })),
  });
}
