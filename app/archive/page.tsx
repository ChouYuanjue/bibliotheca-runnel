import Link from "next/link";
import PageHero from "@/components/custom/PageHero";

const sections = [
  { title: "Projects", href: "/projects", description: "Research code, engineering systems, tools, and older experiments." },
  { title: "Library", href: "/library", description: "Mathematical notes, classics, linguistics, and literary criticism." },
  { title: "Artifacts", href: "/artifacts", description: "Finished documents and preserved outputs from earlier work." },
  { title: "Fragments", href: "/fragments", description: "Short notes, correspondence, project diaries, and miscellaneous records." },
  { title: "Index", href: "/worklist", description: "A site-wide chronological index of archived material." },
];

export default function ArchivePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <PageHero
        eyebrow="Archive"
        title="Personal archive"
        description="Older, personal, technical, literary, and experimental material is retained here without treating it as part of the academic profile."
      />

      <div className="divide-y divide-gray-200 border-y border-gray-200">
        {sections.map((item) => (
          <Link key={item.href} href={item.href} className="group block py-5 first:pt-0 last:pb-0">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-serif text-lg font-semibold text-gray-950 group-hover:underline group-hover:decoration-gray-300 group-hover:underline-offset-4">{item.title}</h2>
              <span className="text-xs text-gray-300">↗</span>
            </div>
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-gray-500">{item.description}</p>
          </Link>
        ))}
      </div>

      <p className="max-w-2xl text-xs leading-5 text-gray-400">
        Material under the pseudonym Yuanjue Chou is primarily recreational or satirical, and may intentionally not aim at scientific correctness. It should not be read as a statement of my scientific views or research claims.
      </p>
    </div>
  );
}
