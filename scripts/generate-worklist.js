const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const OUTPUT_FILE = path.join(DATA_DIR, 'worklist.json');

const readJson = (filename) => {
  const filePath = path.join(DATA_DIR, filename);
  return fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : null;
};

const generateWorklist = () => {
  const worklist = [];

  const projects = readJson('projects.json');
  if (projects) {
    projects.forEach((item) => worklist.push({
      type: 'Project',
      title: item.title,
      description: item.description,
      date: item.updatedAt,
      link: item.githubUrl,
      tags: [item.type, item.language, ...(item.topics || [])].filter(Boolean),
    }));
  }

  const linguistics = readJson('linguistics.json');
  if (linguistics) {
    linguistics.forEach((item) => worklist.push({
      type: 'Linguistics',
      title: item.title,
      description: item.description,
      date: item.date,
      link: `/library/linguistics/${item.slug}`,
      tags: item.tags || [],
    }));
  }

  const achieved = readJson('achieved.json');
  if (achieved) {
    Object.entries(achieved).forEach(([key, item]) => worklist.push({
      type: 'Achieved',
      title: item.title,
      description: item.description,
      date: item.date,
      link: `/artifacts/${key}`,
      tags: [item.state].filter(Boolean),
    }));
  }

  const criticisms = readJson('criticisms.json');
  if (criticisms) {
    criticisms.forEach((item) => worklist.push({
      type: 'Criticism',
      title: item.title,
      description: item.description,
      date: item.date,
      link: `/library/criticisms/${item.slug}`,
      tags: [item.type].filter(Boolean),
    }));
  }

  const fragments = readJson('fragments_meta.json');
  if (fragments) {
    Object.entries(fragments).forEach(([key, item]) => worklist.push({
      type: 'Fragment',
      title: item.title,
      description: item.description,
      date: item.date,
      link: `/fragments/${key}`,
      tags: [item.category].filter(Boolean),
    }));
  }

  const publications = readJson('publications.json');
  if (publications) {
    publications.forEach((item) => worklist.push({
      type: 'Publication',
      title: item.title,
      description: item.description,
      date: item.date,
      link: item.link,
    }));
  }

  const classics = readJson('classics.json');
  if (classics) {
    const itemCount = classics.reduce((sum, category) => sum + category.items.length, 0);
    worklist.push({
      type: 'Collection',
      title: 'Jeanot Collection (让诺集)',
      description: `A classical-writing collection with ${itemCount} entries across ${classics.length} categories.`,
      date: '2025-01-01',
      link: '/library/classics',
      tags: ['Classics'],
    });
  }

  const notesIndex = readJson('inm_notes_index.json');
  if (notesIndex) {
    worklist.push({
      type: 'Collection',
      title: notesIndex.project.title,
      description: `${notesIndex.project.noteCount} dated notes across ${notesIndex.project.volumeCount} thematic volumes, with full PDF and per-note TeX sources.`,
      date: notesIndex.notes[0]?.date || '2026-01-01',
      link: '/library/notes',
      tags: ['INM', 'Mathematics'],
    });

    notesIndex.notes.forEach((note) => worklist.push({
      type: 'Note',
      title: `${note.id} · ${note.title}`,
      description: `${note.volume} · ${note.sectionCount} sections · PDF and TeX source available in the INM archive.`,
      date: note.date,
      link: note.pdf || '/library/notes',
      tags: [note.volume, 'INM'],
    }));
  }

  worklist.sort((a, b) => new Date(b.date) - new Date(a.date));
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(worklist, null, 2));
  console.log(`Generated worklist with ${worklist.length} items.`);
};

generateWorklist();
