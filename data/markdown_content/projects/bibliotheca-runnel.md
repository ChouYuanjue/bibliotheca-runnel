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
- **Automated CV Generation**: Generates a professional PDF resume from Markdown source using Puppeteer during the build process.
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
- **PDF Generation**: `md-to-pdf` (Puppeteer)

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

> **Note**: The build command (`npm run generate-cv && next build`) automatically triggers the CV PDF generation script. Ensure you have the necessary environment dependencies for Puppeteer if deploying to a minimal Linux environment (or see Deployment notes below).

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Generates the CV PDF and builds the Next.js application.
- `npm run update-data`: Scans the `data/` directory and updates the JSON indices for the library sections.
- `npm run generate-cv`: Manually triggers the PDF generation for the CV.

## Deployment

This project is optimized for deployment on **Vercel**.

### Vercel Deployment Note
If you encounter issues with Puppeteer (`md-to-pdf`) during the Vercel build process due to missing Linux libraries, you can:
1. Generate the PDF locally (`npm run generate-cv`).
2. Commit the generated `public/cv.pdf` to the repository.
3. Change the build command in Vercel settings to just `next build`.

## Author

**Runnel Zhang**
*Undergraduate at Nanjing University, Jianxiong Academy*

- **Interests**: Computer Science, Mathematics, Linguistics.
- **Contact**: Runnel.Zhang@smail.nju.edu.cn

## License

© 2025 Bibliotheca Runnel. All Rights Reserved.