import Link from "next/link";
import PosterCollection from "@/components/custom/PosterCollection";
import { getPosters, posterCategoryLabels, type PosterCategory } from "@/lib/posters";

const sections: { key: PosterCategory; href: string; note: string }[] = [
  { key: "published", href: "/posters/published", note: "Posters associated with formally published work." },
  { key: "student", href: "/posters/student-projects", note: "Posters from student and independent practice projects." },
];

export default function PostersPage() {
  const posters = getPosters();

  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <header className="border-b border-gray-200 pb-8">
        <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">Research</div>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-gray-950 md:text-4xl">Posters</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
          A visual index of selected research and project work.
        </p>
      </header>

      {sections.map((section) => {
        const items = posters.filter((item) => item.category === section.key);
        return (
          <section key={section.key} className="space-y-6">
            <div className="flex flex-col gap-2 border-b border-gray-200 pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-800">{posterCategoryLabels[section.key]}</h2>
                <p className="mt-2 text-xs leading-5 text-gray-400">{section.note}</p>
              </div>
              <Link href={section.href} className="text-xs text-gray-400 hover:text-gray-700">View section →</Link>
            </div>
            <PosterCollection items={items} />
          </section>
        );
      })}
    </div>
  );
}
