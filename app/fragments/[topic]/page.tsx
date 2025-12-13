import { notFound } from "next/navigation";
import fragmentsData from "@/data/fragments.json";

const data = fragmentsData as Record<string, { title: string; date: string; content: string }>;

export default function FragmentPage({ params }: { params: { topic: string } }) {
  const item = data[params.topic];

  if (!item) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto font-serif">
      <header className="mb-10 border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 italic mb-2">{item.title}</h1>
        <time className="text-sm text-gray-500">{item.date}</time>
      </header>

      <article className="prose prose-slate prose-p:indent-8 text-justify">
        <p>{item.content}</p>
        {/* MDX Content would go here */}
      </article>
    </div>
  );
}
