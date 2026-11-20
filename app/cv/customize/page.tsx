import {catalog} from "@/lib/cv-model";
import type {CVSection} from "@/lib/cv-types";
import CVCustomizer from "@/components/custom/CVCustomizer";
export const metadata={title:"Customize CV | Runcheng Zhang"};
export default function CustomizeCV(){
 const c=catalog() as {sections:CVSection[]};
 const sections=c.sections.map(s=>({id:s.id,title:s.title,entries:s.entries.map(e=>({id:e.id,title:e.title,summary:e.summary,bullets:e.bullets.map(b=>({text:b.text}))}))}));
 return <CVCustomizer sections={sections}/>;
}
