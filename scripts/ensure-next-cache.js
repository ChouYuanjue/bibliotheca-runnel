const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const distDir = process.env.NEXT_DIST_DIR || '.next-dev';
const root = process.cwd();
const nextDir = path.join(root, distDir);
const serverDir = path.join(nextDir, 'server');
const pagesManifest = path.join(serverDir, 'pages-manifest.json');
const appManifest = path.join(serverDir, 'app-paths-manifest.json');

if (fs.existsSync(nextDir) && fs.existsSync(serverDir) && !fs.existsSync(pagesManifest) && !fs.existsSync(appManifest)) {
  console.warn(`[ensure-next-cache] Detected corrupted ${distDir}: server directory exists but manifests are missing. Cleaning before dev starts.`);
  const result = spawnSync(process.execPath, [path.join(__dirname, 'clean-next.js'), distDir], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
