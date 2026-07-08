"use client";

import { useMemo, useState } from "react";
import { Archive, BookOpen, CalendarDays, Code2, Download, FileText, Search } from "lucide-react";

export type InmNote = {
  id: string;
  date: string;
  year: string;
  month: string;
  day: string;
  title: string;
  volume: string;
  sectionCount: number;
  sections: string[];
  pdf: string | null;
  tex: string;
};

export type InmArchiveData = {
  project: {
    title: string;
    subtitle: string;
    fullPdf: string | null;
    oldArchive: string;
    noteCount: number;
    volumeCount: number;
  };
  volumes: string[];
  years: string[];
  notes: InmNote[];
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(`${date}T00:00:00`));
}

function groupNotes(notes: InmNote[]) {
  return notes.reduce<Record<string, Record<string, InmNote[]>>>((acc, note) => {
    acc[note.year] ||= {};
    acc[note.year][note.month] ||= [];
    acc[note.year][note.month].push(note);
    return acc;
  }, {});
}

function NoteRow({ note }: { note: InmNote }) {
  return (
    <article className="group grid gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md md:grid-cols-[5.5rem_1fr_auto]">
      <div className="flex md:block items-baseline gap-2 border-gray-100 md:border-r md:pr-5">
        <div className="font-mono text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">{note.day}</div>
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-gray-400">{note.month}</div>
        <div className="font-mono text-xs text-gray-400 md:mt-2">{note.year}</div>
      </div>

      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-gray-100 px-2.5 py-1 font-mono text-gray-600">{note.id}</span>
          <span className="rounded-full border border-gray-200 px-2.5 py-1 text-gray-500">{note.volume}</span>
          <span className="rounded-full border border-gray-200 px-2.5 py-1 text-gray-500">{note.sectionCount} sections</span>
        </div>
        <h3 className="text-lg font-semibold leading-snug text-gray-950 md:text-xl">{note.title}</h3>
        {note.sections.length > 0 && (
          <details className="mt-3 text-sm text-gray-600">
            <summary className="cursor-pointer select-none text-gray-500 transition-colors hover:text-gray-900">
              Contents preview
            </summary>
            <ol className="mt-3 space-y-1.5 border-l border-gray-200 pl-4">
              {note.sections.map((section, index) => (
                <li key={`${note.id}-${index}`} className="leading-relaxed">
                  {section}
                </li>
              ))}
            </ol>
          </details>
        )}
      </div>

      <div className="flex flex-wrap items-start gap-2 md:justify-end">
        {note.pdf && (
          <a
            href={note.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            <FileText size={15} />
            PDF
          </a>
        )}
        <a
          href={note.tex}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-950"
        >
          <Code2 size={15} />
          TeX
        </a>
      </div>
    </article>
  );
}

export default function NotesArchiveClient({ data }: { data: InmArchiveData }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("All");
  const [volume, setVolume] = useState("All");

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.notes.filter((note) => {
      const matchesYear = year === "All" || note.year === year;
      const matchesVolume = volume === "All" || note.volume === volume;
      const haystack = [note.id, note.title, note.volume, ...note.sections].join(" ").toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      return matchesYear && matchesVolume && matchesQuery;
    });
  }, [data.notes, query, year, volume]);

  const grouped = groupNotes(filteredNotes);
  const visibleYears = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="mx-auto max-w-6xl">
      <header className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-8 text-white shadow-xl md:p-10">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-200">
            <Archive size={14} />
            Date-first mathematical archive
          </div>
          <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">{data.project.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">{data.project.subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm text-gray-200">
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">{data.project.noteCount} dated notes</span>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">{data.project.volumeCount} thematic volumes in the book version</span>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">PDF + TeX for each note</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {data.project.fullPdf && (
              <a
                href={data.project.fullPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-950 transition-colors hover:bg-gray-200"
              >
                <BookOpen size={17} />
                Read full PDF
              </a>
            )}
            <a
              href={data.project.oldArchive}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Download size={17} />
              Pre-TeX archive
            </a>
          </div>
        </div>
      </header>

      <section className="mt-10 grid gap-4 rounded-3xl border border-gray-200 bg-gray-50/70 p-4 md:grid-cols-[1fr_auto_auto] md:items-center md:p-5">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, note id, volume, or section heading"
            className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400"
          />
        </label>
        <select
          value={year}
          onChange={(event) => setYear(event.target.value)}
          className="rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-400"
        >
          <option value="All">All years</option>
          {data.years.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select
          value={volume}
          onChange={(event) => setVolume(event.target.value)}
          className="rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-400"
        >
          <option value="All">All volumes</option>
          {data.volumes.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </section>

      <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
        <CalendarDays size={17} />
        Showing {filteredNotes.length} notes, sorted by date. The full PDF is volume-organized; this website preserves the dated archive order.
      </div>

      <main className="mt-10 space-y-14">
        {visibleYears.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-500">No notes match the current filters.</div>
        )}
        {visibleYears.map((visibleYear) => (
          <section key={visibleYear} className="relative">
            <div className="sticky top-0 z-10 -mx-2 mb-5 border-b border-gray-200 bg-white/90 px-2 py-4 backdrop-blur">
              <h2 className="font-serif text-3xl font-bold text-gray-950">{visibleYear}</h2>
            </div>
            <div className="space-y-8">
              {Object.entries(grouped[visibleYear]).map(([month, notes]) => (
                <div key={`${visibleYear}-${month}`} className="grid gap-4 md:grid-cols-[5rem_1fr]">
                  <div className="pt-5 font-mono text-xs uppercase tracking-[0.22em] text-gray-400">{month}</div>
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <NoteRow key={note.id} note={note} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
