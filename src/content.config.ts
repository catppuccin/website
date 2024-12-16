import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import type { AccentName } from "@catppuccin/palette";

const CATEGORIES = ["Announcement", "DevLog"] as const;
export const blogCategoriesEnum = z.enum(CATEGORIES);

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/blog" }),
  schema: ({ image }) =>
    z.object({
      hero: z.object({
        image: image(),
        author: z.string(),
        source: z.string(),
      }),
      title: z.string(),
      summary: z.string(),
      category: z.enum(CATEGORIES),
      accentColor: z.custom<AccentName>(),
      datePosted: z.coerce.date(),
      dateUpdated: z.coerce.date().optional(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      authors: z.array(
        z.object({
          name: z.string(),
          title: z.string(),
          github: z.string(),
          email: z.string().email(),
        }),
      ),
    }),
});

export const collections = { blog };
