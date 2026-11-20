// Shared by the web API, compiler service, and source-bundle exporter.
const fs=require('fs'),path=require('path');
function catalog(root=process.cwd()){return JSON.parse(fs.readFileSync(path.join(root,'cv-source/catalog.json'),'utf8'));}
function defaults(c){return {version:1,paper:'letter',density:'normal',sections:c.sections.map(s=>s.id),entries:c.sections.flatMap(s=>s.entries.map(e=>({id:e.id,bullets:e.bullets.map((_,i)=>i)})))};}
function validate(c,value){
 if(!value||value.version!==1||!['letter','a4'].includes(value.paper)||!['normal','compact'].includes(value.density)||!Array.isArray(value.sections)||!Array.isArray(value.entries))throw Error('Invalid CV configuration.');
 const sectionIds=c.sections.map(s=>s.id), entries=c.sections.flatMap(s=>s.entries);
 if(value.sections.length>sectionIds.length||new Set(value.sections).size!==value.sections.length||value.sections.some(s=>!sectionIds.includes(s)))throw Error('Invalid section selection.');
 if(!value.entries.length||value.entries.length>entries.length||new Set(value.entries.map(e=>e.id)).size!==value.entries.length)throw Error('Select at least one experience.');
 for(const e of value.entries){
  const found=entries.find(x=>x.id===e.id);
  if(!found||!c.sections.some(s=>value.sections.includes(s.id)&&s.entries.some(x=>x.id===e.id))||!Array.isArray(e.bullets)||new Set(e.bullets).size!==e.bullets.length||e.bullets.some(i=>!Number.isInteger(i)||i<0||i>=found.bullets.length)||found.bullets.length&&!e.bullets.length)throw Error('Invalid experience or bullet selection.');
 }
 return {version:1,paper:value.paper,density:value.density,sections:[...value.sections],entries:value.entries.map(e=>({id:e.id,bullets:[...e.bullets]}))};
}
function render(c,value){
 const config=validate(c,value);
 let pre=c.preamble.replace('letterpaper,top=',config.paper==='a4'?'a4paper,top=':'letterpaper,top=');
 if(config.density==='compact')pre=pre.replace('top=.67in,bottom=.67in','top=.55in,bottom=.55in').replace('\\vspace{8.5pt plus 3pt}','\\vspace{6pt plus 2pt}').replace('\\setlength{\\itemsep}{1.1pt}','\\setlength{\\itemsep}{0pt}');
 const blocks=config.sections.map(id=>{
  const s=c.sections.find(s=>s.id===id);
  const selected=config.entries.filter(e=>s.entries.some(x=>x.id===e.id));
  if(!selected.length)return '';
  const content=selected.map(e=>{const source=s.entries.find(x=>x.id===e.id);return source.bullets.length?source.before+e.bullets.map(i=>'\\item '+source.bullets[i].tex+'\n').join('')+source.after:source.tex;}).join('\n\n');
  return '\\Needspace*{9\\baselineskip}\n\\begin{rSection}{'+s.texTitle+'}\n'+content+'\n\\end{rSection}';
 }).filter(Boolean);
 return pre+'\\begin{document}\n\\thispagestyle{fancy}\n\n'+blocks.join('\n\n')+'\n\\end{document}\n';
}
module.exports={catalog,defaults,validate,render};
