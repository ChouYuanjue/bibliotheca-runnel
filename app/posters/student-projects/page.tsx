import Link from "next/link";
import PosterCollection from "@/components/custom/PosterCollection";
import { getPosters } from "@/lib/posters";

export default function StudentProjectPostersPage() {
  const items = getPosters().filter((item) => item.category === "student");

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <Link href="/posters" className="text-sm text-gray-400 hover:text-gray-700">← Posters</Link>
      <header className="border-b border-gray-200 pb-7">
        <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">Posters</div>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-gray-950 md:text-4xl">Student Projects</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">Student and independent practice projects presented in poster form.</p>
      </header>
      <PosterCollection items={items} />
    </div>
  );
}
