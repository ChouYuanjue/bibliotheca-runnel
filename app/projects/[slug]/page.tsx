import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";

interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  stars: number;
  language: string;
  topics: string[];
  updatedAt: string;
  slug: string;
}

async function getProject(slug: string): Promise<{ meta: Project | undefined, content: string }> {
  const jsonPath = path.join(process.cwd(), "data", "projects.json");
  let meta: Project | undefined;
  
  if (fs.existsSync(jsonPath)) {
    const projects = JSON.parse(fs.readFileSync(jsonPath, "utf-8")) as Project[];
    meta = projects.find(p => p.slug === slug);
  }

  const mdPath = path.join(process.cwd(), "data", "markdown_content", "projects", `${slug}.md`);
  let content = "";
  if (fs.existsSync(mdPath)) {
    content = fs.readFileSync(mdPath, "utf-8");
  } else {
    content = "Project content not found.";
  }

  return { meta, content };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { meta, content } = await getProject(params.slug);

  if (!meta) {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-2xl font-bold text-red-600">Project not found</h1>
            <Link href="/projects" className="text-blue-600 hover:underline mt-4 inline-block">Back to Projects</Link>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Link href="/projects" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <ArrowLeft size={20} className="mr-2" />
        Back to Projects
      </Link>

      <header className="mb-12 border-b border-gray-100 pb-8">
        <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">{meta.title}</h1>
                <p className="text-xl text-gray-600 max-w-2xl">{meta.description}</p>
            </div>
            <a 
                href={meta.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
                <Github size={20} />
                <span>View on GitHub</span>
            </a>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-6">
            {meta.language && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    {meta.language}
                </span>
            )}
            {meta.topics && meta.topics.map(topic => (
                <span key={topic} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    #{topic}
                </span>
            ))}
        </div>
      </header>

      <MarkdownRenderer 
        content={content} 
        className="prose-lg"
      />
    </div>
  );
}
