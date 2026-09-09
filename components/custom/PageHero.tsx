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

export default function PageHero({ eyebrow, title, description, meta, actions, className }: PageHeroProps) {
  return (
    <header className={cn("max-w-4xl border-b border-gray-200 pb-8", className)}>
      {eyebrow && <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">{eyebrow}</div>}
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-gray-950 md:text-4xl">{title}</h1>
      {description && <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">{description}</p>}
      {meta && <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">{meta}</div>}
      {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
    </header>
  );
}
