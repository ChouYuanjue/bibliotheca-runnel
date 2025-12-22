import React from "react";

export default function MentorsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Mentors</h1>
      
      <div className="space-y-8">
        <div className="border-l-4 border-gray-200 pl-4">
          <h2 className="text-xl font-semibold">
            <a href="https://iamcxds.github.io/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600 transition-colors">
              Keyao Peng
            </a>
          </h2>
          <p className="text-sm text-gray-600 mb-2">Ph.D. in Algebraic Geometry, Université Grenoble Alpes; Postdoctoral Researcher at University of Burgundy</p>
          <p className="text-gray-700 leading-relaxed">
            Served as my academic mentor for three years during my experience at Geek College, with sustained communication spanning the subsequent six years. His guidance has exerted a formative influence on my research trajectory, covering a broad spectrum of fields including Boolean algebra, category theory, Topos theory, homotopy type theory (HoTT), linear logic, and the controversial inter-universal Teichmüller theory (IUTT). My academic interests in mathematical logic, research focus on Voevodsky’s theories, intellectual curiosity about Lacan and Saussure, as well as academic inclination toward French scholarship, all originate from his inspiration. He has been a guiding light in my academic journey, and his metaphor that “Geek College is a bonfire that warms lost children” has become a touchstone for my academic pursuits.
          </p>
        </div>

        <div className="border-l-4 border-gray-200 pl-4">
          <h2 className="text-xl font-semibold">
            <a href="https://webhomes.maths.ed.ac.uk/~tl/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600 transition-colors">
              Tom Leinster
            </a>
          </h2>
          <p className="text-sm text-gray-600 mb-2">Professor at the University of Edinburgh</p>
          <p className="text-gray-700 leading-relaxed">
            Provided intermittent academic guidance for three years following the conclusion of my mentorship with Dr. Peng. His support included recommending key textbooks, clarifying foundational conceptual questions (e.g., those pertaining to groupoids), and engaging in discussions on academic and personal reflections. With official authorization, I have translated several of his papers. I once submitted a request for a letter of recommendation, which was not finalized due to deadline constraints. While I do not hold the status of his formal mentee, this request was made out of sincere reverence for his academic achievements and contributions, with full awareness of its presumptuous nature. His willingness to share knowledge with an aspiring researcher and his gentle guidance throughout this period constitute invaluable academic assets, for which I remain deeply grateful.
          </p>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-8 mt-12">Other Esteemed Predecessors</h1>
      
      <div className="space-y-8">
        <div className="border-l-4 border-gray-200 pl-4">
          <h2 className="text-xl font-semibold">Zhenyu Lu</h2>
          <p className="text-sm text-gray-600 mb-2">M.S. in Algebraic Geometry, East China Normal University; Mathematics Coach, High School Affiliated to Nanjing Normal University</p>
          <p className="text-gray-700 leading-relaxed">
            He patiently answered my numerous questions and offered detailed clarifications throughout my undergraduate mathematics studies.
          </p>
        </div>

        <div className="border-l-4 border-gray-200 pl-4">
          <h2 className="text-xl font-semibold">
            <a href="https://github.com/fyr233" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600 transition-colors">
              Yiran Fang
            </a>
          </h2>
          <p className="text-sm text-gray-600 mb-2">M.S. in Computer Science, University of Science and Technology of China</p>
          <p className="text-gray-700 leading-relaxed">
            His guidance has exerted a profound influence on my learning of information technology, as he was the one who initially set me on my technical journey.
          </p>
        </div>

        <div className="border-l-4 border-gray-200 pl-4">
          <h2 className="text-xl font-semibold">
            <a href="https://sites.google.com/site/yanbofan0124/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600 transition-colors">
              Yanbo Fan
            </a>
          </h2>
          <p className="text-sm text-gray-600 mb-2">Associate Professor, School of Intelligent Science and Technology, Nanjing University</p>
          <p className="text-gray-700 leading-relaxed">
            Was assigned as my formal freshman mentor for the Jianxiong Academy students.
          </p>
        </div>

        <div className="border-l-4 border-gray-200 pl-4">
          <h2 className="text-xl font-semibold">
            <a href="https://github.com/HRH0410" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600 transition-colors">
              Ronghao Huang
            </a>
          </h2>
          <p className="text-sm text-gray-600 mb-2">Junior undergraduate student, School of Intelligent Science and Technology, Nanjing University</p>
          <p className="text-gray-700 leading-relaxed">
            Was my assigned peer mentor and a very supportive senior who willingly offered detailed help with technical issues and daily learning life.
          </p>
        </div>
      </div>
    </div>
  );
}
