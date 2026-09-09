import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";

interface Organization {
  slug: string;
  title: string;
  role: string;
  date: string;
  endDate?: string;
  icon?: string;
  website?: string;
  description: string;
  content: string;
}

async function getOrganization(slug: string): Promise<Organization | undefined> {
  const filePath = path.join(process.cwd(), "data", "organizations.json");
  if (!fs.existsSync(filePath)) return undefined;
  try {
    const organizations = JSON.parse(fs.readFileSync(filePath, "utf-8")) as Organization[];
    return organizations.find((o) => o.slug === slug);
  } catch {
    return undefined;
  }
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "data", "organizations.json");
  if (!fs.existsSync(filePath)) return [];
  try {
    const organizations = JSON.parse(fs.readFileSync(filePath, "utf-8")) as Organization[];
    return organizations.map((organization) => ({ slug: organization.slug }));
  } catch {
    return [];
  }
}

export default async function OrganizationPage({ params }: { params: { slug: string } }) {
  const item = await getOrganization(params.slug);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <Link href="/organizations" className="text-sm text-gray-400 hover:text-gray-700">← Affiliations</Link>

      <article>
        <header className="border-b border-gray-200 pb-8">
          <div className="flex items-start gap-4">
            {item.icon && (
              <div className="relative h-12 w-12 flex-none overflow-hidden rounded-sm border border-gray-200 bg-white">
                <Image src={item.icon} alt="" fill className="object-contain p-1.5" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h1 className="font-serif text-3xl font-semibold tracking-tight text-gray-950">
                {item.title}
                {item.website && (
                  <a href={item.website} target="_blank" rel="noopener noreferrer" className="ml-2 inline-block align-middle text-gray-300 hover:text-gray-600" aria-label="Official website">
                    <ExternalLink size={16} />
                  </a>
                )}
              </h1>
              <p className="mt-2 text-sm font-medium text-gray-700">{item.role}</p>
              <p className="mt-1 font-mono text-xs text-gray-400">{item.date} — {item.endDate || "Present"}</p>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-600">{item.description}</p>
        </header>

        <MarkdownRenderer content={item.content} className="prose-sm mt-8 max-w-none text-gray-700" />
      </article>
    </div>
  );
}