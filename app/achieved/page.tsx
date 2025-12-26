import Link from "next/link";
import fs from "fs";
import path from "path";

interface AchievedItem {
  title: string;
  state: string;
  description: string;
  date: string;
  githubUrl?: string;
}

async function getAchievedData(): Promise<Record<string, AchievedItem>> {
  const filePath = path.join(process.cwd(), "data", "achieved.json");
  if (!fs.existsSync(filePath)) {
    return {};
  }
  const fileContent = fs.readFileSync(filePath, "utf-8");
  try {
    return JSON.parse(fileContent);
  } catch (e) {
    console.error("Failed to parse achieved.json", e);
    return {};
  }
}

export default async function AchievedIndex() {
  const data = await getAchievedData();
  
  // Sort by date descending
  const sortedEntries = Object.entries(data).sort(([, a], [, b]) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-serif">Achieved</h1>
      <p className="text-gray-600 mb-12 text-lg">
        A collection of works including fictional identities, failed experiments, and other non-standard academic outputs.
      </p>
      <div className="grid gap-6">
        {sortedEntries.length === 0 ? (
             <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                <p className="text-gray-500 italic">No items found.</p>
            </div>
        ) : (
            sortedEntries.map(([slug, item]) => (
            <div key={slug} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white group">
                <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                <h2 className="text-xl font-semibold font-serif group-hover:text-red-800 transition-colors">
                    <Link href={`/achieved/${slug}`}>
                    {item.title}
                    </Link>
                </h2>
                <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${
                    item.state === 'FICTIONAL' ? 'bg-purple-100 text-purple-700' :
                    item.state === 'FAILED' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-600'
                }`}>
                    {item.state}
                </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400 font-mono">
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                    {item.githubUrl && (
                        <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">
                            GitHub ↗
                        </a>
                    )}
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
}
