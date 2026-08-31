import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// --- CORE PAGES ---
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

// --- FEATURE PAGES ---
import Coding from './components/Coding'; // <-- Fixed: Changed from ProblemList
import CodeEditor from './components/CodeEditor';
import AptitudeTestList from './components/AptitudeTestList';
import AptitudeTest from './components/AptitudeTest';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import Resources from './components/Resources';
import DoubtSolver from './components/DoubtSolver';
import RoadmapGenerator from './components/RoadmapGenerator';
import MockInterview from './components/MockInterview';
import Companies from './components/Companies';

// --- PROTECTED ROUTE WRAPPER ---
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// --- MAIN APP COMPONENT ---
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="p-8 max-w-7xl mx-auto">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              
              {/* Coding Routes */}
              <Route path="/coding" element={<ProtectedRoute><Coding /></ProtectedRoute>} />
              <Route path="/coding/:id" element={<ProtectedRoute><CodeEditor /></ProtectedRoute>} />
              
              {/* Other Feature Routes */}
              <Route path="/aptitude" element={<ProtectedRoute><AptitudeTestList /></ProtectedRoute>} />
              <Route path="/aptitude/:subject" element={<ProtectedRoute><AptitudeTest /></ProtectedRoute>} />
              <Route path="/resume" element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
              <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
              <Route path="/doubt" element={<ProtectedRoute><DoubtSolver /></ProtectedRoute>} />
              <Route path="/roadmap" element={<ProtectedRoute><RoadmapGenerator /></ProtectedRoute>} />
              <Route path="/interview" element={<ProtectedRoute><MockInterview /></ProtectedRoute>} />
              <Route path="/companies" element={<ProtectedRoute><Companies /></ProtectedRoute>} />
              
              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;