import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://placement-portal-api.onrender.com/api/coding/problems')
      .then(res => {
        setProblems(res.data.problems);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const difficultyColor = {
    Easy: 'text-green-600 bg-green-100',
    Medium: 'text-yellow-600 bg-yellow-100',
    Hard: 'text-red-600 bg-red-100'
  };

  if (loading) return <p className="text-center mt-10">Loading problems...</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Coding Practice Problems</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Difficulty</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Points</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {problems.map((problem, index) => (
              <tr key={problem._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium">{problem.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${difficultyColor[problem.difficulty]}`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4">{problem.points}</td>
                <td className="px-6 py-4">
                  <Link to={`/coding/${problem._id}`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                    Solve
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}