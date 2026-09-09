"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import metadata from "@/data/metadata.json";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleExpand = (path: string) => {
    setExpandedItems((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  return (
    <div className="md:hidden">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
        <span className="font-serif text-lg font-bold text-gray-900">Runnel Zhang</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-16" />

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-white overflow-y-auto pb-20 animate-in slide-in-from-top-5 duration-200">
          <nav className="p-4 space-y-2">
            {metadata.navigation.map((item) => {
              const isActive =
                pathname === item.path ||
                (item.path !== "/" && pathname.startsWith(item.path + "/")) ||
                item.children?.some(
                  (child) => pathname === child.path || pathname.startsWith(child.path + "/")
                );
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedItems.includes(item.path);

              return (
                <div key={item.path} className="border-b border-gray-100 last:border-0 pb-2">
                  <div className="flex items-center justify-between py-2">
                    <Link
                      href={item.path}
                      className={cn(
                        "text-lg font-medium",
                        isActive ? "text-black" : "text-gray-600"
                      )}
                    >
                      {item.title}
                    </Link>
                    {hasChildren && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleExpand(item.path);
                        }}
                        className="p-2 text-gray-400"
                      >
                        {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                    )}
                  </div>

                  {hasChildren && isExpanded && (
                    <div className="pl-4 space-y-2 mt-1 bg-gray-50 rounded-md p-3">
                      {item.children?.map((child) => {
                        const isChildActive = pathname === child.path;
                        return (
                          <Link
                            key={child.path}
                            href={child.path}
                            className={cn(
                              "block py-1 text-base",
                              isChildActive ? "text-black font-medium" : "text-gray-500"
                            )}
                          >
                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
