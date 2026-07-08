const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONTENT_DIR = path.join(__dirname, '../data/fragments');
const META_FILE = path.join(__dirname, '../data/fragments_meta.json');
const CONTENT_OUTPUT_DIR = path.join(__dirname, '../data/fragments_content');
const PUBLIC_DIR = path.join(__dirname, '../public/fragments');

function parseFrontMatter(content) {
  content = content.replace(/^\uFEFF/, '');
  const match = content.match(/^\s*---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (match) {
    return {
      meta: yaml.load(match[1]) || {},
      content: match[2].trim(),
    };
  }
  return { meta: {}, content };
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.name !== 'index.md') {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function extractCategory(meta, content) {
  if (meta.category) return String(meta.category);
  const title = `${meta.title || ''} ${content.slice(0, 600)}`.toLowerCase();
  if (/satire|parody|fictional|meme|pseudo/.test(title)) return 'Satire';
  if (/email|correspondence|follow-up/.test(title)) return 'Correspondence';
  if (/project|system|pipeline|migration|u-net|bank|icp|engineering/.test(title)) return 'Engineering Notes';
  if (/lecture|seminar|talk/.test(title)) return 'Seminar Notes';
  if (/name|personal|journey/.test(title)) return 'Personal Archive';
  return 'Mathematical Study';
}

function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('No fragments content directory found.');
    return;
  }

  fs.rmSync(CONTENT_OUTPUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(CONTENT_OUTPUT_DIR, { recursive: true });

  const slugs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .sort();

  const metaIndex = {};

  for (const slug of slugs) {
    const itemDir = path.join(CONTENT_DIR, slug);
    const indexFile = path.join(itemDir, 'index.md');
    if (!fs.existsSync(indexFile)) continue;

    const fileContent = fs.readFileSync(indexFile, 'utf-8');
    const { meta, content } = parseFrontMatter(fileContent);
    const publicItemDir = path.join(PUBLIC_DIR, slug);
    copyDir(itemDir, publicItemDir);

    const itemMeta = {
      title: meta.title || slug,
      date: meta.date || '',
      description: meta.description || '',
      category: extractCategory(meta, content),
    };

    metaIndex[slug] = itemMeta;
    fs.writeFileSync(
      path.join(CONTENT_OUTPUT_DIR, `${slug}.json`),
      JSON.stringify({ ...itemMeta, content }, null, 2),
      'utf-8'
    );
  }

  fs.writeFileSync(META_FILE, JSON.stringify(metaIndex, null, 2), 'utf-8');
  console.log(`Generated ${META_FILE} with ${Object.keys(metaIndex).length} items.`);
  console.log(`Generated split fragment content in ${CONTENT_OUTPUT_DIR}.`);
}

main();
