import { Link } from 'react-router-dom';

export default function AptitudeTestList() {
  const subjects = [
    { id: 'quantitative', name: 'Quantitative Aptitude', icon: '🔢', desc: 'Numbers, percentages, profit/loss, time & work.', color: 'border-blue-500' },
    { id: 'logical', name: 'Logical Reasoning', icon: '🧩', desc: 'Syllogisms, blood relations, seating arrangements.', color: 'border-green-500' },
    { id: 'verbal', name: 'Verbal Ability', icon: '📖', desc: 'Reading comprehension, grammar, sentence correction.', color: 'border-purple-500' }
  ];

  return (
    <div>
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-2xl mb-6">
        <h2 className="text-3xl font-bold mb-2">🧠 Aptitude Practice</h2>
        <p className="opacity-90">Master the most important section of campus placements</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {subjects.map((sub) => (
          <Link key={sub.id} to={`/aptitude/${sub.id}`} className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-t-4 ${sub.color} hover:-translate-y-1`}>
            <div className="text-4xl mb-3">{sub.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{sub.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{sub.desc}</p>
            <span className="text-blue-600 font-semibold text-sm">Start Test →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}