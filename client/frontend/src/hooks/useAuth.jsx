// client/frontend/src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Make sure you have run 'npm install jwt-decode'

const useAuth = () => {
  const [auth, setAuth] = useState({ token: null, user: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // This decodes the token and gets the payload object
        const decoded = jwtDecode(token);
        // We set the 'user' object from the payload into our state
        setAuth({ token, user: decoded.user });
      } catch (error) {
        console.error("Invalid or expired token:", error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return auth;
};

export default useAuth;