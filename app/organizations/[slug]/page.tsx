import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
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
  if (!fs.existsSync(filePath)) {
    return undefined;
  }
  const fileContent = fs.readFileSync(filePath, "utf-8");
  try {
    const organizations = JSON.parse(fileContent) as Organization[];
    return organizations.find(o => o.slug === slug);
  } catch (e) {
    return undefined;
  }
}

export default async function OrganizationPage({ params }: { params: { slug: string } }) {
  const item = await getOrganization(params.slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link href="/organizations" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <ArrowLeft size={20} className="mr-2" />
        Back to Organizations
      </Link>

      <article>
        <header className="mb-12 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-6 mb-6">
                {item.icon && (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm flex-shrink-0">
                        <Image 
                            src={item.icon} 
                            alt={item.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-2 flex items-center gap-3">
                        {item.title}
                        {item.website && (
                            <a 
                                href={item.website} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-gray-400 hover:text-blue-600 transition-colors"
                                title="Visit Website"
                            >
                                <ExternalLink size={24} />
                            </a>
                        )}
                    </h1>
                    <div className="text-xl text-gray-600 font-medium mb-1">
                        {item.role}
                    </div>
                    <div className="text-sm text-gray-400 font-mono">
                        {item.date} — {item.endDate || 'Present'}
                    </div>
                </div>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed">
                {item.description}
            </p>
        </header>

        <MarkdownRenderer content={item.content} className="prose-lg" />
      </article>
    </div>
  );
}
