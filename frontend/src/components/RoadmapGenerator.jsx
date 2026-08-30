import { useState } from 'react';
import axios from 'axios';

export default function RoadmapGenerator() {
  const [role, setRole] = useState('');
  const [days, setDays] = useState('');
  const [skills, setSkills] = useState('');
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!role || !days) return alert('Please fill role and days');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/roadmap', { targetRole: role, daysAvailable: days, currentSkills: skills });
      setRoadmap(res.data.roadmap);
    } catch { alert('Failed to generate roadmap'); }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 text-white p-8 rounded-2xl mb-6">
        <h2 className="text-3xl font-bold mb-2">🗺️ AI Study Roadmap Generator</h2>
        <p className="opacity-90">Get a personalized week-by-week plan to crack your dream job</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Target Role (e.g., SDE at Google)" className="p-3 border-2 rounded-lg outline-none focus:border-orange-500" />
          <input value={days} onChange={(e) => setDays(e.target.value)} placeholder="Days Available (e.g., 90)" type="number" className="p-3 border-2 rounded-lg outline-none focus:border-orange-500" />
          <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Current Skills (comma separated)" className="p-3 border-2 rounded-lg outline-none focus:border-orange-500" />
        </div>
        <button onClick={generate} disabled={loading} className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 disabled:opacity-50">
          {loading ? 'Generating...' : '✨ Generate My Roadmap'}
        </button>
      </div>

      {roadmap && (
        <div className="space-y-4">
          {roadmap.weeks?.map((w, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
              <h3 className="text-xl font-bold mb-2 text-orange-600">Week {w.week}: {w.focus}</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="font-semibold text-gray-700 mb-1">📚 Topics:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {w.topics?.map((t, j) => <li key={j}>{t}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-1">✅ Daily Tasks:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {w.tasks?.map((t, j) => <li key={j}>{t}</li>)}
                  </ul>
                </div>
              </div>
              {w.resources && (
                <div>
                  <p className="font-semibold text-gray-700 mb-1">🔗 Resources:</p>
                  <ul className="list-disc list-inside text-sm text-blue-600">
                    {w.resources.map((r, j) => <li key={j}>{r}</li>)}
                  </ul>
                </div>
              )}
            </div>
          ))}
          {roadmap.tips && (
            <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
              <h3 className="font-bold text-yellow-700 mb-2">💡 Pro Tips</h3>
              <ul className="list-disc list-inside space-y-1">
                {roadmap.tips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}