const { spawn } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const env = {
  ...process.env,
  NEXT_DIST_DIR: process.env.NEXT_DIST_DIR || '.next-dev',
};

console.log(`[dev-next] Starting Next dev with distDir=${env.NEXT_DIST_DIR}`);
console.log('[dev-next] Production builds use .next; dev uses .next-dev to avoid chunk/cache collisions.');

const bin = path.join(process.cwd(), 'node_modules', 'next', 'dist', 'bin', 'next');
const child = spawn(process.execPath, [bin, 'dev', ...args], {
  cwd: process.cwd(),
  env,
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
