const { spawnSync } = require('child_process');
const path = require('path');

const scripts = [
    'generate-achieved.js',
    'generate-criticisms.js',
    'generate-organizations.js',
    'generate-notes-index.js',
    'generate-linguistics.js',
    'parse-classics.js',
    // 'refresh-projects.js',
    'generate-cv-pdf.js'
];

console.log('🔄 Starting data update...\n');

let hasError = false;

scripts.forEach(script => {
    const scriptPath = path.join(__dirname, script);
    console.log(`Running ${script}...`);
    
    const result = spawnSync('node', [scriptPath], { 
        stdio: 'inherit',
        encoding: 'utf-8'
    });

    if (result.status !== 0) {
        console.error(`❌ Failed to run ${script}`);
        hasError = true;
    } else {
        console.log(`✅ ${script} completed.\n`);
    }
});

if (hasError) {
    console.error('⚠️  Some scripts failed to complete.');
    process.exit(1);
} else {
    console.log('🎉 All data updated successfully!');
}
