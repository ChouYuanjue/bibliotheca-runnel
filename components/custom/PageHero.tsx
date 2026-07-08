import React from "react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  dark?: boolean;
};

export default function PageHero({ eyebrow, title, description, meta, actions, className, dark = false }: PageHeroProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden rounded-[2rem] border p-8 shadow-sm md:p-10",
        dark
          ? "border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white shadow-xl"
          : "border-gray-200 bg-gradient-to-br from-white via-gray-50 to-slate-100 text-gray-950",
        className
      )}
    >
      <div className={cn("pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full blur-3xl", dark ? "bg-white/10" : "bg-gray-300/30")} />
      <div className="relative max-w-3xl">
        {eyebrow && (
          <div className={cn("mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em]", dark ? "border-white/20 bg-white/10 text-gray-200" : "border-gray-200 bg-white/70 text-gray-500")}>
            {eyebrow}
          </div>
        )}
        <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
        {description && (
          <p className={cn("mt-5 max-w-2xl text-base leading-8 md:text-lg", dark ? "text-gray-300" : "text-gray-600")}>
            {description}
          </p>
        )}
        {meta && <div className="mt-7 flex flex-wrap gap-3 text-sm">{meta}</div>}
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </header>
  );
}
