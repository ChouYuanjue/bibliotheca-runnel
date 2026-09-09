import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";

interface Organization {
  slug: string;
  title: string;
  role: string;
  category?: "research" | "employment" | "student" | "community";
  date: string;
  endDate?: string;
  icon?: string;
  description: string;
}

async function getOrganizations(): Promise<Organization[]> {
  const filePath = path.join(process.cwd(), "data", "organizations.json");
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

const sections: { key: NonNullable<Organization["category"]>; title: string; note: string }[] = [
  { key: "research", title: "Research", note: "Labs and research collaborations." },
  { key: "employment", title: "Employment", note: "Part-time and externally assigned professional work." },
  { key: "student", title: "Student Groups", note: "University teams and student organizations." },
  { key: "community", title: "Communities", note: "Independent academic and technical communities." },
];

const priority: Record<string, number> = {
  thunlp: 0,
  "nine-lab": 1,
  msra: 2,
};

function OrgRow({ org }: { org: Organization }) {
  return (
    <Link href={`/organizations/${org.slug}`} className="group flex gap-4 py-5 first:pt-0 last:pb-0 sm:items-start">
      {org.icon && (
        <div className="relative mt-0.5 h-11 w-11 flex-none overflow-hidden rounded-sm border border-gray-200 bg-white p-1.5">
          <Image src={org.icon} alt="" fill className="object-contain p-1" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5">
          <h3 className="font-serif text-lg font-semibold text-gray-950 group-hover:underline group-hover:decoration-gray-300 group-hover:underline-offset-4">{org.title}</h3>
          <span className="flex-none font-mono text-xs text-gray-400">{org.date} — {org.endDate || "Present"}</span>
        </div>
        <p className="mt-1 text-sm font-medium text-gray-700">{org.role}</p>
        <p className="mt-1.5 max-w-3xl text-sm leading-6 text-gray-500">{org.description}</p>
      </div>
    </Link>
  );
}

export default async function OrganizationsIndex() {
  const organizations = await getOrganizations();

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <header className="max-w-4xl border-b border-gray-200 pb-8">
        <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">Affiliations</div>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-gray-950 md:text-4xl">Organizations</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">Research affiliations, professional work, student groups, and long-running community involvement, grouped by context rather than chronology.</p>
      </header>

      {sections.map((section) => {
        const items = organizations
          .filter((org) => org.category === section.key)
          .sort((a, b) => (priority[a.slug] ?? 100) - (priority[b.slug] ?? 100) || b.date.localeCompare(a.date));
        if (!items.length) return null;
        return (
          <section key={section.key} className="grid gap-5 md:grid-cols-[10rem_1fr] md:gap-10">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-800">{section.title}</h2>
              <p className="mt-2 text-xs leading-5 text-gray-400">{section.note}</p>
            </div>
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {items.map((org) => <OrgRow key={org.slug} org={org} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}
