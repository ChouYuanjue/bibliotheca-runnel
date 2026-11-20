// Private-data-free compiler: accepts catalogue IDs and options, never user TeX.
const http=require('http'),fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const {execFile}=require('child_process'),{promisify}=require('util');
const {catalog,validate,render}=require('../lib/cv-model');
const root=path.resolve(__dirname,'..'),c=catalog(root),cache=path.join(root,'.cv-cache');
fs.mkdirSync(cache,{recursive:true});
const assetHash=crypto.createHash('sha256');
for(const name of ['resume.cls','assets/nju_vector.pdf','assets/thunlp_full_vector.pdf'])assetHash.update(fs.readFileSync(path.join(root,'cv-source',name)));
const templateHash=assetHash.digest('hex');
let busy=false;
function send(res,status,body,type='application/json'){res.writeHead(status,{'Content-Type':type,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(type==='application/json'?JSON.stringify(body):body);}
http.createServer(async(req,res)=>{
 if(req.url==='/health'&&req.method==='GET')return send(res,200,{ok:true,version:c.version});
 if(req.url!=='/compile'||req.method!=='POST')return send(res,404,{error:'Not found'});
 let size=0,chunks=[];
 try{
  for await(const chunk of req){size+=chunk.length;if(size>16384)return send(res,413,{error:'Configuration too large'});chunks.push(chunk);}
  const value=JSON.parse(Buffer.concat(chunks).toString('utf8'));
  const config=validate(c,value),tex=render(c,config);
  const key=crypto.createHash('sha256').update(templateHash).update(tex).digest('hex'),pdf=path.join(cache,key+'.pdf');
  if(fs.existsSync(pdf))return send(res,200,fs.readFileSync(pdf),'application/pdf');
  if(busy)return send(res,429,{error:'Another CV is compiling. Please retry in a moment.'});
  busy=true;
  let tmp;
  try{
   tmp=fs.mkdtempSync(path.join(os.tmpdir(),'cv-build-'));
   fs.mkdirSync(path.join(tmp,'assets'));
   for(const name of ['nju_vector.pdf','thunlp_full_vector.pdf'])fs.copyFileSync(path.join(root,'cv-source/assets',name),path.join(tmp,'assets',name));
   fs.copyFileSync(path.join(root,'cv-source/resume.cls'),path.join(tmp,'resume.cls'));
   fs.writeFileSync(path.join(tmp,'main.tex'),tex);
   const result=await promisify(execFile)(process.env.TECTONIC_BIN||'tectonic',['--untrusted','--only-cached','--keep-logs','--outdir',tmp,path.join(tmp,'main.tex')],{cwd:tmp,timeout:90000,maxBuffer:2*1024*1024,env:{...process.env,openin_any:'p',openout_any:'p'}});
   const bytes=fs.readFileSync(path.join(tmp,'main.pdf'));
   if(bytes.length<1000||bytes.subarray(0,5).toString()!=='%PDF-')throw Error('Invalid compiler output');
   fs.writeFileSync(pdf,bytes);
   // Bounded disk cache; no identifying version names are stored.
   const files=fs.readdirSync(cache).map(name=>({name,time:fs.statSync(path.join(cache,name)).mtimeMs})).sort((a,b)=>a.time-b.time);
   for(const f of files.slice(0,Math.max(0,files.length-100)))fs.unlinkSync(path.join(cache,f.name));
   send(res,200,bytes,'application/pdf');
  }catch(e){console.error('CV compilation failed:',String(e.stderr||e.message).slice(-2000));send(res,503,{error:'PDF compilation failed. Please retry or download the TeX source package.'});}
  finally{if(tmp)fs.rmSync(tmp,{recursive:true,force:true});busy=false;}
 }catch(e){send(res,400,{error:'Invalid CV selection.'});}
}).listen(Number(process.env.PORT||18790),'127.0.0.1',()=>console.log('CV compiler ready'));
