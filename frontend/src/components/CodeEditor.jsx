import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CodeEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState('# Write your code here\ndef solve():\n    pass');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock problem data based on ID
  const problem = {
    '1': { title: 'Two Sum', difficulty: 'Easy', points: 10, desc: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.' },
    '2': { title: 'Valid Parentheses', difficulty: 'Easy', points: 10, desc: 'Given a string containing just the characters (, ), {, }, [ and ], determine if the input string is valid.' },
    '3': { title: 'Merge Intervals', difficulty: 'Medium', points: 20, desc: 'Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals.' },
    '4': { title: 'LRU Cache', difficulty: 'Hard', points: 30, desc: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.' }
  }[id] || { title: 'Unknown Problem', difficulty: 'Easy', points: 10, desc: 'Problem description not found.' };

  const handleRun = () => {
    setLoading(true);
    setOutput(null);
    
    // Simulate code execution delay
    setTimeout(() => {
      setOutput({
        allPassed: true,
        score: problem.points,
        passedCount: 2,
        totalTests: 2,
        testResults: [
          { passed: true, input: 'Sample Input 1', expectedOutput: 'Sample Output 1', actualOutput: 'Sample Output 1' },
          { passed: true, input: 'Sample Input 2', expectedOutput: 'Sample Output 2', actualOutput: 'Sample Output 2' }
        ]
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <button onClick={() => navigate('/coding')} className="mb-4 text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1">
        ← Back to Problems
      </button>

      {/* Problem Description */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
          <h2 className="text-2xl font-bold">{problem.title}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
            problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
          }`}>
            {problem.difficulty} • {problem.points} pts
          </span>
        </div>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">{problem.desc}</p>
      </div>

      {/* Code Editor Area */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="flex items-center justify-between bg-gray-800 px-4 py-3">
          <span className="text-white text-sm font-semibold">Python 3</span>
          <button 
            onClick={handleRun} 
            disabled={loading} 
            className="bg-green-600 text-white px-6 py-1.5 rounded font-semibold hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            {loading ? '⏳ Running...' : '▶ Run Code'}
          </button>
        </div>
        <textarea 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          className="w-full h-96 bg-gray-900 text-gray-100 p-4 font-mono text-sm outline-none resize-none"
          spellCheck="false"
        />
      </div>

      {/* Output Section */}
      {output && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <h3 className="text-xl font-bold">Test Results</h3>
            {output.allPassed ? (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">✅ All Tests Passed! +{output.score} points</span>
            ) : (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">❌ {output.passedCount}/{output.totalTests} Passed</span>
            )}
          </div>
          <div className="space-y-3">
            {output.testResults?.map((test, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${test.passed ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Test Case {index + 1}</span>
                  <span className={test.passed ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{test.passed ? 'PASS' : 'FAIL'}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-mono">
                  <div>
                    <p className="text-gray-500 mb-1 text-xs uppercase">Input:</p>
                    <p className="bg-white p-2 rounded border">{test.input}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1 text-xs uppercase">Expected:</p>
                    <p className="bg-white p-2 rounded border">{test.expectedOutput}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1 text-xs uppercase">Your Output:</p>
                    <p className={`p-2 rounded border ${test.passed ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'}`}>
                      {test.actualOutput || '(empty)'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}