const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECTS_JSON_PATH = path.join(__dirname, '../data/projects.json');
const MARKDOWN_DIR = path.join(__dirname, '../data/markdown_content/projects');
const RAW_ARGS = process.argv.slice(2);

if (RAW_ARGS.length === 0) {
  console.error('Usage: node scripts/refresh-selected-projects.js research:https://github.com/owner/repo personal:https://github.com/owner/repo');
  process.exit(1);
}

if (!fs.existsSync(MARKDOWN_DIR)) fs.mkdirSync(MARKDOWN_DIR, { recursive: true });

function parseArg(arg) {
  const match = arg.match(/^(research|commercial|personal):(https:\/\/github\.com\/.+)$/i);
  if (!match) throw new Error(`Invalid target argument: ${arg}`);
  return { type: match[1].toLowerCase(), url: match[2] };
}

const TARGETS = RAW_ARGS.map(parseArg);
const TARGET_URLS = new Set(TARGETS.map(target => target.url.toLowerCase()));

function fetchText(url, accept = 'application/vnd.github+json') {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'bibliotheca-runnel-selected-refresh',
        'Accept': accept,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString('utf-8');
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(body);
        else reject(new Error(`Request failed ${res.statusCode}: ${body.slice(0, 300)}`));
      });
    }).on('error', reject);
  });
}

async function fetchJson(url) {
  return JSON.parse(await fetchText(url));
}

function parseRepo(url) {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+?)(?:\.git)?\/?$/i);
  if (!match) throw new Error(`Invalid GitHub URL: ${url}`);
  return { owner: match[1], repo: match[2] };
}

function slugify(repo) {
  return repo.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function fallbackDescriptionFromReadme(readmeContent, repo) {
  if (!readmeContent) return `${repo} project.`;
  const cleaned = readmeContent
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\r?\n/)
    .map(line => line.replace(/^#+\s*/, '').trim())
    .filter(line => line && !line.startsWith('![') && !line.startsWith('<') && !/^[-=*]{3,}$/.test(line));
  const candidate = cleaned.find(line => line.length >= 30) || cleaned[0];
  return candidate ? candidate.slice(0, 260) : `${repo} project.`;
}

async function refreshTarget(target, existing) {
  const { owner, repo } = parseRepo(target.url);
  const apiBase = `https://api.github.com/repos/${owner}/${repo}`;
  const repoInfo = await fetchJson(apiBase);
  let readmeContent = '';
  try {
    const readmeData = await fetchJson(`${apiBase}/readme`);
    if (readmeData.download_url) readmeContent = await fetchText(readmeData.download_url, 'text/plain');
  } catch (error) {
    console.warn(`Could not fetch README for ${repo}: ${error.message}`);
  }

  const slug = existing?.slug || slugify(repo);
  if (readmeContent) fs.writeFileSync(path.join(MARKDOWN_DIR, `${slug}.md`), readmeContent, 'utf-8');

  return {
    id: existing?.id || slug,
    title: existing?.title || repo,
    description: repoInfo.description || existing?.description || fallbackDescriptionFromReadme(readmeContent, repo),
    githubUrl: repoInfo.html_url || target.url,
    stars: repoInfo.stargazers_count ?? existing?.stars ?? 0,
    language: repoInfo.language || existing?.language || '',
    topics: repoInfo.topics || existing?.topics || [],
    updatedAt: repoInfo.updated_at || existing?.updatedAt || new Date().toISOString(),
    slug,
    type: target.type,
  };
}

async function main() {
  const projects = JSON.parse(fs.readFileSync(PROJECTS_JSON_PATH, 'utf-8'));
  const byUrl = new Map(projects.map(project => [String(project.githubUrl).toLowerCase(), project]));
  const untouched = projects.filter(project => !TARGET_URLS.has(String(project.githubUrl).toLowerCase()));
  const refreshed = [];

  for (const target of TARGETS) {
    console.log(`Refreshing selected ${target.type} project: ${target.url}`);
    const existing = byUrl.get(target.url.toLowerCase());
    try {
      const project = await refreshTarget(target, existing);
      refreshed.push(project);
      console.log(`  -> ${project.title} | ${project.language || 'no language'} | ${project.topics.length} topics | README ${fs.existsSync(path.join(MARKDOWN_DIR, `${project.slug}.md`)) ? 'saved' : 'missing'}`);
    } catch (error) {
      console.error(`  !! public fetch failed: ${error.message}`);
      if (existing) {
        refreshed.push({ ...existing, type: target.type, fetchStatus: 'public-fetch-failed' });
      } else {
        const { repo } = parseRepo(target.url);
        const slug = slugify(repo);
        refreshed.push({
          id: slug,
          title: repo,
          description: 'Public GitHub metadata could not be fetched for this repository during the latest refresh.',
          githubUrl: target.url,
          stars: 0,
          language: '',
          topics: [],
          updatedAt: new Date().toISOString(),
          slug,
          type: target.type,
          fetchStatus: 'public-fetch-failed',
        });
      }
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  fs.writeFileSync(PROJECTS_JSON_PATH, JSON.stringify([...untouched, ...refreshed], null, 2) + '\n', 'utf-8');
  console.log(`Updated ${refreshed.length} selected projects; preserved ${untouched.length} existing project records.`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
