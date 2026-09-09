# Poster content

Poster metadata lives in `data/posters.json`.

Each entry should provide a vector preview through `preview`, normally an SVG under `public/posters/<slug>/poster.svg`. If the original poster is already SVG, use it directly. If the original is PDF, keep the PDF under `public/posters/<slug>/poster.pdf` and generate a companion SVG preview from its first page with `scripts/generate-poster-preview.py` before publishing.

Optional explanatory text for a poster can be placed at `data/posters/<slug>/index.md`. If the file is absent or empty, the detail page shows only the poster and download links.

Example metadata shape:

```json
{
  "slug": "example-work",
  "title": "Example Work",
  "category": "published",
  "date": "2026-09",
  "authors": "A. Author, B. Author",
  "venue": "Conference or Journal",
  "description": "Optional one-line description.",
  "preview": "/posters/example-work/poster.svg",
  "pdf": "/posters/example-work/poster.pdf"
}
```

Categories are `published` and `student`.
