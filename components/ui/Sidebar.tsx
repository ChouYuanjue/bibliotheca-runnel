"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import metadata from "@/data/metadata.json";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Auto-expand based on current path
  useEffect(() => {
    const activeParent = metadata.navigation.find(
      (item) =>
        item.children &&
        (pathname === item.path || pathname.startsWith(item.path + "/"))
    );
    if (activeParent) {
      setExpandedItems((prev) =>
        prev.includes(activeParent.path) ? prev : [...prev, activeParent.path]
      );
    }
  }, [pathname]);

  const toggleExpand = (path: string) => {
    setExpandedItems((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  return (
    <aside className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 border-r border-gray-200 bg-zinc-50/90 backdrop-blur-md z-30">
      <div className="p-8 pb-6 border-b border-gray-100/50">
        <Link href="/" className="block">
          <h1 className="font-serif text-2xl font-bold text-gray-900 tracking-tight hover:text-gray-700 transition-colors">
            Runnel Zhang
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-2 font-medium">
            Bibliotheca Runnel
          </p>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
        {metadata.navigation.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(item.path + "/");
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems.includes(item.path);

          return (
            <div key={item.path} className="select-none mb-1">
              <div
                className={cn(
                  "group flex items-center justify-between px-3 py-2 text-sm rounded-md transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Link
                  href={item.path}
                  className="flex-grow font-medium truncate"
                  onClick={() => {
                    if (hasChildren && !isExpanded) toggleExpand(item.path);
                  }}
                >
                  {item.title}
                </Link>
                {hasChildren && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleExpand(item.path);
                    }}
                    className="p-1 rounded-md hover:bg-gray-200/80 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                )}
              </div>

              {hasChildren && (
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isExpanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="ml-3 pl-3 border-l border-gray-200 space-y-0.5 py-1">
                    {item.children?.map((child) => {
                      const isChildActive = pathname === child.path;
                      return (
                        <Link
                          key={child.path}
                          href={child.path}
                          className={cn(
                            "block px-3 py-1.5 text-sm rounded-md transition-colors truncate",
                            isChildActive
                              ? "text-gray-900 font-medium bg-gray-100"
                              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                          )}
                        >
                          {child.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-6 border-t border-gray-200 bg-white/50">
        <div className="text-[10px] text-gray-400 font-mono leading-relaxed">
          <p>ARCHIVE STATUS: ONLINE</p>
          <p>© 2025 BIBLIOTHECA RUNNEL</p>
        </div>
      </div>
    </aside>
  );
}
