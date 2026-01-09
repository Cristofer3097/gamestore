import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();
// maneja al usuario en toda la app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Al cargar la página, ver si hay sesión guardada
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user_data', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_data');
    localStorage.removeItem('token');
    localStorage.removeItem('gameCart'); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);