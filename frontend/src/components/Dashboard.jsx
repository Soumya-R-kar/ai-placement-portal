import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Code2, Brain, FileText, BookOpen, MessageSquare, Map, Mic, TrendingUp, Calendar, Award } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  // Calculate level title based on level number
  const getLevelTitle = (level) => {
    if (level === 1) return 'Beginner';
    if (level === 2) return 'Intermediate';
    if (level === 3) return 'Advanced';
    if (level >= 4) return 'Expert';
    return 'Beginner';
  };

  // Calculate XP progress to next level
  const getCurrentXP = () => {
    const xp = user?.xp || 0;
    const level = user?.level || 1;
    const xpInCurrentLevel = xp % 100;
    return xpInCurrentLevel;
  };

  const features = [
    { title: 'Coding Practice', desc: 'Solve DSA problems with real-time AI execution.', icon: Code2, color: 'bg-blue-500', link: '/coding' },
    { title: 'Aptitude Tests', desc: 'Timed Quant, Logical, and Verbal reasoning tests.', icon: Brain, color: 'bg-green-500', link: '/aptitude' },
    { title: 'AI Resume Analyzer', desc: 'Get your resume scored and optimized by AI.', icon: FileText, color: 'bg-purple-500', link: '/resume' },
    { title: 'Learning Resources', desc: 'Curated W3Schools-style subject-wise library.', icon: BookOpen, color: 'bg-orange-500', link: '/resources' },
    { title: 'AI Doubt Solver', desc: 'Chat with an AI mentor for instant answers.', icon: MessageSquare, color: 'bg-teal-500', link: '/doubt' },
    { title: 'Study Roadmap', desc: 'Generate a personalized week-by-week plan.', icon: Map, color: 'bg-pink-500', link: '/roadmap' },
    { title: 'Mock Interview', desc: 'Speak your answers and get voice AI feedback.', icon: Mic, color: 'bg-red-500', link: '/interview' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Welcome back, {user?.name}! 👋</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            You're on the right track. Keep practicing daily to crack your dream placement at top companies.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">Level {user?.level || 1} {getLevelTitle(user?.level || 1)}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-300" />
              <span className="font-semibold">{user?.streak?.current || 0} Day Streak 🔥</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-300" />
              <span className="font-semibold">{user?.xp || 0} XP</span>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-blue-100">Progress to Level {user?.level || 1 + 1}</span>
              <span className="text-blue-100">{getCurrentXP()}/100 XP</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-300 to-orange-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${getCurrentXP()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Problems Solved</h3>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{user?.progress?.problemsSolved || 0}</p>
          <p className="text-sm text-gray-500 mt-1">Keep going! 💪</p>
        </div>
        
        <div className="glass p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Aptitude Score</h3>
            <Brain className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{user?.progress?.aptitudeScore || 0}%</p>
          <p className="text-sm text-gray-500 mt-1">Average accuracy</p>
        </div>
        
        <div className="glass p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Tests Taken</h3>
            <FileText className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{user?.progress?.testsTaken || 0}</p>
          <p className="text-sm text-gray-500 mt-1">Aptitude tests completed</p>
        </div>
      </div>

      {/* Feature Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Link 
              key={idx} 
              to={feature.link}
              className="group glass p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}