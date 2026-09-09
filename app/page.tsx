import Link from "next/link";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";
import ArchiveCard from "@/components/custom/ArchiveCard";

const bioContent = `
I’m **Runnel Zhang** (also Runcheng Zhang), an undergraduate at **Nanjing University’s School of Intelligent Science and Technology**. At NJU, I am involved with the **Artificial Intelligence Association (AIA)**, where I contribute to technical sharing and introductory teaching.

I am currently a Research Intern at **TsinghuaNLP**, working on **AI for Science** under Prof. Zheni Zeng, and a Research Intern at **NINE-Lab** under Dr. Huihong Liang, working on **edge intelligence and AI infrastructure**. My current research interests are focused on language-model training and reasoning for scientific tasks, together with efficient AI systems.

From January to August 2026, I collaborated with Ziyu Zhou in an **MSRA** research context on AI for Mathematics. That collaboration informed several projects around formal proof, reasoning enhancement, and neuro-symbolic methods.

I also use the pseudonym **Yuanjue Chou** primarily for recreational or satirical writing, including pieces that intentionally do not aim at scientific correctness. Material published under that name should not be taken to represent my scientific views or research claims.
`;

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <header className="max-w-3xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Runnel Zhang, NJU</h1>
        <p className="text-xl text-gray-500 italic">Il nous montre une correspondance subtile et fine, comme venue du vide.</p>
      </header>

      <section className="max-w-3xl">
        <MarkdownRenderer content={bioContent} className="prose-lg text-gray-600" />
      </section>

      <div className="flex flex-wrap gap-4 pt-2">
        <Link href="/cv" className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50">View CV</Link>
        <Link href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800">Download PDF</Link>
        <Link href="/organizations" className="inline-flex items-center justify-center px-2 py-3 text-base font-medium text-gray-500 transition-colors hover:text-gray-900">Organizations</Link>
        <Link href="/mentors" className="inline-flex items-center justify-center px-2 py-3 text-base font-medium text-gray-500 transition-colors hover:text-gray-900">Mentors</Link>
      </div>

      <section className="max-w-3xl">
        <ArchiveCard
          title="Archive"
          href="/archive"
          description="Personal notes, engineering projects, literary and linguistic writing, fragments, and older material are kept here rather than presented as the main academic profile."
          eyebrow="Personal and non-primary material"
          accent="bg-slate-900"
        />
      </section>
    </div>
  );
}
