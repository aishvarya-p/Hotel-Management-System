import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('hotel_admin');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      const adminData = { username, role: 'Administrator', name: 'Admin User' };
      setAdmin(adminData);
      localStorage.setItem('hotel_admin', JSON.stringify(adminData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('hotel_admin');
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
