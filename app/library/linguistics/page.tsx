import Link from "next/link";
import fs from "fs";
import path from "path";

interface LinguisticsArticle {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags?: string[];
}

async function getArticles(): Promise<LinguisticsArticle[]> {
  const filePath = path.join(process.cwd(), "data", "linguistics.json");
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const fileContent = fs.readFileSync(filePath, "utf-8");
  try {
    return JSON.parse(fileContent);
  } catch (e) {
    console.error("Failed to parse linguistics.json", e);
    return [];
  }
}

export default async function LinguisticsPage() {
  const articles = await getArticles();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-12 border-b-2 border-gray-900 pb-4">
        <h1 className="text-4xl font-bold text-gray-900 font-serif tracking-tight">Linguistics</h1>
        <p className="text-gray-600 mt-2 font-serif italic">Notes on phonology, syntax, and historical linguistics.</p>
      </div>
      
      <div className="grid gap-8">
        {articles.length === 0 ? (
          <p className="text-gray-500 italic font-serif">No articles found.</p>
        ) : (
          articles.map((article) => (
            <Link key={article.id} href={`/library/linguistics/${article.slug}`} className="block group">
              <article className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 group-hover:bg-blue-600 transition-colors duration-300"></div>
                <div className="mb-2 flex items-center text-sm text-gray-500 font-mono">
                  <span>/{article.slug}/</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 font-serif group-hover:text-blue-800 transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-600 leading-relaxed font-serif">
                  {article.description}
                </p>
                {article.tags && (
                  <div className="mt-4 flex gap-2 flex-wrap">
                    {article.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-sm font-mono">
                        [{tag}]
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
