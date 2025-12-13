import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";

interface AchievedItem {
  title: string;
  state: string;
  description: string;
  date: string;
  githubUrl?: string;
  content: string;
}

async function getAchievedItem(slug: string): Promise<AchievedItem | null> {
  const filePath = path.join(process.cwd(), "data", "achieved.json");
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileContent = fs.readFileSync(filePath, "utf-8");
  try {
    const data = JSON.parse(fileContent);
    return data[slug] || null;
  } catch (e) {
    return null;
  }
}

export default async function AchievedPage({ params }: { params: { slug: string } }) {
  const item = await getAchievedItem(params.slug);

  if (!item) {
    notFound();
  }

  const stateColors: Record<string, string> = {
    FICTIONAL: "bg-purple-100 text-purple-800",
    FAILED: "bg-red-100 text-red-800",
    SUCCESS: "bg-green-100 text-green-800",
  };

  const stateColor = stateColors[item.state] || "bg-gray-100 text-gray-800";

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link href="/achieved" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <ArrowLeft size={20} className="mr-2" />
        Back to Achieved
      </Link>

      <div className="mb-8 border-b border-gray-100 pb-8">
        <div className="flex items-center gap-3 mb-4">
            <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-bold tracking-wider ${stateColor}`}>
            {item.state}
            </span>
            <span className="text-sm text-gray-400 font-mono">
                {new Date(item.date).toLocaleDateString()}
            </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 font-serif mb-4">{item.title}</h1>
        <p className="text-xl text-gray-600">{item.description}</p>
        
        {item.githubUrl && (
            <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-blue-600 hover:underline">
                View on GitHub ↗
            </a>
        )}
      </div>

      <MarkdownRenderer content={item.content} className="prose-lg" />
    </div>
  );
}
