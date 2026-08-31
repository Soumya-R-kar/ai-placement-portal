import { useState } from 'react';
import axios from 'axios';

export default function DoubtSolver() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: '👋 Hi! I am your AI placement mentor. Ask me anything about DSA, Web Dev, Aptitude, Interviews, or any placement-related topic!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages([...messages, userMsg]);
    setLoading(true);
    try {
      const res = await axios.post('https://placement-portal-api.onrender.com/api/ai/doubt', { question: input });
      setMessages(prev => [...prev, { role: 'ai', text: res.data.answer }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: '❌ Sorry, something went wrong.' }]);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-t-2xl">
        <h2 className="text-2xl font-bold">💬 AI Doubt Solver</h2>
        <p className="opacity-90 text-sm">Ask any placement-related question</p>
      </div>

      <div className="bg-white rounded-b-2xl shadow-xl">
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md p-4 rounded-2xl ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                <p className="whitespace-pre-wrap">{m.text}</p>
              </div>
            </div>
          ))}
          {loading && <div className="text-gray-500 text-center">AI is thinking...</div>}
        </div>

        <div className="border-t p-4 flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask your doubt..." className="flex-1 p-3 border-2 rounded-full outline-none focus:border-green-500" />
          <button onClick={handleSend} disabled={loading} className="bg-green-600 text-white px-6 rounded-full font-semibold hover:bg-green-700 disabled:opacity-50">Send</button>
        </div>
      </div>
    </div>
  );
}