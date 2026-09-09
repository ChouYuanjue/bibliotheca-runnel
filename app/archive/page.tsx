import PageHero from "@/components/custom/PageHero";
import ArchiveCard from "@/components/custom/ArchiveCard";

const sections = [
  { title: "Projects", href: "/projects", description: "Research code, engineering systems, tools, and older experiments.", eyebrow: "Code and systems", accent: "bg-blue-600" },
  { title: "Library", href: "/library", description: "Mathematical notes, classics, linguistics, and literary criticism.", eyebrow: "Long-form writing", accent: "bg-slate-900" },
  { title: "Artifacts", href: "/artifacts", description: "Finished documents and preserved outputs from earlier work.", eyebrow: "Outputs", accent: "bg-purple-500" },
  { title: "Fragments", href: "/fragments", description: "Short notes, correspondence, project diaries, and miscellaneous records.", eyebrow: "Short-form archive", accent: "bg-amber-500" },
  { title: "Index", href: "/worklist", description: "A site-wide chronological index of archived material.", eyebrow: "Full index", accent: "bg-rose-500" },
];

export default function ArchivePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <PageHero
        eyebrow="Archive"
        title="Personal archive"
        description="Personal notes, technical work, literary material, and miscellaneous records collected across projects and periods."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((item) => <ArchiveCard key={item.href} {...item} />)}
      </div>
    </div>
  );
}
