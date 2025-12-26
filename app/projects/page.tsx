import Link from "next/link";
import fs from "fs";
import path from "path";

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

async function getProjects(): Promise<Project[]> {
  const filePath = path.join(process.cwd(), "data", "projects.json");
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const fileContent = fs.readFileSync(filePath, "utf-8");
  try {
    return JSON.parse(fileContent);
  } catch (e) {
    console.error("Failed to parse projects.json", e);
    return [];
  }
}

export default async function ProjectsIndex() {
  const projects = await getProjects();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-serif">Projects</h1>
      <div className="grid gap-6">
        {projects.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                <p className="text-gray-500 italic">No projects added yet.</p>
                <p className="text-sm text-gray-400 mt-2">Run `node scripts/add-project.js` to add one.</p>
            </div>
        ) : (
            projects.map((project) => (
            <div key={project.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white group">
                <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
                    <h2 className="text-xl font-semibold font-serif group-hover:text-red-800 transition-colors">
                    <Link href={`/projects/${project.slug}`}>
                        {project.title}
                    </Link>
                    </h2>
                    <div className="flex items-center gap-2">
                        {project.language && (
                            <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-100 text-gray-800">
                                {project.language}
                            </span>
                        )}
                    </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                {project.topics && project.topics.slice(0, 5).map(topic => (
                    <span key={topic} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                        #{topic}
                    </span>
                ))}
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
}
