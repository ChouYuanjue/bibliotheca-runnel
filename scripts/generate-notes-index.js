const fs = require('fs');
const path = require('path');

const HOMEPAGE_ROOT = path.join(__dirname, '..');
const INM_ROOT = process.env.INM_TEX_DIR || 'E:/INM-TeX';
const PUBLIC_NOTES_DIR = path.join(HOMEPAGE_ROOT, 'public', 'notes');
const OUTPUT_FILE = path.join(HOMEPAGE_ROOT, 'data', 'inm_notes_index.json');

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readText(file) {
  return fs.readFileSync(file, 'utf8');
}

function copyIfExists(src, dst) {
  if (!fs.existsSync(src)) return false;
  ensureDir(path.dirname(dst));
  fs.copyFileSync(src, dst);
  return true;
}

function readBracedArgument(text, openBraceIndex) {
  if (openBraceIndex < 0 || text[openBraceIndex] !== '{') return null;
  let depth = 0;
  for (let i = openBraceIndex; i < text.length; i += 1) {
    const ch = text[i];
    const prev = i > 0 ? text[i - 1] : '';
    if (ch === '{' && prev !== '\\') depth += 1;
    if (ch === '}' && prev !== '\\') {
      depth -= 1;
      if (depth === 0) {
        return {
          value: text.slice(openBraceIndex + 1, i),
          end: i + 1,
        };
      }
    }
  }
  return null;
}

function commandArguments(text, command, count) {
  const start = text.indexOf(`\\${command}`);
  if (start < 0) return null;
  let cursor = start + command.length + 1;
  const args = [];
  for (let i = 0; i < count; i += 1) {
    while (cursor < text.length && /\s/.test(text[cursor])) cursor += 1;
    const arg = readBracedArgument(text, cursor);
    if (!arg) return null;
    args.push(arg.value);
    cursor = arg.end;
  }
  return args;
}

function allCommandArguments(text, command) {
  const out = [];
  let searchFrom = 0;
  const needle = `\\${command}`;
  while (searchFrom < text.length) {
    const start = text.indexOf(needle, searchFrom);
    if (start < 0) break;
    let cursor = start + needle.length;
    while (cursor < text.length && /\s/.test(text[cursor])) cursor += 1;
    const arg = readBracedArgument(text, cursor);
    if (arg) {
      out.push(arg.value);
      searchFrom = arg.end;
    } else {
      searchFrom = start + needle.length;
    }
  }
  return out;
}

function replaceTwoArgCommand(s, command, choose = 0) {
  const needle = `\\${command}`;
  let out = '';
  let cursor = 0;
  while (cursor < s.length) {
    const start = s.indexOf(needle, cursor);
    if (start < 0) {
      out += s.slice(cursor);
      break;
    }
    out += s.slice(cursor, start);
    let pos = start + needle.length;
    while (pos < s.length && /\s/.test(s[pos])) pos += 1;
    const first = readBracedArgument(s, pos);
    if (!first) {
      out += needle;
      cursor = pos;
      continue;
    }
    pos = first.end;
    while (pos < s.length && /\s/.test(s[pos])) pos += 1;
    const second = readBracedArgument(s, pos);
    if (!second) {
      out += first.value;
      cursor = first.end;
      continue;
    }
    out += choose === 1 ? second.value : first.value;
    cursor = second.end;
  }
  return out;
}

function unwrapOneArgCommands(s) {
  const commands = ['textit', 'emph', 'textbf', 'mathrm', 'mathbf', 'mathit', 'operatorname'];
  let changed = true;
  while (changed) {
    changed = false;
    for (const command of commands) {
      const needle = `\\${command}`;
      let out = '';
      let cursor = 0;
      let localChanged = false;
      while (cursor < s.length) {
        const start = s.indexOf(needle, cursor);
        if (start < 0) {
          out += s.slice(cursor);
          break;
        }
        out += s.slice(cursor, start);
        let pos = start + needle.length;
        while (pos < s.length && /\s/.test(s[pos])) pos += 1;
        const arg = readBracedArgument(s, pos);
        if (!arg) {
          out += needle;
          cursor = pos;
          continue;
        }
        out += arg.value;
        cursor = arg.end;
        localChanged = true;
      }
      if (localChanged) {
        s = out;
        changed = true;
      }
    }
  }
  return s;
}

