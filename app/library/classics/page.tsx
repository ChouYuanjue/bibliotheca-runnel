import { promises as fs } from 'fs';
import path from 'path';
import ClassicsReader from '@/components/custom/ClassicsReader';

async function getClassicsData() {
  const filePath = path.join(process.cwd(), 'data', 'classics.json');
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading classics data:", error);
    return [];
  }
}

export default async function ClassicsPage() {
  const data = await getClassicsData();

  return (
    <div className="w-full h-full">
      <ClassicsReader data={data} />
    </div>
  );
}
