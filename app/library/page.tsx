import notesData from "@/data/inm_notes_index.json";
import classicsData from "@/data/classics.json";
import linguisticsData from "@/data/linguistics.json";
import criticismsData from "@/data/criticisms.json";
import PageHero from "@/components/custom/PageHero";
import ArchiveCard from "@/components/custom/ArchiveCard";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";

function firstClassicsTitles() {
  return classicsData.flatMap((category) => category.items.slice(0, 2).map((item) => item.title)).slice(0, 4);
}

const sections = [
  {
    title: "INM: Informal Notes on Mathematics",
    description: "A date-first archive of reconstructed mathematical notes. Each dated note provides PDF and TeX source; the full book is available as a compiled PDF.",
    href: "/library/notes",
    eyebrow: "Mathematics",
    meta: `${notesData.project.noteCount} notes · ${notesData.project.volumeCount} volumes`,
    accent: "bg-slate-900",
    entries: notesData.notes.slice(0, 4).map((note) => `${note.id}: ${note.title}`),
  },
  {
    title: "Classics",
    description: "Self-authored classical texts with switchable typography and layouts.",
    href: "/library/classics",
    eyebrow: "Classical writing",
    meta: `${classicsData.length} categories`,
    accent: "bg-amber-500",
    entries: firstClassicsTitles(),
  },
  {
    title: "Linguistic Miscellanea",
    description: "Notes on phonology, syntax, conlangs, historical artifacts, and linguistic interpretation.",
    href: "/library/linguistics",
    eyebrow: "Language",
    meta: `${linguisticsData.length} articles`,
    accent: "bg-emerald-500",
    entries: linguisticsData.slice(0, 4).map((item) => item.title),
  },
  {
    title: "Criticisms",
    description: "Essays, reviews, lecture records, and field notes on literature, philosophy, and image interpretation.",
    href: "/library/criticisms",
    eyebrow: "Criticism",
    meta: `${criticismsData.length} essays`,
    accent: "bg-purple-500",
    entries: criticismsData.slice(0, 4).map((item) => item.title),
  },
];

export default function LibraryIndex() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <PageHero
        eyebrow="Library"
        title="A curated archive of notes, texts, and criticism"
        description="The library is the most stable part of the site: a personal archive spanning mathematical reconstruction, classical writing, linguistic miscellanea, and literary-philosophical criticism."
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
          >
            <div className="space-y-2 border-t border-gray-100 pt-4">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">Representative entries</p>
              <ul className="space-y-1.5 text-sm leading-6 text-gray-600">
                {section.entries.map((entry) => (
                  <li key={entry} className="line-clamp-1"><MarkdownRenderer content={entry} inline /></li>
                ))}
              </ul>
            </div>
          </ArchiveCard>
        ))}
      </div>
    </div>
  );
}
