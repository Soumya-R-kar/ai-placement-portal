import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// HARDCODED production URL - change this to your actual Render URL
const API_URL = 'https://YOUR_RENDER_URL.onrender.com'; // ⚠️ REPLACE THIS WITH YOUR ACTUAL RENDER URL

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      console.log("Checking profile with token...");
      axios.get(`${API_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log("Profile fetched:", res.data);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error("Profile fetch failed:", err);
        localStorage.removeItem('token');
        setToken(null);
      })
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    console.log("Attempting login to:", `${API_URL}/api/auth/login`);
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      console.log("Login successful!", res.data);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      
      try {
        await axios.post(`${API_URL}/api/progress/streak`, {}, {
          headers: { Authorization: `Bearer ${res.data.token}` }
        });
      } catch (err) {
        console.log('Streak update failed (non-critical)');
      }
      return res.data;
    } catch (error) {
      console.error("LOGIN ERROR CAUGHT:", error);
      console.error("Error Response:", error.response);
      throw error; // Re-throw so the Login component knows it failed
    }
  };

  const register = async (name, email, password, college) => {
    console.log("Attempting register to:", `${API_URL}/api/auth/register`);
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, { name, email, password, college });
      console.log("Register successful!", res.data);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (error) {
      console.error("REGISTER ERROR CAUGHT:", error);
      console.error("Error Response:", error.response);
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