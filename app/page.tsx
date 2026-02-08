import Link from "next/link";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";

const bioContent = `
I’m **Runnel Zhang** (also Runcheng Zhang), an undergraduate at **Nanjing University’s School of Intelligent Science and Technology**, exploring the intersections of CS and Mathematics. My journey has taken me from PKU’s summer and winter schools to active involvement in NJU’s CS AI community (e.g. **NOVA** & **AIA**), where I love sharing knowledge on topics like full-stack development and VAEs.

Research-wise, my primary focus currently lies in **AI for Mathematics (AI4Math)** (working with Ziyu Zhou), with plans to actively conduct work in **AI for Science (AI4Sci)** and **Retrieval-Augmented Generation (RAG)** under the supervision of Prof. Zheni Zeng. My previous explorations, such as addressing sparsity in Tangut script translation and improving symbolic synthesis in vector graphics, have shaped my interest in applying AI to structured challenges. I am also dedicated to humbly studying **Computer Vision**, **NLP**, and **AI interpretability** to build a more robust technical foundation. Regarding theoretical frontiers, I maintain a cautious curiosity about whether abstract frameworks like **Topos theory** could provide insights into neural architectures, while remaining fully aware of the skepticism and significant conceptual gaps that currently surround such highly speculative directions.

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
