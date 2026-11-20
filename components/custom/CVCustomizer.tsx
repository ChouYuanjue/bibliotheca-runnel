"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import {ArrowUp,ArrowDown,Check,Download,FileText,Loader2,Save,Settings2,Trash2,Upload} from "lucide-react";
import type {CVConfig,CVSection} from "@/lib/cv-types";
type Saved={name:string;config:CVConfig};
const KEY="runnel-cv-customizer-v1";
const button="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-purple-700";
export default function CVCustomizer({sections}: {sections:CVSection[]}){
 const all=sections.flatMap(s=>s.entries);
 const initial=():CVConfig=>({version:1,paper:"letter",density:"normal",sections:sections.map(s=>s.id),entries:all.map(e=>({id:e.id,bullets:e.bullets.map((_,i)=>i)}))});
 function restore(value:unknown):CVConfig{
  const v=value as CVConfig;
  if(!v||v.version!==1||!Array.isArray(v.sections)||!Array.isArray(v.entries)||!["letter","a4"].includes(v.paper)||!["normal","compact"].includes(v.density))throw Error("This is not a valid CV selection file.");
  const ids=Array.from(new Set(v.sections.filter(id=>sections.some(s=>s.id===id))));
  // New catalogue sections stay available even when importing an older selection.
  for(const s of sections)if(!ids.includes(s.id))ids.push(s.id);
  const seen=new Set<string>();
  const entries=v.entries.flatMap(e=>{
   const source=all.find(x=>x.id===e.id);if(!source||seen.has(e.id)||!Array.isArray(e.bullets))return [];
   seen.add(e.id);const bullets=Array.from(new Set(e.bullets.filter(i=>Number.isInteger(i)&&i>=0&&i<source.bullets.length)));
   if(source.bullets.length&&!bullets.length)return [];
   return [{id:e.id,bullets}];
  });
  return {version:1,paper:v.paper,density:v.density,sections:ids,entries};
 }
 const [config,setConfig]=useState<CVConfig>(initial);
 const [saved,setSaved]=useState<Saved[]>([]),[name,setName]=useState("My tailored CV"),[ready,setReady]=useState(false);
 const [busy,setBusy]=useState<"pdf"|"source"|null>(null),[error,setError]=useState(""),[notice,setNotice]=useState("");
 const [preview,setPreview]=useState<{url:string;signature:string}|null>(null);
 const urls=useRef<string[]>([]),fileInput=useRef<HTMLInputElement>(null),previewRef=useRef<HTMLElement>(null);
 useEffect(()=>{if(preview)previewRef.current?.scrollIntoView({behavior:"smooth",block:"start"});},[preview]);
 useEffect(()=>{
  try{const raw=localStorage.getItem(KEY);if(raw){const d=JSON.parse(raw);setConfig(restore(d.current));setSaved(Array.isArray(d.saved)?d.saved.slice(0,30).map((s:Saved)=>({name:String(s.name).slice(0,80),config:restore(s.config)})):[]);}}catch{setNotice("A saved selection could not be loaded. Showing the full CV.");}
  setReady(true);
  return ()=>urls.current.forEach(u=>URL.revokeObjectURL(u));
 // Catalogue is fixed for this page load.
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[]);
 useEffect(()=>{if(ready)try{localStorage.setItem(KEY,JSON.stringify({current:config,saved}));}catch{setNotice("Browser storage is unavailable. Export your selection to keep it.");}},[config,saved,ready]);
 const signature=JSON.stringify(config),stale=!!preview&&preview.signature!==signature;
 function selected(id:string){return config.entries.find(e=>e.id===id);}
 function toggle(id:string){
  const source=all.find(e=>e.id===id)!;
  setConfig(c=>({...c,entries:c.entries.some(e=>e.id===id)?c.entries.filter(e=>e.id!==id):[...c.entries,{id,bullets:source.bullets.map((_,i)=>i)}]}));
 }
 function toggleBullet(id:string,i:number){
  setConfig(c=>({...c,entries:c.entries.flatMap(e=>{if(e.id!==id)return [e];const bullets=e.bullets.includes(i)?e.bullets.filter(x=>x!==i):[...e.bullets,i].sort((a,b)=>a-b);return bullets.length?[{...e,bullets}]:[];})}));
 }
 function group(s:CVSection,on:boolean){setConfig(c=>({...c,entries:[...c.entries.filter(e=>!s.entries.some(x=>x.id===e.id)),...(on?s.entries.map(e=>({id:e.id,bullets:e.bullets.map((_,i)=>i)})):[])]}));}
 function moveSection(id:string,d:number){setConfig(c=>{const order=[...c.sections],i=order.indexOf(id),j=i+d;if(j<0||j>=order.length)return c;[order[i],order[j]]=[order[j],order[i]];return {...c,sections:order};});}
 function moveEntry(s:CVSection,id:string,d:number){
  setConfig(c=>{const entries=[...c.entries],peers=entries.filter(e=>s.entries.some(x=>x.id===e.id)),i=peers.findIndex(e=>e.id===id),other=peers[i+d];if(!other)return c;const a=entries.findIndex(e=>e.id===id),b=entries.findIndex(e=>e.id===other.id);[entries[a],entries[b]]=[entries[b],entries[a]];return {...c,entries};});
 }
 function preset(kind:string){
  const fresh=initial();
  if(kind==="full"){setConfig(fresh);return;}
  const matches=(id:string)=>["education","honors-awards","technical-background"].some(x=>id.startsWith(x))||
   (kind==="science"?/thunlp|molecular|enzyme|biotechnology/.test(id):kind==="formal"?/microsoft|trace|lean|formalization/.test(id):/volcano|flux|doge|bisem|nine/.test(id));
  setConfig({...fresh,entries:fresh.entries.filter(e=>matches(e.id))});setNotice("Preset applied. Fine-tune any entry or bullet below.");
 }
 function download(data:Blob,filename:string){const url=URL.createObjectURL(data);urls.current.push(url);const a=document.createElement("a");a.href=url;a.download=filename;a.click();}
 function exportSelection(){download(new Blob([JSON.stringify(config,null,2)],{type:"application/json"}),"CV_Selection.json");}
 async function importSelection(file?:File){if(!file)return;try{if(file.size>32768)throw Error("Selection file is too large.");setConfig(restore(JSON.parse(await file.text())));setNotice("Selection imported.");setError("");}catch(e){setError(e instanceof Error?e.message:"Could not import selection.");}finally{if(fileInput.current)fileInput.current.value="";}}
 async function generate(kind:"pdf"|"source"){
  if(busy||!config.entries.length)return;
  const current=JSON.stringify(config);setBusy(kind);setError("");setNotice("");
  try{
   const response=await fetch("/api/cv/export?format="+kind,{method:"POST",headers:{"Content-Type":"application/json"},body:current,signal:AbortSignal.timeout(65000)});
   if(!response.ok){const data=await response.json();throw Error(data.error||"Export failed.");}
   const blob=await response.blob();
   if(kind==="source")download(blob,"Runcheng_Zhang_CV_Source.zip");
   else{if(!blob.type.includes("application/pdf"))throw Error("The compiler did not return a PDF.");const url=URL.createObjectURL(blob);urls.current.push(url);setPreview({url,signature:current});setNotice("PDF compiled. Review the actual pagination in the preview.");}
  }catch(e){setError(e instanceof Error&&e.name!=="TimeoutError"?e.message:"Compilation timed out. Please retry; your selection has been kept.");}
  finally{setBusy(null);}
 }
 function save(){
  const title=name.trim().slice(0,80);if(!title){setError("Enter a version name first.");return;}
  if(saved.length>=30&&!saved.some(s=>s.name===title)){setError("You can save up to 30 versions. Delete a version or export your selection.");return;}
  setSaved(s=>[...s.filter(x=>x.name!==title),{name:title,config:JSON.parse(JSON.stringify(config))}]);setNotice('Saved “'+title+'” in this browser.');setError("");
 }
 const ordered=config.sections.map(id=>sections.find(s=>s.id===id)!);
 return <div className="mx-auto max-w-6xl space-y-7">
  <header className="space-y-3">
   <Link href="/cv" className="text-sm text-gray-500 hover:text-purple-800">Curriculum Vitae</Link>
   <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight">Make room for what matters.</h1>
   <p className="max-w-2xl text-gray-600">Select experiences, choose the details, and tailor the order for your next application. Export a professionally typeset PDF with the original CV design.</p>
  </header>
  <div className="grid grid-cols-1 gap-7 xl:grid-cols-[minmax(0,1fr)_320px] items-start">
   <div className="min-w-0 space-y-5">
    <section className="rounded-xl border border-gray-200 p-5 space-y-3">
     <h2 className="font-semibold">Start with a focus</h2>
     <div className="flex flex-wrap gap-2">{[["full","Full CV"],["science","AI for Science"],["formal","Formal Reasoning"],["engineering","Agent & Engineering"]].map(([id,label])=><button key={id} onClick={()=>preset(id)} className={button}>{label}</button>)}</div>
     <p className="text-sm text-gray-500">Presets select existing content. All entries remain available below.</p>
    </section>
    <div className="flex items-center justify-between gap-3">
     <p className="text-sm text-gray-600"><strong className="text-purple-900">{config.entries.length}</strong> of {all.length} entries selected</p>
     <button className="text-sm text-gray-500 underline underline-offset-4" onClick={()=>setConfig(c=>({...c,entries:[]}))}>Clear selection</button>
    </div>
    {ordered.map((s,si)=>{
     const count=s.entries.filter(e=>selected(e.id)).length;
     const entries=[...s.entries].sort((a,b)=>{const ai=config.entries.findIndex(e=>e.id===a.id),bi=config.entries.findIndex(e=>e.id===b.id);return (ai<0?999:ai)-(bi<0?999:bi);});
     return <section key={s.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-4 py-3">
       <input type="checkbox" aria-label={"Select all "+s.title} checked={count===s.entries.length} ref={el=>{if(el)el.indeterminate=count>0&&count<s.entries.length;}} onChange={e=>group(s,e.target.checked)} className="h-4 w-4 accent-purple-800"/>
       <h2 className="flex-1 min-w-0 font-semibold">{s.title}</h2>
       <span className="text-sm text-gray-500">{count}/{s.entries.length}</span>
       <button className="rounded p-1 hover:bg-gray-200 disabled:opacity-25" aria-label={"Move section "+s.title+" up"} disabled={si===0} onClick={()=>moveSection(s.id,-1)}><ArrowUp size={16}/></button>
       <button className="rounded p-1 hover:bg-gray-200 disabled:opacity-25" aria-label={"Move section "+s.title+" down"} disabled={si===ordered.length-1} onClick={()=>moveSection(s.id,1)}><ArrowDown size={16}/></button>
      </div>
      <div className="divide-y divide-gray-100">{entries.map(e=>{
       const current=selected(e.id),peers=config.entries.filter(x=>s.entries.some(y=>y.id===x.id)),index=peers.findIndex(x=>x.id===e.id);
       return <div key={e.id} className={"p-4 "+(current?"":"bg-gray-50/30")}>
        <div className="flex items-start gap-3">
         <input aria-label={e.title} type="checkbox" checked={!!current} onChange={()=>toggle(e.id)} className="mt-1 h-4 w-4 shrink-0 accent-purple-800"/>
         <label className="min-w-0 flex-1 cursor-pointer break-words text-sm font-semibold leading-6" onClick={()=>toggle(e.id)}>{e.title}</label>
         {current&&peers.length>1&&<div className="flex shrink-0"><button className="p-1 rounded hover:bg-gray-100 disabled:opacity-25" disabled={index===0} onClick={()=>moveEntry(s,e.id,-1)} aria-label={"Move "+e.title+" up"}><ArrowUp size={15}/></button><button className="p-1 rounded hover:bg-gray-100 disabled:opacity-25" disabled={index===peers.length-1} onClick={()=>moveEntry(s,e.id,1)} aria-label={"Move "+e.title+" down"}><ArrowDown size={15}/></button></div>}
        </div>
        {e.bullets.length?<div className="ml-7 mt-2 space-y-2">{e.bullets.map((b,i)=><label key={i} className={"flex gap-2 text-sm leading-relaxed cursor-pointer "+(current?.bullets.includes(i)?"text-gray-600":"text-gray-400")}><input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-purple-800" checked={!!current?.bullets.includes(i)} onChange={()=>current?toggleBullet(e.id,i):setConfig(c=>({...c,entries:[...c.entries,{id:e.id,bullets:[i]}]}))}/><span>{b.text}</span></label>)}</div>:<p className="ml-7 mt-1 text-sm leading-relaxed text-gray-500">{e.summary}</p>}
       </div>;
      })}</div>
     </section>;
    })}
   </div>
   <aside className="order-first space-y-5 xl:order-last xl:sticky xl:top-6">
    <section className="rounded-xl border border-purple-200 bg-purple-50/40 p-5 space-y-4">
     <h2 className="flex gap-2 items-center font-semibold"><Settings2 size={18}/>Export settings</h2>
     <label className="block text-sm font-medium">Paper size<select className="mt-1 block w-full rounded-lg border border-gray-200 bg-white p-2" value={config.paper} onChange={e=>setConfig(c=>({...c,paper:e.target.value as CVConfig["paper"]}))}><option value="letter">US Letter</option><option value="a4">A4</option></select></label>
     <label className="block text-sm font-medium">Spacing<select className="mt-1 block w-full rounded-lg border border-gray-200 bg-white p-2" value={config.density} onChange={e=>setConfig(c=>({...c,density:e.target.value as CVConfig["density"]}))}><option value="normal">Standard</option><option value="compact">Compact</option></select></label>
     <p className="text-sm text-gray-500">Contact details and institution marks stay in the header. Empty sections are omitted automatically.</p>
     <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-900 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-800 disabled:opacity-40" disabled={!!busy||!config.entries.length} onClick={()=>generate("pdf")}>{busy==="pdf"?<Loader2 className="animate-spin" size={17}/>:<FileText size={17}/>} {busy==="pdf"?"Compiling PDF…":"Compile & preview PDF"}</button>
     <button className={button+" w-full"} disabled={!!busy||!config.entries.length} onClick={()=>generate("source")}>{busy==="source"?<Loader2 className="animate-spin" size={16}/>:<Download size={16}/>}Download TeX source package</button>
     {!config.entries.length&&<p className="text-sm text-purple-800">Select at least one entry to export.</p>}
    </section>
    <section className="rounded-xl border border-gray-200 p-5 space-y-3">
     <h2 className="font-semibold">Your versions</h2>
     <label className="block text-sm text-gray-600">Version name<input value={name} maxLength={80} onChange={e=>setName(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900" placeholder="e.g. AI research internship"/></label>
     <button className={button+" w-full"} onClick={save} disabled={!ready}><Save size={16}/>Save this version</button>
     {saved.map(v=><div key={v.name} className="flex items-center gap-2"><button className="flex-1 truncate rounded bg-gray-50 p-2 text-left text-sm hover:bg-purple-50" onClick={()=>{setConfig(restore(v.config));setName(v.name);setNotice("Version loaded.");}}>{v.name}</button><button aria-label={"Delete version "+v.name} className="p-2 text-gray-400 hover:text-red-700" onClick={()=>setSaved(s=>s.filter(x=>x.name!==v.name))}><Trash2 size={15}/></button></div>)}
     <p className="text-sm text-gray-500">Selections and versions are saved in this browser. Export a selection file to use it on another device.</p>
     <div className="flex flex-wrap gap-2"><button className={button} onClick={exportSelection}><Download size={14}/>Selection</button><button className={button} onClick={()=>fileInput.current?.click()}><Upload size={14}/>Import</button></div>
     <input type="file" ref={fileInput} className="hidden" accept=".json,application/json" onChange={e=>importSelection(e.target.files?.[0])}/>
    </section>
    <div aria-live="polite" className="space-y-3">{error&&<p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}{notice&&<p className="rounded-lg border border-gray-200 p-3 text-sm text-gray-600">{notice}</p>}</div>
   </aside>
  </div>
  {preview&&<section ref={previewRef} className="rounded-xl border border-gray-200 p-4 md:p-6 space-y-4 scroll-mt-24" aria-label="Compiled PDF preview">
   <div className="flex flex-wrap gap-3 items-center justify-between">
    <h2 className="font-semibold flex items-center gap-2"><Check size={18}/>Compiled PDF</h2>
    <div className="flex gap-2"><a className={button} href={preview.url} target="_blank" rel="noreferrer">Open PDF</a><a className={button} href={preview.url} download="Runcheng_Zhang_CV.pdf"><Download size={16}/>Download PDF</a></div>
   </div>
   {stale&&<p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">Your selection has changed. Compile again to update this preview and download.</p>}
   <iframe title="Typeset CV PDF" src={preview.url} className="h-[75vh] min-h-[400px] w-full rounded-lg border border-gray-100"/>
   <p className="text-sm text-gray-500">Check the page count and line breaks here. On mobile, use Open PDF if the embedded viewer is unavailable.</p>
  </section>}
 </div>;
}
