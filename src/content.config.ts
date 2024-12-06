import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const CATEGORIES = ["announcement"] as const;
export const blogCategoriesEnum = z.enum(CATEGORIES);

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      heroImage: image().refine((img) => img),
      heroAuthor: z.string(),
      heroSource: z.string(),
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
