import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";

interface Criticism {
  slug: string;
  title: string;
  date: string;
  type: string;
  image?: string;
  description: string;
}

async function getCriticisms(): Promise<Criticism[]> {
  const filePath = path.join(process.cwd(), "data", "criticisms.json");
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const fileContent = fs.readFileSync(filePath, "utf-8");
  try {
    return JSON.parse(fileContent);
  } catch (e) {
    console.error("Failed to parse criticisms.json", e);
    return [];
  }
}

export default async function CriticismsPage() {
  const criticisms = await getCriticisms();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-serif">Criticisms</h1>
      <p className="text-gray-600 mb-12">
        A collection of lectures, essays, field research, and notes.
      </p>
      
      <div className="grid gap-8">
        {criticisms.length === 0 ? (
             <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                <p className="text-gray-500 italic">No content added yet.</p>
            </div>
        ) : (
            criticisms.map((item) => (
            <div key={item.slug} className="group flex flex-col md:flex-row gap-6 p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all bg-white">
                {item.image && (
                <div className="w-full md:w-48 h-32 flex-shrink-0 relative rounded-lg overflow-hidden bg-gray-100">
                    <Image 
                        src={item.image} 
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                )}
                <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold tracking-wider text-red-800 uppercase bg-red-50 px-2 py-1 rounded">
                        {item.type}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                        {new Date(item.date).toLocaleDateString()}
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 font-serif group-hover:text-red-800 transition-colors">
                    <Link href={`/library/criticisms/${item.slug}`}>
                    {item.title}
                    </Link>
                </h2>
                <p className="text-gray-600 line-clamp-2 leading-relaxed">
                    {item.description}
                </p>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
}
