const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../data/linguistics.json');
const contentDir = path.join(__dirname, '../data/markdown_content/linguistics');

const articles = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

articles.forEach(article => {
    const mdPath = path.join(contentDir, `${article.slug}.md`);
    if (fs.existsSync(mdPath)) {
        let content = fs.readFileSync(mdPath, 'utf-8');
        if (!content.startsWith('---')) {
            const tags = JSON.stringify(article.tags || []);
            const frontmatter = `---
id: "${article.id}"
title: "${article.title}"
description: "${article.description}"
slug: "${article.slug}"
tags: ${tags}
---

`;
            fs.writeFileSync(mdPath, frontmatter + content);
            console.log(`Updated ${article.slug}.md`);
        }
    }
});
