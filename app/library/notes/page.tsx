import notesData from "@/data/library_notes_index.json";
import { Calendar } from "lucide-react";
import NoteCard, { Note } from "@/components/custom/NoteCard";

const notes = notesData as Note[];

// Group notes by year
const notesByYear = notes.reduce((acc, note) => {
  if (!acc[note.year]) {
    acc[note.year] = [];
  }
  acc[note.year].push(note);
  return acc;
}, {} as Record<string, Note[]>);

const years = Object.keys(notesByYear).sort((a, b) => b.localeCompare(a));

export default function NotesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12 border-b border-gray-200 pb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Informal Notes on Mathematics</h1>
        <p className="text-gray-600 max-w-2xl">
          A chronological archive of mathematical derivations, lecture notes, and research summaries.
          <br />
          <span className="text-sm text-gray-400 mt-2 block">
            Total Documents: {notes.length}
          </span>
        </p>
      </header>

      <div className="space-y-16">
        {years.map((year) => (
          <section key={year} className="relative">
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm py-4 mb-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="text-gray-400" size={24} />
                {year}
              </h2>
            </div>
            
            <div className="grid gap-6">
              {notesByYear[year].map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
