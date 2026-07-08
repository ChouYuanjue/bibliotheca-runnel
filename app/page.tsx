import Link from "next/link";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";
import ArchiveCard from "@/components/custom/ArchiveCard";

const bioContent = `
I’m **Runnel Zhang** (also Runcheng Zhang), an undergraduate at **Nanjing University’s School of Intelligent Science and Technology**. Before entering NJU, I spent a long period studying mathematics and programming on my own; PKU’s summer and winter schools were among my first chances to discuss those interests in a university setting. At NJU, I have been involved in technical communities including **NOVA** and **AIA**, where I have shared material on full-stack development and VAEs. I also work as a **full-stack engineer at FluxVerse**, contributing to product development; through this collaboration I use a workspace at Nanjing Alibaba Center, but I am not employed by Alibaba.

I am currently a Research Intern at **TsinghuaNLP**, working on **AI for Science** (AI4Sci) under Prof. Zheni Zeng, while also working on **AI for Mathematics** (AI4Math) with Ziyu Zhou at MSRA. The work is still exploratory, and I keep it here mainly as a record of what I am trying to understand: sparse and structured language problems, mathematical reasoning, experiment infrastructure, and the background I am building in **Computer Vision**, **NLP**, and **AI interpretability**.

I also use the pseudonym **Yuanjue Chou** for satirical math and CS writing, mostly as a place for jokes, layout experiments, and $\LaTeX$ practice.

Feel free to reach out via email (Runnel.Zhang@smail.nju.edu.cn) or explore my work on **GitHub** (@ChouYuanjue) and **ORCID** (0009-0005-7611-3583)!
`;

const entryCards = [
  { title: "INM Notes", href: "/library/notes", description: "Mathematical notes: 158 notes, 15 volumes, PDF and TeX sources.", accent: "bg-slate-900" },
  { title: "Projects", href: "/projects", description: "Engineering systems, bot frameworks, low-resource language tools, and TeX/OCR pipelines.", accent: "bg-blue-600" },
  { title: "Fragments", href: "/fragments", description: "Study records, correspondence, project diaries, satire, and short notes.", accent: "bg-amber-500" },
  { title: "Index", href: "/worklist", description: "Site-wide list of projects, publications, artifacts, fragments, and notes.", accent: "bg-rose-500" },
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
