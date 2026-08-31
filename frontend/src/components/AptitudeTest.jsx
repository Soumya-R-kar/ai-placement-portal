import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:5000';

// Real questions for each subject
const questionsBank = {
  quantitative: [
    { id: 1, q: 'A train travels 60 km in 1 hour. How far will it travel in 3 hours?', options: ['120 km', '180 km', '240 km', '300 km'], answer: 1 },
    { id: 2, q: 'What is 15% of 200?', options: ['20', '25', '30', '35'], answer: 2 },
    { id: 3, q: 'If the cost price is ₹500 and selling price is ₹600, what is the profit percentage?', options: ['10%', '15%', '20%', '25%'], answer: 2 },
    { id: 4, q: 'A can do a work in 10 days, B in 15 days. In how many days can they do it together?', options: ['5 days', '6 days', '7 days', '8 days'], answer: 1 },
    { id: 5, q: 'What is the simple interest on ₹1000 at 5% per annum for 2 years?', options: ['₹50', '₹100', '₹150', '₹200'], answer: 1 },
    { id: 6, q: 'The ratio of boys to girls in a class is 3:2. If there are 30 boys, how many girls are there?', options: ['15', '20', '25', '30'], answer: 1 },
    { id: 7, q: 'What is the average of first 10 natural numbers?', options: ['5', '5.5', '6', '6.5'], answer: 1 },
    { id: 8, q: 'A shopkeeper marks up by 40% and gives 10% discount. What is his profit %?', options: ['20%', '24%', '26%', '30%'], answer: 2 },
    { id: 9, q: 'If x + y = 10 and x - y = 4, what is x?', options: ['5', '6', '7', '8'], answer: 2 },
    { id: 10, q: 'What is 2^10?', options: ['512', '1024', '2048', '4096'], answer: 1 }
  ],
  logical: [
    { id: 1, q: 'If APPLE is coded as ELPPA, how is ORANGE coded?', options: ['EGNARO', 'ERANGO', 'RANGEO', 'ENAGRO'], answer: 0 },
    { id: 2, q: 'Find the next number: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], answer: 1 },
    { id: 3, q: 'A is B\'s sister. C is B\'s mother. D is C\'s father. E is D\'s mother. How is A related to D?', options: ['Granddaughter', 'Grandmother', 'Daughter', 'Grandfather'], answer: 0 },
    { id: 4, q: 'If in a code language, CAT = 24, DOG = 26, then PIG = ?', options: ['28', '30', '32', '34'], answer: 2 },
    { id: 5, q: 'Complete the series: A, C, F, J, ?', options: ['N', 'O', 'P', 'Q'], answer: 1 },
    { id: 6, q: 'Pointing to a man, a woman said, "He is the son of my father\'s only daughter." How is the man related to the woman?', options: ['Brother', 'Son', 'Father', 'Uncle'], answer: 1 },
    { id: 7, q: 'If South-East becomes North, then what does North-West become?', options: ['East', 'West', 'North', 'South'], answer: 0 },
    { id: 8, q: 'Find the odd one out: 3, 5, 7, 12, 17, 19', options: ['12', '17', '7', '19'], answer: 0 },
    { id: 9, q: 'In a row of children, A is 7th from left and B is 12th from right. If they interchange, A becomes 22nd from left. How many children are there?', options: ['30', '31', '32', '33'], answer: 3 },
    { id: 10, q: 'Which figure comes next in the pattern? △, □, ○, △, □, ?', options: ['△', '□', '○', '◇'], answer: 2 }
  ],
  verbal: [
    { id: 1, q: 'Choose the synonym of "ABUNDANT":', options: ['Scarce', 'Plentiful', 'Rare', 'Limited'], answer: 1 },
    { id: 2, q: 'Choose the antonym of "BENEVOLENT":', options: ['Kind', 'Malevolent', 'Generous', 'Charitable'], answer: 1 },
    { id: 3, q: 'Fill in the blank: He is _____ honest man.', options: ['a', 'an', 'the', 'no article'], answer: 1 },
    { id: 4, q: 'Identify the correctly spelt word:', options: ['Accomodation', 'Accommodation', 'Acomodation', 'Acommodation'], answer: 1 },
    { id: 5, q: 'Choose the correct meaning of idiom "Piece of cake":', options: ['Difficult task', 'Very easy task', 'Delicious food', 'Birthday celebration'], answer: 1 },
    { id: 6, q: 'Select the correct sentence:', options: ['He don\'t know', 'He doesn\'t knows', 'He doesn\'t know', 'He not know'], answer: 2 },
    { id: 7, q: 'The opposite of "Transparent" is:', options: ['Clear', 'Opaque', 'Visible', 'Obvious'], answer: 1 },
    { id: 8, q: 'Choose the correct preposition: She is good _____ mathematics.', options: ['in', 'at', 'on', 'with'], answer: 1 },
    { id: 9, q: 'Meaning of "Procrastinate":', options: ['To act quickly', 'To delay', 'To complete', 'To celebrate'], answer: 1 },
    { id: 10, q: 'Identify the part of speech: "Quickly"', options: ['Noun', 'Verb', 'Adjective', 'Adverb'], answer: 3 }
  ]
};

export default function AptitudeTest() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Try to fetch from backend, fallback to mock data
    axios.get(`${API_URL}/api/aptitude/${subject}`)
      .then(res => {
        setQuestions(res.data.questions || questionsBank[subject] || []);
        setLoading(false);
      })
      .catch(() => {
        console.log("Using mock aptitude questions");
        setQuestions(questionsBank[subject] || []);
        setLoading(false);
      });
  }, [subject]);

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [current]: optionIndex });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      finishTest();
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

    const finishTest = async () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) correct++;
    });
    
    const finalScore = Math.round((correct / questions.length) * 100);
    setScore(finalScore);
    setFinished(true);

    // Save progress to backend and refresh user data
    setSaving(true);
    try {
      const res = await axios.post(`${API_URL}/api/progress/aptitude`, {
        subject,
        score: finalScore,
        correct,
        total: questions.length
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh user data in AuthContext
      const progressRes = await axios.get(`${API_URL}/api/progress`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // This will automatically update the Dashboard!
      window.dispatchEvent(new CustomEvent('userUpdated', { 
        detail: { progress: progressRes.data.progress, xp: progressRes.data.xp, level: progressRes.data.level }
      }));
      
    } catch (err) {
      console.log("Progress save failed (non-critical)");
    }
    setSaving(false);
  };

  

  const subjectNames = {
    quantitative: '🔢 Quantitative Aptitude',
    logical: '🧩 Logical Reasoning',
    verbal: '📖 Verbal Ability'
  };

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading questions...</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center mt-20">
        <p className="text-xl text-gray-600">No questions available for this subject.</p>
        <button onClick={() => navigate('/aptitude')} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          ← Back to Subjects
        </button>
      </div>
    );
  }

  // Results Screen
  if (finished) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className={`text-7xl mb-4 ${score >= 70 ? 'text-green-500' : score >= 40 ? 'text-yellow-500' : 'text-red-500'}`}>
            {score >= 70 ? '🎉' : score >= 40 ? '👍' : '💪'}
          </div>
          <h2 className="text-3xl font-bold mb-2">Test Complete!</h2>
          <p className="text-gray-600 mb-6">{subjectNames[subject]}</p>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6">
            <div className="text-6xl font-bold text-blue-600 mb-2">{score}%</div>
            <p className="text-gray-700 font-medium">
              You got {Object.values(answers).filter((a, i) => a === questions[i]?.answer).length} out of {questions.length} correct
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(answers).filter((a, i) => a === questions[i]?.answer).length}
              </div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {Object.keys(answers).length - Object.values(answers).filter((a, i) => a === questions[i]?.answer).length}
              </div>
              <div className="text-sm text-gray-600">Wrong</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">
                {questions.length - Object.keys(answers).length}
              </div>
              <div className="text-sm text-gray-600">Skipped</div>
            </div>
          </div>

          {saving && <p className="text-blue-600 mb-4">💾 Saving your progress...</p>}

          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/aptitude')} 
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
            >
              Back to Subjects
            </button>
            <button 
              onClick={() => {
                setCurrent(0);
                setAnswers({});
                setFinished(false);
                setScore(0);
              }}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Retry Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Question Screen
  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-t-2xl">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold">{subjectNames[subject]}</h2>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
            {current + 1} / {questions.length}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-8 rounded-b-2xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Q{current + 1}. {q.q}
        </h3>

        <div className="space-y-3 mb-6">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`w-full p-4 text-left border-2 rounded-lg transition font-medium ${
                answers[current] === idx
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
            >
              <span className="inline-block w-8 h-8 rounded-full bg-gray-100 text-center leading-8 mr-3 font-semibold">
                {String.fromCharCode(65 + idx)}
              </span>
              {opt}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-3">
          <button
            onClick={handlePrevious}
            disabled={current === 0}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            {current === questions.length - 1 ? 'Finish Test ✓' : 'Next →'}
          </button>
        </div>

        {/* Question Navigator */}
        <div className="mt-6 pt-6 border-t flex flex-wrap gap-2">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-9 h-9 rounded-lg text-sm font-semibold transition ${
                idx === current
                  ? 'bg-blue-600 text-white'
                  : answers[idx] !== undefined
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}