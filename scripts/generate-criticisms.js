const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONTENT_DIR = path.join(__dirname, '../data/criticisms');
const OUTPUT_FILE = path.join(__dirname, '../data/criticisms.json');
const PUBLIC_DIR = path.join(__dirname, '../public/library/criticisms');

function parseFrontMatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (match) {
        try {
            const frontMatter = yaml.load(match[1]);
            return {
                meta: frontMatter,
                content: match[2].trim()
            };
        } catch (e) {
            console.error('Error parsing YAML:', e);
        }
    }
    return { meta: {}, content: content };
}

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            // Don't copy the index markdown file itself to public, 
            // but copy everything else (images, pdfs, etc.)
            if (entry.name !== 'index.md') {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }
}

function main() {
    if (!fs.existsSync(CONTENT_DIR)) {
        console.log('No criticisms content directory found.');
        return;
    }

    // Get all directories in CONTENT_DIR
    const items = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    const criticisms = [];

    items.forEach(slug => {
        const itemDir = path.join(CONTENT_DIR, slug);
        const indexFile = path.join(itemDir, 'index.md');

        if (fs.existsSync(indexFile)) {
            const fileContent = fs.readFileSync(indexFile, 'utf-8');
            const { meta, content } = parseFrontMatter(fileContent);
            
            // Copy assets to public folder
            const publicItemDir = path.join(PUBLIC_DIR, slug);
            copyDir(itemDir, publicItemDir);

            // Fix relative image path in frontmatter
            if (meta.image) {
                if (meta.image.startsWith('/images/')) {
                    meta.image = `/library/criticisms/${slug}${meta.image}`;
                } else if (!meta.image.startsWith('/') && !meta.image.startsWith('http')) {
                    meta.image = `/library/criticisms/${slug}/${meta.image}`;
                }
            }

            // Fix relative image paths in content
            // Replace (images/...) with (/library/criticisms/slug/images/...)
            const fixedContent = content.replace(/\(images\//g, `(/library/criticisms/${slug}/images/`);

            criticisms.push({
                slug,
                ...meta,
                content: fixedContent
            });
        }
    });

    // Sort by date descending
    criticisms.sort((a, b) => new Date(b.date) - new Date(a.date));

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(criticisms, null, 2));
    console.log(`Generated ${OUTPUT_FILE} with ${criticisms.length} items.`);
}

main();
