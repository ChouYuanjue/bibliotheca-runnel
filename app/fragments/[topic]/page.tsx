import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import fragmentsMeta from "@/data/fragments_meta.json";
import PageHero from "@/components/custom/PageHero";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";

const meta = fragmentsMeta as Record<string, { title: string; date: string; description?: string; category?: string }>;

type FragmentContent = {
  title: string;
  date: string;
  description?: string;
  category?: string;
  content: string;
};

function readFragment(slug: string): FragmentContent | null {
  const filePath = path.join(process.cwd(), "data", "fragments_content", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function generateStaticParams() {
  return Object.keys(meta).map((topic) => ({ topic }));
}

export default function FragmentPage({ params }: { params: { topic: string } }) {
  const item = readFragment(params.topic);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <PageHero
        eyebrow={item.category || "Fragment"}
        title={<MarkdownRenderer content={item.title} inline />}
        description={item.description}
        meta={<span className="rounded-full border border-gray-200 bg-white/70 px-4 py-2 font-mono">{item.date}</span>}
      />
      <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <MarkdownRenderer content={item.content} className="prose-slate max-w-none" />
      </article>
    </div>
  );
}
