import Link from "next/link";
import fs from "fs";
import path from "path";
import PageHero from "@/components/custom/PageHero";
import { formatDate } from "@/lib/formatDate";

interface ArtifactItem {
  title: string;
  state: string;
  description: string;
  date: string;
  githubUrl?: string;
}

async function getArtifacts(): Promise<Record<string, ArtifactItem>> {
  const filePath = path.join(process.cwd(), "data", "achieved.json");
  if (!fs.existsSync(filePath)) return {};
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export default async function AchievedIndex() {
  const data = await getArtifacts();
  const sortedEntries = Object.entries(data).sort(([, a], [, b]) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <PageHero
        eyebrow="Artifacts"
        title="Experimental works, jokes, and odd outputs"
        description="A cabinet for fictional identities, failed experiments, satirical papers, and other non-standard academic artifacts."
        meta={<span className="rounded-full border border-gray-200 bg-white/70 px-4 py-2">{sortedEntries.length} artifacts</span>}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {sortedEntries.map(([slug, item]) => (
          <div key={slug} className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-serif text-xl font-semibold text-gray-950 group-hover:text-gray-700"><Link href={`/artifacts/${slug}`}>{item.title}</Link></h2>
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${item.state === "FICTIONAL" ? "bg-purple-100 text-purple-700" : item.state === "FAILED" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`}>{item.state}</span>
            </div>
            <p className="line-clamp-3 text-sm leading-6 text-gray-600">{item.description}</p>
            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 font-mono text-xs text-gray-400">
              <span>{formatDate(item.date)}</span>
              {item.githubUrl && <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">GitHub ↗</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
