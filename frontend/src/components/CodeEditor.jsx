import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Editor from '@monaco-editor/react';

export default function CodeEditor() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/coding/problems/' + id)
      .then(res => {
        setProblem(res.data.problem);
        setCode(res.data.problem.starterCode);
        setLanguage(res.data.problem.language);
      })
      .catch(() => setError('Failed to load problem'));
  }, [id]);

  const handleRun = async () => {
    setLoading(true);
    setOutput(null);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/coding/execute', {
        problemId: id, code: code, language: language
      });
      setOutput(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Execution failed');
    }
    setLoading(false);
  };

  if (error && !problem) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!problem) return <p className="text-center mt-10">Loading problem...</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold">{problem.title}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
            {problem.difficulty} - {problem.points} pts
          </span>
        </div>
        <p className="text-gray-700 whitespace-pre-line">{problem.description}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-gray-700 text-white px-3 py-1 rounded text-sm">
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
          <button onClick={handleRun} disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 disabled:bg-gray-500">
            {loading ? 'Running...' : 'Run Code'}
          </button>
        </div>
        <Editor height="400px" language={language} value={code} onChange={(value) => setCode(value)} theme="vs-dark" options={{ fontSize: 14, minimap: { enabled: false }, scrollBeyondLastLine: false, automaticLayout: true, tabSize: 4 }} />
      </div>

      {output && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xl font-bold">Test Results</h3>
            {output.allPassed ? (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">All Tests Passed! +{output.score} points</span>
            ) : (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">{output.passedCount}/{output.totalTests} Passed - {output.score}/{output.points} pts</span>
            )}
          </div>
          <div className="space-y-3">
            {output.testResults.map((test, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${test.passed ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Test Case {index + 1}</span>
                  <span className={test.passed ? 'text-green-600' : 'text-red-600'}>{test.passed ? 'PASS' : 'FAIL'}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm font-mono">
                  <div><p className="text-gray-500 mb-1">Input:</p><p className="bg-white p-2 rounded">{test.input}</p></div>
                  <div><p className="text-gray-500 mb-1">Expected:</p><p className="bg-white p-2 rounded">{test.expectedOutput}</p></div>
                  <div><p className="text-gray-500 mb-1">Your Output:</p><p className={`p-2 rounded ${test.passed ? 'bg-green-100' : 'bg-red-100'}`}>{test.actualOutput || '(empty)'}</p></div>
                </div>
                {test.stderr && <div className="mt-2"><p className="text-red-500 text-sm font-semibold">Error:</p><pre className="bg-red-100 p-2 rounded text-xs overflow-x-auto">{test.stderr}</pre></div>}
              </div>
            ))}
          </div>
        </div>
      )}
      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-4"><strong>Error:</strong> {error}</div>}
    </div>
  );
}