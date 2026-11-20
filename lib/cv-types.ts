export type CVConfig={version:1;paper:"letter"|"a4";density:"normal"|"compact";sections:string[];entries:{id:string;bullets:number[]}[]};
export type CVSection={id:string;title:string;entries:{id:string;title:string;summary:string;bullets:{text:string}[]}[]};
