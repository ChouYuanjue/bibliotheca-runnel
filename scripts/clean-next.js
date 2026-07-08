const fs = require('fs');
const path = require('path');

const root = process.cwd();
const targets = process.argv.slice(2).length > 0 ? process.argv.slice(2) : ['.next', '.next-dev'];

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

function atomicClean(name) {
  const targetDir = path.join(root, name);
  if (!fs.existsSync(targetDir)) {
    console.log(`[clean-next] ${name} does not exist.`);
    return;
  }

  const trash = path.join(root, `${name}-trash-${Date.now()}-${process.pid}`);

  try {
    fs.renameSync(targetDir, trash);
    console.log(`[clean-next] Renamed ${name} -> ${path.basename(trash)}.`);
  } catch (error) {
    console.warn(`[clean-next] Rename failed for ${name}, falling back to direct removal: ${error.message}`);
    const ok = rmWithRetry(targetDir);
    if (!ok && fs.existsSync(targetDir)) {
      console.error(`[clean-next] ${name} is still present. Close running Next/Node processes that use it and run npm run clean again.`);
      process.exitCode = 1;
    }
    return;
  }

  const ok = rmWithRetry(trash);
  if (!ok) {
    console.warn(`[clean-next] ${path.basename(trash)} remains as removable trash, but active ${name} is gone.`);
  }
}

for (const target of targets) atomicClean(target);
