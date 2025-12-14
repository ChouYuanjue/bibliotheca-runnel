import Link from "next/link";
import fragmentsData from "@/data/fragments.json";

const data = fragmentsData as Record<string, { title: string; date: string; description?: string }>;

export default function FragmentsIndex() {
  // Sort by date descending
  const sortedFragments = Object.entries(data).sort(([, a], [, b]) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Fragments</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Thoughts, correspondence, and miscellaneous notes. A collection of unfinished ideas and fleeting moments.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedFragments.map(([slug, item]) => (
          <Link key={slug} href={`/fragments/${slug}`} className="group block h-full">
            <div className="h-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col">
              <div className="mb-4">
                <span className="text-xs font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                  {item.date}
                </span>
              </div>
              <h2 className="text-xl font-serif font-semibold text-gray-900 group-hover:text-blue-700 mb-3">
                {item.title}
              </h2>
              {item.description && (
                <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
                  {item.description}
                </p>
              )}
              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center text-sm text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Read more →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
