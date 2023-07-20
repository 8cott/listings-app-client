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

  // Store user data in state
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt');

    // If user is logged in, decode token and set user
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
      // If user is not logged in, set user to null
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
