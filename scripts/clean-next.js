const fs = require('fs');
const path = require('path');

const root = process.cwd();
const nextDir = path.join(root, '.next');

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function rmWithRetry(target, retries = 8) {
  for (let i = 0; i < retries; i += 1) {
    try {
      fs.rmSync(target, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
      return true;
    } catch (error) {
      if (i === retries - 1) {
        console.warn(`[clean-next] Could not fully remove ${target}: ${error.message}`);
        return false;
      }
      sleep(250 + i * 150);
    }
  }
  return false;
}

function atomicClean() {
  if (!fs.existsSync(nextDir)) {
    console.log('[clean-next] .next does not exist.');
    return;
  }

  const trash = path.join(root, `.next-trash-${Date.now()}-${process.pid}`);

  try {
    fs.renameSync(nextDir, trash);
    console.log(`[clean-next] Renamed .next -> ${path.basename(trash)}.`);
  } catch (error) {
    console.warn(`[clean-next] Rename failed, falling back to direct removal: ${error.message}`);
    const ok = rmWithRetry(nextDir);
    if (!ok && fs.existsSync(nextDir)) {
      console.error('[clean-next] .next is still present. Close running next/node processes and run npm run clean again.');
      process.exit(1);
    }
    return;
  }

  const ok = rmWithRetry(trash);
  if (!ok) {
    console.warn(`[clean-next] ${path.basename(trash)} remains as removable trash, but active .next is gone.`);
  }
}

atomicClean();
