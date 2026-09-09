import Link from "next/link";
import PosterPreview from "@/components/custom/PosterPreview";
import type { PosterItem } from "@/lib/posters";

export default function PosterCollection({ items }: { items: PosterItem[] }) {
  if (!items.length) {
    return <p className="border-y border-gray-200 py-5 text-sm text-gray-400">No posters listed yet.</p>;
  }

  return (
    <div className="space-y-12">
      {items.map((item, index) => (
        <article key={item.slug} className="space-y-4">
          <header className="flex flex-col gap-2 border-b border-gray-200 pb-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="min-w-0">
              <h2 className="font-serif text-xl font-semibold leading-snug text-gray-950 md:text-2xl">
                <Link href={`/posters/${item.slug}`} className="hover:underline hover:decoration-gray-300 hover:underline-offset-4">
                  {item.title}
                </Link>
              </h2>
              {(item.authors || item.venue || item.date) && (
                <p className="mt-1.5 text-sm leading-6 text-gray-500">
                  {[item.authors, item.venue, item.date].filter(Boolean).join(" · ")}
                </p>
              )}
              {item.description && <p className="mt-1 text-sm leading-6 text-gray-500">{item.description}</p>}
            </div>
            {item.pdf && (
              <a href={item.pdf} download className="flex-none text-sm text-gray-400 underline decoration-gray-200 underline-offset-4 hover:text-gray-700 hover:decoration-gray-400">
                PDF
              </a>
            )}
          </header>

          <PosterPreview src={item.preview} title={item.title} href={`/posters/${item.slug}`} eager={index === 0} />
        </article>
      ))}
    </div>
  );
}
