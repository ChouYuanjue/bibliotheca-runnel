import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";
import PosterPreview from "@/components/custom/PosterPreview";
import { getPoster, getPosterNotes, getPosters, posterCategoryLabels } from "@/lib/posters";

export function generateStaticParams() {
  return getPosters().map((item) => ({ slug: item.slug }));
}

export default function PosterDetailPage({ params }: { params: { slug: string } }) {
  const item = getPoster(params.slug);
  if (!item) notFound();

  const notes = getPosterNotes(item.slug);
  const sectionHref = item.category === "published" ? "/posters/published" : "/posters/student-projects";

  return (
    <div className="mx-auto max-w-5xl space-y-9">
      <Link href={sectionHref} className="text-sm text-gray-400 hover:text-gray-700">← {posterCategoryLabels[item.category]}</Link>

      <article className="space-y-8">
        <header className="border-b border-gray-200 pb-7">
          <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">{posterCategoryLabels[item.category]}</div>
          <h1 className="max-w-4xl font-serif text-3xl font-semibold leading-tight tracking-tight text-gray-950 md:text-4xl">{item.title}</h1>
          {(item.authors || item.venue || item.date) && (
            <p className="mt-3 text-sm leading-6 text-gray-500">{[item.authors, item.venue, item.date].filter(Boolean).join(" · ")}</p>
          )}
          {item.description && <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 md:text-base">{item.description}</p>}
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {item.repository && <a href={item.repository} target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 underline-offset-4 hover:decoration-gray-600">Repository</a>}
            {item.pdf && (
              <a href={item.pdf} download className="underline decoration-gray-300 underline-offset-4 hover:decoration-gray-600">Download PDF</a>
            )}
            <a href={item.preview} target="_blank" rel="noopener noreferrer" className="text-gray-500 underline decoration-gray-200 underline-offset-4 hover:text-gray-800 hover:decoration-gray-500">Open vector poster</a>
          </div>
        </header>

        <PosterPreview src={item.preview} title={item.title} eager />

        {notes && (
          <div className="border-t border-gray-200 pt-8">
            <MarkdownRenderer content={notes} className="prose-sm max-w-none text-gray-700" />
          </div>
        )}
      </article>
    </div>
  );
}
