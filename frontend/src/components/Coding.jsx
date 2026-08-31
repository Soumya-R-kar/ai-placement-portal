import { useNavigate } from 'react-router-dom';

export default function Coding() {
  const navigate = useNavigate();
  
  // Hardcoded data so it NEVER crashes or shows a blank screen
  const problems = [
    { id: '1', title: 'Two Sum', difficulty: 'Easy', points: 10, topic: 'Arrays' },
    { id: '2', title: 'Valid Parentheses', difficulty: 'Easy', points: 10, topic: 'Stack' },
    { id: '3', title: 'Merge Intervals', difficulty: 'Medium', points: 20, topic: 'Arrays' },
    { id: '4', title: 'LRU Cache', difficulty: 'Hard', points: 30, topic: 'Design' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">💻 Coding Practice</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Difficulty</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Points</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {problems.map((problem) => (
              <tr key={problem.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <span className="w-3 h-3 bg-gray-300 rounded-full inline-block"></span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{problem.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{problem.points}</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => navigate(`/coding/${problem.id}`)}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Solve →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}