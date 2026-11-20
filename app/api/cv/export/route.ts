import {NextRequest} from "next/server";
import fs from "fs";
import path from "path";
import {catalog,validate,render} from "@/lib/cv-model";
import {zip} from "@/lib/cv-zip";
export const runtime="nodejs";
export const maxDuration=60;
export const dynamic="force-dynamic";
export async function POST(request:NextRequest){
 const headers={"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"};
 try{
  if(Number(request.headers.get("content-length")||0)>16384)return Response.json({error:"Configuration too large."},{status:413,headers});
  const body=await request.text();
  if(body.length>16384)return Response.json({error:"Configuration too large."},{status:413,headers});
  const c=catalog(),config=validate(c,JSON.parse(body));
  const kind=request.nextUrl.searchParams.get("format")||"pdf";
  if(kind==="source"){
   const dir=path.join(process.cwd(),"cv-source");
   const files=[{name:"main.tex",data:Buffer.from(render(c,config))},{name:"resume.cls",data:fs.readFileSync(path.join(dir,"resume.cls"))},{name:"selection.json",data:Buffer.from(JSON.stringify(config,null,2))},{name:"README.txt",data:Buffer.from("Compile with XeLaTeX twice:\n  xelatex -no-shell-escape -interaction=nonstopmode -halt-on-error main.tex\n  xelatex -no-shell-escape -interaction=nonstopmode -halt-on-error main.tex\n\nKeep resume.cls and assets/ beside main.tex. Import selection.json in the CV customizer to restore this selection.\n")}];
   for(const name of ["nju_vector.pdf","thunlp_full_vector.pdf"])files.push({name:"assets/"+name,data:fs.readFileSync(path.join(dir,"assets",name))});
   return new Response(new Uint8Array(zip(files)),{headers:{...headers,"Content-Type":"application/zip","Content-Disposition":'attachment; filename="Runcheng_Zhang_CV_Source.zip"'}});
  }
  if(kind!=="pdf")return Response.json({error:"Unknown export format."},{status:400,headers});
  const response=await fetch(process.env.CV_COMPILER_URL||"https://cv-compiler.runnelzhang.com/compile",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(config),signal:AbortSignal.timeout(55000),cache:"no-store"});
  if(!response.ok){
   const retry=response.status===429;
   return Response.json({error:retry?"Another CV is compiling. Please retry in a moment.":"PDF compilation is temporarily unavailable. Please retry or download the TeX source package."},{status:retry?429:503,headers});
  }
  if(!response.headers.get("content-type")?.includes("application/pdf"))throw Error("Invalid compiler response");
  return new Response(response.body,{headers:{...headers,"Content-Type":"application/pdf","Content-Disposition":'inline; filename="Runcheng_Zhang_CV.pdf"'}});
 }catch(e){
  if(e instanceof SyntaxError||e instanceof Error&&/Invalid|Select at least/.test(e.message))return Response.json({error:"Invalid selection. Please select at least one entry and one bullet for each selected experience."},{status:400,headers});
  console.error("CV export:",e instanceof Error?e.message:"Unknown error");
  return Response.json({error:"Could not compile the PDF. Please retry or download the TeX source package."},{status:503,headers});
 }
}
