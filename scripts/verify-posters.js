// Keep poster SVGs portable: typography is outlined and images stay inside the file.
// This check runs before the production build so browsers never depend on local fonts.
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const postersRoot = path.join(root, "public", "posters");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "data", "posters.json"), "utf8"));
const seen = new Set();
const errors = [];

for (const item of manifest) {
  const slug = item.slug;
  if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    errors.push(`Invalid poster slug: ${String(slug)}`);
    continue;
  }
  if (seen.has(slug)) {
    errors.push(`Duplicate poster slug: ${slug}`);
    continue;
  }
  seen.add(slug);

  const directory = path.join(postersRoot, slug);
  const svgFile = path.join(directory, "poster.svg");
  const pdfFile = path.join(directory, "poster.pdf");

  if (item.preview !== `/posters/${slug}/poster.svg`) {
    errors.push(`${slug}: preview must point to /posters/${slug}/poster.svg`);
  }
  if (item.pdf !== `/posters/${slug}/poster.pdf`) {
    errors.push(`${slug}: pdf must point to /posters/${slug}/poster.pdf`);
  }
  if (!fs.existsSync(directory)) {
    errors.push(`${slug}: poster directory is missing`);
    continue;
  }
  if (!fs.existsSync(pdfFile)) {
    errors.push(`${slug}: poster.pdf is missing`);
  }

  const svgFiles = fs.readdirSync(directory).filter(name => name.toLowerCase().endsWith(".svg"));
  if (svgFiles.length !== 1 || svgFiles[0] !== "poster.svg") {
    errors.push(`${slug}: keep exactly one SVG named poster.svg`);
  }
  if (!fs.existsSync(svgFile)) continue;

  const svg = fs.readFileSync(svgFile, "utf8");
  if (!/^\s*(?:<\?xml[^>]*>\s*)?<svg\b/i.test(svg) || !/\bviewBox\s*=/.test(svg)) {
    errors.push(`${slug}: invalid or missing root SVG/viewBox`);
  }

  // Text should be converted to glyph paths. This avoids unembedded fonts and
  // platform-dependent rendering when the SVG is loaded as an <img>.
  if (/<(?:text|tspan)(?:\s|>)/i.test(svg) || /\bfont-family\s*[:=]|@font-face/i.test(svg)) {
    errors.push(`${slug}: SVG text depends on fonts; outline glyphs before publishing`);
  }
  if (/<(?:script|foreignObject)(?:\s|>)/i.test(svg) || /@import\b|<\?xml-stylesheet\b/i.test(svg)) {
    errors.push(`${slug}: SVG contains executable or externally styled content`);
  }

  for (const match of svg.matchAll(/\b(?:xlink:)?href\s*=\s*(["'])(.*?)\1/gi)) {
    const target = match[2].trim();
    if (!target.startsWith("#") && !target.startsWith("data:")) {
      errors.push(`${slug}: external SVG href is not self-contained (${target.slice(0, 80)})`);
      break;
    }
  }
  for (const match of svg.matchAll(/\burl\(\s*(['"]?)([^)'"]+)\1\s*\)/gi)) {
    const target = match[2].trim();
    if (!target.startsWith("#") && !target.startsWith("data:")) {
      errors.push(`${slug}: external SVG resource is not self-contained (${target.slice(0, 80)})`);
      break;
    }
  }
}

for (const dir of fs.readdirSync(postersRoot, { withFileTypes: true })) {
  if (dir.isDirectory() && !seen.has(dir.name)) {
    errors.push(`${dir.name}: poster directory has no entry in data/posters.json`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`Poster check failed: ${error}`);
  process.exit(1);
}

console.log(`Verified ${seen.size} self-contained poster.svg previews and PDF references.`);
