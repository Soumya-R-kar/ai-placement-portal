import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-2xl font-bold text-indigo-600">
              Placement Portal
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
            <Link to="/coding" className="text-gray-700 hover:text-indigo-600">Coding</Link>
            <Link to="/aptitude" className="text-gray-700 hover:text-indigo-600">Aptitude</Link>
            <Link to="/resources" className="text-gray-700 hover:text-indigo-600">Resources</Link>
            <Link to="/resume" className="text-gray-700 hover:text-indigo-600">Resume</Link>
            <Link to="/interview" className="text-gray-700 hover:text-indigo-600">Interview</Link>
            <Link to="/roadmap" className="text-gray-700 hover:text-indigo-600">Roadmap</Link>
            <Link to="/companies" className="text-gray-700 hover:text-indigo-600">Companies</Link>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}