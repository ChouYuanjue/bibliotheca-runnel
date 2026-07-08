import notesData from "@/data/inm_notes_index.json";
import classicsData from "@/data/classics.json";
import linguisticsData from "@/data/linguistics.json";
import criticismsData from "@/data/criticisms.json";
import PageHero from "@/components/custom/PageHero";
import ArchiveCard from "@/components/custom/ArchiveCard";

const sections = [
  {
    title: "Informal Notes on Mathematics",
    description: "A reconstructed mathematical note collection organized by dates, volumes, PDFs, and TeX sources.",
    href: "/library/notes",
    eyebrow: "Mathematical notes",
    meta: `${notesData.project.noteCount} notes · ${notesData.project.volumeCount} volumes`,
    accent: "bg-slate-900",
  },
  {
    title: "Jeanot Collection (让诺集)",
    description: "A self-authored classical-writing collection with switchable typography and traditional reading layouts.",
    href: "/library/classics",
    eyebrow: "Classical writing",
    meta: `${classicsData.length} categories`,
    accent: "bg-amber-500",
  },
  {
    title: "Babelica Runneliana",
    description: "A Runnelian cabinet of language notes, from phonology and syntax to conlangs, historical scripts, and small Babelic puzzles.",
    href: "/library/linguistics",
    eyebrow: "Philological cabinet",
    meta: `${linguisticsData.length} articles`,
    accent: "bg-emerald-500",
  },
  {
    title: "Noctes Runnelianae",
    description: "A personal night-book of essays, reviews, lecture records, and marginal notes on texts, images, and ideas.",
    href: "/library/criticisms",
    eyebrow: "Runnelian adversaria",
    meta: `${criticismsData.length} essays`,
    accent: "bg-purple-500",
  },
];

export default function LibraryIndex() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <PageHero
        eyebrow="Library"
        title="A curated archive of named collections"
        description="The library is the most stable part of the site: four named collections spanning mathematical reconstruction, classical writing, Babelic philology, and Runnelian night-notes."
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
