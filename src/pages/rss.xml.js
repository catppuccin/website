import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import { title } from "./blog/index.astro";
import { description } from "./blog/index.astro";

export async function GET(context) {
  const blog = await getCollection("blog");
  return rss({
    title,
    description,
    site: context.site,
    xmlns: {
      media: "http://search.yahoo.com/mrss/",
    },
    items: blog
      .filter((post) => !post.data.draft)
      .map((post) => ({
        title: post.data.title,
        description: post.data.summary,
        pubDate: post.data.datePosted,
        link: `/blog/${post.id}/`,
        author: `${post.data.author.name}`,
        customData: `<media:content
          type="image/${post.data.hero.path.format}"
          width="${post.data.hero.path.width}"
          height="${post.data.hero.path.height}"
          medium="image"
          url="${context.site.origin}${post.data.hero.path.src}" />
      `,
      })),
  });
}
