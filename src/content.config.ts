import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import type { AccentName } from "@catppuccin/palette";

export type BlogAuthor = {
  name: string;
  github: string;
};

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/blog" }),
  schema: ({ image }) =>
    z.object({
      hero: z.object({
        image: image(),
        alt: z.string(),
        author: z.string(),
        source: z.string(),
      }),
      title: z.string(),
      summary: z.string(),
      category: z.enum(["Announcement", "DevLog"]),
      accentColor: z.custom<AccentName>(),
      datePosted: z.coerce.date(),
      dateUpdated: z.coerce.date().optional(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      authors: z.array(z.custom<BlogAuthor>()),
    }),
});

export const collections = { blog };
