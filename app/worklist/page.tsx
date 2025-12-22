"use client";

import React, { useState } from "react";
import Link from "next/link";
import worklistData from "@/data/worklist.json";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";
import { 
  Code, 
  BookOpen, 
  Archive, 
  PenTool, 
  Zap, 
  FileText, 
  ExternalLink,
  Calendar,
  Scroll,
  Library,
  List,
  LayoutGrid
} from "lucide-react";

type WorkType = "Project" | "Linguistics" | "Achieved" | "Criticism" | "Fragment" | "Note" | "Collection" | "Publication";

interface WorkItem {
  type: WorkType;
  title: string;
  description: string;
  date: string;
  link: string;
  tags: string[];
}

const TypeConfig: Record<WorkType, { icon: React.ElementType; color: string; label: string }> = {
  Project: { icon: Code, color: "bg-blue-100 text-blue-800", label: "Project" },
  Linguistics: { icon: BookOpen, color: "bg-green-100 text-green-800", label: "Linguistics" },
  Achieved: { icon: Archive, color: "bg-gray-100 text-gray-800", label: "Achieved" },
  Criticism: { icon: PenTool, color: "bg-purple-100 text-purple-800", label: "Criticism" },
  Fragment: { icon: Zap, color: "bg-yellow-100 text-yellow-800", label: "Fragment" },
  Note: { icon: FileText, color: "bg-orange-100 text-orange-800", label: "Note" },
  Collection: { icon: Library, color: "bg-rose-100 text-rose-800", label: "Collection" },
  Publication: { icon: Scroll, color: "bg-indigo-100 text-indigo-800", label: "Publication" },
};

const WorkCard = ({ item }: { item: WorkItem }) => {
  const config = TypeConfig[item.type] || TypeConfig.Note;
  const Icon = config.icon;
  const isExternal = item.link.startsWith("http");

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${config.color}`}>
          <Icon size={14} />
          {config.label}
        </div>
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <Calendar size={14} />
          {new Date(item.date).toLocaleDateString()}
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors flex-grow">
        <Link href={item.link} target={isExternal ? "_blank" : undefined} className="hover:underline decoration-blue-500/30">
          <MarkdownRenderer content={item.title} inline />
          {isExternal && <ExternalLink size={16} className="text-gray-400 inline ml-2 align-baseline" />}
        </Link>
      </h3>
      
      <div className="text-gray-600 text-sm mb-4 h-[4.5em]">
        {item.description ? (
          <MarkdownRenderer content={item.description} className="prose-sm line-clamp-3" />
        ) : (
          <p className="italic text-gray-400">No description available.</p>
        )}
      </div>

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100">
          {item.tags.map((tag, index) => (
            <span key={index} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default function WorklistPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Worklist</h1>
          <p className="text-lg text-gray-600">
            A comprehensive collection of projects, research, writings, and notes.
          </p>
        </div>
        <button
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors shadow-sm whitespace-nowrap"
        >
          {viewMode === 'grid' ? <List size={20} /> : <LayoutGrid size={20} />}
          <span>{viewMode === 'grid' ? 'List View' : 'Grid View'}</span>
        </button>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(worklistData as WorkItem[]).map((item, index) => (
            <WorkCard key={index} item={item} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            {(worklistData as WorkItem[]).map((item, index) => {
              const config = TypeConfig[item.type] || TypeConfig.Note;
              const isExternal = item.link.startsWith("http");
              
              return (
                <div key={index} className="p-4 hover:bg-gray-50 transition-colors group">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                    <div className="flex-shrink-0 w-32 text-sm text-gray-500 font-mono flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <Link 
                          href={item.link} 
                          target={isExternal ? "_blank" : undefined} 
                          className="text-base font-medium text-gray-900 hover:text-blue-600 hover:underline decoration-blue-500/30 transition-colors"
                        >
                          <MarkdownRenderer content={item.title} inline />
                          {isExternal && <ExternalLink size={14} className="inline ml-1 text-gray-400" />}
                        </Link>
                        
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          {item.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs text-gray-400">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
