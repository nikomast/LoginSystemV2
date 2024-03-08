import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [is2FAVerified, setIs2FAVerified] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const isVerified = localStorage.getItem('is2FAVerified') === 'true';
    setIsLoggedIn(!!token && isVerified);
    setIs2FAVerified(isVerified);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, is2FAVerified, setIs2FAVerified }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

