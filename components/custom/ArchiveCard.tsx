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

export default function ArchiveCard({ href, title, description, eyebrow, meta, className, children }: ArchiveCardProps) {
  const body = (
    <div className={cn("group flex h-full flex-col border border-gray-200 bg-white p-5 transition-colors hover:border-gray-400", className)}>
      {eyebrow && <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">{eyebrow}</div>}
      <h2 className="font-serif text-xl font-semibold leading-tight text-gray-950 group-hover:underline group-hover:decoration-gray-300 group-hover:underline-offset-4">{title}</h2>
      {description && <div className="mt-2 text-sm leading-6 text-gray-600">{description}</div>}
      {children && <div className="mt-4">{children}</div>}
      {meta && <div className="mt-auto pt-5 text-xs font-mono text-gray-400">{meta}</div>}
    </div>
  );

  if (!href) return body;
  return <Link href={href} className="block h-full">{body}</Link>;
}
