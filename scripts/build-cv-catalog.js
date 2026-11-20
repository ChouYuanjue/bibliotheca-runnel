// Derive the selectable catalogue from the canonical, curated TeX source.
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..');
const tex=fs.readFileSync(path.join(root,'cv-source/main.tex'),'utf8').replace(/\r\n/g,'\n');
function arg(s,start){let n=0;for(let i=start;i<s.length;i++){if(s[i]==='{'&&s[i-1]!=='\\')n++;if(s[i]==='}'&&s[i-1]!=='\\'&&!--n)return s.slice(start+1,i);}throw Error('Unbalanced TeX argument');}
function plain(s){return s.replace(/(?<!\\)%[^\n]*/g,'').replace(/\\(?:href|cvsmalllink)\{[^}]*\}\{([^}]*)\}/g,' $1 ').replace(/\\(?:textbf|textit|textsuperscript|textcolor)\{([^{}]*)\}/g,' $1 ').replace(/\\(?:par|noindent|small|footnotesize|bfseries|quad|qquad|hfill|raggedright|raggedleft)\b/g,' ').replace(/\\(?:vspace|needspace|color)\{[^}]*\}/g,' ').replace(/\\[&%]/g,m=>m[1]).replace(/\$\\cdot\$/g,' · ').replace(/\\textbar/g,' | ').replace(/\\[a-zA-Z]+/g,' ').replace(/[{}]/g,'').replace(/--/g,'–').replace(/\s+/g,' ').trim();}
function slug(s){return plain(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
const sections=[];
for(const m of tex.matchAll(/\\begin\{rSection\}\{([^}]*)\}([\s\S]*?)\\end\{rSection\}/g)){
 const title=m[1].replace(' (continued)',''),id=slug(title),body=m[2].trim();
 let section=sections.find(s=>s.id===id);
 if(!section){section={id,title:plain(title),texTitle:title,entries:[]};sections.push(section);}
 let chunks=body.match(/\\begin\{rSubsection\}[\s\S]*?\\end\{rSubsection\}/g);
 if(!chunks&&body.includes('\\posterrow'))chunks=body.split('\n').filter(s=>s.startsWith('\\posterrow'));
 if(!chunks&&id==='technical-presentations')chunks=body.split(/(?=\\noindent\\textbf)/).filter(s=>s.trim());
 if(!chunks)chunks=[body];
 for(const chunk of chunks){
  const titleStart=chunk.includes('\\begin{rSubsection}')?chunk.indexOf('}',chunk.indexOf('\\begin{rSubsection}'))+1:chunk.includes('\\posterrow')?chunk.indexOf('{'):chunk.indexOf('\\textbf{')>=0?chunk.indexOf('{',chunk.indexOf('\\textbf{')):chunk.indexOf('{\\bfseries');
  let label=plain(titleStart>=0?arg(chunk,titleStart):title);
  // Education uses a declaration rather than an argument macro.
  if(id==='education')label='Nanjing University';
  if(id==='technical-background')label='Research & Engineering Skills';
  const entry={id:id+'--'+slug(label),title:label,summary:plain(chunk).slice(0,360),tex:chunk,before:'',after:'',bullets:[]};
  const itemStart=chunk.indexOf('\\item ');
  if(itemStart>=0){
   const ending=chunk.includes('\\end{rSubsection}')?'\\end{rSubsection}':'\\end{itemize}';
   const end=chunk.lastIndexOf(ending);
   entry.before=chunk.slice(0,itemStart);
   entry.after=chunk.slice(end);
   entry.bullets=chunk.slice(itemStart,end).split(/\\item\s+/).filter(Boolean).map(s=>({tex:s.trim(),text:plain(s)}));
  }
  section.entries.push(entry);
 }
}
const ids=sections.flatMap(s=>s.entries.map(e=>e.id));
if(new Set(ids).size!==ids.length||!ids.length)throw Error('Unexpected/duplicate catalogue entries: '+ids.length);
const catalog={version:1,preamble:tex.slice(0,tex.indexOf('\\begin{document}')),sections};
fs.writeFileSync(path.join(root,'cv-source/catalog.json'),JSON.stringify(catalog,null,2)+'\n');
console.log('CV catalogue:',sections.length,'sections,',ids.length,'entries');
