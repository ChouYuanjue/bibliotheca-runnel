import archiveData from "@/data/inm_notes_index.json";
import NotesArchiveClient, { InmArchiveData } from "./NotesArchiveClient";

export default function NotesPage() {
  return <NotesArchiveClient data={archiveData as InmArchiveData} />;
}
