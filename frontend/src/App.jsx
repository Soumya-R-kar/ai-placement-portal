import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProblemList from './components/ProblemList';
import CodeEditor from './components/CodeEditor';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import Resources from './components/Resources';
import DoubtSolver from './components/DoubtSolver';
import RoadmapGenerator from './components/RoadmapGenerator';
import MockInterview from './components/MockInterview';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AptitudeTestList from './components/AptitudeTestList';
import AptitudeTest from './components/AptitudeTest';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
}

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
            AI
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
            Placement Portal
          </span>
        </Link>

        {user ? (
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Dashboard</Link>
            <Link to="/coding" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Coding</Link>
            <Link to="/aptitude" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Aptitude</Link>
            <Link to="/resume" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Resume AI</Link>
            
            <div className="h-6 w-px bg-gray-300"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button onClick={logout} className="text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2 transition-colors">Login</Link>
            <Link to="/register" className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md shadow-blue-500/20 transition-all hover:shadow-lg">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8 max-w-7xl mx-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/coding" element={<ProtectedRoute><ProblemList /></ProtectedRoute>} />
          <Route path="/coding/:id" element={<ProtectedRoute><CodeEditor /></ProtectedRoute>} />
          <Route path="/aptitude" element={<ProtectedRoute><AptitudeTestList /></ProtectedRoute>} />
          <Route path="/aptitude/:subject" element={<ProtectedRoute><AptitudeTest /></ProtectedRoute>} />
          <Route path="/resume" element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
          <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
          <Route path="/doubt" element={<ProtectedRoute><DoubtSolver /></ProtectedRoute>} />
          <Route path="/roadmap" element={<ProtectedRoute><RoadmapGenerator /></ProtectedRoute>} />
          <Route path="/interview" element={<ProtectedRoute><MockInterview /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}