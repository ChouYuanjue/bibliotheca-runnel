const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONTENT_DIR = path.join(__dirname, '../data/fragments');
const OUTPUT_FILE = path.join(__dirname, '../data/fragments.json');
const PUBLIC_DIR = path.join(__dirname, '../public/fragments');

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
        console.log('No fragments content directory found.');
        return;
    }

    // Get all directories in CONTENT_DIR
    const items = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    const fragments = {};

    items.forEach(slug => {
        const itemDir = path.join(CONTENT_DIR, slug);
        const indexFile = path.join(itemDir, 'index.md');

        if (fs.existsSync(indexFile)) {
            const fileContent = fs.readFileSync(indexFile, 'utf-8');
            const { meta, content } = parseFrontMatter(fileContent);
            
            // Copy assets to public folder
            const publicItemDir = path.join(PUBLIC_DIR, slug);
            copyDir(itemDir, publicItemDir);

            // Fix relative image/file paths in content
            // Replace (filename.ext) with (/fragments/slug/filename.ext)
            // But be careful not to replace absolute paths or http links
            // A simple regex for markdown links/images: [text](url) or ![alt](url)
            
            // We can use a simpler approach: just replace relative paths that don't start with / or http
            // But doing it robustly is better.
            // For now, let's assume users use relative paths like `image.png` or `./image.png`
            
            // Actually, the user was told to use absolute paths like `/achieved/...`
            // But for fragments, if we want to support "referencing attachments", we can make it easier.
            // However, to be consistent with other scripts (like generate-criticisms), let's see what it does.
            // generate-criticisms.js does: content.replace(/\(images\//g, `(/library/criticisms/${slug}/images/`);
            // It seems it expects images to be in an `images` subfolder?
            
            // Let's just copy the files and let the user use absolute paths like `/fragments/slug/file.ext`.
            // Or we can try to help by replacing `(./` or just `(` if it looks like a local file.
            
            // For now, I won't do complex replacement to avoid breaking things. 
            // I will just copy the files. The user can use `/fragments/slug/filename`.
            
            fragments[slug] = {
                title: meta.title,
                date: meta.date,
                content: content,
                ...meta
            };
        }
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(fragments, null, 2));
    console.log(`Generated ${OUTPUT_FILE} with ${Object.keys(fragments).length} items.`);
}

main();