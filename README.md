# thorno.media

Portfolio site for thorno.media — photography, videography, and FPV drone work.

## Stack

- **Framework**: [Astro](https://astro.build)
- **Hosting**: GitHub Pages
- **Content management**: Astro Content Collections — each project is a folder under `src/content/projects/` containing a markdown file (frontmatter: title, category, date, description, tags) plus its photo assets. Adding a new project is just adding a folder and pushing.
- **Photos**: committed to the repo, optimized at build time via Astro's `<Image>` component.
- **Video**: not committed to the repo. Hosted externally (unlisted YouTube/Vimeo, or Cloudflare Stream) and referenced by ID/URL in each project's frontmatter, embedded at build time. Keeps the repo small and gives proper adaptive streaming instead of raw `<video>` files.

## Future enhancement

A **Decap CMS** bolt-on is possible later for managing projects through a web UI instead of editing files directly. It's git-backed and would sit on top of the existing `src/content/projects/` structure without requiring any restructuring — can be added whenever it's useful (e.g. editing on the go from a phone).
