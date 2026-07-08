"use client";

import React, { useState } from "react";
import Link from "next/link";
import worklistData from "@/data/worklist.json";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";
import {
  Archive,
  BookOpen,
  Calendar,
  Code,
  ExternalLink,
  FileText,
  LayoutGrid,
  Library,
  List,
  PenTool,
  Scroll,
  Zap,
} from "lucide-react";

type WorkType = "Project" | "Linguistics" | "Achieved" | "Criticism" | "Fragment" | "Note" | "Collection" | "Publication";

interface WorkItem {
  type: WorkType;
  title: string;
  description?: string;
  date: string;
  link?: string | null;
  tags?: string[];
}

const TypeConfig: Record<WorkType, { icon: React.ElementType; color: string; label: string }> = {
  Project: { icon: Code, color: "bg-blue-100 text-blue-800", label: "Project" },
  Linguistics: { icon: BookOpen, color: "bg-green-100 text-green-800", label: "Linguistics" },
  Achieved: { icon: Archive, color: "bg-gray-100 text-gray-800", label: "Achieved" },
  Criticism: { icon: PenTool, color: "bg-purple-100 text-purple-800", label: "Criticism" },
  Fragment: { icon: Zap, color: "bg-yellow-100 text-yellow-800", label: "Fragment" },
  Note: { icon: FileText, color: "bg-slate-100 text-slate-800", label: "Note" },
  Collection: { icon: Library, color: "bg-rose-100 text-rose-800", label: "Collection" },
  Publication: { icon: Scroll, color: "bg-indigo-100 text-indigo-800", label: "Publication" },
};

function isExternalLink(link?: string | null) {
  return Boolean(link && link.startsWith("http"));
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function NoteTitle({ title }: { title: string }) {
  const match = title.match(/^(N-\d{8}):\s*(.*)$/);
  if (!match) return <MarkdownRenderer content={title} inline />;

  return (
    <span className="inline">
      <span className="mr-2 rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm font-semibold text-gray-700">
        {match[1]}
      </span>
      <MarkdownRenderer content={match[2]} inline />
    </span>
  );
}

function WorkTitle({ item }: { item: WorkItem }) {
  const content = item.type === "Note" ? <NoteTitle title={item.title} /> : <MarkdownRenderer content={item.title} inline />;
  const external = isExternalLink(item.link);

  if (!item.link) {
    return <span>{content}</span>;
  }

  return (
    <Link href={item.link} target={external ? "_blank" : undefined} className="hover:underline decoration-blue-500/30">
      {content}
      {external && <ExternalLink size={15} className="ml-1 inline align-baseline text-gray-400" />}
    </Link>
  );
}

const WorkCard = ({ item }: { item: WorkItem }) => {
  const config = TypeConfig[item.type] || TypeConfig.Note;
  const Icon = config.icon;

  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 transition-shadow duration-200 hover:shadow-md">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${config.color}`}>
          <Icon size={14} />
          {config.label}
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Calendar size={14} />
          {formatDate(item.date)}
        </div>
      </div>

      <h3 className="mb-2 flex-grow text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
        <WorkTitle item={item} />
      </h3>

      <div className="mb-4 h-[4.5em] text-sm text-gray-600">
        {item.description ? (
          <MarkdownRenderer content={item.description} className="prose-sm line-clamp-3" />
        ) : (
          <p className="italic text-gray-400">No description available.</p>
        )}
      </div>

      {item.tags && item.tags.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-2 border-t border-gray-100 pt-4">
          {item.tags.map((tag, index) => (
            <span key={`${tag}-${index}`} className="rounded bg-gray-50 px-2 py-1 text-xs text-gray-500">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

function WorkListRow({ item, index }: { item: WorkItem; index: number }) {
  const config = TypeConfig[item.type] || TypeConfig.Note;
  const Icon = config.icon;

  return (
    <div key={index} className="p-4 transition-colors hover:bg-gray-50">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
        <div className="flex w-36 flex-shrink-0 items-center gap-2 font-mono text-sm text-gray-500">
          <Calendar size={14} className="text-gray-400" />
          {formatDate(item.date)}
        </div>

        <div className="min-w-0 flex-grow">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-base font-medium text-gray-900 transition-colors hover:text-blue-600">
              <WorkTitle item={item} />
            </span>
            <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium ${config.color}`}>
              <Icon size={12} />
              {config.label}
            </span>
          </div>

          {item.description && (
            <p className="mt-1 line-clamp-1 text-sm text-gray-500">{item.description}</p>
          )}

          {item.tags && item.tags.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-2">
              {item.tags.map((tag, tagIndex) => (
                <span key={`${tag}-${tagIndex}`} className="text-xs text-gray-400">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WorklistPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const items = worklistData as WorkItem[];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Worklist</h1>
          <p className="text-lg text-gray-600">
            A comprehensive collection of projects, research, writings, and notes.
          </p>
        </div>
        <button
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
        >
          {viewMode === "grid" ? <List size={20} /> : <LayoutGrid size={20} />}
          <span>{viewMode === "grid" ? "List View" : "Grid View"}</span>
        </button>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <WorkCard key={`${item.type}-${item.title}-${index}`} item={item} />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="divide-y divide-gray-100">
            {items.map((item, index) => (
              <WorkListRow key={`${item.type}-${item.title}-${index}`} item={item} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
