// ZIP store format, using Node's built-in buffers (no runtime archiver dependency).
export function zip(files:{name:string;data:Buffer}[]){
 const local:Buffer[]=[],central:Buffer[]=[];let offset=0;
 function crc(bytes:Buffer){let n=0xffffffff;for(const b of bytes){n^=b;for(let i=0;i<8;i++)n=(n>>>1)^((n&1)?0xedb88320:0);}return (n^0xffffffff)>>>0;}
 for(const f of files){
  const name=Buffer.from(f.name),check=crc(f.data),head=Buffer.alloc(30);
  head.writeUInt32LE(0x04034b50,0);head.writeUInt16LE(20,4);head.writeUInt16LE(0x800,6);head.writeUInt32LE(check,14);head.writeUInt32LE(f.data.length,18);head.writeUInt32LE(f.data.length,22);head.writeUInt16LE(name.length,26);
  local.push(head,name,f.data);
  const entry=Buffer.alloc(46);entry.writeUInt32LE(0x02014b50,0);entry.writeUInt16LE(20,4);entry.writeUInt16LE(20,6);entry.writeUInt16LE(0x800,8);entry.writeUInt32LE(check,16);entry.writeUInt32LE(f.data.length,20);entry.writeUInt32LE(f.data.length,24);entry.writeUInt16LE(name.length,28);entry.writeUInt32LE(offset,42);central.push(entry,name);
  offset+=head.length+name.length+f.data.length;
 }
 const directory=Buffer.concat(central),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50,0);end.writeUInt16LE(files.length,8);end.writeUInt16LE(files.length,10);end.writeUInt32LE(directory.length,12);end.writeUInt32LE(offset,16);
 return Buffer.concat([...local,directory,end]);
}
