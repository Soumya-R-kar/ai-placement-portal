import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// ✅ YOUR LIVE BACKEND URL (Hardcoded for reliability)
const API_URL = 'https://ai-placement-portal-5her.onrender.com';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (on page refresh)
  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const res = await axios.get(`${API_URL}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(res.data.user);
        } catch (err) {
          console.error("Session expired or invalid token");
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      
      // Save token and user data
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      
      // Update streak silently in background
      try {
        await axios.post(`${API_URL}/api/progress/streak`, {}, {
          headers: { Authorization: `Bearer ${res.data.token}` }
        });
      } catch (err) {
        console.log('Streak update skipped');
      }
      
      return res.data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  };

  const register = async (name, email, password, college) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, { 
        name, 
        email, 
        password, 
        college 
      });
      
      // Save token and user data
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      
      return res.data;
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);