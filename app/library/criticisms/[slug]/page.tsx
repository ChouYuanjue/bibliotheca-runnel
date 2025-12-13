import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";

interface Criticism {
  slug: string;
  title: string;
  date: string;
  type: string;
  image?: string;
  description: string;
  content: string;
}

async function getCriticism(slug: string): Promise<Criticism | undefined> {
  const filePath = path.join(process.cwd(), "data", "criticisms.json");
  if (!fs.existsSync(filePath)) {
    return undefined;
  }
  const fileContent = fs.readFileSync(filePath, "utf-8");
  try {
    const criticisms = JSON.parse(fileContent) as Criticism[];
    return criticisms.find(c => c.slug === slug);
  } catch (e) {
    return undefined;
  }
}

export default async function CriticismPage({ params }: { params: { slug: string } }) {
  const item = await getCriticism(params.slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link href="/library/criticisms" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <ArrowLeft size={20} className="mr-2" />
        Back to Criticisms
      </Link>

      <article>
        <header className="mb-12 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold tracking-wider text-red-800 uppercase bg-red-50 px-2 py-1 rounded">
                    {item.type}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                    {new Date(item.date).toLocaleDateString()}
                </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif mb-6 leading-tight">
                {item.title}
            </h1>
            
            {item.image && (
                <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden bg-gray-100">
                    <Image 
                        src={item.image} 
                        alt={item.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <p className="text-xl text-gray-600 italic leading-relaxed">
                {item.description}
            </p>
        </header>

        <MarkdownRenderer content={item.content} className="prose-lg" />
      </article>
    </div>
  );
}
