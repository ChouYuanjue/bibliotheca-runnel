import notesData from "@/data/inm_notes_index.json";
import classicsData from "@/data/classics.json";
import linguisticsData from "@/data/linguistics.json";
import criticismsData from "@/data/criticisms.json";
import PageHero from "@/components/custom/PageHero";
import ArchiveCard from "@/components/custom/ArchiveCard";

const classicsEntryCount = classicsData.reduce((sum, category) => sum + category.items.length, 0);

const sections = [
  {
    title: "Informal Notes on Mathematics",
    description: "Mathematical notes with PDFs and TeX sources, grouped by volume.",
    href: "/library/notes",
    eyebrow: "Mathematical notes",
    meta: `${notesData.project.noteCount} notes · ${notesData.project.volumeCount} volumes`,
    accent: "bg-slate-900",
  },
  {
    title: "Jeanot Collection (让诺集)",
    description: "Classical-style Chinese writings with multiple reading layouts.",
    href: "/library/classics",
    eyebrow: "Classical writing",
    meta: `${classicsEntryCount} entries · ${classicsData.length} categories`,
    accent: "bg-amber-500",
  },
  {
    title: "Linguistic Miscellanea",
    description: "Language notes on phonology, syntax, conlangs, historical scripts, and translation.",
    href: "/library/linguistics",
    eyebrow: "Language miscellany",
    meta: `${linguisticsData.length} articles`,
    accent: "bg-emerald-500",
  },
  {
    title: "Noctes Runnelianae",
    description: "Essays, reviews, lecture records, and notes on texts, images, and ideas.",
    href: "/library/criticisms",
    eyebrow: "Essays and criticism",
    meta: `${criticismsData.length} essays`,
    accent: "bg-purple-500",
  },
];

export default function LibraryIndex() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <PageHero
        eyebrow="Library"
        title="Long-form archive"
        description="This page is for materials that need their own browsing context rather than a single chronological list: note volumes, text collections, and essay archives keep separate layouts and indices."
        meta={(
          <>
            <span className="rounded-full border border-gray-200 bg-white/70 px-4 py-2">{notesData.project.noteCount} INM notes</span>
            <span className="rounded-full border border-gray-200 bg-white/70 px-4 py-2">{notesData.project.volumeCount} math volumes</span>
            <span className="rounded-full border border-gray-200 bg-white/70 px-4 py-2">{criticismsData.length + linguisticsData.length} essays and miscellanea</span>
          </>
        )}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <ArchiveCard
            key={section.href}
            href={section.href}
            title={section.title}
            description={section.description}
            eyebrow={section.eyebrow}
            meta={section.meta}
            accent={section.accent}
          />
        ))}
      </div>
    </div>
  );
}
