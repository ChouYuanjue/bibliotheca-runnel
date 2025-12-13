const fs = require('fs');
const path = require('path');
const readline = require('readline');
const https = require('https');

const PROJECTS_JSON_PATH = path.join(__dirname, '../data/projects.json');
const MARKDOWN_DIR = path.join(__dirname, '../data/markdown_content/projects');

// Ensure directories exist
if (!fs.existsSync(MARKDOWN_DIR)) {
    fs.mkdirSync(MARKDOWN_DIR, { recursive: true });
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
        console.log('--- Add New Project from GitHub ---');
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
        // Try main, then master
        let readmeContent = '';
        try {
            const readmeData = await fetchJson(`https://api.github.com/repos/${owner}/${repo}/readme`);
            if (readmeData.download_url) {
                readmeContent = await fetchText(readmeData.download_url);
            }
        } catch (e) {
            console.warn('Could not fetch README automatically:', e.message);
        }

        const slug = repo.toLowerCase();
        const projectData = {
            id: slug,
            title: repoInfo.name, // Allow user to edit later?
            description: repoInfo.description || '',
            githubUrl: repoInfo.html_url,
            stars: repoInfo.stargazers_count,
            language: repoInfo.language,
            topics: repoInfo.topics || [],
            updatedAt: repoInfo.updated_at,
            slug: slug
        };

        console.log('\nProject Details Found:');
        console.log(`Title: ${projectData.title}`);
        console.log(`Description: ${projectData.description}`);
        console.log(`Slug: ${projectData.slug}`);
        
        const confirm = await question('\nProceed to add this project? (y/n): ');
        if (confirm.toLowerCase() !== 'y') {
            console.log('Aborted.');
            rl.close();
            return;
        }

        // Update projects.json
        let projects = [];
        if (fs.existsSync(PROJECTS_JSON_PATH)) {
            projects = JSON.parse(fs.readFileSync(PROJECTS_JSON_PATH, 'utf-8'));
        }

        // Check if exists
        const existingIndex = projects.findIndex(p => p.slug === slug);
        if (existingIndex >= 0) {
            const overwrite = await question('Project already exists. Overwrite? (y/n): ');
            if (overwrite.toLowerCase() === 'y') {
                projects[existingIndex] = projectData;
            } else {
                console.log('Skipped json update.');
            }
        } else {
            projects.push(projectData);
        }

        fs.writeFileSync(PROJECTS_JSON_PATH, JSON.stringify(projects, null, 2));
        console.log(`Updated ${PROJECTS_JSON_PATH}`);

        // Write Markdown
        const mdPath = path.join(MARKDOWN_DIR, `${slug}.md`);
        fs.writeFileSync(mdPath, readmeContent || '# No README found');
        console.log(`Created ${mdPath}`);

        console.log('\nSuccess! Project added.');

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        rl.close();
    }
}

main();
