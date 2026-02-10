import React from "react";

export default function MentorsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Mentors</h1>

      <h2 className="text-2xl font-semibold mb-4">Research Advisors</h2>
      <p className="text-gray-600 italic mb-6">
        Current formal supervision and guidance in the field of Artificial Intelligence.
      </p>

      <div className="space-y-8 mb-12">
        <div className="border-l-4 border-gray-200 pl-4">
          <h3 className="text-xl font-semibold">Zheni Zeng</h3>
          <p className="text-sm text-gray-600 mb-2">Assistant Professor, School of Intelligent Science and Technology, Nanjing University</p>
          <p className="text-gray-700 leading-relaxed">
            Prof. Zeng serves as my academic advisor. I am joining her research group at Nanjing University, where I will be conducting research on AI for Science (AI4Sci) and Retrieval-Augmented Generation (RAG). Her expertise provides the essential guidance and institutional framework for my transition into advanced AI research.
          </p>
        </div>

        <div className="border-l-4 border-gray-200 pl-4">
          <h3 className="text-xl font-semibold">Ziyu Zhou</h3>
          <p className="text-sm text-gray-600 mb-2">Research Collaborator; MSRA Intern; M.S., Czech Technical University</p>
          <p className="text-gray-700 leading-relaxed">
            Ziyu is a primary mentor and a close collaborator in my current research. We are actively working on AI for Mathematics (AI4Math), where he provides critical technical guidance and strategic insights. His mentorship has been instrumental in bridging my background in formal mathematics with the frontiers of deep learning.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Intellectual Mentors</h2>
      <p className="text-gray-600 italic mb-6">
        Scholars who have shaped my mathematical intuition, philosophical outlook, and academic rigor.
      </p>

      <div className="space-y-8 mb-12">
        <div className="border-l-4 border-gray-200 pl-4">
          <h3 className="text-xl font-semibold">
            <a href="https://iamcxds.github.io/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600 transition-colors">
              Keyao Peng
            </a>
          </h3>
          <p className="text-sm text-gray-600 mb-2">Ph.D. in Algebraic Geometry, Université Grenoble Alpes; Postdoctoral Researcher at University of Burgundy</p>
          <p className="text-gray-700 leading-relaxed">
            Served as my academic mentor for three years during my experience at Geek College, with sustained communication spanning the subsequent six years. His guidance has exerted a formative influence on my research trajectory, covering a broad spectrum of fields including Boolean algebra, category theory, Topos theory, homotopy type theory (HoTT), linear logic, and the controversial inter-universal Teichmüller theory (IUTT). My academic interests in mathematical logic, research focus on Voevodsky’s theories, intellectual curiosity about Lacan and Saussure, as well as academic inclination toward French scholarship, all originate from his inspiration. He has been a guiding light in my academic journey, and his metaphor that “Geek College is a bonfire that warms lost children” has become a touchstone for my academic pursuits.
          </p>
        </div>

        <div className="border-l-4 border-gray-200 pl-4">
          <h3 className="text-xl font-semibold">
            <a href="https://webhomes.maths.ed.ac.uk/~tl/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600 transition-colors">
              Tom Leinster
            </a>
          </h3>
          <p className="text-sm text-gray-600 mb-2">Professor at the University of Edinburgh</p>
          <p className="text-gray-700 leading-relaxed">
            Provided intermittent academic guidance for three years following the conclusion of my mentorship with Dr. Peng. His support included recommending key textbooks, clarifying foundational conceptual questions (e.g., those pertaining to groupoids), and engaging in discussions on academic and personal reflections. With official authorization, I have translated several of his papers. I once submitted a request for a letter of recommendation, which was not finalized due to deadline constraints. While I do not hold the status of his formal mentee, this request was made out of sincere reverence for his academic achievements and contributions, with full awareness of its presumptuous nature. His willingness to share knowledge with an aspiring researcher and his gentle guidance throughout this period constitute invaluable academic assets, for which I remain deeply grateful.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Early Guides</h2>
      <p className="text-gray-600 italic mb-6">
        Predecessors who provided pivotal support during the initial stages of my academic journey.
      </p>

      <div className="space-y-8">
        <div className="border-l-4 border-gray-200 pl-4">
          <h3 className="text-xl font-semibold">Zhenyu Lu</h3>
          <p className="text-sm text-gray-600 mb-2">M.S. in Algebraic Geometry, East China Normal University; Mathematics Coach, High School Affiliated to Nanjing Normal University</p>
          <p className="text-gray-700 leading-relaxed">
            He patiently answered my numerous questions and offered detailed clarifications throughout my undergraduate mathematics studies.
          </p>
        </div>

        <div className="border-l-4 border-gray-200 pl-4">
          <h3 className="text-xl font-semibold">
            <a href="https://github.com/fyr233" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600 transition-colors">
              Yiran Fang
            </a>
          </h3>
          <p className="text-sm text-gray-600 mb-2">M.S. in Computer Science, University of Science and Technology of China</p>
          <p className="text-gray-700 leading-relaxed">
            His guidance has exerted a profound influence on my learning of information technology, as he was the one who initially set me on my technical journey.
          </p>
        </div>
      </div>
    </div>
  );
}
