import { notFound } from "next/navigation";
import fragmentsData from "@/data/fragments.json";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";

const data = fragmentsData as Record<string, { title: string; date: string; content: string }>;

export default function FragmentPage({ params }: { params: { topic: string } }) {
  const item = data[params.topic];

  if (!item) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <header className="mb-10 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">{item.title}</h1>
        <time className="text-sm font-mono text-gray-500">{item.date}</time>
      </header>

      <article className="prose prose-slate max-w-none">
        <MarkdownRenderer content={item.content} />
      </article>
    </div>
  );
}
