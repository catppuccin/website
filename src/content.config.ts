import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const CATEGORIES = ["Announcement"] as const;
export const blogCategoriesEnum = z.enum(CATEGORIES);

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/blog" }),
  schema: ({ image }) =>
    z.object({
      hero: z.object({
        path: image(),
        author: z.string(),
        source: z.string(),
      }),
      title: z.string(),
      summary: z.string(),
      category: z.enum(CATEGORIES),
      datePosted: z.coerce.date(),
      dateUpdated: z.coerce.date().optional(),
      draft: z.boolean().optional(),
      author: z.object({
        name: z.string(),
        title: z.string(),
        github: z.string(),
      }),
    }),
});

export const collections = { blog };
