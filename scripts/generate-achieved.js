const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONTENT_DIR = path.join(__dirname, '../data/achieved_content');
const OUTPUT_FILE = path.join(__dirname, '../data/achieved.json');
const PUBLIC_DIR = path.join(__dirname, '../public/achieved');

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
        console.log('No achieved content directory found.');
        return;
    }

    // Get all directories in CONTENT_DIR
    const items = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    const achieved = {};

    items.forEach(slug => {
        const itemDir = path.join(CONTENT_DIR, slug);
        const indexFile = path.join(itemDir, 'index.md');

        if (fs.existsSync(indexFile)) {
            const fileContent = fs.readFileSync(indexFile, 'utf-8');
            const { meta, content } = parseFrontMatter(fileContent);
            
            // Copy assets to public folder
            const publicItemDir = path.join(PUBLIC_DIR, slug);
            copyDir(itemDir, publicItemDir);

            achieved[slug] = {
                title: meta.title || slug,
                state: meta.state || 'UNKNOWN',
                description: meta.description || '',
                date: meta.date || new Date().toISOString(),
                githubUrl: meta.githubUrl || '',
                content: content
            };
        }
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(achieved, null, 2));
    console.log(`Generated ${OUTPUT_FILE} with ${Object.keys(achieved).length} items.`);
}

main();
