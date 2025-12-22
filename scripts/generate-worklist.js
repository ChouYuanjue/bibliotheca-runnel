const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const OUTPUT_FILE = path.join(DATA_DIR, 'worklist.json');

// Helper to read JSON
const readJson = (filename) => {
    const filePath = path.join(DATA_DIR, filename);
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    return null;
};

// Helper to extract Overview from markdown content
const extractOverview = (content) => {
    if (!content) return '';
    // Match content between "## Overview" and the next "##"
    // We look for "## Overview" (case insensitive), capture everything until the next line starting with "##" or end of string
    const match = content.match(/(?:^|\n)##\s*Overview\s*([\s\S]*?)(?=\n##|$)/i);
    if (match && match[1]) {
        let overview = match[1].trim();
        // Remove trailing separators like --- or ***
        overview = overview.replace(/(\n\s*[-*]{3,}\s*)$/, '').trim();
        return overview;
    }
    // Fallback: take first paragraph if no Overview section
    return content.split('\n\n')[0].trim();
};

const generateWorklist = () => {
    const worklist = [];

    // 1. Projects
    const projects = readJson('projects.json');
    if (projects) {
        projects.forEach(item => {
            worklist.push({
                type: 'Project',
                title: item.title,
                description: item.description,
                date: item.updatedAt,
                link: item.githubUrl
            });
        });
    }

    // 2. Linguistics
    const linguistics = readJson('linguistics.json');
    if (linguistics) {
        linguistics.forEach(item => {
            worklist.push({
                type: 'Linguistics',
                title: item.title,
                description: item.description,
                date: item.date,
                link: `/library/linguistics/${item.slug}`
            });
        });
    }

    // 3. Achieved
    const achieved = readJson('achieved.json');
    if (achieved) {
        Object.entries(achieved).forEach(([key, item]) => {
            worklist.push({
                type: 'Achieved',
                title: item.title,
                description: item.description,
                date: item.date,
                link: `/achieved/${key}`
            });
        });
    }

    // 4. Criticisms
    const criticisms = readJson('criticisms.json');
    if (criticisms) {
        criticisms.forEach(item => {
            worklist.push({
                type: 'Criticism',
                title: item.title,
                description: item.description,
                date: item.date,
                link: `/library/criticisms/${item.slug}`
            });
        });
    }

    // 5. Fragments
    const fragments = readJson('fragments.json');
    if (fragments) {
        Object.entries(fragments).forEach(([key, item]) => {
            const overview = extractOverview(item.content);
            worklist.push({
                type: 'Fragment',
                title: item.title,
                description: overview,
                date: item.date,
                link: `/fragments/${key}`
            });
        });
    }

    // 6. Publications
    const publications = readJson('publications.json');
    if (publications) {
        publications.forEach(item => {
            worklist.push({
                type: 'Publication',
                title: item.title,
                description: item.description,
                date: item.date,
                link: item.link
            });
        });
    }

    // 7. Classics (Jeanot Collection)
    const classics = readJson('classics.json');
    if (classics) {
        const stats = classics.map(c => `${c.category} (${c.items.length})`).join(', ');
        worklist.push({
            type: 'Collection',
            title: 'Jeanot Collection (让诺集)',
            description: `A curated collection of classical writings, categorized into: ${stats}.`,
            date: '2025-07-19',
            link: '/library/classics'
        });
    }

    // 8. Notes
    const notes = readJson('library_notes_index.json');
    if (notes) {
        notes.forEach(item => {
            worklist.push({
                type: 'Note',
                title: item.title,
                description: item.description,
                date: item.date,
                link: `/notes/${item.filename}` // Correct path based on public/notes/
            });
        });
    }

    // Sort all items by date descending
    worklist.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Write to file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(worklist, null, 2));
    console.log(`Generated worklist with ${worklist.length} items.`);
};

generateWorklist();
