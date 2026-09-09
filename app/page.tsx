import Link from "next/link";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";
import ArchiveCard from "@/components/custom/ArchiveCard";

const bioContent = `
I’m **Runnel Zhang** (also Runcheng Zhang), an undergraduate at **Nanjing University’s School of Intelligent Science and Technology**. At NJU, I am involved with the **Artificial Intelligence Association (AIA)**, where I contribute to technical sharing and introductory teaching.

I am currently a Research Intern at **TsinghuaNLP**, working on **AI for Science** under Prof. Zheni Zeng, and an Intern at **NINE-Lab** under Dr. Huihong Liang, working on **edge intelligence and AI infrastructure**. My current research interests are deliberately focused on language-model training and reasoning for scientific tasks, together with efficient AI systems. Earlier collaboration with Ziyu Zhou in an **MSRA** research context informed several projects around formal proof, reasoning enhancement, and neuro-symbolic methods.

Alongside research, I work part-time at **Nanjing Flux Technology Co., Ltd. (南京转点科技有限公司)**. Since August 30, 2026, I have also served as an **Agent Development Engineer** on Xijiu’s intelligent-scenario project as a **Volcano Engine-assigned external staff member**. In **NJU-China**, Nanjing University’s iGEM team, I serve as **Dry Lab Student Leader**.

I also use the name **Yuanjue Chou** for independent writing and technical notes. Feel free to reach out via email (Runnel.Zhang@smail.nju.edu.cn) or explore my work on **GitHub** (@ChouYuanjue) and **ORCID** (0009-0005-7611-3583).
`;

const entryCards = [
  { title: "INM Notes", href: "/library/notes", description: "Mathematical notes: 158 notes, 15 volumes, PDF and TeX sources.", accent: "bg-slate-900" },
  { title: "Projects", href: "/projects", description: "Research code, engineering systems, and technical tools.", accent: "bg-blue-600" },
  { title: "Fragments", href: "/fragments", description: "Study records, correspondence, project diaries, and short notes.", accent: "bg-amber-500" },
  { title: "Index", href: "/worklist", description: "Site-wide index of projects, writings, artifacts, fragments, and notes.", accent: "bg-rose-500" },
];

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
      </div>

      <section className="grid gap-5 md:grid-cols-2">
        {entryCards.map((card) => <ArchiveCard key={card.href} {...card} />)}
      </section>
    </div>
  );
}
