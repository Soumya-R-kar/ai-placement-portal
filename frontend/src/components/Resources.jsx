import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Smart fallback data so the page is never empty
const mockResources = [
  { id: 1, title: 'Data Structures & Algorithms', subject: 'Core CS', level: 'All Levels', duration: '40 hrs', rating: 4.9, description: 'Complete DSA course covering Arrays, Trees, Graphs, and DP.', url: '#' },
  { id: 2, title: 'React.js Complete Guide', subject: 'Web Dev', level: 'Intermediate', duration: '25 hrs', rating: 4.8, description: 'Master React hooks, context API, and state management.', url: '#' },
  { id: 3, title: 'Quantitative Aptitude Masterclass', subject: 'Aptitude', level: 'Beginner', duration: '15 hrs', rating: 4.7, description: 'Time & Work, Profit & Loss, Probability, and Permutations.', url: '#' },
  { id: 4, title: 'System Design for Beginners', subject: 'Core CS', level: 'Advanced', duration: '20 hrs', rating: 4.9, description: 'Learn how to design scalable systems like Twitter or Uber.', url: '#' },
  { id: 5, title: 'SQL & Database Design', subject: 'Database', level: 'Beginner', duration: '10 hrs', rating: 4.6, description: 'Master joins, subqueries, indexing, and normalization.', url: '#' },
  { id: 6, title: 'Logical Reasoning & Puzzles', subject: 'Aptitude', level: 'Intermediate', duration: '12 hrs', rating: 4.5, description: 'Syllogisms, blood relations, and seating arrangements.', url: '#' }
];

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  useEffect(() => {
    axios.get(`${API_URL}/api/resources`)
      .then(res => setResources(res.data.resources || []))
      .catch(() => {
        // Fallback to mock data if backend route isn't ready
        console.log("Using mock resources data");
        setResources(mockResources);
      });
  }, []);

  const subjects = ['All', ...new Set(resources.map(r => r.subject))];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  const filtered = resources.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
    const matchSubject = selectedSubject === 'All' || r.subject === selectedSubject;
    const matchLevel = selectedLevel === 'All' || r.level === selectedLevel || r.level === 'All Levels';
    return matchSearch && matchSubject && matchLevel;
    // eslint-disable-next-line
  });

  const levelColor = { 
    Beginner: 'bg-green-100 text-green-700', 
    Intermediate: 'bg-yellow-100 text-yellow-700', 
    Advanced: 'bg-red-100 text-red-700', 
    'All Levels': 'bg-blue-100 text-blue-700' 
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl mb-6">
        <h2 className="text-3xl font-bold mb-2">📚 Learning Resources</h2>
        <p className="opacity-90">Curated free resources to master every subject</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <input 
          type="text" 
          placeholder="🔍 Search resources..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="w-full p-3 border-2 rounded-lg mb-4 focus:border-purple-500 outline-none transition" 
        />
        <div className="flex flex-wrap gap-2 mb-3">
          {subjects.map(s => (
            <button key={s} onClick={() => setSelectedSubject(s)} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${selectedSubject === s ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {levels.map(l => (
            <button key={l} onClick={() => setSelectedLevel(l)} className={`px-3 py-1 rounded-full text-xs font-semibold transition ${selectedLevel === l ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <p className="text-gray-600 mb-4 font-medium">Showing {filtered.length} resources</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => (
          <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer" className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition border-t-4 border-purple-500 hover:-translate-y-1 group">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">{r.subject}</span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${levelColor[r.level] || 'bg-gray-100'}`}>{r.level}</span>
            </div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-purple-600 transition-colors">{r.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{r.description}</p>
            <div className="flex justify-between items-center text-xs text-gray-500 pt-3 border-t">
              <span>⏱ {r.duration}</span>
              <span>⭐ {r.rating}</span>
            </div>
          </a>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl">No resources found matching your criteria.</p>
          <button onClick={() => {setSearch(''); setSelectedSubject('All'); setSelectedLevel('All');}} className="mt-4 text-purple-600 font-semibold hover:underline">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}