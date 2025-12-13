const fs = require('fs');
const path = require('path');
const readline = require('readline');
const https = require('https');

const CONTENT_DIR = path.join(__dirname, '../data/achieved_content');

// Ensure directory exists
if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => {
        rl.question(query, resolve);
    });
}

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                'User-Agent': 'Node.js Script'
            }
        }, (res) => {
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        const buffer = Buffer.concat(chunks);
                        const data = buffer.toString('utf-8');
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    const buffer = Buffer.concat(chunks);
                    reject(new Error(`Request failed with status code ${res.statusCode}: ${buffer.toString()}`));
                }
            });
        }).on('error', reject);
    });
}

function fetchText(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                'User-Agent': 'Node.js Script'
            }
        }, (res) => {
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    const buffer = Buffer.concat(chunks);
                    resolve(buffer.toString('utf-8'));
                } else {
                    reject(new Error(`Request failed with status code ${res.statusCode}`));
                }
            });
        }).on('error', reject);
    });
}

async function main() {
    try {
        console.log('--- Add New Achieved Item from GitHub ---');
        const githubUrl = await question('Enter GitHub Repository URL (e.g., https://github.com/owner/repo): ');
        
        const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) {
            console.error('Invalid GitHub URL format.');
            rl.close();
            return;
        }

        const owner = match[1];
        const repo = match[2].replace(/\.git$/, '');

        console.log(`Fetching info for ${owner}/${repo}...`);

        // Fetch Repo Info
        const repoInfo = await fetchJson(`https://api.github.com/repos/${owner}/${repo}`);
        
        // Fetch README
        let readmeContent = '';
        try {
            const readmeData = await fetchJson(`https://api.github.com/repos/${owner}/${repo}/readme`);
            if (readmeData.download_url) {
                readmeContent = await fetchText(readmeData.download_url);
            }
        } catch (e) {
            console.warn('Could not fetch README automatically:', e.message);
        }

        const state = await question('Enter State (e.g., FICTIONAL, FAILED, ARCHIVED): ');

        const slug = repo.toLowerCase();
        const date = repoInfo.pushed_at || new Date().toISOString();

        const fileContent = `---
title: "${repoInfo.name}"
state: "${state.toUpperCase()}"
date: "${date}"
description: "${repoInfo.description || ''}"
githubUrl: "${repoInfo.html_url}"
---

${readmeContent || '# No content'}
`;

        const filePath = path.join(CONTENT_DIR, `${slug}.md`);
        fs.writeFileSync(filePath, fileContent);
        console.log(`Created ${filePath}`);
        
        console.log('Running generator script...');
        require('./generate-achieved.js');

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        rl.close();
    }
}

main();
