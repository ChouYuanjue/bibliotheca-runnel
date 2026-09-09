"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import metadata from "@/data/metadata.json";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 hidden border-b border-gray-200 bg-white/95 backdrop-blur md:block">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-8">
        <Link href="/" className="font-serif text-lg font-semibold tracking-tight text-gray-950">
          Runnel Zhang
        </Link>
        <nav className="flex items-center gap-6">
          {metadata.navigation.map((item) => {
            const active = item.path === "/"
              ? pathname === "/"
              : pathname === item.path || pathname.startsWith(item.path + "/") ||
                (item.path === "/archive" && ["/projects", "/library", "/artifacts", "/fragments", "/worklist"].some((p) => pathname === p || pathname.startsWith(p + "/")));
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-sm transition-colors",
                  active ? "font-medium text-gray-950" : "text-gray-500 hover:text-gray-900"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
