import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AptitudeTest() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  // Mock questions based on subject
  const questions = {
    quantitative: [
      { q: "If a shirt costs $40 and is discounted by 20%, what is the new price?", options: ["$30", "$32", "$35", "$38"], answer: 1 },
      { q: "A train 150m long passes a pole in 15 seconds. What is its speed in km/h?", options: ["36", "45", "54", "72"], answer: 0 },
      { q: "What is 15% of 200?", options: ["20", "25", "30", "35"], answer: 2 }
    ],
    logical: [
      { q: "Pointing to a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?", options: ["Mother", "Sister", "Aunt", "Grandmother"], answer: 0 },
      { q: "Find the next number: 2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "46"], answer: 1 },
      { q: "If 'APPLE' is coded as 'BQQMF', how is 'MANGO' coded?", options: ["NBPHQ", "NBNGP", "NBOHP", "NBQHP"], answer: 0 }
    ],
    verbal: [
      { q: "Choose the synonym of 'Benevolent':", options: ["Cruel", "Kind", "Angry", "Selfish"], answer: 1 },
      { q: "Identify the error: 'He don't like apples.'", options: ["He", "don't", "like", "apples"], answer: 1 },
      { q: "Antonym of 'Transparent':", options: ["Clear", "Opaque", "Visible", "Bright"], answer: 1 }
    ]
  };

  const currentQuestions = questions[subject] || questions.quantitative;

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, showResult]);

  const handleNext = () => {
    if (selected === currentQuestions[currentQ].answer) setScore(score + 1);
    if (currentQ < currentQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (selected === currentQuestions[currentQ].answer) setScore(score + 1);
    setShowResult(true);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-4">Test Completed! 🎉</h2>
        <div className="text-6xl font-bold text-blue-600 mb-4">{score} / {currentQuestions.length}</div>
        <p className="text-gray-600 mb-6">
          {score === currentQuestions.length ? "Perfect score! You're ready." : "Keep practicing to improve your speed and accuracy."}
        </p>
        <button onClick={() => navigate('/aptitude')} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
          Back to Subjects
        </button>
      </div>
    );
  }

  const q = currentQuestions[currentQ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold capitalize">{subject} Test</h2>
        <div className={`text-xl font-bold px-4 py-2 rounded-lg ${timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="mb-2 text-gray-500">Question {currentQ + 1} of {currentQuestions.length}</div>
        <h3 className="text-xl font-semibold mb-6">{q.q}</h3>
        
        <div className="space-y-3 mb-8">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`w-full text-left p-4 rounded-lg border-2 transition ${
                selected === idx ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <button 
          onClick={handleNext} 
          disabled={selected === null}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {currentQ === currentQuestions.length - 1 ? 'Submit Test' : 'Next Question'}
        </button>
      </div>
    </div>
  );
}