import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MockInterview() {
  const [role, setRole] = useState('Software Engineer');
  const [question, setQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const questions = {
    'Software Engineer': ['Explain the difference between stack and heap memory.', 'What is polymorphism in OOP?', 'Design a URL shortener like bit.ly.', 'What are microservices?'],
    'Data Scientist': ['Explain bias-variance tradeoff.', 'What is overfitting and how to prevent it?', 'Explain gradient descent.', 'What is cross-validation?'],
    'Web Developer': ['Explain the virtual DOM in React.', 'What is CORS?', 'Difference between let, const, var.', 'Explain JWT authentication.']
  };

  useEffect(() => {
    const qs = questions[role] || questions['Software Engineer'];
    setQuestion(qs[Math.floor(Math.random() * qs.length)]);
  }, [role]);

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert('Voice not supported. Use Chrome.');
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e) => setUserAnswer(e.results[0][0].transcript);
    recognition.start();
  };

  const speak = (text) => {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1; u.pitch = 1;
    speechSynthesis.speak(u);
  };

  const submit = async () => {
    if (!userAnswer.trim()) return alert('Please answer first');
    setLoading(true);
    try {
      const res = await axios.post('https://placement-portal-api.onrender.com/api/ai/interview', { question, userAnswer, role });
      setFeedback(res.data.feedback);
      speak('You scored ' + res.data.feedback.score + ' out of 10. ' + res.data.feedback.feedback);
    } catch { alert('Failed'); }
    setLoading(false);
  };

  const nextQuestion = () => {
    const qs = questions[role] || questions['Software Engineer'];
    setQuestion(qs[Math.floor(Math.random() * qs.length)]);
    setUserAnswer('');
    setFeedback(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-8 rounded-2xl mb-6">
        <h2 className="text-3xl font-bold mb-2">🎤 AI Mock Interview with Voice</h2>
        <p className="opacity-90">Speak your answer and get instant AI feedback</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <label className="font-semibold mb-2 block">Select Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 border-2 rounded-lg mb-4">
          {Object.keys(questions).map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border-l-4 border-blue-500 mb-4">
          <p className="text-sm text-gray-500 mb-1">Interviewer asks:</p>
          <p className="text-xl font-semibold text-gray-800">"{question}"</p>
          <button onClick={() => speak(question)} className="mt-2 text-blue-600 text-sm hover:underline">🔊 Listen to question</button>
        </div>

        <label className="font-semibold mb-2 block">Your Answer:</label>
        <textarea value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} rows="5" className="w-full p-3 border-2 rounded-lg mb-3" placeholder="Type or speak your answer..." />
        
        <div className="flex gap-2 mb-4">
          <button onClick={startVoice} disabled={listening} className={`flex-1 py-3 rounded-full font-semibold ${listening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-800 text-white hover:bg-gray-900'}`}>
            {listening ? '🎤 Listening...' : '🎤 Speak Answer'}
          </button>
          <button onClick={submit} disabled={loading} className="flex-1 bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 disabled:opacity-50">
            {loading ? 'Evaluating...' : '✨ Get AI Feedback'}
          </button>
        </div>
      </div>

      {feedback && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-blue-600 mb-2">{feedback.score}/10</div>
            <p className="text-gray-600">Interviewer Rating</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl mb-3">
            <h4 className="font-bold text-blue-700 mb-1">💬 Feedback:</h4>
            <p>{feedback.feedback}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl mb-3">
            <h4 className="font-bold text-green-700 mb-1">✅ Improved Answer:</h4>
            <p>{feedback.improvedAnswer}</p>
          </div>
          {feedback.keyPoints && (
            <div className="bg-yellow-50 p-4 rounded-xl">
              <h4 className="font-bold text-yellow-700 mb-1">🎯 Key Points to Cover:</h4>
              <ul className="list-disc list-inside">
                {feedback.keyPoints.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          )}
          <button onClick={nextQuestion} className="w-full mt-4 bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-full font-semibold hover:opacity-90">
            🎯 Next Question
          </button>
        </div>
      )}
    </div>
  );
}