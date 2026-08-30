import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem('token');
        setToken(null);
      })
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
  const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
  localStorage.setItem('token', res.data.token);
  setToken(res.data.token);
  setUser(res.data.user);
  
  // Update streak on login
  try {
    await axios.post('http://localhost:5000/api/progress/streak', {}, {
      headers: { Authorization: `Bearer ${res.data.token}` }
    });
  } catch (err) {
    console.log('Streak update failed');
  }
  
  return res.data;
};

  const register = async (name, email, password, college) => {
    const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, college });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
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