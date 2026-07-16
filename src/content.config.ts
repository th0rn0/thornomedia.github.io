import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each project is one "flight dossier": photo + video interleaved, disciplines
// are tags on the project, never separate destinations. See DESIGN.md.
const projects = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      location: z.string(),
      coords: z.string().optional(),
      gear: z.string(),
      duration: z.string().optional(),
      formats: z.string(),
      disciplines: z.array(z.enum(['photo', 'video', 'fpv'])).min(1),
      // Column span out of 12, chosen editorially to reflect the project's
      // native aspect ratio (16:9=8, 4:3=6/5, 2.39:1=12). See DESIGN.md layout.
      tileSpan: z.union([z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(12)]).default(6),
      summary: z.string(),
      cover: image(),
      gallery: z.array(image()).default([]),
      video: z
        .object({
          provider: z.enum(['youtube', 'vimeo']),
          id: z.string(),
        })
        .optional(),
      featured: z.boolean().default(false),
    }),
});

export const collections = { projects };
