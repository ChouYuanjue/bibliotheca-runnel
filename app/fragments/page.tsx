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
        title="Fragments"
        description="Study records, correspondence, engineering notes, satire, and short pieces that do not fit the main library sections."
        meta={<span>{sortedFragments.length} fragments · {categories.length} categories</span>}
      />

      <p className="text-xs leading-5 text-gray-400">{categories.join(" · ")}</p>

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
