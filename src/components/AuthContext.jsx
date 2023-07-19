import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      try {
        const decodedUser = jwtDecode(jwtToken);
        return true;
      } catch (error) {
        console.log('Invalid token');
      }
    }
    return false;
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt');

    if (jwtToken) {
      try {
        const decodedUser = jwtDecode(jwtToken);
        setUser(decodedUser);
        setIsLoggedIn(true);
        console.log('User logged in:', decodedUser);
      } catch (error) {
        console.log('Invalid token');
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
