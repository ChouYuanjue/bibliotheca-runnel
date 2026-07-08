import PageHero from "@/components/custom/PageHero";

type Mentor = {
  name: string;
  role: string;
  relation: string;
  link?: string;
  note: string;
};

const groups: { title: string; description: string; people: Mentor[] }[] = [
  {
    title: "Formal and Current Research Guidance",
    description: "Current or near-current supervision, collaboration, and research guidance in AI-oriented work.",
    people: [
      {
        name: "Zheni Zeng",
        role: "Assistant Professor, School of Intelligent Science and Technology, Nanjing University",
        relation: "Academic advisor / research guidance",
        note: "Provides formal academic guidance for my transition into AI for Science, scientific reasoning, and RAG-related research directions.",
      },
      {
        name: "Ziyu Zhou",
        role: "Research collaborator; MSRA intern; M.S., Czech Technical University",
        relation: "Research collaborator and technical mentor",
        note: "Collaborates with me on AI for Mathematics work and provides technical guidance at the interface of theorem-oriented reasoning, machine learning, and mathematical background knowledge.",
      },
    ],
  },
  {
    title: "Mathematical and Intellectual Guidance",
    description: "Longer-term influences on mathematical taste, foundational interests, and research reading habits.",
    people: [
      {
        name: "Keyao Peng",
        role: "Ph.D. in Algebraic Geometry, Université Grenoble Alpes; postdoctoral researcher at University of Burgundy",
        relation: "Long-term mathematical mentor",
        link: "https://iamcxds.github.io/",
        note: "Introduced me to a broad range of modern mathematical ideas, including category theory, topos theory, HoTT, linear logic, and related foundational viewpoints.",
      },
      {
        name: "Tom Leinster",
        role: "Professor, University of Edinburgh",
        relation: "Correspondence and reading guidance",
        link: "https://webhomes.maths.ed.ac.uk/~tl/",
        note: "Offered intermittent guidance through correspondence, including reading suggestions and clarifications around foundational mathematical concepts. I have also translated several of his writings with permission.",
      },
    ],
  },
  {
    title: "Earlier Academic and Technical Support",
    description: "Earlier guides who helped shape my mathematical study habits and technical entry points.",
    people: [
      {
        name: "Zhenyu Lu",
        role: "M.S. in Algebraic Geometry, East China Normal University; mathematics coach",
        relation: "Earlier mathematics guidance",
        note: "Answered many mathematical questions and helped me consolidate early undergraduate-level mathematics study.",
      },
      {
        name: "Yiran Fang",
        role: "M.S. in Computer Science, University of Science and Technology of China",
        relation: "Technical entry guidance",
        link: "https://github.com/fyr233",
        note: "Helped initiate my technical learning path and influenced my early approach to programming and information technology.",
      },
    ],
  },
];

function MentorCard({ person }: { person: Mentor }) {
  const name = person.link ? (
    <a href={person.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline">
      {person.name}
    </a>
  ) : person.name;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-xl font-semibold text-gray-950">{name}</h3>
          <p className="mt-1 text-sm leading-6 text-gray-500">{person.role}</p>
        </div>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">{person.relation}</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-gray-700">{person.note}</p>
    </div>
  );
}

export default function MentorsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <PageHero
        eyebrow="Mentors"
        title="People who shaped my research path"
        description="A concise acknowledgement of formal advisors, research collaborators, mathematical mentors, and earlier guides. The wording is intentionally conservative: it records influence and guidance without overstating institutional relationships."
      />

      {groups.map((group) => (
        <section key={group.title} className="space-y-5">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-gray-900">{group.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">{group.description}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {group.people.map((person) => <MentorCard key={person.name} person={person} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
