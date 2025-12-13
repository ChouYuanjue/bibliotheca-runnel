import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";

interface LinguisticsArticle {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags?: string[];
}

async function getArticle(slug: string): Promise<{ meta: LinguisticsArticle | undefined, content: string }> {
  const jsonPath = path.join(process.cwd(), "data", "linguistics.json");
  let meta: LinguisticsArticle | undefined;
  
  if (fs.existsSync(jsonPath)) {
    const articles = JSON.parse(fs.readFileSync(jsonPath, "utf-8")) as LinguisticsArticle[];
    meta = articles.find(a => a.slug === slug);
  }

  const mdPath = path.join(process.cwd(), "data", "markdown_content", "linguistics", `${slug}.md`);
  let content = "";
  if (fs.existsSync(mdPath)) {
    const rawContent = fs.readFileSync(mdPath, "utf-8");
    // Remove frontmatter
    content = rawContent.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "").trim();
  } else {
    content = "# Article not found\n\nThe requested article content could not be found.";
  }

  return { meta, content };
}

export default async function LinguisticsArticlePage({ params }: { params: { slug: string } }) {
  const { meta, content } = await getArticle(params.slug);

  if (!meta) {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-2xl font-bold text-red-600">Article not found</h1>
            <Link href="/library/linguistics" className="text-blue-600 hover:underline mt-4 inline-block">Back to Linguistics</Link>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Link 
        href="/library/linguistics" 
        className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span className="font-serif italic">Return to Index</span>
      </Link>

      <article className="prose prose-xl prose-slate max-w-none prose-headings:font-serif prose-p:font-serif prose-li:font-serif">
        <div className="mb-8 border-b border-gray-200 pb-8">
            <div className="text-sm text-gray-500 font-mono mb-2">/{meta.slug}/</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">{meta.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
                {meta.tags && (
                    <div className="flex gap-2">
                        {meta.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-xs rounded-full font-mono">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
        
        <div className="leading-relaxed">
          <MarkdownRenderer content={content} className="prose-xl" />
        </div>
      </article>
    </div>
  );
}
