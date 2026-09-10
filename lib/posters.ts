import fs from "fs";
import path from "path";

export type PosterCategory = "published" | "project";

export interface PosterItem {
  slug: string;
  title: string;
  category: PosterCategory;
  date?: string;
  authors?: string;
  venue?: string;
  description?: string;
  preview: string;
  pdf?: string;
  repository?: string;
}

const postersFile = path.join(process.cwd(), "data", "posters.json");

export function getPosters(): PosterItem[] {
  if (!fs.existsSync(postersFile)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(postersFile, "utf-8")) as PosterItem[];
    return [...data].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  } catch {
    return [];
  }
}

export function getPoster(slug: string): PosterItem | undefined {
  return getPosters().find((item) => item.slug === slug);
}

export function getPosterNotes(slug: string): string {
  const notesPath = path.join(process.cwd(), "data", "posters", slug, "index.md");
  if (!fs.existsSync(notesPath)) return "";
  return fs.readFileSync(notesPath, "utf-8").trim();
}

export const posterCategoryLabels: Record<PosterCategory, string> = {
  published: "Published Work",
  project: "Project Work",
};
