const assert=require('node:assert/strict');
const {catalog,defaults,validate,render}=require('../lib/cv-model');
const c=catalog(),d=defaults(c),full=render(c,d);
assert.equal(new Set(d.entries.map(e=>e.id)).size,d.entries.length);
assert.equal((full.match(/\\begin\{rSection\}/g)||[]).length,c.sections.length);
assert(!full.includes('Projects (continued)'));
for(const section of c.sections)for(const entry of section.entries){
 assert(full.includes(entry.bullets.length?entry.before:entry.tex),entry.id);
 for(const bullet of entry.bullets)assert(full.includes(bullet.tex));
}
const first=d.entries[0],minimal={...d,paper:'a4',density:'compact',entries:[first]};
const reduced=render(c,minimal);
assert.equal((reduced.match(/\\begin\{rSection\}/g)||[]).length,1);
assert(reduced.includes('a4paper,top=.55in'));
assert(!reduced.includes('\\begin{rSection}{Research Experience}'));
const s=c.sections.find(s=>s.entries.some(e=>e.bullets.length>1)),entry=s.entries.find(e=>e.bullets.length>1);
const selective=render(c,{...d,entries:[{id:entry.id,bullets:[1]}]});
assert(!selective.includes(entry.bullets[0].tex));assert(selective.includes(entry.bullets[1].tex));
const ordered={...d,sections:[...d.sections].reverse(),entries:[...d.entries].reverse()},output=render(c,ordered);
assert(output.indexOf('\\begin{rSection}{Technical Presentations}')<output.indexOf('\\begin{rSection}{Education}'));
for(const invalid of [
 {...d,entries:[]},{...d,paper:'../../etc/passwd'},{...d,entries:[{id:'\\input{secret}',bullets:[]}]},
 {...d,sections:[d.sections[0],d.sections[0]]},{...d,entries:[{id:entry.id,bullets:[]}]},
 {...d,entries:[{id:entry.id,bullets:[-1]}]},{...d,entries:[{id:entry.id,bullets:[0,0]}]}
])assert.throws(()=>validate(c,invalid));
assert(c.sections.find(s=>s.id==='honors-awards').entries[0].summary.includes('Gold Medal'));
assert(c.sections.find(s=>s.id==='manuscript').entries[0].bullets[1].text.includes('16.1%'));
assert.equal(d.sections.indexOf('professional-experience'),d.sections.indexOf('research-experience')+1);
assert(c.preamble.includes('\\AtEndDocument{\\par\\vfill}'));
assert(c.preamble.includes('\\advance\\cvbottomreserve by -36pt'));
assert(!c.preamble.includes('\\needspace{'));
assert(c.sections.find(s=>s.id==='technical-background').entries[0].tex.includes('formal verification.\\par\\vspace{2pt}\\noindent\\textbf{Engineering:}'));
const fs=require('node:fs'),path=require('node:path');
const web=fs.readFileSync(path.join(__dirname,'../data/cv.md'),'utf8');
const raw=fs.readFileSync(path.join(__dirname,'../cv-source/main.tex'),'utf8');
assert(!/BANK\s+OF\s+CHINA|CHINA\s+BANK|中国银行|Akshay Vaishnav|Dreamland Apartment|example@example/i.test(raw+web));
assert(!/Work remained at the PoC stage|without conflating|not confused with|Investigating language-model|Prototyping scientific agents/.test(raw+web));
assert(web.includes('173%')&&web.includes('250%')&&web.includes('22.2%')&&web.includes('16.1%'));
assert(web.includes('Improved Lean proof success'));
console.log('CV model: catalogue, source preservation, selections, ordering, paper/spacing, invalid inputs passed.');
