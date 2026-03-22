import Link from "next/link";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";

const bioContent = `
I’m **Runnel Zhang** (also Runcheng Zhang), an undergraduate at **Nanjing University’s School of Intelligent Science and Technology**, exploring the intersections of CS and Mathematics. My journey has taken me from PKU’s summer and winter schools to active involvement in NJU’s CS AI community (e.g. **NOVA** & **AIA**), where I enjoy sharing knowledge on full-stack development and VAEs. I currently serve as a **full-stack engineer at FluxVerse**, a startup led by Mr. Chen, where I contribute to product development. Through this collaboration, I have access to a workspace at Nanjing Alibaba Center — though I am not directly employed by the company.

I am currently a Research Intern at **TsinghuaNLP**, working on **AI for Science** (AI4Sci) under Prof. Zheni Zeng, while also focusing on **AI for Mathematics** (AI4Math) alongside Ziyu Zhou at MSRA. Past projects—such as tackling sparsity in Tangut script translation — have deepened my interest in applying AI to structured, symbolic domains. I’m also trying to build foundational expertise in **Computer Vision**, **NLP**, and **AI interpretability**, while maintaining a cautious curiosity about highly speculative ideas like applying **Topos theory** to neural architectures—fully aware of the conceptual gaps and skepticism surrounding such directions.

On a lighter note, you might encounter me online as **Yuanjue Chou**. That is the pseudonym I use to publish satirical papers on math and CS, mostly for relaxation and the sheer joy of typesetting in $\\LaTeX$.

I’m continuously eager to learn, iterate, and grow through new experiences and connections. 

Feel free to reach out via email (Runnel.Zhang@smail.nju.edu.cn) or explore my work on **GitHub** (@ChouYuanjue) and **ORCID** (0009-0005-7611-3583)!
`;

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Runnel Zhang,  NJU
        </h1>
        <p className="text-xl text-gray-500 italic">
          Il nous montre une correspondance subtile et fine, comme venue du vide.
        </p>
      </header>

      <section>
        <MarkdownRenderer content={bioContent} className="prose-lg text-gray-600" />
      </section>

      <div className="pt-4 flex gap-4">
        <Link 
          href="/cv" 
          className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          View CV
        </Link>
        <Link 
          href="/cv.pdf" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors"
        >
          Download PDF
        </Link>
      </div>
    </div>
  );
}
