# Bibliotheca Runnel

**Bibliotheca Runnel** is the personal academic portal and digital archive of myself. It serves as a curated collection of knowledge, spanning from informal mathematical notes to classical literary works and linguistic research.

## Overview

This project is built with **Next.js** and designed to be a comprehensive knowledge management system. It features a custom content pipeline that transforms Markdown and JSON data into a structured, navigable website.

## Features

- **Library Collections**:
  - **Mathematics Notes**: Archived PDF notes on various mathematical topics.
  - **Classics**: Self-authored and curated classical texts with switchable typography.
  - **Linguistics Miscellanea**: Notes on phonology, syntax, and historical linguistics (including Tangut script research).
  - **Criticisms**: Lectures, essays, and field research on literature and philosophy.
- **Research & Engineering CV**: The web version lives in `data/cv.md`; the downloadable three-page PDF is typeset from the native Tsinghua XeLaTeX source in `cv-source/main.tex`, with vector institution marks.
- **Rich Content Rendering**:
  - Full **Markdown** support with **GFM** (GitHub Flavored Markdown).
  - Mathematical typesetting via **KaTeX**.
  - Diagrams and visualizations using **Mermaid**.
- **Modern UI**: Clean, academic aesthetic powered by **Tailwind CSS** and **Radix UI** primitives.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content Processing**:
  - `react-markdown`, `rehype-katex`, `remark-math`
  - `mermaid`
  - Custom Node.js scripts for data aggregation
- **PDF Generation**: XeLaTeX for the canonical CV; Tectonic (XeTeX) for online custom exports.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ChouYuanjue/bibliotheca-runnel.git
   cd bibliotheca-runnel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create a production build:

```bash
npm run build
```

> **Note**: The build validates poster assets before compiling Next.js. The checked-in `public/cv.pdf` is the canonical downloadable CV. To recompile it after changing `cv-source/main.tex`, run `npm run generate-cv` on a machine with XeLaTeX.

### Publishing posters

Register each poster in `data/posters.json` and store only `poster.svg` and `poster.pdf` in `public/posters/<slug>/`. The `preview` field points to `/posters/<slug>/poster.svg`; the PDF remains available for download.

To export a browser-independent vector preview from a PDF, run:

```bash
python scripts/generate-poster-preview.py public/posters/<slug>/poster.pdf
```

All SVG typography must be outlined into vector paths, preserving the original font appearance without relying on installed or remotely loaded fonts. Any raster images must be embedded inside the SVG. The production build enforces this convention; run `npm run verify:posters` to check it independently.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Validates poster assets and builds the Next.js application (does not retypeset the CV).
- `npm run update-data`: Scans the `data/` directory and updates the JSON indices for the library sections.
- `npm run generate-cv`: Manually triggers the PDF generation for the CV.

## Deployment

This project is optimized for deployment on **Vercel**.

### Vercel Deployment Note
Keep the build command as `npm run build` so poster SVG validation runs on deployment. Compile the CV locally with `npm run generate-cv` (XeLaTeX required), then commit `public/cv.pdf` alongside `cv-source/` and the web counterpart `data/cv.md`; Vercel does not need TeX.

## Tailored CV exports

Open `/cv/customize` from the CV page. Choose entries and individual bullets, reorder sections and entries, select A4 or US Letter and standard or compact spacing. Focus presets use the existing content. Saved versions and the current draft stay in local browser storage; selection JSON supports transfer between devices. PDF previews are generated from the selected TeX, with stale previews marked after changes.

`cv-source/main.tex` remains the canonical source. `scripts/build-cv-catalog.js` derives the selectable catalogue during every build; it merges continued project sections and preserves the original TeX fragments. Do not edit `catalog.json` by hand. Run `node scripts/test-cv-model.js` to verify selections, ordering, and source preservation.

`POST /api/cv/export?format=pdf` validates catalogue IDs and options, then calls the dedicated compiler service. `format=source` exports a self-contained ZIP containing main.tex, resume.cls, vector institution marks, selection.json, and compile instructions. No arbitrary user TeX is accepted. The canonical public/cv.pdf is not overwritten.

The online service runs `scripts/cv-compiler-service.js` on server10 under a dedicated unprivileged systemd user, using Tectonic with untrusted mode, a warm package cache, a compile timeout, a single compile slot, and a bounded PDF cache. Its loopback listener is exposed through the existing Cloudflare tunnel at `https://cv-compiler.runnelzhang.com`. The Next.js server uses `CV_COMPILER_URL` when set, otherwise that URL.

When CV content or the shared renderer changes:
1. Build the catalogue and run the model tests.
2. Sync cv-source/, lib/cv-model.js, and scripts/cv-compiler-service.js to /opt/cv-compiler on server10.
3. Restart cv-compiler.service and verify an actual PDF export.
4. Deploy the website through its existing Git/Vercel integration.

A new macro or font also needs a trusted warm-up compile before enabling cached-only compilation. Browser smoke checks are in scripts/cv-browser-smoke.py (local production server on port 3010, Playwright and Microsoft Edge).

## Author

**Runnel Zhang**
*Undergraduate at Nanjing University, Jianxiong Academy*

- **Interests**: Computer Science, Mathematics, Linguistics.
- **Contact**: zhangruncheng@thunlp.com

## License

© 2025 Bibliotheca Runnel. All Rights Reserved.
