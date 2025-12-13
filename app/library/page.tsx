import Link from "next/link";

const librarySections = [
  {
    title: "Mathematics Notes",
    description: "Archived PDF notes on various mathematical topics.",
    path: "/library/notes",
    color: "bg-blue-50 hover:bg-blue-100",
  },
  {
    title: "Classics",
    description: "Self-authored classical texts with switchable typography and layouts.",
    path: "/library/classics",
    color: "bg-amber-50 hover:bg-amber-100",
  },
  {
    title: "Linguistics Miscellanea",
    description: "Notes on phonology, syntax, and historical linguistics.",
    path: "/library/linguistics",
    color: "bg-emerald-50 hover:bg-emerald-100",
  },
  {
    title: "Criticisms",
    description: "Lectures, essays and field research on literature and philosophy.",
    path: "/library/criticisms",
    color: "bg-purple-50 hover:bg-purple-100",
  },
];

export default function LibraryIndex() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Library</h1>
      <p className="text-lg text-gray-600 mb-12">
        A curated collection of knowledge, spanning from rigorous mathematical derivations to classical literary appreciations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {librarySections.map((section) => (
          <Link key={section.path} href={section.path} className={`block p-8 rounded-xl transition-colors ${section.color}`}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">{section.title}</h2>
            <p className="text-gray-700">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
