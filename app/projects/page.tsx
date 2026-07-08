import fs from "fs";
import path from "path";
import PageHero from "@/components/custom/PageHero";
import ArchiveCard from "@/components/custom/ArchiveCard";

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
  type: "research" | "commercial" | "personal";
  fetchStatus?: string;
}

async function getProjects(): Promise<Project[]> {
  const filePath = path.join(process.cwd(), "data", "projects.json");
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function ProjectSection({ title, description, projects, accent }: { title: string; description: string; projects: Project[]; accent: string }) {
  if (projects.length === 0) return null;
  return (
    <section className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">{description}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ArchiveCard
            key={project.id}
            href={`/projects/${project.slug}`}
            title={project.title}
            description={project.description}
            eyebrow={project.fetchStatus === "public-fetch-failed" ? "Public fetch failed" : project.language || project.type}
            meta={project.githubUrl ? "GitHub →" : undefined}
            accent={accent}
          >
            {project.topics && project.topics.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.topics.slice(0, 5).map((topic) => (
                  <span key={topic} className="rounded-full border border-gray-100 bg-gray-50 px-2.5 py-1 text-xs text-gray-500">#{topic}</span>
                ))}
              </div>
            )}
          </ArchiveCard>
        ))}
      </div>
    </section>
  );
}

export default async function ProjectsIndex() {
  const projects = await getProjects();
  const researchProjects = projects.filter((p) => p.type === "research");
  const commercialProjects = projects.filter((p) => p.type === "commercial");
  const personalProjects = projects.filter((p) => p.type === "personal");

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <PageHero
        eyebrow="Projects"
        title="Projects"
        description="Research code, applied systems, bot frameworks, language tools, and TeX/OCR pipelines."
        meta={(
          <>
            <span className="rounded-full border border-gray-200 bg-white/70 px-4 py-2">{researchProjects.length} research</span>
            <span className="rounded-full border border-gray-200 bg-white/70 px-4 py-2">{commercialProjects.length} commercial</span>
            <span className="rounded-full border border-gray-200 bg-white/70 px-4 py-2">{personalProjects.length} personal</span>
          </>
        )}
      />
      <ProjectSection title="Research Projects" description="AI4Math, theorem proving, low-resource NLP, and evaluation codebases." projects={researchProjects} accent="bg-indigo-600" />
      <ProjectSection title="Commercial / Applied Systems" description="Applied work for product delivery, multimodal systems, and deployment." projects={commercialProjects} accent="bg-blue-600" />
      <ProjectSection title="Personal Projects" description="Personal infrastructure, bot frameworks, language tools, archives, and utilities." projects={personalProjects} accent="bg-gray-900" />
    </div>
  );
}
