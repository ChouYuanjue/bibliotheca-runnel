import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

type ArchiveCardProps = {
  href?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  meta?: React.ReactNode;
  accent?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function ArchiveCard({ href, title, description, eyebrow, meta, accent = "bg-gray-950", className, children }: ArchiveCardProps) {
  const body = (
    <div className={cn("group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md", className)}>
      <div className={cn("mb-5 h-1.5 w-14 rounded-full", accent)} />
      {eyebrow && <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">{eyebrow}</div>}
      <h2 className="font-serif text-2xl font-semibold leading-tight text-gray-950 transition-colors group-hover:text-gray-700">{title}</h2>
      {description && <div className="mt-3 text-sm leading-6 text-gray-600">{description}</div>}
      {children && <div className="mt-5">{children}</div>}
      {meta && <div className="mt-auto pt-6 text-xs font-mono text-gray-400">{meta}</div>}
    </div>
  );

  if (!href) return body;
  return <Link href={href} className="block h-full">{body}</Link>;
}
