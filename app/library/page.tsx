import Link from "next/link";

const librarySections = [
  {
    title: "INM: Informal Notes on Mathematics",
    description: "A date-first archive of reconstructed mathematical notes. Each dated note provides both PDF and TeX source; the full book is available as a compiled PDF.",
    path: "/library/notes",
    color: "bg-slate-50 hover:bg-slate-100 border-slate-200",
  },
  {
    title: "Classics",
    description: "Self-authored classical texts with switchable typography and layouts.",
    path: "/library/classics",
    color: "bg-amber-50 hover:bg-amber-100 border-amber-100",
  },
  {
    title: "Linguistic Miscellanea",
    description: "Notes on phonology, syntax, and historical linguistics.",
    path: "/library/linguistics",
    color: "bg-emerald-50 hover:bg-emerald-100 border-emerald-100",
  },
  {
    title: "Criticisms",
    description: "Lectures, essays and field research on literature and philosophy.",
    path: "/library/criticisms",
    color: "bg-purple-50 hover:bg-purple-100 border-purple-100",
  },
];

export default function LibraryIndex() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Library</h1>
      <p className="text-lg text-gray-600 mb-12">
        A curated personal archive spanning mathematical notes, linguistic research, literary criticism, and classical writing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {librarySections.map((section) => (
          <Link key={section.path} href={section.path} className={`block p-8 rounded-xl border transition-colors ${section.color}`}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">{section.title}</h2>
            <p className="text-gray-700 leading-relaxed">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