function texDisplayText(input) {
  if (!input) return '';
  let s = input.replace(/\r?\n/g, ' ');
  s = replaceTwoArgCommand(s, 'texorpdfstring', 0);
  s = replaceTwoArgCommand(s, 'href', 1);
  s = unwrapOneArgCommands(s);
  s = s.replace(/\\\((.*?)\\\)/g, '$$$1$$')
       .replace(/\\\[(.*?)\\\]/g, '$$$$1$$$$')
       .replace(/\\&/g, '&')
       .replace(/\\%/g, '%')
       .replace(/\\_/g, '_')
       .replace(/\\#/g, '#')
       .replace(/---/g, '—')
       .replace(/--/g, '–');
  return s.replace(/\s+/g, ' ').trim();
}

function volumeMapFromTeX() {
  const volumeDir = path.join(INM_ROOT, 'tex', 'volumes');
  const map = new Map();
  if (!fs.existsSync(volumeDir)) return map;

  fs.readdirSync(volumeDir)
    .filter((name) => /^vol-.*\.tex$/.test(name))
    .sort()
    .forEach((name) => {
      const text = readText(path.join(volumeDir, name));
      const volumeMatch = text.match(/%\s*Volume:\s*(.+)/);
      const volume = volumeMatch ? volumeMatch[1].trim() : path.basename(name, '.tex');
      const includeRe = /\\include\{tex\/notes\/(N-\d+)\}/g;
      let match;
      while ((match = includeRe.exec(text)) !== null) {
        map.set(match[1], volume);
      }
    });

  return map;
}

function buildArchive() {
  const notesDir = path.join(INM_ROOT, 'tex', 'notes');
  const singlePdfDir = path.join(INM_ROOT, 'single-pdfs');
  const singleTexRoot = path.join(INM_ROOT, 'build-log', 'single-note-build');

  if (!fs.existsSync(notesDir)) {
    throw new Error(`INM notes directory not found: ${notesDir}`);
  }

  fs.rmSync(PUBLIC_NOTES_DIR, { recursive: true, force: true });
  ensureDir(PUBLIC_NOTES_DIR);

  const fullPdfCopied = copyIfExists(path.join(INM_ROOT, 'inm.pdf'), path.join(PUBLIC_NOTES_DIR, 'inm.pdf'));
  const volumeMap = volumeMapFromTeX();

  const notes = fs.readdirSync(notesDir)
    .filter((name) => /^N-\d{8}\.tex$/.test(name))
    .sort()
    .map((filename) => {
      const id = path.basename(filename, '.tex');
      const raw = id.slice(2);
      const year = raw.slice(0, 4);
      const month = raw.slice(4, 6);
      const day = raw.slice(6, 8);
      const date = `${year}-${month}-${day}`;
      const monthName = monthNames[Number(month) - 1] || month;
      const yearDir = path.join(PUBLIC_NOTES_DIR, year);
      ensureDir(yearDir);

      const texPath = path.join(notesDir, filename);
      const text = readText(texPath);
      const noteArgs = commandArguments(text, 'notechapter', 2);
      const title = noteArgs ? texDisplayText(noteArgs[1]) : id;
      const sections = allCommandArguments(text, 'section')
        .map((section) => texDisplayText(section))
        .filter(Boolean);

      const pdfCopied = copyIfExists(path.join(singlePdfDir, `${id}.pdf`), path.join(yearDir, `${id}.pdf`));
      const singleTexPath = path.join(singleTexRoot, id, `${id}-single.tex`);
      const texCopied = copyIfExists(fs.existsSync(singleTexPath) ? singleTexPath : texPath, path.join(yearDir, `${id}.tex`));

      return {
        id,
        date,
        year,
        month: monthName,
        day,
        title,
        volume: volumeMap.get(id) || 'Unsorted',
        sectionCount: sections.length,
        sections: sections.slice(0, 8),
        pdf: pdfCopied ? `/notes/${year}/${id}.pdf` : null,
        tex: texCopied ? `/notes/${year}/${id}.tex` : null,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  const data = {
    project: {
      title: 'INM: Informal Notes on Mathematics',
      subtitle: 'A dated archive of mathematical notes reconstructed into an English TeX book.',
      fullPdf: fullPdfCopied ? '/notes/inm.pdf' : null,
      oldArchive: 'https://github.com/ChouYuanjue/Informal_Notes_on_Mathematics',
      noteCount: notes.length,
      volumeCount: new Set(notes.map((note) => note.volume).filter((volume) => volume !== 'Unsorted')).size,
      source: INM_ROOT,
    },
    volumes: [...new Set(notes.map((note) => note.volume))].sort(),
    years: [...new Set(notes.map((note) => note.year))].sort((a, b) => b.localeCompare(a)),
    notes,
  };

  ensureDir(path.dirname(OUTPUT_FILE));
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));

  const pdfCount = notes.filter((note) => note.pdf).length;
  const texCount = notes.filter((note) => note.tex).length;
  console.log(`Generated INM index: ${notes.length} notes, ${pdfCount} PDFs, ${texCount} single-note TeX sources, full PDF: ${fullPdfCopied ? 'yes' : 'no'}.`);
}

buildArchive();
