import PageHero from "@/components/custom/PageHero";

type Mentor = {
  name: string;
  role: string;
  relation: string;
  link?: string;
  note: string;
};

const current: { title: string; people: Mentor[] }[] = [
  {
    title: "Research Guidance",
    people: [
      {
        name: "Zheni Zeng",
        role: "Assistant Professor, School of Intelligent Science and Technology, Nanjing University",
        relation: "Academic advisor / research guidance",
        note: "Guidance in AI for Science, scientific reasoning, and language-model research.",
      },
      {
        name: "Huihong Liang",
        role: "NINE-Lab",
        relation: "Research advisor",
        note: "Supervises my internship in edge intelligence and AI infrastructure.",
      },
      {
        name: "Ziyu Zhou",
        role: "Research collaborator in AI for Mathematics",
        relation: "Research collaborator and technical mentor",
        note: "Collaborated with me on formal proof, reasoning enhancement, and neuro-symbolic methods.",
      },
    ],
  },
  {
    title: "Mathematical Guidance",
    people: [
      {
        name: "Keyao Peng",
        role: "Ph.D. in Algebraic Geometry, Université Grenoble Alpes; postdoctoral researcher at University of Burgundy",
        relation: "Long-term mathematical mentor",
        link: "https://iamcxds.github.io/",
        note: "Long-term guidance in independent mathematical study and research reading.",
      },
      {
        name: "Tom Leinster",
        role: "Professor, University of Edinburgh",
        relation: "Correspondence and reading guidance",
        link: "https://webhomes.maths.ed.ac.uk/~tl/",
        note: "Reading suggestions and clarifications through intermittent correspondence; I have also translated several of his writings with permission.",
      },
    ],
  },
];

const earlier: Mentor[] = [
  {
    name: "Zhenyu Lu",
    role: "M.S. in Algebraic Geometry, East China Normal University; mathematics coach",
    relation: "Earlier mathematics guidance",
    note: "Helped consolidate my earlier mathematical study.",
  },
  {
    name: "Yiran Fang",
    role: "M.S. in Computer Science, University of Science and Technology of China",
    relation: "Earlier technical guidance",
    link: "https://github.com/fyr233",
    note: "Helped initiate my early programming and technical learning path.",
  },
];

function MentorRow({ person }: { person: Mentor }) {
  const name = person.link ? (
    <a href={person.link} target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 underline-offset-4 hover:decoration-gray-600">
      {person.name}
    </a>
  ) : person.name;

  return (
    <div className="py-5 first:pt-0 last:pb-0">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="font-serif text-lg font-semibold text-gray-950">{name}</h3>
        <span className="text-xs text-gray-400">{person.relation}</span>
      </div>
      <p className="mt-1 text-sm text-gray-500">{person.role}</p>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-700">{person.note}</p>
    </div>
  );
}

export default function MentorsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <PageHero
        eyebrow="Mentors"
        title="Research and academic guidance"
        description="People who have provided sustained research, mathematical, or technical guidance. Roles are described conservatively and only as they apply to my work."
      />

      <section className="grid gap-5 md:grid-cols-[10rem_1fr] md:gap-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-800">{current[0].title}</h2>
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {current[0].people.map((person) => <MentorRow key={person.name} person={person} />)}
        </div>
      </section>

      <details className="group border-y border-gray-200 py-4">
        <summary className="cursor-pointer list-none text-sm font-medium text-gray-600 marker:hidden">
          <span className="group-open:text-gray-950">Mathematical guidance <span className="ml-1 text-gray-400">(2)</span></span>
        </summary>
        <div className="mt-4 divide-y divide-gray-200 border-t border-gray-100 pt-4">
          {current[1].people.map((person) => <MentorRow key={person.name} person={person} />)}
        </div>
      </details>

      <details className="group border-y border-gray-200 py-4">
        <summary className="cursor-pointer list-none text-sm font-medium text-gray-600 marker:hidden">
          <span className="group-open:text-gray-950">Earlier guidance <span className="ml-1 text-gray-400">(2)</span></span>
        </summary>
        <div className="mt-4 divide-y divide-gray-200 border-t border-gray-100 pt-4">
          {earlier.map((person) => <MentorRow key={person.name} person={person} />)}
        </div>
      </details>
    </div>
  );
}
