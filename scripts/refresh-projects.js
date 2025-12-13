const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECTS_JSON_PATH = path.join(__dirname, '../data/projects.json');
const MARKDOWN_DIR = path.join(__dirname, '../data/markdown_content/projects');

// Ensure directories exist
if (!fs.existsSync(MARKDOWN_DIR)) {
    fs.mkdirSync(MARKDOWN_DIR, { recursive: true });
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

async function refreshProject(project) {
    console.log(`Refreshing ${project.title} (${project.githubUrl})...`);
    
    const match = project.githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
        console.error(`Invalid GitHub URL for project ${project.id}: ${project.githubUrl}`);
        return project;
    }

    const owner = match[1];
    const repo = match[2].replace(/\.git$/, '');

    try {
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
            console.warn(`Could not fetch README for ${repo}:`, e.message);
        }

        // Update project data
        const updatedProject = {
            ...project,
            description: repoInfo.description || project.description,
            stars: repoInfo.stargazers_count,
            language: repoInfo.language,
            topics: repoInfo.topics || [],
            updatedAt: repoInfo.updated_at,
        };

        // Write Markdown
        if (readmeContent) {
            const mdPath = path.join(MARKDOWN_DIR, `${project.slug}.md`);
            fs.writeFileSync(mdPath, readmeContent);
            console.log(`Updated README for ${project.slug}`);
        }

        return updatedProject;

    } catch (error) {
        console.error(`Error refreshing ${project.title}:`, error.message);
        return project; // Return original if failed
    }
}

async function main() {
    if (!fs.existsSync(PROJECTS_JSON_PATH)) {
        console.error('projects.json not found.');
        return;
    }

    const projects = JSON.parse(fs.readFileSync(PROJECTS_JSON_PATH, 'utf-8'));
    const updatedProjects = [];

    for (const project of projects) {
        const updated = await refreshProject(project);
        updatedProjects.push(updated);
        // Add a small delay to avoid hitting API rate limits too hard
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    fs.writeFileSync(PROJECTS_JSON_PATH, JSON.stringify(updatedProjects, null, 2));
    console.log(`\nSuccessfully refreshed ${updatedProjects.length} projects.`);
}

main();
