import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/custom/PageHero";

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
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function OrgCard({ org }: { org: Organization }) {
  return (
    <Link href={`/organizations/${org.slug}`} className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md">
      <div className="flex items-start gap-5">
        {org.icon && (
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
            <Image src={org.icon} alt={org.title} fill className="object-cover" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h2 className="font-serif text-xl font-semibold text-gray-950 group-hover:text-gray-700">{org.title}</h2>
            <span className="whitespace-nowrap font-mono text-xs text-gray-400">{org.date} — {org.endDate || "Present"}</span>
          </div>
          <p className="mt-1 text-sm font-medium text-gray-700">{org.role}</p>
          <p className="mt-3 text-sm leading-6 text-gray-600">{org.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default async function OrganizationsIndex() {
  const organizations = await getOrganizations();
  const current = organizations.filter((org) => org.endDate === "Present" || !org.endDate);
  const past = organizations.filter((org) => org.endDate && org.endDate !== "Present");

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <PageHero
        eyebrow="Organizations"
        title="Communities, labs, and working groups"
        description="Organizations where I have built projects, taught, moderated, collaborated, or joined research and technical work."
        meta={<span className="rounded-full border border-gray-200 bg-white/70 px-4 py-2">{organizations.length} organizations</span>}
      />

      {current.length > 0 && <section className="space-y-5"><h2 className="font-serif text-2xl font-semibold text-gray-900">Current</h2><div className="grid gap-6 md:grid-cols-2">{current.map((org) => <OrgCard key={org.slug} org={org} />)}</div></section>}
      {past.length > 0 && <section className="space-y-5"><h2 className="font-serif text-2xl font-semibold text-gray-900">Earlier / Past</h2><div className="grid gap-6 md:grid-cols-2">{past.map((org) => <OrgCard key={org.slug} org={org} />)}</div></section>}
    </div>
  );
}
