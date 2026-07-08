import Link from "next/link";
import fragmentsMeta from "@/data/fragments_meta.json";
import PageHero from "@/components/custom/PageHero";
import ArchiveCard from "@/components/custom/ArchiveCard";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";

const data = fragmentsMeta as Record<string, { title: string; date: string; description?: string; category?: string }>;

export default function FragmentsIndex() {
  const sortedFragments = Object.entries(data).sort(([, a], [, b]) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const categories = Array.from(new Set(sortedFragments.map(([, item]) => item.category).filter(Boolean)));

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <PageHero
        eyebrow="Fragments"
        title="Working notes, small records, and intellectual debris"
        description="Informal records of mathematical study, correspondence, engineering notes, satire, and small intellectual episodes. They remain fragments rather than formal papers, but their metadata is kept tidy for browsing."
        meta={(
          <>
            <span className="rounded-full border border-gray-200 bg-white/70 px-4 py-2">{sortedFragments.length} fragments</span>
            <span className="rounded-full border border-gray-200 bg-white/70 px-4 py-2">{categories.length} categories</span>
          </>
        )}
      />

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <span key={category} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-500">
            {category}
          </span>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedFragments.map(([slug, item]) => (
          <ArchiveCard
            key={slug}
            href={`/fragments/${slug}`}
            title={<MarkdownRenderer content={item.title} inline />}
            description={item.description}
            eyebrow={item.category || "Fragment"}
            meta={item.date}
            accent="bg-amber-500"
          />
        ))}
      </div>
    </div>
  );
}
