"use client";

import { useState } from "react";
import { FileText, Download, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import MarkdownRenderer from "./MarkdownRenderer";

export type Note = {
  id: string;
  title: string;
  description: string;
  date: string;
  filename: string;
  tags: string[];
  year: string;
};

export default function NoteCard({ note }: { note: Note }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  
  const visibleTags = isTagsExpanded ? note.tags : note.tags.slice(0, 5);
  const hiddenTagsCount = note.tags.length - 5;

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
            <FileText size={24} />
          </div>
        </div>
        
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate pr-4 font-mono">
              {note.title}
            </h3>
            <span className="text-xs font-mono text-gray-400 whitespace-nowrap bg-gray-50 px-2 py-1 rounded">
              {note.date}
            </span>
          </div>
          
          <div className="mb-4">
            <div 
              className={cn(
                "text-gray-600 text-sm leading-relaxed transition-all duration-200",
                isDescriptionExpanded ? "" : "line-clamp-2"
              )}
            >
              <MarkdownRenderer content={note.description} className="prose-p:my-0 prose-p:leading-relaxed" />
            </div>
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDescriptionExpanded(!isDescriptionExpanded);
              }}
              className="text-xs text-blue-600 hover:text-blue-800 mt-1 font-medium flex items-center gap-1 focus:outline-none"
            >
              {isDescriptionExpanded ? (
                <>Show Less <ChevronUp size={12} /></>
              ) : (
                <>Read More <ChevronDown size={12} /></>
              )}
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {visibleTags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors uppercase"
              >
                #{tag}
              </span>
            ))}
            {!isTagsExpanded && hiddenTagsCount > 0 && (
               <button 
                 type="button"
                 onClick={(e) => {
                   e.preventDefault();
                   e.stopPropagation();
                   setIsTagsExpanded(true);
                 }}
                 className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer transition-colors" 
               >
                 +{hiddenTagsCount}
               </button>
            )}
            {isTagsExpanded && hiddenTagsCount > 0 && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsTagsExpanded(false);
                    }}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                    Show Less
                </button>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 pt-2 md:pt-0">
          <a 
            href={`/notes/${note.filename}`} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all shadow-sm"
          >
            <Download size={16} />
            <span>PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
}
