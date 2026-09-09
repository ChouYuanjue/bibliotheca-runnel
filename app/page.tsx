import Link from "next/link";

const research = [
  {
    place: "TsinghuaNLP",
    role: "Research Intern · AI for Science",
    period: "Mar 2026 — Present",
    text: "Working under Prof. Zheni Zeng on language-model training and reasoning for scientific tasks, together with the experimental infrastructure needed to evaluate them reliably.",
  },
  {
    place: "NINE-Lab",
    role: "Research Intern · Edge Intelligence & AI Infrastructure",
    period: "Aug 2026 — Present",
    text: "Working under Dr. Huihong Liang on efficient inference and deployment under constrained compute.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl space-y-14">
      <header className="max-w-3xl border-b border-gray-200 pb-9">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">Nanjing University</p>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">Runnel Zhang <span className="font-normal text-gray-400">(Runcheng Zhang)</span></h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600">
          Undergraduate in Intelligent Science and Technology at Nanjing University. My current work is centered on language-model training and reasoning for scientific tasks, and on efficient AI systems.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
          <a href="mailto:Runnel.Zhang@smail.nju.edu.cn" className="underline decoration-gray-300 underline-offset-4 hover:decoration-gray-600">Email</a>
          <a href="https://github.com/ChouYuanjue" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 underline-offset-4 hover:decoration-gray-600">GitHub</a>
          <a href="https://orcid.org/0009-0005-7611-3583" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 underline-offset-4 hover:decoration-gray-600">ORCID</a>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-[9rem_1fr] md:gap-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-800">Research</h2>
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {research.map((item) => (
            <div key={item.place} className="py-5 first:pt-0 last:pb-0">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="font-serif text-lg font-semibold text-gray-950">{item.place}</h3>
                <span className="font-mono text-xs text-gray-400">{item.period}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-gray-700">{item.role}</p>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[9rem_1fr] md:gap-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-800">Earlier</h2>
        <div className="border-y border-gray-200 py-5 text-sm leading-6 text-gray-600">
          From January to August 2026, I collaborated with Ziyu Zhou in an MSRA research context on AI for Mathematics. That work informed several projects around formal proof, reasoning enhancement, and neuro-symbolic methods.
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[9rem_1fr] md:gap-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-800">Profile</h2>
        <div className="flex flex-wrap gap-x-6 gap-y-3 border-y border-gray-200 py-5 text-sm">
          <Link href="/cv" className="underline decoration-gray-300 underline-offset-4 hover:decoration-gray-600">CV</Link>
          <Link href="/organizations" className="underline decoration-gray-300 underline-offset-4 hover:decoration-gray-600">Affiliations</Link>
          <Link href="/mentors" className="underline decoration-gray-300 underline-offset-4 hover:decoration-gray-600">Mentors</Link>
          <Link href="/cv.pdf" target="_blank" className="underline decoration-gray-300 underline-offset-4 hover:decoration-gray-600">CV PDF</Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[9rem_1fr] md:gap-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-800">Archive</h2>
        <div className="space-y-4 border-y border-gray-200 py-5 text-sm leading-6 text-gray-600">
          <p>
            Personal notes, engineering projects, literary and linguistic writing, fragments, and older material are kept separately in the <Link href="/archive" className="underline decoration-gray-300 underline-offset-4 hover:decoration-gray-600">archive</Link> rather than presented as part of the academic profile.
          </p>
          <p className="text-gray-500">
            <strong className="font-medium text-gray-700">Yuanjue Chou</strong> is a pseudonym used primarily for recreational or satirical writing, including pieces that intentionally do not aim at scientific correctness. Material published under that name should not be taken to represent my scientific views or research claims.
          </p>
        </div>
      </section>
    </div>
  );
}
