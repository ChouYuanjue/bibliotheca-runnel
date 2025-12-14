const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONTENT_DIR = path.join(__dirname, '../data/markdown_content/linguistics');
const OUTPUT_FILE = path.join(__dirname, '../data/linguistics.json');

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

function generateLinguistics() {
    if (!fs.existsSync(CONTENT_DIR)) {
        console.log('No linguistics content directory found.');
        return;
    }

    const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.md'));
    const articles = [];

    files.forEach(file => {
        const filePath = path.join(CONTENT_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { meta } = parseFrontMatter(fileContent);
        
        // Use filename as slug if not provided in meta
        const slug = meta.slug || file.replace('.md', '');

        if (meta.title) {
            articles.push({
                id: meta.id || slug,
                title: meta.title,
                description: meta.description || '',
                slug: slug,
                date: meta.date || '',
                tags: meta.tags || []
            });
        }
    });

    // Sort by date descending
    articles.sort((a, b) => {
        if (a.date && b.date) {
            return new Date(b.date) - new Date(a.date);
        }
        return (a.id || a.slug).localeCompare(b.id || b.slug);
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(articles, null, 2));
    console.log(`Generated linguistics.json with ${articles.length} articles.`);
}

generateLinguistics();
