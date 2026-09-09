"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import metadata from "@/data/metadata.json";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="md:hidden">
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-5">
        <Link href="/" className="font-serif text-base font-semibold text-gray-950">Runnel Zhang</Link>
        <button aria-label="Toggle navigation" onClick={() => setOpen(!open)} className="p-1.5 text-gray-500">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>
      <div className="h-14" />
      {open && (
        <nav className="fixed inset-x-0 top-14 z-40 border-b border-gray-200 bg-white px-5 py-3 shadow-sm">
          {metadata.navigation.map((item) => {
            const active = item.path === "/" ? pathname === "/" : pathname === item.path || pathname.startsWith(item.path + "/");
            return (
              <Link key={item.path} href={item.path} className={cn("block border-b border-gray-100 py-3 text-sm last:border-0", active ? "font-medium text-gray-950" : "text-gray-600")}>{item.title}</Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
