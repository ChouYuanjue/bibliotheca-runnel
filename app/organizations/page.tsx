import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";

interface Organization {
  slug: string;
  title: string;
  role: string;
  date: string;
  endDate?: string;
  icon?: string;
  description: string;
}

async function getOrganizations(): Promise<Organization[]> {
  const filePath = path.join(process.cwd(), "data", "organizations.json");
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
}

export default async function OrganizationsIndex() {
  const organizations = await getOrganizations();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-serif">Organizations</h1>
      <div className="grid gap-6">
        {organizations.map((org) => (
          <Link 
            key={org.slug} 
            href={`/organizations/${org.slug}`}
            className="block p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all bg-white group"
          >
            <div className="flex items-start gap-6">
              {/* Icon on the left */}
              {org.icon && (
                <div className="flex-shrink-0 w-16 h-16 relative rounded-full overflow-hidden border border-gray-100 bg-gray-50">
                   <Image 
                     src={org.icon} 
                     alt={org.title}
                     fill
                     className="object-cover"
                   />
                </div>
              )}
              
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {org.title}
                  </h2>
                  <span className="text-sm text-gray-500 font-mono whitespace-nowrap ml-4">
                    {org.date} — {org.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-md font-medium text-gray-700 mb-2">{org.role}</p>
                <p className="text-gray-600 leading-relaxed">
                  {org.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
