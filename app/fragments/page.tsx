import Link from "next/link";
import fragmentsData from "@/data/fragments.json";

const data = fragmentsData as Record<string, { title: string; date: string }>;

export default function FragmentsIndex() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Fragments</h1>
      <p className="text-gray-600 mb-8">
        Thoughts, correspondence, and miscellaneous notes.
      </p>
      <div className="space-y-4">
        {Object.entries(data).map(([slug, item]) => (
          <div key={slug} className="flex items-baseline justify-between border-b border-gray-100 pb-2">
            <h2 className="text-lg font-medium">
              <Link href={`/fragments/${slug}`} className="hover:text-blue-600 transition-colors">
                {item.title}
              </Link>
            </h2>
            <span className="text-sm text-gray-400 font-mono">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
