const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const NOTES_DIR = path.join(__dirname, '../public/notes');
const OUTPUT_FILE = path.join(__dirname, '../data/library_notes_index.json');

function getNotes() {
  const notes = [];
  
  if (!fs.existsSync(NOTES_DIR)) {
    console.error(`Notes directory not found: ${NOTES_DIR}`);
    return notes;
  }

  const years = fs.readdirSync(NOTES_DIR).filter(file => {
    return fs.statSync(path.join(NOTES_DIR, file)).isDirectory();
  });

  years.forEach(year => {
    const yearDir = path.join(NOTES_DIR, year);
    const files = fs.readdirSync(yearDir);

    files.forEach(file => {
      if (file.endsWith('.yaml')) {
        const id = path.basename(file, '.yaml');
        const pdfFile = `${id}.pdf`;
        
        if (fs.existsSync(path.join(yearDir, pdfFile))) {
          const yamlContent = fs.readFileSync(path.join(yearDir, file), 'utf8');
          try {
            const data = yaml.load(yamlContent);
            notes.push({
              id: id,
              title: id, // Use ID as title for now, or extract from summary if possible? No, ID is safer.
              description: data.summary || 'No summary available.',
              date: id.replace('N-', '').replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'), // Extract date from filename N-YYYYMMDD
              filename: `${year}/${pdfFile}`,
              tags: data.keywords || [],
              year: year
            });
          } catch (e) {
            console.error(`Error parsing YAML for ${file}:`, e);
          }
        }
      }
    });
  });

  // Sort by date descending
  return notes.sort((a, b) => b.date.localeCompare(a.date));
}

const notesData = getNotes();
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(notesData, null, 2));
console.log(`Generated index for ${notesData.length} notes.`);
