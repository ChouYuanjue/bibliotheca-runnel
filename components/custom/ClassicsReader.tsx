"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Type, Settings2, X, Menu, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClassicSection {
  title: string;
  titleTrad: string;
  content: string;
  contentTradHtml: string;
  contentHtml: string;
  level: number;
  anchor: string;
  isTitleSection?: boolean;
}

interface ClassicItem {
  title: string;
  titleTrad: string;
  sections: ClassicSection[];
}

interface Category {
  category: string;
  items: ClassicItem[];
}

interface ClassicsReaderProps {
  data: Category[];
}

// Helper to format title with Tangut characters
const formatTitle = (text: string) => {
  if (!text) return text;
  // Split by Tangut characters (U+17000-U+1877F Ideographs, U+18800-U+18AFF Components)
  const parts = text.split(/([\u{17000}-\u{1877F}\u{18800}-\u{18AFF}]+)/u);
  return parts.map((part, i) => {
    if (/[\u{17000}-\u{1877F}\u{18800}-\u{18AFF}]/u.test(part)) {
      return <span key={i} className="font-normal font-tangut">{part}</span>;
    }
    return part;
  });
};

export default function ClassicsReader({ data }: ClassicsReaderProps) {
  const [selectedItem, setSelectedItem] = useState<ClassicItem | null>(null);
  const [mode, setMode] = useState<'classic' | 'modern'>('classic');
  const [showSidebar, setShowSidebar] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Toggle mode
  const toggleMode = () => {
    setMode(prev => prev === 'classic' ? 'modern' : 'classic');
  };

  // Handle item selection
  const handleSelect = (item: ClassicItem) => {
    setSelectedItem(item);
  };

  // Back to menu
  const handleBack = () => {
    setSelectedItem(null);
  };

  // Scroll to right when entering classic mode or selecting item
  useEffect(() => {
    if (mode === 'classic' && selectedItem && scrollContainerRef.current) {
      // Use a small timeout to ensure layout is complete
      const timer = setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [mode, selectedItem]);

  // Scroll to specific section
  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-[#fdfbf7]">
      <AnimatePresence mode="wait">
        {!selectedItem ? (
          <motion.div 
            key="menu"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full p-8 overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto">
              <header className="mb-12 text-center">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4 tracking-widest">讓諾集</h1>
                <div className="w-16 h-1 bg-red-800 mx-auto rounded-full opacity-80"></div>
                <p className="mt-4 text-gray-500 font-serif italic">Classics Collection</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-20">
                {data.map((category, idx) => (
                  <div key={idx} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400 font-serif">
                        {idx + 1}
                      </div>
                      <h2 className="text-2xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-2 flex-grow">
                        {category.category}
                      </h2>
                    </div>
                    <div className="grid gap-3 pl-12">
                      {category.items.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelect(item)}
                          className="text-left group flex items-baseline gap-3 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-red-700 transition-colors"></span>
                          <span className="text-lg text-gray-700 font-serif group-hover:text-red-900 transition-colors">
                            {formatTitle(item.title)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="reader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex relative"
          >
            {/* Sidebar (TOC) */}
            <div 
              className={cn(
                "absolute right-0 top-0 bottom-0 z-40 bg-[#fdfbf7]/95 backdrop-blur border-l border-gray-200 transition-all duration-300 flex flex-col shadow-lg",
                showSidebar ? "w-80 translate-x-0" : "w-80 translate-x-full"
              )}
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-serif font-bold text-gray-800">目录</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowSidebar(false)}>
                  <ChevronRight size={20} />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {data.map((category, catIdx) => (
                  <div key={catIdx} className="space-y-2">
                    <h4 className="font-serif font-bold text-gray-500 text-sm border-b border-gray-100 pb-1 mb-2">
                      {category.category}
                    </h4>
                    <div className="space-y-1">
                      {category.items.map((item, itemIdx) => {
                        const isSelected = selectedItem.title === item.title;
                        // Filter out sections that are just the title itself (intro sections)
                        const visibleSections = item.sections.filter(s => !s.isTitleSection);
                        
                        return (
                          <div key={itemIdx} className="space-y-1">
                            <button
                              onClick={() => handleSelect(item)}
                              className={cn(
                                "w-full text-left px-2 py-1.5 rounded text-base font-serif transition-colors flex items-baseline gap-2",
                                isSelected 
                                  ? "bg-red-50 text-red-900 font-medium" 
                                  : "text-gray-700 hover:bg-gray-100"
                              )}
                            >
                              <span className={cn("w-1 h-1 rounded-full flex-shrink-0", isSelected ? "bg-red-600" : "bg-gray-300")} />
                              <span>{formatTitle(item.title)}</span>
                            </button>
                            
                            {/* Show subsections if selected and there are valid subsections */}
                            {isSelected && visibleSections.length > 0 && (
                              <div className="pl-4 space-y-1 border-l border-gray-100 ml-2.5">
                                {visibleSections.map((section, secIdx) => (
                                  <button
                                    key={secIdx}
                                    onClick={() => scrollToSection(item.sections.indexOf(section))}
                                    className="w-full text-left px-2 py-1 rounded text-sm font-serif text-gray-600 hover:text-red-800 hover:bg-gray-50 transition-colors"
                                  >
                                    {formatTitle(mode === 'classic' ? section.titleTrad : section.title)}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Toggle Sidebar Button (when hidden) */}
            {!showSidebar && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowSidebar(true)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 backdrop-blur shadow-md rounded-full"
              >
                <Menu size={20} />
              </Button>
            )}

            {/* Reader Controls */}
            <div className="absolute top-4 left-4 z-50 flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleBack}
                className="bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-gray-100 text-gray-700 shadow-sm"
              >
                <ArrowLeft size={20} />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={toggleMode}
                className="bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-gray-100 text-gray-700 shadow-sm"
                title={mode === 'classic' ? "Switch to Modern" : "Switch to Classic"}
              >
                {mode === 'classic' ? <Type size={20} /> : <BookOpen size={20} />}
              </Button>
            </div>

            {/* Reader Content Area */}
            <div 
              ref={scrollContainerRef}
              className={cn(
                "flex-grow overflow-auto transition-all duration-500 ease-in-out",
                mode === 'classic' 
                  ? "bg-[#fdfbf7] text-[#2c2c2c]" 
                  : "bg-white text-gray-900",
                showSidebar && "mr-64" // Push content when sidebar is open
              )}
            >
              <div 
                className={cn(
                  "min-h-full p-8 md:p-16 transition-all duration-500",
                  mode === 'classic' 
                    ? "writing-vertical-rl h-full overflow-x-auto overflow-y-hidden" 
                    : "max-w-3xl mx-auto overflow-y-auto"
                )}
                style={{
                  fontFamily: mode === 'classic' 
                    ? '"Genryu Mincho", "Source Han Serif TC", "Noto Serif TC", "SimSun", "NotoTangut", serif' 
                    : 'system-ui, sans-serif',
                }}
              >
                {/* Render all sections */}
                {selectedItem.sections.map((section, idx) => (
                  <div 
                    key={idx} 
                    id={`section-${idx}`}
                    className={cn(
                      "mb-16",
                      mode === 'classic' ? "ml-16 mb-0 h-full inline-block align-top" : ""
                    )}
                  >
                    {/* Section Title */}
                    <h2 
                      className={cn(
                        "font-bold tracking-widest",
                        mode === 'classic' 
                          ? "text-3xl ml-8 border-l-4 border-red-800 pl-4 py-2 inline-block h-auto max-h-full" 
                          : "text-2xl border-b-2 border-gray-100 pb-4 mb-8"
                      )}
                    >
                      {formatTitle(mode === 'classic' ? section.titleTrad : section.title)}
                    </h2>

                    {/* Section Content */}
                    <div 
                      className={cn(
                        "leading-loose", 
                        mode === 'classic' ? "text-[26px] tracking-[0.15em] mt-4" : "text-xl tracking-normal"
                      )}
                    >
                      {mode === 'classic' ? (
                        <div 
                          className="whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: section.contentTradHtml }}
                        />
                      ) : (
                        <div 
                          className="prose prose-xl max-w-none prose-p:my-2 prose-p:leading-relaxed" // Reduced paragraph spacing
                          dangerouslySetInnerHTML={{ __html: section.contentHtml }} 
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Styles for Vertical Writing */}
      <style jsx global>{`
        .writing-vertical-rl {
          writing-mode: vertical-rl;
          text-orientation: upright;
        }
        /* Hide scrollbar for cleaner look in classic mode */
        .writing-vertical-rl::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        .writing-vertical-rl::-webkit-scrollbar-track {
          background: transparent;
        }
        .writing-vertical-rl::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.1);
          border-radius: 4px;
        }
        /* Style for notes in both modes */
        .note {
          color: #6b7280; /* text-gray-500 */
          font-style: italic;
        }
        /* Custom Fonts */
        @font-face {
          font-family: 'GenRyuMin';
          src: url('/classics/GenRyuMin2TW-M.otf') format('opentype');
          font-display: swap;
        }
        @font-face {
          font-family: 'NotoTangut';
          src: url('/classics/NotoSerifTangut-Regular.ttf') format('truetype');
          font-display: swap;
        }
        .font-genryu {
          font-family: 'GenRyuMin', serif;
        }
        .font-tangut {
          font-family: 'NotoTangut', serif;
        }
        /* In vertical mode, we might want to ensure notes flow correctly */
        .writing-vertical-rl .note {
          /* text-orientation: mixed; */ /* Usually upright is fine */
        }
      `}</style>
    </div>
  );
}
